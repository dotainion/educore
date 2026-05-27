import React, { useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const Training = ({ employee, fullscreen }) => {
    const [progressNotes, setProgressNotes] = useState("");
    const [training, setTraining] = useState({
        companyIntro: false,
        policiesRead: false,
        securityTraining: false,
        roleTraining: false,
        systemWalkthrough: false,
        complianceQuiz: false,
    });

    const toggle = (key) => {
        setTraining({ ...training, [key]: !training[key] });
    };

    const allCompleted = useMemo(() => {
        return Object.values(training).every(Boolean);
    }, [training]);

    const handleComplete = () => {
        alert("Training Completed → Move to First Day");
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0">Training</h4>
                    <small className="text-muted">
                        Employee onboarding & learning completion
                    </small>
                </div>
                <span className={`badge bg-${allCompleted ? 'success' : 'warning text-dark'}`}>
                    {allCompleted ? 'Ready for First Day' : 'In Progress'}
                </span>
            </div>
            <div className="row">
                {/* LEFT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-8' : ''} p-3`}>
                    {/* EMPLOYEE SUMMARY */}
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
                    {/* TRAINING CHECKLIST */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Training Checklist</h5>
                        <Task label="Company Introduction Completed" checked={training.companyIntro} onClick={() => toggle("companyIntro")} />
                        <Task label="Company Policies Read" checked={training.policiesRead} onClick={() => toggle("policiesRead")} />
                        <Task label="Security Training Completed" checked={training.securityTraining} onClick={() => toggle("securityTraining")} />
                        <Task label="Role-Specific Training Completed" checked={training.roleTraining} onClick={() => toggle("roleTraining")} />
                        <Task label="System Walkthrough Done" checked={training.systemWalkthrough} onClick={() => toggle("systemWalkthrough")} />
                        <Task label="Compliance Quiz Passed" checked={training.complianceQuiz} onClick={() => toggle("complianceQuiz")} />
                    </div>
                    {/* TRAINING NOTES */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Training Notes</h5>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Add trainer notes, feedback, or issues..."
                            value={progressNotes}
                            onChange={(e) => setProgressNotes(e.target.value)}
                        />
                    </div>
                    {/* ACTION */}
                    <button
                        className={`btn w-100 btn-${allCompleted ? 'success' : 'secondary'}`}
                        disabled={!allCompleted}
                        onClick={handleComplete}
                    >
                        Complete Training → Move to First Day
                    </button>
                </div>
                {/* RIGHT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-4 p-3' : ''} bg-light border-top border-lg-start`}>
                    <div className="border bg-white rounded p-3 mb-3">
                        <h6>Status</h6>
                        <div className="d-flex align-items-center gap-2">
                            {allCompleted ? (
                                <CheckCircle className="text-success" />
                            ) : (
                                <AlertCircle className="text-warning" />
                            )}
                            <span>
                                {allCompleted ? 'Training Complete' : 'Pending Training'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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