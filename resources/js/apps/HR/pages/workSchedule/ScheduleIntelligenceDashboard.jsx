import React, { useMemo, useState } from "react";
import {
    FaChartLine,
    FaExclamationTriangle,
    FaCheckCircle,
    FaUsers,
    FaCalendarAlt,
    FaFire,
    FaShieldAlt,
    FaSearch,
    FaFilter,
    FaLayerGroup,
    FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const ScheduleIntelligenceDashboard = () => {
    /* ---------------------------------------------------------------- */
    /* MOCK SCHEDULE DATA (from generator/calendar output)             */
    /* ---------------------------------------------------------------- */

    const [scheduleData] = useState([
        {
            date: "2026-05-11",
            requiredStaff: 6,
            assignedStaff: 5,
            department: "Operations",
        },
        {
            date: "2026-05-12",
            requiredStaff: 4,
            assignedStaff: 4,
            department: "Support",
        },
        {
            date: "2026-05-13",
            requiredStaff: 7,
            assignedStaff: 3,
            department: "Engineering",
        },
        {
            date: "2026-05-14",
            requiredStaff: 5,
            assignedStaff: 5,
            department: "Operations",
        },
        {
            date: "2026-05-15",
            requiredStaff: 8,
            assignedStaff: 6,
            department: "Support",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                           */
    /* ---------------------------------------------------------------- */

    const [selectedDay, setSelectedDay] = useState(scheduleData[0]);

    const [filter, setFilter] = useState("all");

    /* ---------------------------------------------------------------- */
    /* ANALYTICS ENGINE                                                */
    /* ---------------------------------------------------------------- */

    const analysis = useMemo(() => {
        return scheduleData.map((d) => {
            const gap = d.requiredStaff - d.assignedStaff;

            return {
                ...d,

                gap,

                status:
                    gap === 0
                        ? "healthy"
                        : gap > 0
                        ? "understaffed"
                        : "overstaffed",

                riskScore:
                    gap > 0
                        ? gap * 20
                        : 0,
            };
        });
    }, [scheduleData]);

    /* ---------------------------------------------------------------- */
    /* GLOBAL STATS                                                   */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        const understaffed =
            analysis.filter(
                (x) =>
                    x.status ===
                    "understaffed"
            ).length;

        const overstaffed =
            analysis.filter(
                (x) =>
                    x.status ===
                    "overstaffed"
            ).length;

        const healthy =
            analysis.filter(
                (x) =>
                    x.status ===
                    "healthy"
            ).length;

        const totalRisk =
            analysis.reduce(
                (acc, x) =>
                    acc +
                    x.riskScore,
                0
            );

        return {
            understaffed,
            overstaffed,
            healthy,
            totalRisk,
        };
    }, [analysis]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                         */
    /* ---------------------------------------------------------------- */

    const getColor = (status) => {
        switch (status) {
            case "healthy":
                return "success";

            case "understaffed":
                return "danger";

            case "overstaffed":
                return "warning";

            default:
                return "secondary";
        }
    };

    /* ---------------------------------------------------------------- */
    /* UI                                                              */
    /* ---------------------------------------------------------------- */

    return (
        <motion.div
            className="container-fluid p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >

            {/* HEADER */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                    <div>
                        <h4 className="mb-1 d-flex align-items-center gap-2">
                            <FaChartLine className="text-primary" />
                            Schedule Intelligence Dashboard
                        </h4>
                        <small className="text-muted">
                            Risk detection, staffing analysis, and schedule validation layer
                        </small>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-danger">Under: {stats.understaffed}</span>
                        <span className="badge bg-warning text-dark">Over: {stats.overstaffed}</span>
                        <span className="badge bg-success">Healthy: {stats.healthy}</span>
                        <span className="badge bg-dark">Risk Score: {stats.totalRisk}</span>
                    </div>
                </div>
            </div>

            <div className="row g-3">

                {/* LEFT LIST */}
                <div className="col-12 col-xl-4">
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="position-relative">
                            <FaSearch className="position-absolute text-muted" style={{ top: 12, left: 12 }} />
                            <input
                                className="form-control ps-5"
                                placeholder="Search schedule risks..."
                            />
                        </div>
                    </div>
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaLayerGroup />
                            <strong>Daily Risk Overview</strong>
                        </div>
                        {analysis.map((day) => (
                            <div
                                onClick={() => setSelectedDay(day)}
                                className={`pointer p-3 border-bottom ${
                                    selectedDay.date === day.date ? 'bg-primary bg-opacity-10' : ''
                                }`}
                                key={day.date}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="fw-semibold">{day.date}</div>
                                        <div className="small text-muted">{day.department}</div>
                                    </div>
                                    <span className={`badge bg-${getColor(day.status)}`}>{day.status}</span>
                                </div>
                                <div className="small mt-1 text-muted">Gap: {day.gap}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-12 col-xl-8">

                    {/* SUMMARY */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <FaShieldAlt />
                            Risk Summary
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="border rounded p-3 bg-danger bg-opacity-10 border-danger">
                                    <FaExclamationTriangle className="text-danger mb-2" />
                                    <div className="fw-semibold">Understaffed Risk</div>
                                    <div className="small">{stats.understaffed} days affected</div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded p-3 bg-warning bg-opacity-10 border-warning">
                                    <FaFire className="text-warning mb-2" />
                                    <div className="fw-semibold">Overload Risk</div>
                                    <div className="small">{stats.overstaffed} days affected</div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <FaCheckCircle className="text-success mb-2" />
                                    <div className="fw-semibold">Healthy Coverage</div>
                                    <div className="small">{stats.healthy} days stable</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SELECTED DAY DETAILS */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <FaCalendarAlt />
                            Day Breakdown
                        </h5>
                        <div className="mb-2 fw-semibold">{selectedDay.date}</div>
                        <div className="mb-2 small text-muted">Department: {selectedDay.department}</div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="border rounded p-3">
                                    <div className="small text-muted">Required Staff</div>
                                    <div className="fs-4 fw-bold">{selectedDay.requiredStaff}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="border rounded p-3">
                                    <div className="small text-muted">Assigned Staff</div>
                                    <div className="fs-4 fw-bold">{selectedDay.assignedStaff}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 alert alert-info small">
                            <FaInfoCircle className="me-2" />
                            Gap analysis determines whether this day is safe to publish or needs correction.
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};