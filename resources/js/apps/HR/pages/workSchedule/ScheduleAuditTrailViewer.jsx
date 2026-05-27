import React, { useMemo, useState } from "react";
import {
    FaHistory,
    FaSearch,
    FaFilter,
    FaUser,
    FaCalendarAlt,
    FaExchangeAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaInfoCircle,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const ScheduleAuditTrailViewer = () => {

    /* ---------------------------------------------------------------- */
    /* AUDIT DATA                                                      */
    /* ---------------------------------------------------------------- */

    const [logs] = useState([
        {
            id: "LOG-001",
            action: "Shift Updated",
            user: "Admin",
            role: "Manager",
            timestamp: "2026-05-11 09:12 AM",
            module: "Schedule Generator",
            before: "4 staff assigned",
            after: "6 staff assigned",
            reason: "Coverage improvement",
            status: "Approved",
        },
        {
            id: "LOG-002",
            action: "Rule Modified",
            user: "System",
            role: "Auto Engine",
            timestamp: "2026-05-11 10:00 AM",
            module: "Rule Builder",
            before: "Max 5 days/week",
            after: "Max 6 days/week",
            reason: "Optimization update",
            status: "System Change",
        },
        {
            id: "LOG-003",
            action: "Schedule Rejected",
            user: "Supervisor",
            role: "Approver",
            timestamp: "2026-05-10 04:45 PM",
            module: "Approval Workflow",
            before: "Pending approval",
            after: "Rejected",
            reason: "Conflict detected",
            status: "Rejected",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                           */
    /* ---------------------------------------------------------------- */

    const [selectedLog, setSelectedLog] = useState(null);

    const [search, setSearch] = useState("");

    /* ---------------------------------------------------------------- */
    /* FILTERED LOGS                                                   */
    /* ---------------------------------------------------------------- */

    const filtered = useMemo(() => {
        return logs.filter((l) =>
            l.action.toLowerCase().includes(search.toLowerCase()) ||
            l.user.toLowerCase().includes(search.toLowerCase()) ||
            l.module.toLowerCase().includes(search.toLowerCase())
        );
    }, [logs, search]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                        */
    /* ---------------------------------------------------------------- */

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "success";
            case "Rejected":
                return "danger";
            case "System Change":
                return "primary";
            default:
                return "secondary";
        }
    };

    /* ---------------------------------------------------------------- */
    /* UI                                                            */
    /* ---------------------------------------------------------------- */

    return (
        <motion.div
            className="container-fluid p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >

            {/* HEADER */}
            <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <h4 className="mb-1 d-flex align-items-center gap-2">
                        <FaHistory className="text-primary" />
                        Schedule Audit Trail
                    </h4>
                    <small className="text-muted">
                        Full system history of all schedule changes, approvals, and rule modifications
                    </small>
                </div>
            </div>

            <div className="row g-3">
                {/* LEFT LIST */}
                <div className="col-12 col-xl-5">
                    {/* SEARCH */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="position-relative">
                            <FaSearch className="position-absolute text-muted" style={{ top: 12, left: 12 }} />
                            <input
                                className="form-control ps-5"
                                placeholder="Search logs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* LOG LIST */}
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaFilter />
                            <strong>Audit Logs</strong>
                        </div>
                        {filtered.map((log) => (
                            <div
                                onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                                className="border-bottom pointer p-3"
                                key={log.id}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="fw-semibold">{log.action}</div>
                                        <div className="small text-muted">
                                            <FaUser className="me-1" />
                                            {log.user} • {log.module}
                                        </div>
                                        <div className="small text-muted">
                                            <FaCalendarAlt className="me-1" />
                                            {log.timestamp}
                                        </div>
                                    </div>
                                    <span className={`badge bg-${getStatusColor(log.status)}`}>{log.status}</span>
                                </div>

                                {selectedLog?.id === log.id ? (
                                    <FaChevronUp className="mt-2 text-muted" />
                                ) : (
                                    <FaChevronDown className="mt-2 text-muted" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT DETAIL PANEL */}
                <div className="col-12 col-xl-7">
                    <div className="bg-white border rounded shadow-sm p-3">
                        {!selectedLog ? (
                            <div className="text-muted small">
                                <FaInfoCircle className="me-2" />
                                Select a log entry to view full details
                            </div>
                        ) : (
                            <>
                                <h5 className="mb-3">{selectedLog.action}</h5>
                                <div className="mb-2 small text-muted">
                                    Module: {selectedLog.module}
                                </div>
                                <div className="mb-2 small text-muted">
                                    User: {selectedLog.user} ({selectedLog.role})
                                </div>
                                <div className="mb-3 small text-muted">
                                    Time: {selectedLog.timestamp}
                                </div>

                                {/* BEFORE / AFTER */}
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="border rounded p-3 bg-danger bg-opacity-10 border-danger">
                                            <div className="fw-semibold text-danger mb-1">Before</div>
                                            <div className="small">{selectedLog.before}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                            <div className="fw-semibold text-success mb-1">After</div>
                                            <div className="small">{selectedLog.after}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* REASON */}
                                <div className="border rounded p-3 mb-3">
                                    <div className="fw-semibold mb-1">Reason</div>
                                    <div className="small">{selectedLog.reason}</div>
                                </div>

                                {/* STATUS */}
                                <div>
                                    <span className={`badge bg-${getStatusColor(selectedLog.status)}`}>
                                        {selectedLog.status}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};