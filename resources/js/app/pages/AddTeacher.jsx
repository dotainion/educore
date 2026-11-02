import React, { useState } from 'react';

export const AddTeacher = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        teacherId: '',
        employmentType: 'Full-time',
        hireDate: '',
        qualification: '',
        specialization: '',
        subjects: [],
        classes: [],
        status: 'Active',
        notes: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // Mock data: replace with backend data later.
    const availableSubjects = [
        'Mathematics',
        'English Language',
        'English Literature',
        'Biology',
        'Chemistry',
        'Physics',
        'Integrated Science',
        'Information Technology',
        'Social Studies',
        'History',
        'Geography',
        'Physical Education',
        'Visual Arts',
        'Music',
        'French',
        'Spanish',
        'Agricultural Science',
        'Business Studies',
        'Accounting',
        'Economics',
    ];

    const availableClasses = [
        'Form 1A',
        'Form 1B',
        'Form 2A',
        'Form 2B',
        'Form 3A',
        'Form 3B',
        'Form 4A',
        'Form 4B',
        'Form 5A',
        'Form 5B',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));

        setSuccess(false);
    };

    const handleMultiSelect = (e) => {
        const { name, value, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: checked
                ? [...previous[name], value]
                : previous[name].filter((item) => item !== value),
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));

        setSuccess(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        }

        if (!formData.teacherId.trim()) {
            newErrors.teacherId = 'Teacher ID is required.';
        }

        if (!formData.hireDate) {
            newErrors.hireDate = 'Hire date is required.';
        }

        if (formData.subjects.length === 0) {
            newErrors.subjects = 'Select at least one subject.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSuccess(false);
            return;
        }

        // Mock submission. Connect your Laravel API here later.
        console.log('Teacher data:', formData);

        setSuccess(true);
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            teacherId: '',
            employmentType: 'Full-time',
            hireDate: '',
            qualification: '',
            specialization: '',
            subjects: [],
            classes: [],
            status: 'Active',
            notes: '',
        });

        setErrors({});
        setSuccess(false);
    };

    const inputClass = (field) =>
        `form-control${errors[field] ? ' is-invalid' : ''}`;

    const selectClass = (field) =>
        `form-select${errors[field] ? ' is-invalid' : ''}`;

    return (
        <div className="container-fluid py-4">
            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => window.history.back()}
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back
                        </button>
                    </div>

                    <h3 className="fw-bold mb-1">Add Teacher</h3>
                    <p className="text-body-secondary mb-0">
                        Register a teacher and configure their teaching assignments.
                    </p>
                </div>

                <span className="badge text-bg-primary rounded-pill px-3 py-2">
                    <i className="bi bi-person-plus me-2"></i>
                    New Teacher
                </span>
            </div>

            {success && (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Validation successful!</strong> Teacher information
                    is ready for submission. This demo has not saved the teacher
                    to a database.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccess(false)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Personal Information */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-body py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary-subtle text-primary rounded-3 p-2">
                                <i className="bi bi-person-vcard fs-5"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Personal Information
                                </h5>
                                <small className="text-body-secondary">
                                    Basic details about the teacher.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    First Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputClass('firstName')}
                                    placeholder="Enter first name"
                                    autoComplete="given-name"
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">
                                        {errors.firstName}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputClass('lastName')}
                                    placeholder="Enter last name"
                                    autoComplete="family-name"
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">
                                        {errors.lastName}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email Address <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClass('email')}
                                    placeholder="teacher@school.edu"
                                    autoComplete="email"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputClass('phone')}
                                    placeholder="e.g. 473-555-0123"
                                    autoComplete="tel"
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">
                                        {errors.phone}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="dateOfBirth" className="form-label">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">
                                    Residential Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="2"
                                    placeholder="Enter residential address"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employment Information */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-body py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-success-subtle text-success rounded-3 p-2">
                                <i className="bi bi-briefcase fs-5"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Employment Information
                                </h5>
                                <small className="text-body-secondary">
                                    Staff identification and employment details.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="teacherId" className="form-label">
                                    Teacher ID <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="teacherId"
                                    name="teacherId"
                                    value={formData.teacherId}
                                    onChange={handleChange}
                                    className={inputClass('teacherId')}
                                    placeholder="e.g. TCH-0006"
                                />
                                {errors.teacherId && (
                                    <div className="invalid-feedback">
                                        {errors.teacherId}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="employmentType"
                                    className="form-label"
                                >
                                    Employment Type
                                </label>
                                <select
                                    id="employmentType"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Substitute">Substitute</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="hireDate" className="form-label">
                                    Hire Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="hireDate"
                                    name="hireDate"
                                    value={formData.hireDate}
                                    onChange={handleChange}
                                    className={inputClass('hireDate')}
                                />
                                {errors.hireDate && (
                                    <div className="invalid-feedback">
                                        {errors.hireDate}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="status" className="form-label">
                                    Employment Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="qualification"
                                    className="form-label"
                                >
                                    Highest Qualification
                                </label>
                                <input
                                    id="qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g. Bachelor's Degree in Education"
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="specialization"
                                    className="form-label"
                                >
                                    Area of Specialization
                                </label>
                                <input
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g. Mathematics Education"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teaching Assignments */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-body py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-info-subtle text-info rounded-3 p-2">
                                <i className="bi bi-journal-bookmark fs-5"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Teaching Assignments
                                </h5>
                                <small className="text-body-secondary">
                                    Select the subjects and classes assigned to this teacher.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        <div className="mb-4">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                                <label className="form-label fw-semibold mb-0">
                                    Subjects Taught <span className="text-danger">*</span>
                                </label>
                                <span className="badge text-bg-primary">
                                    {formData.subjects.length} selected
                                </span>
                            </div>

                            <div
                                className={`border rounded-3 p-3 ${
                                    errors.subjects ? 'border-danger' : ''
                                }`}
                            >
                                <div className="row g-2">
                                    {availableSubjects.map((subject) => (
                                        <div
                                            className="col-12 col-sm-6 col-lg-4"
                                            key={subject}
                                        >
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`subject-${subject}`}
                                                    name="subjects"
                                                    value={subject}
                                                    checked={formData.subjects.includes(subject)}
                                                    onChange={handleMultiSelect}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`subject-${subject}`}
                                                >
                                                    {subject}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {errors.subjects && (
                                <div className="text-danger small mt-2">
                                    {errors.subjects}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                                <label className="form-label fw-semibold mb-0">
                                    Assigned Classes
                                </label>
                                <span className="badge text-bg-primary">
                                    {formData.classes.length} selected
                                </span>
                            </div>

                            <div className="border rounded-3 p-3">
                                <div className="row g-2">
                                    {availableClasses.map((schoolClass) => (
                                        <div
                                            className="col-6 col-sm-4 col-lg-3"
                                            key={schoolClass}
                                        >
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`class-${schoolClass}`}
                                                    name="classes"
                                                    value={schoolClass}
                                                    checked={formData.classes.includes(schoolClass)}
                                                    onChange={handleMultiSelect}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`class-${schoolClass}`}
                                                >
                                                    {schoolClass}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-text">
                                Class options are examples. In the real application,
                                load the school's configured classes from the database.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-body py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-warning-subtle text-warning rounded-3 p-2">
                                <i className="bi bi-chat-left-text fs-5"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Additional Information
                                </h5>
                                <small className="text-body-secondary">
                                    Optional notes for school administration.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        <label htmlFor="notes" className="form-label">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                            placeholder="Enter any additional information..."
                        ></textarea>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex flex-column flex-sm-row justify-content-between gap-2 p-3 p-md-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleReset}
                        >
                            <i className="bi bi-arrow-counterclockwise me-2"></i>
                            Reset Form
                        </button>

                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <button
                                type="button"
                                className="btn btn-light border"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-primary px-4">
                                <i className="bi bi-person-plus me-2"></i>
                                Save Teacher
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
