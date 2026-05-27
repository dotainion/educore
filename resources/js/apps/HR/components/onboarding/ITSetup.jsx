import React, { useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const ITSetup = ({ employee, fullscreen }) => {
    const [tasks, setTasks] = useState({
        emailCreated: false,
        systemAccessGranted: false,
        laptopAssigned: false,
        softwareInstalled: false,
        vpnSetup: false,
        securityTrainingSent: false,
    });
    const [form, setForm] = useState({
        email: "",
        role: "",
        systemAccessLevel: "",
        laptopModel: "",
        softwareList: "",
        vpnRequired: "yes",
    });

    const toggleTask = (key) => {
        setTasks({ ...tasks, [key]: !tasks[key] });
    };

    const allDone = useMemo(() => {
        return Object.values(tasks).every(Boolean);
    }, [tasks]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleComplete = () => {
        alert("IT Setup Completed → Move to Documents/Training");
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0">IT Setup</h4>
                    <small className="text-muted">
                        Configure systems, access & equipment
                    </small>
                </div>
                <span className={`badge bg-${allDone ? 'success' : 'warning text-dark'}`}>
                    {allDone ? 'Ready for Next Stage' : 'In Progress'}
                </span>
            </div>
            <div className="row">
                {/* LEFT SIDE */}
                <div className={`col-12 ${fullscreen ? 'col-sm-8' : ''} p-3`}>
                    {/* EMPLOYEE SUMMARY */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Employee</h5>
                        {employee ? (
                            <div className="row small">
                                <div className="col-6 mb-2"><strong>ID:</strong> {employee.id}</div>
                                <div className="col-6 mb-2"><strong>Name:</strong> {employee.attributes.firstName} {employee.attributes.lastName}</div>
                                <div className="col-6 mb-2"><strong>Email:</strong> {employee.attributes.email}</div>
                                <div className="col-6 mb-2"><strong>Position:</strong> {employee.attributes.position}</div>
                            </div>
                        ):(
                            <div>No employee</div>
                        )}
                    </div>
                    {/* IT TASKS */}
                    <div className="border rounded p-3 mb-3">
                        <h5>IT Checklist</h5>
                        <Task label="Work Email Created" checked={tasks.emailCreated} onClick={() => toggleTask("emailCreated")} />
                        <Task label="System Access Granted" checked={tasks.systemAccessGranted} onClick={() => toggleTask("systemAccessGranted")} />
                        <Task label="Laptop Assigned" checked={tasks.laptopAssigned} onClick={() => toggleTask("laptopAssigned")} />
                        <Task label="Software Installed" checked={tasks.softwareInstalled} onClick={() => toggleTask("softwareInstalled")} />
                        <Task label="VPN Setup Complete" checked={tasks.vpnSetup} onClick={() => toggleTask("vpnSetup")} />
                        <Task label="Security Training Sent" checked={tasks.securityTrainingSent} onClick={() => toggleTask("securityTrainingSent")} />
                    </div>
                    {/* SYSTEM CONFIG */}
                    <div className="border rounded p-3 mb-3">
                        <h5>System Configuration</h5>
                        <div className="row">
                            <Input label="Work Email" name="email" value={form.email} onChange={handleChange} />
                            <Input label="Role Access Level" name="systemAccessLevel" value={form.systemAccessLevel} onChange={handleChange} />
                            <Input label="Laptop Model" name="laptopModel" value={form.laptopModel} onChange={handleChange} />
                            <Input label="Software List" name="softwareList" value={form.softwareList} onChange={handleChange} />
                            <Input label="VPN Required (yes/no)" name="vpnRequired" value={form.vpnRequired} onChange={handleChange} />
                        </div>
                    </div>
                    {/* ACTION */}
                    <button
                        className={`btn w-100 btn-${allDone ? 'success' : 'secondary'}`}
                        disabled={!allDone}
                        onClick={handleComplete}
                    >
                        Complete IT Setup → Next Stage
                    </button>
                </div>
                {/* RIGHT SIDE */}
                <div className={`col-12 ${fullscreen ? 'col-sm-4' : ''} p-3 bg-light border-top border-lg-start`}>
                    <div className="border bg-white rounded p-3 mb-3">
                        <h6>Status</h6>
                        <div className="d-flex align-items-center gap-2">
                            {allDone ? (
                                <CheckCircle className="text-success" />
                            ) : (
                                <AlertCircle className="text-warning" />
                            )}
                            <span>
                                {allDone ? 'IT Setup Complete' : 'Pending Configuration'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ---------------- HELPERS ---------------- */

const Task = ({ label, checked, onClick }) =>{
    return (
        <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            {checked ? (
                <CheckCircle className="text-success" size={16} />
            ) : (
                <AlertCircle className="text-secondary" size={16} />
            )}
            <span>{label}</span>
        </div>
    );
}

const Input = ({ label, name, value, onChange }) =>{
    return (
        <div className="col-12 col-md-6 mb-2">
            <label className="form-label small">{label}</label>
            <input
                className="form-control"
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}