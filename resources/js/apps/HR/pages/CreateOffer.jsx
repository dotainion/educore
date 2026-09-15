import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiPaperclip } from "react-icons/fi";

export const CreateOffer = () => {

    const [form, setForm] = useState({
        candidate: "",
        jobTitle: "",
        department: "",
        employmentType: "Full-time",
        startDate: "",
        salary: "",
        bonus: "",
        equity: "",
        currency: "USD",
        probation: 3,
        manager: "",
        notes: "",
        sendEmail: true,
        attachments: [],
        status: "draft",
    });

    const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    // -------------------------
    // FILE UPLOAD (mock)
    // -------------------------
    const addFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        update("attachments", [...form.attachments, file.name]);
    };

    const removeFile = (i) => {
        update(
            "attachments",
            form.attachments.filter((_, idx) => idx !== i)
        );
    };

    // -------------------------
    // SUBMIT
    // -------------------------
    const submit = (status) => {
        console.log({ ...form, status });
    };

    const fade = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="container-fluid">

            {/* HEADER */}
            <motion.div initial="hidden" animate="show" variants={fade}>
                <h4>Create Offer</h4>
                <small className="text-muted">
                    Prepare and send offer to candidate
                </small>
            </motion.div>

            <div className="row g-3 mt-2">

                {/* LEFT */}
                <div className="col-md-6">

                    {/* CANDIDATE */}
                    <motion.div className="card p-3" variants={fade}>
                        <h6>Candidate & Job</h6>

                        <input
                            className="form-control mb-2"
                            placeholder="Candidate Name"
                            value={form.candidate}
                            onChange={(e) => update("candidate", e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Job Title"
                            value={form.jobTitle}
                            onChange={(e) => update("jobTitle", e.target.value)}
                        />

                        <input
                            className="form-control"
                            placeholder="Department"
                            value={form.department}
                            onChange={(e) => update("department", e.target.value)}
                        />
                    </motion.div>

                    {/* COMPENSATION */}
                    <motion.div className="card p-3 mt-3" variants={fade}>
                        <h6>Compensation</h6>

                        <div className="d-flex gap-2 mb-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Salary"
                                value={form.salary}
                                onChange={(e) => update("salary", e.target.value)}
                            />

                            <select
                                className="form-select"
                                value={form.currency}
                                onChange={(e) => update("currency", e.target.value)}
                            >
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </div>

                        <input
                            className="form-control mb-2"
                            placeholder="Bonus"
                            value={form.bonus}
                            onChange={(e) => update("bonus", e.target.value)}
                        />

                        <input
                            className="form-control"
                            placeholder="Equity (optional)"
                            value={form.equity}
                            onChange={(e) => update("equity", e.target.value)}
                        />
                    </motion.div>

                    {/* DETAILS */}
                    <motion.div className="card p-3 mt-3">
                        <h6>Employment Details</h6>

                        <select
                            className="form-select mb-2"
                            value={form.employmentType}
                            onChange={(e) =>
                                update("employmentType", e.target.value)
                            }
                        >
                            <option>Full-time</option>
                            <option>Contract</option>
                            <option>Part-time</option>
                        </select>

                        <input
                            type="date"
                            className="form-control mb-2"
                            value={form.startDate}
                            onChange={(e) => update("startDate", e.target.value)}
                        />

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Probation (months)"
                            value={form.probation}
                            onChange={(e) => update("probation", e.target.value)}
                        />
                    </motion.div>
                </div>

                {/* RIGHT */}
                <div className="col-md-6">

                    {/* MANAGER */}
                    <motion.div className="card p-3">
                        <h6>Manager & Approval</h6>

                        <input
                            className="form-control mb-2"
                            placeholder="Hiring Manager"
                            value={form.manager}
                            onChange={(e) => update("manager", e.target.value)}
                        />

                        <textarea
                            className="form-control"
                            placeholder="Internal Notes"
                            value={form.notes}
                            onChange={(e) => update("notes", e.target.value)}
                        />
                    </motion.div>

                    {/* ATTACHMENTS */}
                    <motion.div className="card p-3 mt-3">
                        <h6>Attachments</h6>

                        <input type="file" onChange={addFile} />

                        <div className="mt-2">
                            {form.attachments.map((f, i) => (
                                <div key={i} className="small d-flex justify-content-between">
                                    <span><FiPaperclip /> {f}</span>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeFile(i)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SEND */}
                    <motion.div className="card p-3 mt-3">
                        <h6>Send Options</h6>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                checked={form.sendEmail}
                                onChange={(e) =>
                                    update("sendEmail", e.target.checked)
                                }
                            />
                            <label className="ms-2 small">
                                Send email notification
                            </label>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="d-flex justify-content-end gap-2 mt-3">

                <motion.button
                    className="btn btn-outline-dark btn-sm"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => submit("draft")}
                >
                    Save Draft
                </motion.button>

                <motion.button
                    className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => submit("sent")}
                >
                    <FiSend /> Send Offer
                </motion.button>

            </div>
        </div>
    );
};