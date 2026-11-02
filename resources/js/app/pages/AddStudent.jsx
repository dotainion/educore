import React, { useState } from 'react';

const initialForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    nationality: 'Grenadian',
    religion: '',
    addressId: '',
    phone: '',
    email: '',
    enrolmentDate: new Date().toISOString().split('T')[0],
    enrolmentType: 'New Student',
    classId: '',
    previousSchool: '',
    previousClass: '',
    parentName: '',
    parentRelationship: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    doctorName: '',
    doctorPhone: '',
    notes: '',
};

const enrolmentDocuments = [
    { id: 'birthCertificate', label: 'Birth certificate' },
    { id: 'passportPhoto', label: 'Passport-size photograph' },
    { id: 'reportCard', label: 'Previous school report' },
    { id: 'transferLetter', label: 'Transfer letter (if applicable)' },
    { id: 'medicalRecord', label: 'Medical record' },
];

const classOptions = [
    'Infant 1',
    'Infant 2',
    'Standard 1',
    'Standard 2',
    'Standard 3',
    'Standard 4',
    'Standard 5',
    'Standard 6',
    'Form 1',
    'Form 2',
    'Form 3',
    'Form 4',
    'Form 5',
];

export const AddStudent = () => {
    const [form, setForm] = useState(initialForm);
    const [documents, setDocuments] = useState({});
    const [activeSection, setActiveSection] = useState(0);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [emergencyContacts, setEmergencyContacts] = useState([0]);

    const sections = [
        { title: 'Student Information', icon: 'bi-person-vcard' },
        { title: 'Parent / Guardian', icon: 'bi-people' },
        { title: 'Medical Information', icon: 'bi-heart-pulse' },
        { title: 'Documents & Review', icon: 'bi-file-earmark-check' },
    ];

    const updateField = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateSection = (section) => {
        const nextErrors = {};

        if (section === 0) {
            if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.';
            if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.';
            if (!form.dob) nextErrors.dob = 'Date of birth is required.';
            if (!form.gender) nextErrors.gender = 'Please select a gender.';
            if (!form.addressId.trim()) nextErrors.addressId = 'Residential address is required.';
            if (!form.classId) nextErrors.classId = 'Please select a class.';
        }

        if (section === 1) {
            if (!form.parentName.trim()) nextErrors.parentName = 'Parent or guardian name is required.';
            if (!form.parentRelationship) nextErrors.parentRelationship = 'Please select a relationship.';
            if (!form.parentPhone.trim()) nextErrors.parentPhone = 'Contact number is required.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const goNext = () => {
        if (validateSection(activeSection)) {
            setActiveSection((prev) => Math.min(prev + 1, sections.length - 1));
        }
    };

    const goBack = () => {
        setErrors({});
        setActiveSection((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateSection(0) || !validateSection(1)) {
            setActiveSection(!form.firstName || !form.lastName || !form.dob ||
                !form.gender || !form.addressId || !form.classId);
            return;
        }

        const enrolmentRecord = {
            ...form,
            documents,
            status: 'Pending Review',
            submittedAt: new Date().toISOString(),
        };

        console.log('Student enrolment record:', enrolmentRecord);
        setSubmitted(true);
    };

    const FieldError = ({ name }) =>
        errors[name] ? (
            <div className="invalid-feedback d-block">{errors[name]}</div>
        ) : null;

    const InputField = ({
        label,
        name,
        type = 'text',
        required = false,
        placeholder = '',
        disabled = false,
    }) => (
        <div className="col-md-6">
            <label htmlFor={name} className="form-label fw-semibold">
                {label} {required && <span className="text-danger">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={updateField}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                required={required}
            />
            <FieldError name={name} />
        </div>
    );

    const SelectField = ({ label, name, options, required = false }) => (
        <div className="col-md-6">
            <label htmlFor={name} className="form-label fw-semibold">
                {label} {required && <span className="text-danger">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={form[name]}
                onChange={updateField}
                className={`form-select ${errors[name] ? 'is-invalid' : ''}`}
                required={required}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value ?? option} value={option.value ?? option}>
                        {option.label ?? option}
                    </option>
                ))}
            </select>
            <FieldError name={name} />
        </div>
    );

    const SectionHeading = ({ title, description }) => (
        <div className="mb-4">
            <h5 className="fw-bold mb-1">{title}</h5>
            <p className="text-secondary mb-0">{description}</p>
        </div>
    );

    const ReviewItem = ({ label, value }) => (
        <div className="col-sm-6 mb-3">
            <div className="small text-secondary mb-1">{label}</div>
            <div className="fw-semibold text-break">{value || 'Not provided'}</div>
        </div>
    );

    if (submitted) {
        return (
            <div className="container-fluid py-4 py-lg-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card border-0 shadow-sm text-center p-4 p-md-5">
                            <div
                                className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{ width: '76px', height: '76px' }}
                            >
                                <i className="bi bi-check-circle-fill fs-1"></i>
                            </div>
                            <h3 className="fw-bold">Enrolment Submitted</h3>
                            <p className="text-secondary">
                                The enrolment record for {form.firstName} {form.lastName} has
                                been prepared successfully and is awaiting review.
                            </p>
                            <div className="bg-light rounded-3 p-3 text-start my-3">
                                <div className="d-flex justify-content-between gap-3 mb-2">
                                    <span className="text-secondary">Student</span>
                                    <span className="fw-semibold text-end">
                                        {form.firstName} {form.lastName}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between gap-3">
                                    <span className="text-secondary">Status</span>
                                    <span className="badge text-bg-warning">Pending Review</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => window.print()}
                                >
                                    <i className="bi bi-printer me-2"></i>Print Summary
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setForm(initialForm);
                                        setDocuments({});
                                        setErrors({});
                                        setActiveSection(0);
                                        setSubmitted(false);
                                    }}
                                >
                                    <i className="bi bi-plus-lg me-2"></i>New Enrolment
                                </button>
                            </div>
                            <small className="text-secondary mt-3">
                                Demo only: connect the submit handler to your Laravel API to
                                save this record permanently.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4 px-3 px-lg-4">
            {/* Page Header */}
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 text-primary small fw-semibold mb-2">
                        <i className="bi bi-mortarboard-fill"></i>
                        STUDENT MANAGEMENT
                    </div>
                    <h2 className="fw-bold mb-1">Student Enrolment</h2>
                    <p className="text-secondary mb-0">
                        Register a new student and collect their enrolment information.
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3 p-lg-4">
                    <div className="row g-3">
                        {sections.map((section, index) => (
                            <div className="col-6 col-xl-3" key={section.title}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (index < activeSection) {
                                            setErrors({});
                                            setActiveSection(index);
                                        }
                                    }}
                                    className={`btn w-100 text-start h-100 border rounded-3 p-3 ${
                                        activeSection === index
                                            ? 'border-primary bg-primary-subtle'
                                            : index < activeSection
                                            ? 'border-success bg-success-subtle'
                                            : 'bg-white'
                                    }`}
                                >
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span
                                            className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                                                index < activeSection
                                                    ? 'bg-success text-white'
                                                    : activeSection === index
                                                    ? 'bg-primary text-white'
                                                    : 'bg-light text-secondary'
                                            }`}
                                            style={{ width: '32px', height: '32px' }}
                                        >
                                            {index < activeSection ? (
                                                <i className="bi bi-check-lg"></i>
                                            ) : (
                                                <i className={`bi ${section.icon}`}></i>
                                            )}
                                        </span>
                                        <span className="small fw-bold">STEP {index + 1}</span>
                                    </div>
                                    <div className="fw-semibold small">{section.title}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    {/* Main Form */}
                    <div className="col-12 col-xl-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-bottom p-3 p-lg-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                                        <i className={`bi ${sections[activeSection].icon} fs-4`}></i>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">{sections[activeSection].title}</h5>
                                        <p className="text-secondary small mb-0">
                                            Step {activeSection + 1} of {sections.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-3 p-lg-4">
                                {activeSection === 0 && (
                                    <>
                                        <SectionHeading
                                            title="Personal Details"
                                            description="Enter the student's basic information."
                                        />
                                        <div className="row g-3">
                                            <InputField label="First Name" name="firstName" required placeholder="Enter first name" />
                                            <InputField label="Middle Name" name="middleName" placeholder="Enter middle name" />
                                            <InputField label="Last Name" name="lastName" required placeholder="Enter last name" />
                                            <InputField label="Date of Birth" name="dob" type="date" required />
                                            <SelectField
                                                label="Gender"
                                                name="gender"
                                                required
                                                options={[
                                                    { label: 'Male', value: 'Male' },
                                                    { label: 'Female', value: 'Female' },
                                                    { label: 'Prefer not to say', value: 'Prefer not to say' },
                                                ]}
                                            />
                                            <InputField label="Nationality" name="nationality" />
                                            <InputField label="Religion" name="religion" placeholder="Optional" />
                                            <InputField label="Student Phone" name="phone" type="tel" placeholder="Optional" />
                                            <InputField label="Student Email" name="email" type="email" placeholder="Optional" />
                                            <InputField label="Enrolment Date" name="enrolmentDate" type="date" />
                                            <SelectField
                                                label="Enrolment Type"
                                                name="enrolmentType"
                                                options={['New Student', 'Transfer Student', 'Returning Student']}
                                            />
                                            <SelectField
                                                label="Applying for Class"
                                                name="classId"
                                                required
                                                options={classOptions}
                                            />
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label fw-semibold">
                                                    Residential Address <span className="text-danger">*</span>
                                                </label>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    rows="2"
                                                    value={form.addressId}
                                                    onChange={updateField}
                                                    className={`form-control ${errors.addressId ? 'is-invalid' : ''}`}
                                                    placeholder="House, street, community, parish"
                                                    required
                                                ></textarea>
                                                <FieldError name="address" />
                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <SectionHeading
                                            title="Previous School"
                                            description="Complete these details if the student attended another school."
                                        />
                                        <div className="row g-3">
                                            <InputField label="Previous School" name="previousSchool" placeholder="School name" />
                                            <InputField label="Last Class Attended" name="previousClass" placeholder="e.g. Standard 5" />
                                        </div>
                                    </>
                                )}

                                {activeSection === 1 && (
                                    <>
                                        <SectionHeading
                                            title="Parent / Guardian Details"
                                            description="Provide the main contact responsible for the student."
                                        />
                                        <div className="row g-3">
                                            <InputField label="Full Name" name="parentName" required placeholder="Parent or guardian's name" />
                                            <SelectField
                                                label="Relationship to Student"
                                                name="parentRelationship"
                                                required
                                                options={['Mother', 'Father', 'Guardian', 'Grandparent', 'Other']}
                                            />
                                            <InputField label="Phone Number" name="parentPhone" type="tel" required placeholder="e.g. +1 473 ..." />
                                            <InputField label="Email Address" name="parentEmail" type="email" placeholder="name@example.com" />
                                            <InputField label="Occupation" name="parentOccupation" placeholder="Optional" />
                                        </div>

                                        <hr className="my-4" />
                                        <SectionHeading
                                            title="Emergency Contact"
                                            description="Who should the school contact if the parent or guardian cannot be reached?"
                                        />
                                        {emergencyContacts.map((e, key)=>(
                                            <div className="row g-3" key={`emg-${key}`}>
                                                <InputField label="Contact Name" name="emergencyName" placeholder="Full name" />
                                                <InputField label="Phone Number" name="emergencyPhone" type="tel" placeholder="Contact number" />
                                                <InputField label="Relationship" name="emergencyRelationship" placeholder="e.g. Aunt, Uncle" />
                                            </div>
                                        ))}
                                        
                                    </>
                                )}

                                {activeSection === 2 && (
                                    <>
                                        <SectionHeading
                                            title="Medical Information"
                                            description="These details help the school respond appropriately to the student's needs."
                                        />
                                        <div className="alert alert-info border-0 d-flex gap-2">
                                            <i className="bi bi-info-circle-fill mt-1"></i>
                                            <div className="small">
                                                Provide relevant information and follow your school's
                                                policy for securely storing sensitive student records.
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <SelectField
                                                label="Blood Group"
                                                name="bloodGroup"
                                                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']}
                                            />
                                            <InputField label="Known Allergies" name="allergies" placeholder="Enter allergies, or None" />
                                            <div className="col-12">
                                                <label htmlFor="medicalConditions" className="form-label fw-semibold">
                                                    Medical Conditions / Special Requirements
                                                </label>
                                                <textarea
                                                    id="medicalConditions"
                                                    name="medicalConditions"
                                                    rows="3"
                                                    value={form.medicalConditions}
                                                    onChange={updateField}
                                                    className="form-control"
                                                    placeholder="Relevant conditions, medication needs, or learning accommodations"
                                                ></textarea>
                                            </div>
                                            <InputField label="Doctor / Clinic Name" name="doctorName" placeholder="Optional" />
                                            <InputField label="Doctor / Clinic Phone" name="doctorPhone" type="tel" placeholder="Optional" />
                                            <div className="col-12">
                                                <label htmlFor="notes" className="form-label fw-semibold">
                                                    Additional Notes
                                                </label>
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    rows="3"
                                                    value={form.notes}
                                                    onChange={updateField}
                                                    className="form-control"
                                                    placeholder="Any other information the school should know"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeSection === 3 && (
                                    <>
                                        <SectionHeading
                                            title="Required Documents"
                                            description="Mark the documents received by the school. Upload handling can be connected later."
                                        />
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
                                                        checked={!!documents[document.id]}
                                                        onChange={(e) =>
                                                            setDocuments((prev) => ({
                                                                ...prev,
                                                                [document.id]: e.target.checked,
                                                            }))
                                                        }
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
                                                        {[form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ') || 'Student Name'}
                                                    </h5>
                                                    <div className="text-secondary small">
                                                        {form.enrolmentType} · {form.classId || 'Class not selected'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <ReviewItem label="Date of Birth" value={form.dob} />
                                                <ReviewItem label="Gender" value={form.gender} />
                                                <ReviewItem label="Enrolment Date" value={form.enrolmentDate} />
                                                <ReviewItem label="Residential Address" value={form.addressId} />
                                                <ReviewItem label="Previous School" value={form.previousSchool} />
                                            </div>
                                            <hr />
                                            <h6 className="fw-bold mb-3">Parent / Guardian</h6>
                                            <div className="row">
                                                <ReviewItem label="Name" value={form.parentName} />
                                                <ReviewItem label="Relationship" value={form.parentRelationship} />
                                                <ReviewItem label="Phone" value={form.parentPhone} />
                                                <ReviewItem label="Email" value={form.parentEmail} />
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
                                )}
                            </div>

                            {/* Form Footer */}
                            <div className="card-footer bg-white border-top p-3 p-lg-4">
                                <div className="d-flex justify-content-between align-items-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={goBack}
                                        disabled={activeSection === 0}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back
                                    </button>

                                    {activeSection < sections.length - 1 ? (
                                        <button type="button" className="btn btn-primary px-4" onClick={goNext}>
                                            Continue
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-success px-4">
                                            <i className="bi bi-check2-circle me-2"></i>
                                            Submit Enrolment
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-12 col-xl-4">
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
                                    <span className="fw-semibold small">{form.enrolmentType}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-secondary small">Applying For</span>
                                    <span className="fw-semibold small">{form.classId || 'Not selected'}</span>
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
                </div>
            </form>
        </div>
    );
}
