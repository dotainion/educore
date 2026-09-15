import React, { useState } from "react";
import { FiUserPlus, FiUpload } from "react-icons/fi";

export const CreateApplicant = () =>{
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        jobId: '',
        position: '',
        experience: '',
        skills: '',
        address: '',
        source: 'manual',
        notes: '',
        cv: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setForm({ ...form, cv: e.target.files[0] });
    };

    const handleSubmit = () => {
        const payload = new FormData();

        Object.keys(form).forEach((key) => {
            payload.append(key, form[key]);
        });

        // SYSTEM CONTROLLED FIELDS
        payload.append("status", "applied");
        payload.append("shortlisted", false);

        console.log("CREATE APPLICANT:", payload);
        // API CALL HERE
    };

    return (
        <div className="container py-4">
            {/* HEADER */}
            <div className="mb-4 d-flex align-items-center gap-2">
                <FiUserPlus className="fs-1" />
                <div>
                    <h4 className="mb-0">Create Applicant</h4>
                    <small className="text-muted">
                        Add candidate into HR pipeline (status: Applied)
                    </small>
                </div>
            </div>

            {/* MAIN CARD */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-12">
                            <h6 className="text-muted">Personal Information</h6>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input name="firstName" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input name="lastName" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input name="email" type="email" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Contact</label>
                            <input name="contact" className="form-control" onChange={handleChange} />
                        </div>
                        {/* JOB INFO */}
                        <div className="col-12 mt-3">
                            <h6 className="text-muted">Job Details</h6>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Job ID</label>
                            <input name="jobId" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Position</label>
                            <input name="position" className="form-control" onChange={handleChange} />
                        </div>
                        {/* PROFESSIONAL INFO */}
                        <div className="col-12 mt-3">
                            <h6 className="text-muted">Professional Profile</h6>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Experience (years)</label>
                            <input name="experience" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Skills</label>
                            <input
                                name="skills"
                                className="form-control"
                                placeholder="ICU, Emergency, Surgery"
                                onChange={handleChange}
                            />
                        </div>
                        {/* SOURCE */}
                        <div className="col-md-6">
                            <label className="form-label">Source</label>
                            <select name="source" className="form-select" onChange={handleChange}>
                                <option value="manual">Manual</option>
                                <option value="referral">Referral</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="agency">Agency</option>
                                <option value="website">Website</option>
                            </select>
                        </div>
                        {/* ADDRESS */}
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input name="address" className="form-control" onChange={handleChange} />
                        </div>
                        {/* DOCUMENTS */}
                        <div className="col-12 mt-3">
                            <h6 className="text-muted">Documents</h6>
                        </div>
                        <div className="col-12">
                            <label className="form-label d-flex align-items-center gap-2">
                                <FiUpload />
                                Upload CV / Resume *
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFile}
                            />
                            <small className="text-muted">
                                This will be used for screening and interview review
                            </small>
                        </div>
                        {/* NOTES */}
                        <div className="col-12 mt-3">
                            <label className="form-label">Internal Notes</label>
                            <textarea
                                name="notes"
                                className="form-control"
                                rows="3"
                                onChange={handleChange}
                                placeholder="Recruiter notes, impressions, flags..."
                            />
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button className="btn btn-outline-secondary">
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Create Applicant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}