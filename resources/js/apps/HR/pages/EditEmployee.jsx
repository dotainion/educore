import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../global/services/Api";
import { Spinner } from "../../../global/components/Spinner";
import { Address } from "../components/Address";
import { Employment } from "../components/Employment";
import { Profile } from "../components/Profile";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { routes } from "../../../global/routes/Routes";
import { AddressIcon } from "../components/AddressIcon";
import { AddressesAndModification } from "../components/AddressesAndModification";
import { Plus } from "lucide-react";
import { PendingDisplay } from "../components/PendingDisplay";

export const EditEmployee = () => {
    const [section, setSection] = useState('employee');
    const [employee, setEmployee] = useState(null);
    const [employment, setEmployment] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const addrRef = useRef();

    const openAddress = () =>{
        addrRef.current.open();
    }

    //navigate(routes.hr.viewEmployee(response.data.user.id));

    useEffect(()=>{
        api.employee.find({userId: params.employeeId}).then((response)=>{
            setEmployee(response.data.user);
            setAddresses(response.data.user.attributes.addresses);
            setEmployment(response.data.user.attributes.employment);
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container-fluid px-2 px-md-4 py-3">
            {/* HEADER */}
            <div className="mb-2">
                <h4>Edit Employee</h4>
            </div>

            <div className="row flex-md-row-reverse gap-0 m-0">
                <EditEmployeeSidebar
                    employee={employee}
                    section={section}
                    setSection={setSection}
                />
                <div className="col-12 col-md-9 px-0 ps-md-3">
                    <div className="position-relative" style={{minHeight: '200px'}}>
                        {section === 'employee' && (
                            <Submitable loading={loading} loadingMessage="Loading employment information">
                                {(ref, setSaving)=>(
                                    <Profile
                                        ref={ref}
                                        employee={employee}
                                        saving={setSaving}
                                    />
                                )}
                            </Submitable>
                        )}
                        {section === 'employment' && (
                            <Submitable loading={loading} loadingMessage="Loading employment information">
                                {(ref, setSaving, loadingMessage)=>(
                                    <Employment
                                        ref={ref}
                                        employment={employment}
                                        saving={setSaving}
                                        renderLoading={(
                                            <PendingDisplay
                                                message={loadingMessage}
                                            />
                                        )}
                                    />
                                )}
                            </Submitable>
                        )}
                        {section === 'address' && (
                            <>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="fw-semibold">Addresses</div>
                                    <button onClick={openAddress} className="btn btn-sm btn-light d-flex align-items-center gap-2">
                                        <Plus />
                                        Create
                                    </button>
                                </div>
                                <AddressesAndModification
                                    ref={addrRef}
                                    addresses={addresses}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ id, label, onClick, active }) => (
    <button
        onClick={()=>onClick(id)}
        className={`btn btn-sm btn-${active === id ? 'primary' : 'light'} text-truncate`}
    >
        {label}
    </button>
);

const EditEmployeeSidebar = ({ employee, setSection, section }) =>{
    return(
        <>
            {/* ================= DESKTOP SIDEBAR ================= */}
            <div className="col-md-3 d-none d-md-block p-0">
                <div className="card border-0 p-2 position-sticky d-flex flex-column gap-2" style={{ top: 10, zIndex: 10 }}>
                    <Navs section={section} setSection={setSection} />
                </div>
            </div>
            {/* ================= MOBILE TAB BAR ================= */}
            <div className="d-md-none position-sticky top-0 bg-white border-bottom py-2 mb-2 p-0" style={{ zIndex: 10 }}>
                <div className="d-flex gap-2 overflow-auto text-nowrap">
                    <Navs section={section} setSection={setSection} />
                </div>
            </div>
        </>
    )
}

const Navs = ({setSection, section}) =>{
    const navigate = useNavigate();
    const params = useParams();
    return(
        <>
            <NavItem id="employee" label="Profile" onClick={setSection} active={section} />
            <NavItem id="employment" label="Employment" onClick={setSection} active={section} />
            <NavItem label="Roles" onClick={()=>navigate(routes.hr.rolesAndPermission(params.employeeId))} active={section} />
            <NavItem id="address" label="Address" onClick={setSection} active={section} />
        </>
    )
}

const Submitable = ({ loading, loadingMessage, children }) =>{
    const [saving, setSaving] = useState(false);

    const ref = useRef();

    const onSave = () =>{
        ref.current.save();
    }

    return(
        <>
            {loading ? (
                <PendingDisplay
                    message={loadingMessage}
                />
            ) : (
                <>
                    {children(ref, setSaving, loadingMessage)}
                    <div className="d-flex justify-content-end px-0 px-md-3 mt-4">
                        <button onClick={onSave} className="btn btn-sm btn-primary position-relative px-3">
                            Save Changes
                            <Spinner show={saving} absolute />
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
