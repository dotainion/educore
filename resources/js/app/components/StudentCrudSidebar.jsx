import { useState } from "react"

export const StudentCrudSidebar = () =>{
    const [data, setData] = useState({});
    const [documents, setDocuments] = useState({});

    const enrolmentDocuments = [
        { id: 'birthCertificate', label: 'Birth certificate' },
        { id: 'passportPhoto', label: 'Passport-size photograph' },
        { id: 'reportCard', label: 'Previous school report' },
        { id: 'transferLetter', label: 'Transfer letter (if applicable)' },
        { id: 'medicalRecord', label: 'Medical record' },
    ];

    return(
        <div className="col-12 col-xl-4 d-none d-lg-block">
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white p-3">
                    <h6 className="fw-bold mb-0">
                        <i className="bi bi-clipboard-check me-2 text-primary"></i>
                        Enrolment Overview
                    </h6>
                </div>
                <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <span className="text-secondary small">Enrolment Type</span>
                        <span className="fw-semibold small">{data.enrolmentType}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <span className="text-secondary small">Applying For</span>
                        <span className="fw-semibold small">{data.classId || 'Not selected'}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <span className="text-secondary small">Documents Received</span>
                        <span className="fw-semibold small">
                            {Object.values(documents).filter(Boolean).length} / {enrolmentDocuments.length}
                        </span>
                    </div>
                    <div className="progress mt-2" style={{ height: '6px' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                                width: `${(Object.values(documents).filter(Boolean).length / enrolmentDocuments.length) * 100}%`,
                            }}
                            aria-valuenow={Object.values(documents).filter(Boolean).length}
                            aria-valuemin="0"
                            aria-valuemax={enrolmentDocuments.length}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                    <h6 className="fw-bold mb-3">
                        <i className="bi bi-lightbulb me-2 text-warning"></i>
                        Helpful Reminders
                    </h6>
                    <div className="d-flex gap-2 mb-3">
                        <i className="bi bi-check-circle text-success mt-1"></i>
                        <span className="small text-secondary">Ensure the student's name matches the birth certificate.</span>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                        <i className="bi bi-check-circle text-success mt-1"></i>
                        <span className="small text-secondary">Confirm the parent or guardian's contact details.</span>
                    </div>
                    <div className="d-flex gap-2">
                        <i className="bi bi-check-circle text-success mt-1"></i>
                        <span className="small text-secondary">Verify the class placement before final submission.</span>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-3">
                    <div className="d-flex gap-3">
                        <i className="bi bi-shield-lock fs-4 text-primary"></i>
                        <div>
                            <h6 className="fw-bold mb-1">Student Privacy</h6>
                            <p className="small text-secondary mb-0">
                                Student and family details should only be accessible to
                                authorised school staff.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}