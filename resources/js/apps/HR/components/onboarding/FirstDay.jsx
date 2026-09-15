import React, { useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const FirstDay = ({ employee, fullscreen }) => {
    const [notes, setNotes] = useState("");
    const [firstDay, setFirstDay] = useState({
        attendanceMarked: false,
        systemLoginVerified: false,
        workstationSetup: false,
        managerIntroduced: false,
        onboardingSessionCompleted: false,
        policiesAcknowledged: false,
    });

    const toggle = (key) => {
        setFirstDay({ ...firstDay, [key]: !firstDay[key] });
    };

    const allDone = useMemo(() => {
        return Object.values(firstDay).every(Boolean);
    }, [firstDay]);

    const handleComplete = () => {
        alert("First Day Completed → Move to Final Stage");
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0">First Day</h4>
                    <small className="text-muted">
                        Confirm onboarding completion & attendance
                    </small>
                </div>
                <span className={`badge bg-${allDone ? 'success' : 'warning text-dark'}`}>
                    {allDone ? 'Ready for Completion' : 'In Progress'}
                </span>
            </div>

            <div className="row">
                {/* LEFT SIDE */}
                <div className={`col-12 ${fullscreen ? 'col-sm-8' : ''} p-3`}>
                    {/* EMPLOYEE */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Employee</h5>
                        {employee ? (
                            <div className="row small">
                                <div className="col-6 mb-2"><strong>ID:</strong> {employee.id}</div>
                                <div className="col-6 mb-2"><strong>Name:</strong> {employee.attributes.firstName} {employee.attributes.lastName}</div>
                                <div className="col-6 mb-2"><strong>Email:</strong> {employee.attributes.email}</div>
                                <div className="col-6 mb-2"><strong>Role:</strong> {employee.attributes.position}</div>
                            </div>
                        ):(
                            <div>No employee</div>
                        )}
                    </div>
                    {/* FIRST DAY CHECKLIST */}
                    <div className="border rounded p-3 mb-3">
                        <h5>First Day Checklist</h5>
                        <Task label="Attendance Marked" checked={firstDay.attendanceMarked} onClick={() => toggle("attendanceMarked")} />
                        <Task label="System Login Verified" checked={firstDay.systemLoginVerified} onClick={() => toggle("systemLoginVerified")} />
                        <Task label="Workstation Setup Completed" checked={firstDay.workstationSetup} onClick={() => toggle("workstationSetup")} />
                        <Task label="Manager Introduction Done" checked={firstDay.managerIntroduced} onClick={() => toggle("managerIntroduced")} />
                        <Task label="Onboarding Session Completed" checked={firstDay.onboardingSessionCompleted} onClick={() => toggle("onboardingSessionCompleted")} />
                        <Task label="Policies Acknowledged" checked={firstDay.policiesAcknowledged} onClick={() => toggle("policiesAcknowledged")} />
                    </div>
                    {/* NOTES */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Manager Notes</h5>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Add first-day observations, issues, or feedback..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    {/* ACTION */}
                    <button
                        className={`btn w-100 btn-${allDone ? 'success' : 'secondary'}`}
                        disabled={!allDone}
                        onClick={handleComplete}
                    >
                        Complete First Day → Mark Employee Active
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
                                {allDone ? 'First Day Complete' : 'Pending Tasks'}
                            </span>
                        </div>
                    </div>
                    <div className="border bg-white rounded p-3">
                        <h6>Next Stage</h6>
                        <small className="text-muted">
                            Employee will move to <strong>Completed</strong> state after approval.
                        </small>
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