import { useState } from "react";

export const StudentReview = () =>{
    const [data, setForm] = useState({});

    const enrolmentDocuments = [
        { id: 'birthCertificate', label: 'Birth certificate' },
        { id: 'passportPhoto', label: 'Passport-size photograph' },
        { id: 'reportCard', label: 'Previous school report' },
        { id: 'transferLetter', label: 'Transfer letter (if applicable)' },
        { id: 'medicalRecord', label: 'Medical record' },
    ];

    return(
        <>
            <div className="mb-4">
                <h5 className="fw-bold mb-1">Required Documents</h5>
                <p className="text-secondary mb-0">Mark the documents received by the school. Upload handling can be connected later.</p>
            </div>
            <div className="list-group mb-4">
                {enrolmentDocuments.map((document) => (
                    <label
                        key={document.id}
                        className="list-group-item d-flex align-items-center justify-content-between gap-3 py-3"
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '42px', height: '42px' }}>
                                <i className="bi bi-file-earmark-text fs-5 text-secondary"></i>
                            </div>
                            <div>
                                <div className="fw-semibold">{document.label}</div>
                                <small className="text-secondary">Document received</small>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="form-check-input flex-shrink-0"
                            //checked={!!documents[document.id]}
                            onChange={(e) => null}
                            aria-label={`${document.label} received`}
                        />
                    </label>
                ))}
            </div>

            <div className="alert alert-warning border-0 small">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Check that names, dates, contact details, and class placement
                are correct before submitting.
            </div>

            <h6 className="fw-bold mb-3">Enrolment Summary</h6>
            <div className="border rounded-3 p-3 p-lg-4 mb-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                        <i className="bi bi-person-fill fs-3"></i>
                    </div>
                    <div>
                        <h5 className="fw-bold mb-1">
                            {[data.fullName].filter(Boolean).join(' ') || 'Student Name'}
                        </h5>
                        <div className="text-secondary small">
                            {data.enrolmentType} · {data.classId || 'Class not selected'}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ReviewItem label="Date of Birth" value={data.dob} />
                    <ReviewItem label="Gender" value={data.gender} />
                    <ReviewItem label="Enrolment Date" value={data.enrolmentDate} />
                    <ReviewItem label="Residential Address" value={data.addressId} />
                    <ReviewItem label="Previous School" value={data.previousSchool} />
                </div>
                <hr />
                <h6 className="fw-bold mb-3">Parent / Guardian</h6>
                <div className="row">
                    <ReviewItem label="Name" value={data.parentName} />
                    <ReviewItem label="Relationship" value={data.parentRelationship} />
                    <ReviewItem label="Phone" value={data.parentPhone} />
                    <ReviewItem label="Email" value={data.parentEmail} />
                </div>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="confirmDetails"
                    required
                />
                <label className="form-check-label small" htmlFor="confirmDetails">
                    I confirm that the information entered is accurate to the
                    best of my knowledge.
                </label>
            </div>
        </>
    )
}

const ReviewItem = ({ label, value }) => (
    <div className="col-sm-6 mb-3">
        <div className="small text-secondary mb-1">{label}</div>
        <div className="fw-semibold text-break">{value || 'Not provided'}</div>
    </div>
);
