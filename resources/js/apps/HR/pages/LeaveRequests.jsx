import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { api } from "../../../global/services/Api";
import { GlobalSearchFilter } from "../../../global/components/GlobalSearchFilter";
import { Spinner } from "../../../global/components/Spinner";
import { select } from "framer-motion/client";
import { GlobalApiToggle } from "../../../global/widgets/GlobalApiToggle";
import { useSearchCallback } from "../../../global/hooks/useSearchCallback";
import { MobileTransformable, MobileTransformableProvider } from "../../../global/components/MobileTransformable";

export const LeaveRequests = () => {
    const [selected, setSelected] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const mobileTransformableRef = useRef();

    const badge = (s) => {
        if (s === 'approved') return 'bg-success';
        if (s === 'rejected') return 'bg-danger';
        return 'bg-warning text-dark';
    };

    const calcDays = (from, to) =>{
        return Math.ceil((new Date(to) - new Date(from)) / 86400000) + 1;
    }

    const updateLeaves = (leave) =>{
        setLeaveRequests((prevs)=>prevs.map((prev)=>{
            if(prev.id === leave.id){
                if(leave.id === selected.id){
                    setSelected(leave);
                }
                return leave;
            }
            return prev
        }));
    }

    const setAnimateSelected = (item) =>{
        setSelected(null);
        setTimeout(() => {
            setSelected(item);
            mobileTransformableRef.current.open();
        }, 0);
    }

    const items = useMemo(()=>[
        {
            list: [
                {title: 'Pending', name: 'status', value: 'pending'},
                {title: 'Approved', name: 'status', value: 'approved'},
                {title: 'Rejected', name: 'status', value: 'rejected'},
            ]
        }
    ], []);

    const search = useSearchCallback((filter)=>{
        let data = {...filter};
        if(data.name){
            data.type = data.name;
            data.reason = data.name;
            delete data.name;
        }

        setLoading(true);
        setLeaveRequests([]);

        api.leaveRequest.search(data).then((response)=>{
            setLeaveRequests(response.data.leaveRequests);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    });

    useEffect(()=>{
        api.leaveRequest.list().then((response)=>{
            setLeaveRequests(response.data.leaveRequests);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container">
            <MobileTransformableProvider ref={mobileTransformableRef}>
                <div className="mb-2">
                    <h4 className="fw-semibold mb-0">Leave Requests</h4>
                    <div className="text-muted small">
                        Manage employee leave approvals
                    </div>
                </div>

                <GlobalSearchFilter
                    className="mb-5"
                    mapSameNameToArray='STRING_ON_SINGLE_ITEM'
                    name="name"
                    onChange={search}
                    items={items}
                />

                {loading ? (
                    <div className="position-relative py-5">
                        <Spinner show absolute md bg="white" />
                    </div>
                ) : (
                    <>
                        {leaveRequests.length ? (
                            <div className="row g-3">
                                {/* LIST */}
                                <div className="col-12 col-sm-5">
                                    {leaveRequests.map((r, i) => (
                                        <motion.div
                                            className={`card p-3 mb-2 pointer ${
                                                selected?.id === r.id ? 'border-primary' : ''
                                            }`}
                                            onClick={()=>setAnimateSelected(r)}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={r.id}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <div className="fw-semibold">
                                                        {r.attributes.employee.attributes.fullName}
                                                    </div>
                                                    <div className="text-muted small">
                                                        {r.attributes.type} • {calcDays(r.attributes.from, r.attributes.to)} days
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className={`badge ${badge(r.attributes.status)}`}>
                                                        {r.attributes.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="small text-muted mt-1">
                                                {r.attributes.from} → {r.attributes.to}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* DETAILS */}
                                <div className="col-12 col-sm-7">
                                    <MobileTransformable className="card position-sticky p-4" style={{top: '20px'}}>
                                        <div className="">
                                            {!selected ? (
                                                <div className="text-center text-muted py-4">
                                                    Select a request to view details
                                                </div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.05 }}
                                                >
                                                    <h5 className="fw-semibold">
                                                        {selected.attributes.employee.attributes.fullName}
                                                    </h5>
                                                    <div className="text-muted small mb-1">Department:</div>
                                                    <div className="d-flex align-items-center flex-wrap gap-2 small mb-3">
                                                        {selected.attributes.employee.attributes.departments.map((dept)=>(
                                                            <span className="badge bg-secondary" key={dept.id}>{dept.attributes.name}</span>
                                                        ))}
                                                    </div>
                                                    <div className="text-muted small">Type:</div>
                                                    <div>{selected.attributes.type}</div>
                                                    <hr />
                                                    <p className="small mb-1">
                                                        <strong>From:</strong> {selected.attributes.from}
                                                    </p>
                                                    <p className="small mb-1">
                                                        <strong>To:</strong> {selected.attributes.to}
                                                    </p>
                                                    <p className="small mb-1">
                                                        <strong>Duration:</strong>{" "}
                                                        {calcDays(selected.attributes.from, selected.attributes.to)} days
                                                    </p>
                                                    <p className="small mb-3">
                                                        <strong>Reason:</strong> {selected.attributes.reason}
                                                    </p>
                                                    <span className={`badge ${badge(selected.attributes.status)}`}>
                                                        {selected.attributes.status}
                                                    </span>
                                                    {/* ACTIONS */}
                                                    <div className="mt-4">
                                                        <Actions onSuccess={updateLeaves} leave={selected} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </MobileTransformable>
                                </div>
                            </div>
                        ):(
                            <div className="alert alert-primary my-5">
                                No Requests
                            </div>
                        )}
                    </>
                )}
            </MobileTransformableProvider>
        </div>
    );
};

const Actions = ({ onSuccess, leave }) =>{
    const [notify, setNotify] = useState(false);

    if(leave.attributes.status === 'pending') return(
        <>
            <GlobalApiToggle
                className="mb-3"
                trailing="Send notification"
                checked={notify}
                onChange={(e)=>setNotify(e.target.checked)}
            />
            <div className="d-flex flex-wrap gap-3">
                <ApproveButton
                    className="btn btn-success btn-sm px-3"
                    onSuccess={onSuccess}
                    leave={leave}
                    payload={{ notify }}
                >
                    Approve
                </ApproveButton>
                <RejectButton
                    className="btn btn-danger btn-sm px-3"
                    onSuccess={onSuccess}
                    leave={leave}
                    payload={{ notify }}
                >
                    Reject
                </RejectButton>
                <button
                    onClick={()=>navigate(routes.hr.viewEmployee(selected.attributes.employee.id))}
                    className="btn btn-secondary btn-sm px-3"
                >
                    View Profile
                </button>
            </div>
        </>
    );
    return (
        <div className="d-flex justify-content-end">
            {leave.attributes.status === 'approved' && (
                <RejectButton
                    className="link-danger small"
                    onSuccess={onSuccess}
                    leave={leave}
                    payload={{ notify: true }}
                >
                    Override Approved
                </RejectButton>
            )}
            {leave.attributes.status === 'rejected' && (
                <ApproveButton
                    className="link-danger small"
                    onSuccess={onSuccess}
                    leave={leave}
                    payload={{ notify: true }}
                >
                    Override Rejection
                </ApproveButton>
            )}
        </div>
    )
}

const ApproveButton = ({ leave, onSuccess, payload, className, children }) =>{
    const [loading, setLoading] = useState(false);

    const update = () =>{
        setLoading(true);

        const data = {
            leaveId: leave.id,
            status: 'approved',
            ...payload
        }

        api.leaveRequest.update(data).then((response)=>{
            onSuccess?.(response.data.leaveRequest);
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }

    return(
        <button onClick={update} className={`position-relative ${className || ''}`}>
            {children}
            <Spinner show={loading} absolute />
        </button>
    )
}

const RejectButton = ({ leave, onSuccess, payload, className, children }) =>{
    const [loading, setLoading] = useState(false);

    const update = () =>{
        setLoading(true);

        const data = {
            leaveId: leave.id,
            status: 'rejected',
            ...payload
        }

        api.leaveRequest.update(data).then((response)=>{
            onSuccess?.(response.data.leaveRequest);
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }

    return(
        <button onClick={update} className={`position-relative ${className || ''}`}>
            {children}
            <Spinner show={loading} absolute />
        </button>
    )
}
