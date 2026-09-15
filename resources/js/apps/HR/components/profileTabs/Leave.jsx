import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";

export const Leave = () =>{
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.leaveRequest.list().then((response)=>{
            setLeaves(response.data.leaveRequests);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h6>Leave History</h6>
            <p className="text-muted small">
                Approved and pending leave requests.
            </p>
            <div className="d-flex flex-column gap-3">
                {leaves.map((leave)=>(
                    <LeaveCard leave={leave} key={leave.id} />
                ))}
            </div>
        </motion.div>
    )
}

const LeaveCard = ({leave}) =>{
    const [loading, setLoading] = useState(false);

    const statuses = {
        pending: 'secondary',
        approved: 'success',
        rejected: 'danger'
    }

    const approve = () =>{
        setLoading(true);
        const data = {
            leaveId: leave.id,
            status: 'approve'
        }
        api.leaveRequest.update(data).then((response)=>{
            setLeaves(response.data.leaveRequests);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }

    return(
        <div className="border rounded-3 overflow-hidden">
            <div className="bg-primary bg-opacity-10 text-dark d-flex align-items-center justify-content-between gap-3 mb-3 px-3 py-2">
                <div className="fw-bold text-uppercase">{leave.attributes.type}</div>
                <div>
                    <span className={`badge bg-${statuses[leave.attributes.status]} rounded-pill px-2`}>
                        {leave.attributes.status}
                    </span>
                </div>
            </div>
            <div className="d-flex gap-2 px-3">
                <div className="px-2 py-1 border rounded-3">
                    <label>From:</label>
                    <div>{leave.attributes.from}</div>
                </div>
                <div className="px-2 py-1 border rounded-3">
                    <label>To:</label>
                    <div>{leave.attributes.to}</div>
                </div>
                <div className="flex-fill d-flex align-items-center justify-content-end px-2 py-1">
                    <button onClick={approve} className="btn btn-sm btn-success rounded-pill px-3 position-relative">
                        Approve
                        <Spinner show={loading} absolute bg="white" />
                    </button>
                </div>
            </div>
            <div className="mt-2 text-muted px-3">{leave.attributes.reason}</div>
            <div className="small text-end px-3 pb-2">{leave.attributes.createdAt.split('T')[0]}</div>
        </div>
    )
}