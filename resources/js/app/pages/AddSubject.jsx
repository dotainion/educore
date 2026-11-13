import React, { useState } from 'react';
import { Switch } from '../widgets/Switch';
import { Link } from 'react-router-dom';
import { routes } from '../routes/Routes';

export const AddSubject = () => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        category: 'Core',
        department: '',
        teacher: '',
        classes: [],
        status: 'Active',
        description: '',
    });

    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);

    const teachers = [
        { id: 1, name: 'Mr. James Williams' },
        { id: 2, name: 'Mrs. Sarah Thomas' },
        { id: 3, name: 'Ms. Alicia Roberts' },
        { id: 4, name: 'Mr. David Charles' },
    ];

    const classes = [
        { id: 1, name: 'Form 1A' },
        { id: 2, name: 'Form 1B' },
        { id: 3, name: 'Form 2A' },
        { id: 4, name: 'Form 2B' },
        { id: 5, name: 'Form 3A' },
        { id: 6, name: 'Form 4A' },
        { id: 7, name: 'Form 5A' },
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

        setSaved(false);
    };

    const handleClassChange = (classId) => {
        setFormData((previous) => ({
            ...previous,
            classes: previous.classes.includes(classId)
                ? previous.classes.filter((id) => id !== classId)
                : [...previous.classes, classId],
        }));

        setSaved(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.code.trim()) {
            newErrors.code = 'Subject code is required.';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Subject name is required.';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Mock submission. Connect this to your backend API later.
        console.log('Subject to save:', formData);
        setSaved(true);
    };

    const handleReset = () => {
        setFormData({
            code: '',
            name: '',
            category: 'Core',
            department: '',
            teacher: '',
            classes: [],
            status: 'Active',
            description: '',
        });

        setErrors({});
        setSaved(false);
    };

    return (
        <div className="container-fluid py-4">
            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <Link
                            to={routes.subjects}
                            className="text-decoration-none text-secondary"
                        >
                            Subjects
                        </Link>
                        <i className="bi bi-chevron-right small text-secondary"></i>
                        <span className="text-secondary small">Add Subject</span>
                    </div>

                    <h2 className="fw-bold mb-1">Add New Subject</h2>
                    <p className="text-secondary mb-0">
                        Create a subject and assign it to teachers and classes.
                    </p>
                </div>

                <Link
                    to={routes.subjects}
                    className="btn btn-outline-secondary"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Subjects
                </Link>
            </div>

            {saved && (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Subject details have been validated. Connect the submit
                    handler to your backend to save the subject permanently.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSaved(false)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="row g-4">
                    {/* Main Form */}
                    <div className="col-12 col-xl-8">
                        {/* Basic Information */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                                        <i className="bi bi-book fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            Subject Information
                                        </h5>
                                        <p className="text-secondary small mb-0">
                                            Enter the subject's basic details.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <div className="row g-3">
                                    <div className="col-12 col-md-4">
                                        <label
                                            htmlFor="code"
                                            className="form-label fw-semibold"
                                        >
                                            Subject Code <span className="text-danger">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            id="code"
                                            name="code"
                                            className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                            placeholder="e.g. MAT101"
                                            value={formData.code}
                                            onChange={handleChange}
                                        />

                                        {errors.code && (
                                            <div className="invalid-feedback">
                                                {errors.code}
                                            </div>
                                        )}

                                        <div className="form-text">
                                            A unique code for this subject.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-8">
                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold"
                                        >
                                            Subject Name <span className="text-danger">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="e.g. Mathematics"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="category"
                                            className="form-label fw-semibold"
                                        >
                                            Subject Category <span className="text-danger">*</span>
                                        </label>

                                        <select
                                            id="category"
                                            name="category"
                                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="Core">Core Subject</option>
                                            <option value="Elective">Elective Subject</option>
                                            <option value="Practical">Practical Subject</option>
                                        </select>

                                        {errors.category && (
                                            <div className="invalid-feedback">
                                                {errors.category}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label
                                            htmlFor="description"
                                            className="form-label fw-semibold"
                                        >
                                            Description
                                        </label>

                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            rows="4"
                                            placeholder="Describe the subject, its learning objectives, or any relevant notes..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>

                                        <div className="form-text">
                                            Optional information about the subject.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teacher Assignment */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-success bg-opacity-10 text-success p-3">
                                        <i className="bi bi-person-workspace fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            Teacher Assignment
                                        </h5>
                                        <p className="text-secondary small mb-0">
                                            Assign a teacher responsible for this subject.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <label
                                    htmlFor="teacher"
                                    className="form-label fw-semibold"
                                >
                                    Assigned Teacher
                                </label>

                                <select
                                    id="teacher"
                                    name="teacher"
                                    className="form-select"
                                    value={formData.teacher}
                                    onChange={handleChange}
                                >
                                    <option value="">No teacher assigned</option>

                                    {teachers.map((teacher) => (
                                        <option
                                            key={teacher.id}
                                            value={teacher.id}
                                        >
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="form-text">
                                    You can assign a teacher now or do so later.
                                </div>
                            </div>
                        </div>

                        {/* Class Assignment */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white py-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-info bg-opacity-10 text-info p-3">
                                        <i className="bi bi-people fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            Class Assignment
                                        </h5>
                                        <p className="text-secondary small mb-0">
                                            Select the classes that will study this subject.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                    <label className="form-label fw-semibold mb-0">
                                        Available Classes
                                    </label>

                                    <span className="badge text-bg-primary">
                                        {formData.classes.length} selected
                                    </span>
                                </div>

                                <div className="row g-3">
                                    {classes.map((schoolClass) => (
                                        <div
                                            className="col-6 col-md-4"
                                            key={schoolClass.id}
                                        >
                                            <label
                                                className={`border rounded-3 p-3 d-flex align-items-center gap-2 h-100 ${formData.classes.includes(schoolClass.id) ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-0"
                                                    checked={formData.classes.includes(schoolClass.id)}
                                                    onChange={() =>
                                                        handleClassChange(schoolClass.id)
                                                    }
                                                />

                                                <span className="fw-medium">
                                                    {schoolClass.name}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-text mt-3">
                                    Select all classes where this subject is offered.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-12 col-xl-4">
                        {/* Status */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3">
                                <h5 className="fw-bold mb-0">
                                    <i className="bi bi-sliders me-2 text-primary"></i>
                                    Subject Settings
                                </h5>
                            </div>

                            <div className="card-body p-4">
                                <label
                                    htmlFor="status"
                                    className="form-label fw-semibold"
                                >
                                    Subject Status
                                </label>
                                <Switch
                                    className="mb-3"
                                    value={formData.status === 'active'}
                                    onChange={handleChange}
                                />

                                <div className="alert alert-light border mb-0">
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-info-circle text-primary fs-5"></i>
                                        <div>
                                            <div className="fw-semibold mb-1">
                                                Subject status
                                            </div>
                                            <small className="text-secondary">
                                                Active subjects can be assigned to classes
                                                and used in academic records.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Create Subject
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100 mb-3"
                                    onClick={handleReset}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                                    Reset Form
                                </button>

                                <a
                                    href="/subjects"
                                    className="btn btn-light w-100"
                                >
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
