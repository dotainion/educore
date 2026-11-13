import React, { useEffect, useState } from 'react';
import { api } from '../service/Api';

const initialForm = {
    name: '',
    level: '',
    room: '',
    capacity: 30,
    status: 'Active',
    description: '',
};

export const AddClass = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [teachers, setTeachers] = useState([]);

    const updateField = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));

        setSuccessMessage('');
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Class name is required.';
        }

        if (!form.level) {
            newErrors.level = 'Please select a form level.';
        }

        if (!form.capacity || Number(form.capacity) < 1) {
            newErrors.capacity = 'Capacity must be at least 1.';
        }

        if (!Number.isInteger(Number(form.capacity))) {
            newErrors.capacity = 'Capacity must be a whole number.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newClass = {
            ...form,
            id: Date.now(),
            capacity: Number(form.capacity),
            teacher: form.teacher || 'Unassigned',
            room: form.room.trim() || 'Not assigned',
            students: 0,
        };

        // Replace this with your API request when the backend is ready.
        console.log('New class:', newClass);

        setSuccessMessage(
            `${form.name} has been validated successfully. Connect the API to save it permanently.`
        );
    };

    const handleReset = () => {
        setForm(initialForm);
        setErrors({});
        setSuccessMessage('');
    };

    useEffect(()=>{
        api.get('/users/list').then((response)=>{
            setTeachers(response.data.users);
        }).catch((error)=>{

        });
    }, []);

    return (
        <div className="container-fluid py-4">
            {/* Page Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                        <i className="bi bi-grid"></i>
                        <span>Classes</span>
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-primary">Create Class</span>
                    </div>

                    <h2 className="fw-bold mb-1">Create Class</h2>
                    <p className="text-muted mb-0">
                        Set up a new class and assign its teacher and classroom.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="row g-4">
                    {/* Main Form */}
                    <div className="col-12 col-xl-8">
                        {/* Class Information */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 px-4 pt-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-primary-subtle text-primary p-3">
                                        <i className="bi bi-people fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            Class Information
                                        </h5>
                                        <p className="text-muted small mb-0">
                                            Enter the basic details for this class.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="className"
                                            className="form-label fw-semibold"
                                        >
                                            Class Name <span className="text-danger">*</span>
                                        </label>

                                        <input
                                            id="className"
                                            type="text"
                                            name="name"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="e.g. Form 1A"
                                            value={form.name}
                                            onChange={updateField}
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="level"
                                            className="form-label fw-semibold"
                                        >
                                            Form / Level <span className="text-danger">*</span>
                                        </label>

                                        <select
                                            id="level"
                                            name="level"
                                            className={`form-select ${errors.level ? 'is-invalid' : ''}`}
                                            value={form.level}
                                            onChange={updateField}
                                        >
                                            <option value="">Select form</option>
                                            <option value="Kindergarten">Kindergarten</option>
                                            <option value="Primary 1">Primary 1</option>
                                            <option value="Primary 2">Primary 2</option>
                                            <option value="Primary 3">Primary 3</option>
                                            <option value="Primary 4">Primary 4</option>
                                            <option value="Primary 5">Primary 5</option>
                                            <option value="Primary 6">Primary 6</option>
                                            <option value="Form 1">Form 1</option>
                                            <option value="Form 2">Form 2</option>
                                            <option value="Form 3">Form 3</option>
                                            <option value="Form 4">Form 4</option>
                                            <option value="Form 5">Form 5</option>
                                        </select>

                                        {errors.level && (
                                            <div className="invalid-feedback">
                                                {errors.level}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="status"
                                            className="form-label fw-semibold"
                                        >
                                            Class Status
                                        </label>

                                        <select
                                            id="status"
                                            name="status"
                                            className="form-select"
                                            value={form.status}
                                            onChange={updateField}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label
                                            htmlFor="description"
                                            className="form-label fw-semibold"
                                        >
                                            Description <span className="text-muted fw-normal">(Optional)</span>
                                        </label>

                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Add any notes or details about this class..."
                                            value={form.description}
                                            onChange={updateField}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assignment Details */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 px-4 pt-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3 bg-success-subtle text-success p-3">
                                        <i className="bi bi-person-workspace fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            Class Assignment
                                        </h5>
                                        <p className="text-muted small mb-0">
                                            Assign a teacher and classroom.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="teacher"
                                            className="form-label fw-semibold"
                                        >
                                            Class Teacher
                                        </label>

                                        <select
                                            id="teacher"
                                            name="teacher"
                                            className="form-select"
                                            value={form.teacher}
                                            onChange={updateField}
                                        >
                                            <option value="" hidden>
                                                Select a teacher
                                            </option>
                                            {teachers.map((teacher) => (
                                                <option value={teacher.id} key={teacher.id}>
                                                    {teacher.attributes.fullName}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="form-text">
                                            You can leave this unassigned for now.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="room"
                                            className="form-label fw-semibold"
                                        >
                                            Classroom / Room
                                        </label>

                                        <input
                                            id="room"
                                            type="text"
                                            name="room"
                                            className="form-control"
                                            placeholder="e.g. Room 101"
                                            value={form.room}
                                            onChange={updateField}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="capacity"
                                            className="form-label fw-semibold"
                                        >
                                            Student Capacity <span className="text-danger">*</span>
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-people"></i>
                                            </span>

                                            <input
                                                id="capacity"
                                                type="number"
                                                name="capacity"
                                                min="1"
                                                step="1"
                                                className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                                                value={form.capacity}
                                                onChange={updateField}
                                            />

                                            {errors.capacity && (
                                                <div className="invalid-feedback">
                                                    {errors.capacity}
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-text">
                                            Maximum number of students allowed in this class.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        {successMessage && (
                            <div
                                className="alert alert-success d-flex align-items-start gap-2"
                                role="alert"
                            >
                                <i className="bi bi-check-circle-fill mt-1"></i>
                                <div>{successMessage}</div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mb-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={handleReset}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2"></i>
                                Reset Form
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >
                                <i className="bi bi-check2-circle me-2"></i>
                                Validate Class
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-12 col-xl-4">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <i className="bi bi-info-circle text-primary fs-5"></i>
                                    <h6 className="fw-bold mb-0">
                                        Before You Begin
                                    </h6>
                                </div>

                                <ul className="text-muted small ps-3 mb-0">
                                    <li className="mb-2">
                                        Give each class a clear, unique name for its academic year.
                                    </li>
                                    <li className="mb-2">
                                        Choose the correct form or grade level.
                                    </li>
                                    <li className="mb-2">
                                        Set a realistic student capacity.
                                    </li>
                                    <li>
                                        A teacher and classroom can be assigned later.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-circle bg-primary-subtle text-primary p-3">
                                        <i className="bi bi-mortarboard fs-4"></i>
                                    </div>

                                    <div>
                                        <h6 className="fw-bold mb-1">
                                            Class Setup
                                        </h6>
                                        <small className="text-muted">
                                            Quick overview
                                        </small>
                                    </div>
                                </div>

                                <div className="border-top pt-3">
                                    <div className="d-flex justify-content-between gap-3 mb-3">
                                        <span className="text-muted small">
                                            Class name
                                        </span>
                                        <span className="fw-semibold text-end">
                                            {form.name || 'Not entered'}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between gap-3 mb-3">
                                        <span className="text-muted small">
                                            Form level
                                        </span>
                                        <span className="fw-semibold text-end">
                                            {form.level || 'Not selected'}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between gap-3">
                                        <span className="text-muted small">
                                            Capacity
                                        </span>
                                        <span className="fw-semibold text-end">
                                            {form.capacity || 0} students
                                        </span>
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
