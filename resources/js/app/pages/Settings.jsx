import React, { useState } from 'react';
import {
    FiSettings,
    FiHome,
    FiFileText,
    FiUser,
    FiLock,
    FiSave,
    FiUpload,
} from 'react-icons/fi';

/* =========================================================
   SCHOOL PROFILE
========================================================= */

const SchoolProfileSettings = () => {
    const [school, setSchool] = useState({
        name: '',
        address: '',
        contact: '',
        email: '',
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchool((current) => ({ ...current, [name]: value }));
    };

    const handleLogoChange = (e) => {
        setSchool((current) => ({
            ...current,
            logo: e.target.files?.[0] || null,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Connect to your school settings API.
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h5 className="fw-bold mb-1">School Profile</h5>
                <p className="text-secondary mb-0">
                    Manage your institution's contact information and branding.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-12">
                    <label className="form-label fw-semibold">School name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={school.name}
                        onChange={handleChange}
                        placeholder="Enter school name"
                        required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <textarea
                        name="address"
                        className="form-control"
                        rows="2"
                        value={school.address}
                        onChange={handleChange}
                        placeholder="Enter school address"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Contact number</label>
                    <input
                        type="tel"
                        name="contact"
                        className="form-control"
                        value={school.contact}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">School email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={school.email}
                        onChange={handleChange}
                        placeholder="Enter school email"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label fw-semibold">School logo</label>
                    <div className="border rounded-3 p-3">
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center p-3">
                                <FiHome className="fs-3 text-secondary" />
                            </div>

                            <div className="flex-grow-1">
                                <div className="fw-semibold">Upload school logo</div>
                                <small className="text-secondary">
                                    Choose an image file for your school's branding.
                                </small>
                            </div>

                            <label className="btn btn-outline-primary mb-0">
                                <FiUpload className="me-2" />
                                Browse
                                <input
                                    type="file"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                />
                            </label>
                        </div>

                        {school.logo && (
                            <div className="small text-secondary mt-2">
                                Selected: {school.logo.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end border-top mt-4 pt-3">
                <button type="submit" className="btn btn-primary px-4">
                    <FiSave className="me-2" />
                    Save changes
                </button>
            </div>
        </form>
    );
};

/* =========================================================
   GRADING & REPORT CARDS
========================================================= */

const GradingSettings = () => {
    const [grading, setGrading] = useState({
        passingMark: '50',
        maximumMark: '100',
        showPercentage: true,
        showGrade: true,
        showTeacherComments: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setGrading((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Connect to your grading settings API.
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h5 className="fw-bold mb-1">Grading & Report Cards</h5>
                <p className="text-secondary mb-0">
                    Configure basic grading rules and report card display options.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Passing mark (%)</label>
                    <input
                        type="number"
                        name="passingMark"
                        className="form-control"
                        min="0"
                        max={grading.maximumMark}
                        value={grading.passingMark}
                        onChange={handleChange}
                        required
                    />
                    <small className="text-secondary">
                        The minimum mark considered a pass.
                    </small>
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Maximum mark</label>
                    <input
                        type="number"
                        name="maximumMark"
                        className="form-control"
                        min="1"
                        value={grading.maximumMark}
                        onChange={handleChange}
                        required
                    />
                    <small className="text-secondary">
                        The highest mark available for an assessment.
                    </small>
                </div>
            </div>

            <div className="border rounded-3 mt-4">
                <div className="p-3 border-bottom">
                    <h6 className="fw-bold mb-1">Report card display</h6>
                    <small className="text-secondary">
                        Choose which grading details appear on report cards.
                    </small>
                </div>

                <div className="p-3 d-flex flex-column gap-3">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="showPercentage"
                            name="showPercentage"
                            checked={grading.showPercentage}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showPercentage">
                            Display percentage
                        </label>
                    </div>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="showGrade"
                            name="showGrade"
                            checked={grading.showGrade}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showGrade">
                            Display grade
                        </label>
                    </div>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="showTeacherComments"
                            name="showTeacherComments"
                            checked={grading.showTeacherComments}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showTeacherComments">
                            Display teacher comments
                        </label>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end border-top mt-4 pt-3">
                <button type="submit" className="btn btn-primary px-4">
                    <FiSave className="me-2" />
                    Save changes
                </button>
            </div>
        </form>
    );
};

/* =========================================================
   MY ACCOUNT
========================================================= */

const AccountSettings = () => {
    const [account, setAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
    });

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount((current) => ({ ...current, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((current) => ({ ...current, [name]: value }));
    };

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        // Connect to your authenticated-user profile API.
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {
            alert('The new passwords do not match.');
            return;
        }

        // Connect to your password-change API.
    };

    return (
        <>
            <form onSubmit={handleAccountSubmit}>
                <div className="mb-4">
                    <h5 className="fw-bold mb-1">My Account</h5>
                    <p className="text-secondary mb-0">
                        Update your personal information.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={account.firstName}
                            onChange={handleAccountChange}
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={account.lastName}
                            onChange={handleAccountChange}
                            autoComplete="family-name"
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={account.email}
                            onChange={handleAccountChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Gender</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={account.gender}
                            onChange={handleAccountChange}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Contact number</label>
                        <input
                            type="tel"
                            name="contact"
                            className="form-control"
                            value={account.contact}
                            onChange={handleAccountChange}
                            autoComplete="tel"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Date of birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="form-control"
                            value={account.dob}
                            onChange={handleAccountChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end border-top mt-4 pt-3">
                    <button type="submit" className="btn btn-primary px-4">
                        <FiSave className="me-2" />
                        Save profile
                    </button>
                </div>
            </form>

            <hr className="my-5" />

            <form onSubmit={handlePasswordSubmit}>
                <div className="d-flex align-items-center gap-2 mb-1">
                    <FiLock className="text-primary fs-5" />
                    <h5 className="fw-bold mb-0">Change password</h5>
                </div>

                <p className="text-secondary mb-4">
                    Update your password to keep your account secure.
                </p>

                <div className="row g-4">
                    <div className="col-12">
                        <label className="form-label fw-semibold">Current password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="form-control"
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">New password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                            minLength="8"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Confirm new password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                            minLength="8"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                        <FiLock className="me-2" />
                        Update password
                    </button>
                </div>
            </form>
        </>
    );
};

/* =========================================================
   SETTINGS PAGE
========================================================= */

export const Settings = () => {
    const [activeSection, setActiveSection] = useState('school');

    const sections = [
        {
            id: 'school',
            label: 'School Profile',
            description: 'School details and branding',
            icon: <FiHome />,
            component: <SchoolProfileSettings />,
        },
        {
            id: 'grading',
            label: 'Grading & Report Cards',
            description: 'Grading rules and report display',
            icon: <FiFileText />,
            component: <GradingSettings />,
        },
        {
            id: 'account',
            label: 'My Account',
            description: 'Personal details and password',
            icon: <FiUser />,
            component: <AccountSettings />,
        },
    ];

    const selectedSection = sections.find(
        (section) => section.id === activeSection
    );

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-1">
                    <FiSettings className="fs-4 text-primary" />
                    <h2 className="h3 fw-bold mb-0">Settings</h2>
                </div>
                <p className="text-secondary mb-0">
                    Manage your school's configuration and account preferences.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-4 col-xl-3">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-3">
                            <h6 className="text-uppercase small fw-bold text-secondary px-2 py-2">
                                Settings
                            </h6>

                            <div className="d-flex flex-column gap-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => setActiveSection(section.id)}
                                        className={`btn text-start d-flex align-items-start gap-3 p-3 rounded-3 ${
                                            activeSection === section.id
                                                ? 'btn-primary'
                                                : 'btn-light text-dark'
                                        }`}
                                    >
                                        <span className="fs-5 mt-1">{section.icon}</span>

                                        <span>
                                            <span className="d-block fw-semibold">
                                                {section.label}
                                            </span>
                                            <small className={
                                                activeSection === section.id
                                                    ? 'text-white-50'
                                                    : 'text-secondary'
                                            }>
                                                {section.description}
                                            </small>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-8 col-xl-9">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">
                            {selectedSection.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};