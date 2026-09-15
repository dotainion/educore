import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete, MdEdit, MdPerson, MdPersonOff } from "react-icons/md";
import { api } from "../../../global/services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../../global/components/Spinner";
import { routes } from "../../../global/routes/Routes";
import { ProfileTabs } from "../components/profileTabs/ProfileTabs";

export const EmployeeView = () => {
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.employee.find({userId: params.employeeId}).then((response)=>{
            setEmployee(response.data.user);
        }).catch((error)=>{
            console.log(error.message);
        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return(
        <div className="w-100 vh-100 position-relative">
            <Spinner show absolute md bg="white" />
        </div>
    );

    if(!employee) return(
        <div className="alert alert-primary my-5">
            <h4>Employee not found</h4>
        </div>
    )

    return (
        <div className="container">
            <motion.div
                className="card border-0 text-break p-4 mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    {/* LEFT */}
                    <div>
                        <h4 className="fw-semibold mb-0">{employee.attributes.fullName}</h4>
                        <div className="text-muted small">
                            {employee.attributes.roles.map((role)=>(
                                <span className="badge bg-primary" key={role.attributes.name}>{role.attributes.name}</span>
                            ))} • {employee.department} • {employee.attributes.createdAt}
                        </div>
                    </div>
                    {/* RIGHT ACTIONS */}
                    <div>
                        <span
                            className={`badge bg-${
                                employee.attributes.status === 'active' ? 'success' : 'danger'
                            }`}
                        >
                            {employee.attributes.status}
                        </span>
                    </div>
                </div>

                {/* QUICK INFO STRIP */}
                <div className="row mt-3 text-muted small g-2">
                    <div className="col-sm-3">📧 {employee.attributes.email || 'NA'}</div>
                    <div className="col-sm-3">📞 {employee.attributes.contact || 'NA'}</div>
                    <div className="col-sm-3">📞 
                        {employee.attributes.emergencyContacts.map((contact)=>(
                            <span key={contact.id}>{contact.attributes.name}</span>
                        ))}
                    </div>
                    <div className="col-sm-3">🏢 {employee.department || 'NA'}</div>
                    <div className="col-sm-3">📍 {employee.location || 'NA'}</div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                        onClick={()=>navigate(routes.hr.editEmployee(employee.id))}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                    >
                        <MdEdit />
                        Edit
                    </button>
                    <ToggleStatus employee={employee} updated={setEmployee} />
                </div>
            </motion.div>
            <ProfileTabs employee={employee} />
        </div>
    );
};

const ToggleStatus = ({employee, updated}) =>{
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const toggleActivate = () =>{
        setSaving(true);
        const data = {
            userId: params.employeeId,
            status: employee.attributes.status === 'active' ? 'inactive' : 'active',
        }
        api.employee.update(data).then((response)=>{
            updated(response.data.user);
        }).catch((error)=>{
            console.log(error.message);
        }).finally(()=>setSaving(false));
    }

    const remove = () =>{
        setDeleting(true);
        api.employee.delete({userId: params.employeeId}).then((response)=>{
            navigate(routes.hr.employees);
        }).catch((error)=>{
            console.log(error.message);
        }).finally(()=>setDeleting(false));
    }

    return(
        <>
            <button
                onClick={toggleActivate}
                className={`btn btn-sm btn-outline-${
                    employee.attributes.status === 'active' ? 'danger' : 'success'
                } d-flex align-items-center gap-2 position-relative`}
            >
                {employee.attributes.status === 'active' ? <MdPersonOff /> : <MdPerson />}
                {employee.attributes.status === 'active' ? 'Deactivate' : 'Activate'}
                <Spinner show={saving} absolute bg="white" />
            </button>
            {employee.attributes.status === 'inactive' && (
                <button onClick={remove} className="btn btn-sm btn-danger position-relative d-flex align-items-center gap-2">
                    <MdDelete />
                    Delete
                    <Spinner show={deleting} absolute bg="white" />
                </button>
            )}
        </>
    )
}
