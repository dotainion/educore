import React, { useMemo } from "react";
import { CheckCircle, User, Mail, Phone, Briefcase, ArrowRight } from "lucide-react";

export const Completed = ({ employee, fullscreen }) => {
    const timeline = [
        { label: 'Activation', done: true },
        { label: 'HR Setup', done: true },
        { label: 'IT Setup', done: true },
        { label: 'Training', done: true },
        { label: 'Documents', done: true },
        { label: 'First Day', done: true },
    ];

    const allDone = useMemo(() => {
        return timeline.every((t) => t.done);
    }, []);

    const handleFinalize = () => {
        alert("Employee fully activated and moved to HR system");
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <h4 className="mb-0">Completed</h4>
                    <small className="text-muted">Employee onboarding successfully finished</small>
                </div>
                <span className="badge bg-success">Fully Activated</span>
            </div>

            <div className="row">
                {/* LEFT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-8' : ''} p-3`}>
                    {/* EMPLOYEE SUMMARY */}
                    <div className="border rounded p-3 mb-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <User size={18} /> Employee Profile
                        </h5>
                        {employee ? (
                            <div className="row small">
                                <div className="col-6 mb-2"><strong>ID:</strong> {employee.id}</div>
                                <div className="col-6 mb-2"><strong>Name:</strong> {employee.attributes.firstName} {employee.attributes.lastName}</div>
                                <div className="col-6 mb-2 d-flex align-items-center gap-1">
                                    <Mail size={14} /> {employee.attributes.email}
                                </div>
                                <div className="col-6 mb-2 d-flex align-items-center gap-1">
                                    <Phone size={14} /> {employee.attributes.contact}
                                </div>
                                <div className="col-6 mb-2"><strong>Position:</strong> {employee.attributes.position}</div>
                                <div className="col-6 mb-2"><strong>Department:</strong> {employee.attributes.department}</div>
                                <div className="col-6 mb-2"><strong>Status:</strong> {employee.attributes.status}</div>
                                <div className="col-6 mb-2"><strong>Start Date:</strong> {employee.attributes.startDate}</div>
                            </div>
                        ):(
                            <div>No employee</div>
                        )}
                    </div>

                    {/* COMPLETION CONFIRMATION */}
                    <div className="border rounded p-3 mb-3">
                        <h5 className="mb-3">Onboarding Completion</h5>
                        {timeline.map((item) => (
                            <div
                                className="d-flex align-items-center gap-2 mb-2"
                                key={item.label}
                            >
                                {item.done ? (
                                    <CheckCircle className="text-success" size={16} />
                                ) : (
                                    <span className="text-muted">○</span>
                                )}
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ACTION */}
                    <button
                        onClick={handleFinalize}
                        className="btn btn-success w-100"
                    >
                        Finalize Employee Record
                    </button>
                </div>
                {/* RIGHT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-4' : ''} p-3 bg-light border-top border-lg-start`}>
                    {/* STATUS */}
                    <div className="border bg-white rounded p-3 mb-3">
                        <h6>Status</h6>
                        <div className="d-flex align-items-center gap-2">
                            <CheckCircle className="text-success" />
                            <span>Employee Active in System</span>
                        </div>
                    </div>
                    {/* SUMMARY */}
                    <div className="border bg-white rounded p-3 mb-3">
                        <h6>Summary</h6>
                        <small className="text-muted">
                            All onboarding stages completed successfully.
                            Employee is now fully active and ready for operations.
                        </small>
                    </div>
                    {/* NEXT ACTION */}
                    <div className="border bg-white rounded p-3">
                        <h6>Next Steps</h6>
                        <button className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 mt-2">
                            Go to Employee Dashboard
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};