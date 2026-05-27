import React, { useMemo, useState } from "react";
import {
    FaUpload,
    FaCalendarCheck,
    FaCheckCircle,
    FaExclamationTriangle,
    FaClock,
    FaUsers,
    FaLayerGroup,
    FaSearch,
    FaFilter,
    FaHistory,
    FaLock,
    FaGlobe,
    FaEye,
    FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const SchedulePublishCenter = () => {
    /* ---------------------------------------------------------------- */
    /* SCHEDULE PERIODS                                                 */
    /* ---------------------------------------------------------------- */

    const [schedules, setSchedules] = useState([
        {
            id: "SCH-001",

            title: "Operations Weekly Schedule",

            department: "Operations",

            startDate: "2026-05-11",

            endDate: "2026-05-17",

            assignments: 42,

            status: "Draft",

            conflicts: 2,

            publishedBy: null,

            publishedAt: null,
        },

        {
            id: "SCH-002",

            title: "Engineering Rotation Schedule",

            department: "Engineering",

            startDate: "2026-05-11",

            endDate: "2026-05-24",

            assignments: 28,

            status: "Published",

            conflicts: 0,

            publishedBy: "HR Admin",

            publishedAt: "2026-05-09 10:24 AM",
        },

        {
            id: "SCH-003",

            title: "Weekend Support Coverage",

            department: "Support",

            startDate: "2026-05-15",

            endDate: "2026-05-16",

            assignments: 12,

            status: "Pending Review",

            conflicts: 1,

            publishedBy: null,

            publishedAt: null,
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selectedSchedule, setSelectedSchedule] =
        useState(schedules[0]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    /* ---------------------------------------------------------------- */
    /* FILTERED DATA                                                    */
    /* ---------------------------------------------------------------- */

    const filteredSchedules = useMemo(() => {
        return schedules.filter((schedule) => {
            const matchesSearch =
                schedule.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                schedule.status ===
                    statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [schedules, search, statusFilter]);

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        return {
            drafts: schedules.filter(
                (x) => x.status === "Draft"
            ).length,

            published: schedules.filter(
                (x) =>
                    x.status ===
                    "Published"
            ).length,

            pending: schedules.filter(
                (x) =>
                    x.status ===
                    "Pending Review"
            ).length,

            conflicts: schedules.reduce(
                (acc, s) =>
                    acc + s.conflicts,

                0
            ),
        };
    }, [schedules]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                          */
    /* ---------------------------------------------------------------- */

    const getStatusColor = (status) => {
        switch (status) {
            case "Published":
                return "success";

            case "Draft":
                return "secondary";

            case "Pending Review":
                return "warning";

            default:
                return "dark";
        }
    };

    const publishSchedule = (id) => {
        setSchedules((prev) =>
            prev.map((schedule) =>
                schedule.id === id
                    ? {
                          ...schedule,

                          status:
                              "Published",

                          publishedBy:
                              "Current User",

                          publishedAt:
                              new Date().toLocaleString(),
                      }
                    : schedule
            )
        );

        if (selectedSchedule?.id === id) {
            setSelectedSchedule({
                ...selectedSchedule,

                status: "Published",

                publishedBy:
                    "Current User",

                publishedAt:
                    new Date().toLocaleString(),
            });
        }
    };

    /* ---------------------------------------------------------------- */
    /* UI                                                               */
    /* ---------------------------------------------------------------- */

    return (
        <motion.div
            className="container-fluid p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* HEADER */}
            <div className="mb-4">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                    <div>
                        <h4 className="mb-1 d-flex align-items-center gap-2">
                            <FaUpload className="text-primary" />
                            Schedule Publish Center
                        </h4>
                        <small className="text-muted">
                            Workforce schedule
                            review, publishing,
                            locking, and release
                            management
                        </small>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-secondary">
                            Drafts:{' '}{stats.drafts}
                        </span>
                        <span className="badge bg-success">
                            Published:{' '}{stats.published}
                        </span>
                        <span className="badge bg-warning text-dark">
                            Pending:{' '}{stats.pending}
                        </span>
                        <span className="badge bg-danger">
                            Conflicts:{' '}{stats.conflicts}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* LEFT */}
                <div className="col-12 col-xl-4">
                    {/* FILTERS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="position-relative mb-3">
                            <FaSearch
                                className="position-absolute text-muted"
                                style={{ top: 12, left: 12 }}
                            />

                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                className="form-control ps-5"
                                placeholder="Search schedules..."
                                value={search}
                            />
                        </div>
                        <select
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="form-select"
                            value={statusFilter}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Draft">Draft</option>
                            <option value="Pending Review">Pending Review</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>

                    {/* SCHEDULE LIST */}
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaLayerGroup />
                            <strong>Schedule Batches</strong>
                        </div>
                        <div
                            style={{
                                maxHeight: 700,
                                overflowY: "auto",
                            }}
                        >
                            {filteredSchedules.map((schedule) => (
                                    <div
                                        onClick={() => setSelectedSchedule(schedule)}
                                        className={`border-bottom pointer p-3 ${
                                            selectedSchedule?.id === schedule.id ? "bg-primary bg-opacity-10" : ''
                                        }`}
                                        key={schedule.id}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-semibold">
                                                    {schedule.title}
                                                </div>
                                                <div className="small text-muted">
                                                    {schedule.department}
                                                </div>
                                            </div>
                                            <span className={`badge bg-${getStatusColor(schedule.status)}`}>
                                                {schedule.status}
                                            </span>
                                        </div>
                                        <div className="small text-muted">
                                            {schedule.startDate}{' → '}{schedule.endDate}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-12 col-xl-8">
                    {/* OVERVIEW */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                            <div>
                                <h5 className="mb-1">{selectedSchedule?.title}</h5>
                                <div className="small text-muted">{selectedSchedule?.department}</div>
                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                                <button className="btn btn-outline-dark btn-sm">
                                    <FaEye className="me-2" />
                                    Preview
                                </button>
                                {selectedSchedule?.status !== 'Published' && (
                                    <button
                                        onClick={() => publishSchedule(selectedSchedule.id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        <FaPaperPlane className="me-2" />
                                        Publish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* METRICS */}
                    <div className="row g-3 mb-3">
                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaUsers className="text-primary" />
                                    <strong>Assignments</strong>
                                </div>
                                <div className="fs-4 fw-bold">{selectedSchedule?.assignments}</div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaExclamationTriangle className="text-danger" />
                                    <strong>Conflicts</strong>
                                </div>
                                <div className="fs-4 fw-bold text-danger">
                                    {selectedSchedule?.conflicts}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaLock className="text-dark" />
                                    <strong>Status</strong>
                                </div>
                                <div className="fs-6 fw-bold">{selectedSchedule?.status}</div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaCalendarCheck className="text-success" />
                                    <strong>Period</strong>
                                </div>
                                <div className="small fw-semibold">{selectedSchedule?.startDate}</div>
                            </div>
                        </div>
                    </div>

                    {/* VALIDATION */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaCheckCircle className="text-success" />
                            <h5 className="mb-0">Validation Summary</h5>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">Scheduling Rules</div>
                                    <div className="small">All assignment rules validated</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-warning bg-opacity-10 border-warning">
                                    <div className="fw-semibold text-warning mb-1">Staffing Coverage</div>
                                    <div className="small">2 uncovered shifts detected</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">Availability</div>
                                    <div className="small">No availability conflicts detected</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-danger bg-opacity-10 border-danger">
                                    <div className="fw-semibold text-danger mb-1">Supervisor Coverage</div>
                                    <div className="small">Missing supervisor assignment</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PUBLISH HISTORY */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaHistory />
                            <h5 className="mb-0">Publish Activity</h5>
                        </div>

                        {selectedSchedule?.publishedAt ? (
                            <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                <div className="fw-semibold text-success">Schedule Published</div>
                                <div className="small text-muted">
                                    Published by{' '}{selectedSchedule.publishedBy}
                                </div>
                                <div className="small text-muted">
                                    {selectedSchedule.publishedAt}
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-warning small mb-0">
                                <FaClock className="me-2" />
                                Schedule has not been published yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};