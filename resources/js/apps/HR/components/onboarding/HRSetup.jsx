import React, { useState, useMemo } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { api } from "../../../../global/services/Api";
import { GlobalApiSubmit } from "../../../../global/widgets/GlobalApiSubmit";

export const HRSetup = ({ employee, fullscreen }) => {
    const [scheduleExists, setScheduleExists] = useState(false);
    const [tasks, setTasks] = useState({
        contractFinalized: false,
        departmentAssigned: false,
        salarySetup: false,
        managerAssigned: false,
        benefitsEnrolled: false,
    });
    const [form, setForm] = useState({
        department: "",
        jobLevel: "",
        startDate: "",
        location: "",
        manager: "",
        contractType: "full-time",
        salary: "",
        currency: "USD",
        frequency: "monthly",
    });

    const toggleTask = (key) => {
        setTasks({ ...tasks, [key]: !tasks[key] });
    };

    const allTasksDone = useMemo(() => {
        return Object.values(tasks).every(Boolean) && scheduleExists;
    }, [tasks, scheduleExists]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openScheduleModule = () => {
        // navigate to scheduling system (calendar module)
        window.location.href = `/schedules/employee/${employee.id}`;
    };

    const handleComplete = () => {
        const data = {

        }
        api.employment.create(data).then((response)=>{

        }).catch((error)=>{

        });
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0">HR Setup</h4>
                    <small className="text-muted">
                        Complete employee HR onboarding
                    </small>
                </div>
                <span className={`badge ${allTasksDone ? "bg-success" : "bg-warning text-dark"}`}>
                    {allTasksDone ? "Ready for IT Setup" : "In Progress"}
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

                    {/* HR TASKS */}
                    <ul className="list-group mb-3">
                        <li className="list-group-item fw-semibold">HR Checklist</li>
                        <Task label="Contract Finalized" checked={tasks.contractFinalized} onClick={() => toggleTask("contractFinalized")} name="contractFinalized" />
                        <Task label="Department Assigned" checked={tasks.departmentAssigned} onClick={() => toggleTask("departmentAssigned")} name="departmentAssigned" />
                        <Task label="Salary Setup Completed" checked={tasks.salarySetup} onClick={() => toggleTask("salarySetup")} name="salarySetup" />
                        <Task label="Manager Assigned" checked={tasks.managerAssigned} onClick={() => toggleTask("managerAssigned")} name="managerAssigned" />
                        <Task label="Benefits Enrolled" checked={tasks.benefitsEnrolled} onClick={() => toggleTask("benefitsEnrolled")} name="benefitsEnrolled" />
                    </ul>
                    {/* EMPLOYMENT FORM */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Employment Details</h5>
                        <div className="row">
                            <Input label="Department" name="department" value={form.department} onChange={handleChange} />
                            <Input label="Job Level" name="jobLevel" value={form.jobLevel} onChange={handleChange} />
                            <Input label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                            <Input label="Location" name="location" value={form.location} onChange={handleChange} />
                            <Input label="Manager" name="manager" value={form.manager} onChange={handleChange} />
                        </div>
                    </div>
                    {/* 💡 WORK SCHEDULE (external system) */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Work Schedule</h5>
                        {!scheduleExists ? (
                            <>
                                <div className="alert alert-warning mb-2">
                                    No schedule assigned yet. Employee has no calendar setup.
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={openScheduleModule}
                                >
                                    Create Work Schedule (Calendar)
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="alert alert-success mb-2">
                                    Work schedule is active for this employee
                                </div>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={openScheduleModule}
                                >
                                    Manage Schedule (Calendar View)
                                </button>
                            </>
                        )}
                    </div>
                    {/* PAYROLL */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Payroll</h5>
                        <div className="row">
                            <Input label="Salary" name="salary" value={form.salary} onChange={handleChange} />
                            <Input label="Currency" name="currency" value={form.currency} onChange={handleChange} />
                            <Input label="Frequency" name="frequency" value={form.frequency} onChange={handleChange} />
                        </div>
                    </div>
                    {/* ACTION */}
                    <GlobalApiSubmit
                        className={`btn w-100 btn-${allTasksDone ? 'success' : 'secondary'}`}
                        disabled={!allTasksDone}
                        onClick={handleComplete}
                    >
                        Complete HR Setup
                    </GlobalApiSubmit>
                </div>
                {/* RIGHT SIDE */}
                <div className={`col-12 ${fullscreen ? 'col-sm-4' : ''} p-3 bg-light border-top border-lg-start`}>
                    <div className="position-sticky border bg-white rounded p-3 mb-3" style={{top: '20px'}}>
                        <h6>Status</h6>
                        <div className="d-flex align-items-center gap-2">
                            {allTasksDone ? (
                                <CheckCircle className="text-success" />
                            ) : (
                                <AlertCircle className="text-warning" />
                            )}
                            <span>{allTasksDone ? 'HR Setup Complete' : 'Pending Tasks'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Task = ({ label, checked, onClick }) =>{
    return (
        <li
            onClick={onClick}
            className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        >
            {checked ? (
                <CheckCircle className="text-success" size={16} />
            ) : (
                <AlertCircle className="text-secondary" size={16} />
            )}
            <span>{label}</span>
        </li>
    );
}

const Input = ({ label, name, value, onChange }) =>{
    return (
        <div className="col-12 col-md-6 mb-2">
            <GlobalApiInput
                label={label}
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}