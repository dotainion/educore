import React, { useMemo, useState } from "react";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
    FaExternalLinkAlt,
    FaSearch,
    FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ScheduleApprovalWorkflow = () => {
    const navigate = useNavigate();

    /* ---------------------------------------------------------------- */
    /* SCHEDULES                                                        */
    /* ---------------------------------------------------------------- */

    const [schedules] = useState([
        {
            id: "APP-001",

            name: "Operations Weekly Schedule",

            department: "Operations",

            submittedBy: "Auto Generator",

            period: "May 12 - May 18",

            employees: 42,

            shifts: 118,

            coverage: 94,

            conflicts: 2,

            openShifts: 3,

            published: false,

            submittedAt: "2026-05-10 08:10 AM",
        },

        {
            id: "APP-002",

            name: "Engineering Rotation Plan",

            department: "Engineering",

            submittedBy: "Scheduler Engine",

            period: "May 12 - May 18",

            employees: 18,

            shifts: 52,

            coverage: 98,

            conflicts: 0,

            openShifts: 0,

            published: false,

            submittedAt: "2026-05-10 09:30 AM",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selected, setSelected] = useState(
        schedules[0]
    );

    const [search, setSearch] = useState("");

    /* ---------------------------------------------------------------- */
    /* FILTERED                                                         */
    /* ---------------------------------------------------------------- */

    const filtered = useMemo(() => {
        return schedules.filter((s) =>
            s.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [schedules, search]);

    /* ---------------------------------------------------------------- */
    /* VALIDATION                                                       */
    /* ---------------------------------------------------------------- */

    const publishBlocked =
        selected.conflicts > 0 ||
        selected.openShifts > 0;

    /* ---------------------------------------------------------------- */
    /* UI                                                               */
    /* ---------------------------------------------------------------- */

    return (
        <motion.div
            className="container-fluid p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >

            {/* HEADER */}
            <div className="mb-4">

                <h3 className="mb-1">
                    Schedule Review & Publish
                </h3>

                <p className="text-muted mb-0">
                    Review workforce schedules, resolve operational issues,
                    and publish finalized schedules to employees.
                </p>

            </div>

            <div className="row g-4">

                {/* LEFT */}
                <div className="col-12 col-xl-4">

                    {/* SEARCH */}
                    <div className="bg-white border rounded p-3 mb-3">

                        <div className="position-relative">

                            <FaSearch
                                className="position-absolute text-muted"
                                style={{
                                    top: 12,
                                    left: 12,
                                }}
                            />

                            <input
                                className="form-control ps-5"
                                placeholder="Search schedules..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* LIST */}
                    <div className="bg-white border rounded overflow-hidden">

                        <div className="p-3 border-bottom fw-semibold">
                            Schedules Awaiting Review
                        </div>

                        {filtered.map((schedule) => (

                            <div
                                key={schedule.id}
                                onClick={() => setSelected(schedule)}
                                className={`p-3 border-bottom ${
                                    selected.id === schedule.id
                                        ? "bg-primary bg-opacity-10"
                                        : ""
                                }`}
                                style={{
                                    cursor: "pointer",
                                }}
                            >

                                <div className="d-flex justify-content-between align-items-start mb-2">

                                    <div>

                                        <div className="fw-semibold">
                                            {schedule.name}
                                        </div>

                                        <div className="small text-muted">
                                            {schedule.department}
                                        </div>

                                    </div>

                                    {schedule.conflicts > 0 ||
                                    schedule.openShifts > 0 ? (

                                        <span className="badge bg-warning text-dark">
                                            Needs Attention
                                        </span>

                                    ) : (

                                        <span className="badge bg-success">
                                            Ready
                                        </span>

                                    )}

                                </div>

                                <div className="small text-muted">
                                    {schedule.period}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* RIGHT */}
                <div className="col-12 col-xl-8">

                    {/* SUMMARY */}
                    <div className="bg-white border rounded p-4 mb-4">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">

                            <div>

                                <h4 className="mb-1">
                                    {selected.name}
                                </h4>

                                <div className="text-muted small">
                                    Submitted by {selected.submittedBy}
                                </div>

                            </div>

                            <div className="small text-muted">
                                Submitted {selected.submittedAt}
                            </div>

                        </div>

                        <div className="row g-3">

                            <div className="col-md-3">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Schedule Period
                                    </div>

                                    <div className="fw-semibold">
                                        {selected.period}
                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Employees
                                    </div>

                                    <div className="fw-semibold">
                                        {selected.employees}
                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Shifts
                                    </div>

                                    <div className="fw-semibold">
                                        {selected.shifts}
                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Coverage
                                    </div>

                                    <div className="fw-semibold text-success">
                                        {selected.coverage}%
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* SCHEDULE HEALTH */}
                    <div className="bg-white border rounded p-4 mb-4">

                        <div className="d-flex align-items-center gap-2 mb-4">

                            <FaExclamationTriangle className="text-warning" />

                            <h5 className="mb-0">
                                Schedule Health
                            </h5>

                        </div>

                        <div className="d-flex flex-column gap-3">

                            {/* CONFLICTS */}
                            {selected.conflicts > 0 && (

                                <div className="border rounded p-3">

                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                        <div>

                                            <div className="fw-semibold text-warning mb-1">
                                                {selected.conflicts} Scheduling Conflicts
                                            </div>

                                            <div className="small text-muted">
                                                Employees are assigned to overlapping shifts.
                                            </div>

                                        </div>

                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(
                                                    routes.hr.workSchedule.assignmentCenter
                                                )
                                            }
                                        >
                                            Resolve Conflicts
                                        </button>

                                    </div>

                                </div>

                            )}

                            {/* OPEN SHIFTS */}
                            {selected.openShifts > 0 && (

                                <div className="border rounded p-3">

                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                        <div>

                                            <div className="fw-semibold text-danger mb-1">
                                                {selected.openShifts} Unassigned Shifts
                                            </div>

                                            <div className="small text-muted">
                                                Some shifts still require staffing coverage.
                                            </div>

                                        </div>

                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(
                                                    routes.hr.workSchedule.assignmentCenter
                                                )
                                            }
                                        >
                                            Assign Employees
                                        </button>

                                    </div>

                                </div>

                            )}

                            {/* HEALTHY */}
                            {selected.conflicts === 0 &&
                                selected.openShifts === 0 && (

                                <div className="border rounded p-3">

                                    <div className="d-flex align-items-start gap-3">

                                        <FaCheckCircle className="text-success mt-1" />

                                        <div>

                                            <div className="fw-semibold text-success mb-1">
                                                Schedule Ready for Publication
                                            </div>

                                            <div className="small text-muted">
                                                No operational issues detected.
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* PUBLICATION */}
                    <div className="bg-white border rounded p-4">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">

                            <div>

                                <h5 className="mb-1">
                                    Publication Status
                                </h5>

                                <div className="small text-muted">

                                    {publishBlocked
                                        ? "Resolve outstanding issues before publishing this schedule."
                                        : "This schedule is ready to be published to employees."}

                                </div>

                            </div>

                            {publishBlocked ? (

                                <span className="badge bg-warning text-dark px-3 py-2">
                                    Action Required
                                </span>

                            ) : (

                                <span className="badge bg-success px-3 py-2">
                                    Ready to Publish
                                </span>

                            )}

                        </div>

                        <div className="d-flex flex-wrap gap-2">

                            <button
                                className="btn btn-primary"
                                disabled={publishBlocked}
                            >
                                Publish Schedule
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    navigate(
                                        routes.hr.workSchedule.calendarView
                                    )
                                }
                            >
                                Open Schedule
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    navigate(
                                        routes.hr.workSchedule.assignmentCenter
                                    )
                                }
                            >
                                Edit Assignments
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </motion.div>
    );
};