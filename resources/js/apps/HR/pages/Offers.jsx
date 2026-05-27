import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiSend, FiEye, FiXCircle } from "react-icons/fi";

export const Offers = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    // -------------------------
    // MOCK DATA (REALISTIC)
    // -------------------------
    const offers = [
        {
            id: 1,
            candidate: "John Doe",
            job: "Frontend Developer",
            salary: 90000,
            status: "Sent",
            sentAt: "2026-04-10",
            startDate: "2026-05-01",
        },
        {
            id: 2,
            candidate: "Sarah Lee",
            job: "UI Designer",
            salary: 70000,
            status: "Accepted",
            sentAt: "2026-04-01",
            startDate: "2026-04-20",
        },
        {
            id: 3,
            candidate: "Michael Brown",
            job: "Backend Developer",
            salary: 95000,
            status: "Draft",
            sentAt: null,
            startDate: null,
        },
        {
            id: 4,
            candidate: "Emma Wilson",
            job: "HR Manager",
            salary: 80000,
            status: "Rejected",
            sentAt: "2026-03-20",
            startDate: null,
        },
    ];

    // -------------------------
    // FILTER
    // -------------------------
    const filtered = offers.filter((o) => {
        const matchSearch =
            o.candidate.toLowerCase().includes(search.toLowerCase()) ||
            o.job.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            status === "All" || o.status === status;

        return matchSearch && matchStatus;
    });

    // -------------------------
    // STATS
    // -------------------------
    const stats = {
        total: offers.length,
        sent: offers.filter((o) => o.status === "Sent").length,
        accepted: offers.filter((o) => o.status === "Accepted").length,
        rejected: offers.filter((o) => o.status === "Rejected").length,
    };

    const badge = (s) => {
        switch (s) {
            case "Sent":
                return "bg-primary";
            case "Accepted":
                return "bg-success";
            case "Rejected":
                return "bg-danger";
            case "Draft":
                return "bg-secondary";
            default:
                return "bg-light text-dark";
        }
    };

    const fade = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="container">

            {/* HEADER */}
            <motion.div initial="hidden" animate="show" variants={fade}>
                <h4 className="fw-semibold mb-1">Offers</h4>
                <div className="text-muted small">
                    Manage all candidate offers
                </div>
            </motion.div>

            {/* STATS */}
            <div className="row mt-3 g-2">
                {[
                    { label: "Total", value: stats.total },
                    { label: "Sent", value: stats.sent },
                    { label: "Accepted", value: stats.accepted },
                    { label: "Rejected", value: stats.rejected },
                ].map((s, i) => (
                    <div className="col-6 col-md-3" key={i}>
                        <motion.div
                            className="card p-2 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className="fw-semibold">{s.value}</div>
                            <small className="text-muted">{s.label}</small>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* FILTER BAR */}
            <div className="d-flex flex-column flex-md-row gap-2 mt-3">
                <div className="input-group">
                    <span className="input-group-text">
                        <FiSearch />
                    </span>
                    <input
                        className="form-control"
                        placeholder="Search candidate or job..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>All</option>
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                </select>
            </div>

            {/* DESKTOP TABLE */}
            <div className="table-responsive mt-3 d-none d-md-block">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Job</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((o, i) => (
                            <motion.tr
                                key={o.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <td>{o.candidate}</td>
                                <td>{o.job}</td>
                                <td>${o.salary}</td>
                                <td>
                                    <span className={`badge ${badge(o.status)}`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td>{o.startDate || "-"}</td>
                                <td className="text-end">

                                    <button className="btn btn-sm btn-light me-1">
                                        <FiEye />
                                    </button>

                                    {o.status === "Sent" && (
                                        <button className="btn btn-sm btn-light me-1">
                                            <FiSend />
                                        </button>
                                    )}

                                    <button className="btn btn-sm btn-light text-danger">
                                        <FiXCircle />
                                    </button>

                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mt-3 d-md-none">
                <AnimatePresence>
                    {filtered.map((o, i) => (
                        <motion.div
                            key={o.id}
                            className="card p-3 mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="mb-1">{o.candidate}</h6>
                                    <small className="text-muted">
                                        {o.job}
                                    </small>
                                </div>

                                <span className={`badge ${badge(o.status)}`}>
                                    {o.status}
                                </span>
                            </div>

                            <div className="small mt-2">
                                Salary: ${o.salary}
                            </div>

                            <div className="small text-muted">
                                Start: {o.startDate || "-"}
                            </div>

                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-sm btn-outline-dark w-100">
                                    View
                                </button>
                                <button className="btn btn-sm btn-outline-danger w-100">
                                    Withdraw
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

        </div>
    );
};