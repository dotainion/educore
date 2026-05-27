import React, { useMemo, useState } from "react";
import {
    FaExchangeAlt,
    FaUserClock,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaSearch,
    FaFilter,
    FaUsers,
    FaCalendarAlt,
    FaArrowRight,
    FaExclamationTriangle,
    FaRandom,
    FaLayerGroup,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const ShiftSwapCenter = () => {
    /* ---------------------------------------------------------------- */
    /* SHIFT SWAP REQUESTS                                              */
    /* ---------------------------------------------------------------- */

    const [swapRequests, setSwapRequests] =
        useState([
            {
                id: "SWAP-001",

                requester: "Olivia Martin",

                requesterDepartment:
                    "Operations",

                replacement:
                    "Daniel James",

                replacementDepartment:
                    "Engineering",

                originalShift:
                    "Morning Shift",

                requestedShift:
                    "Night Rotation",

                date: "2026-05-14",

                status: "Pending",

                reason:
                    "Medical appointment",

                submitted:
                    "2026-05-10 09:24 AM",
            },

            {
                id: "SWAP-002",

                requester:
                    "Sophia Brown",

                requesterDepartment:
                    "Support",

                replacement:
                    "Michael Lee",

                replacementDepartment:
                    "Operations",

                originalShift:
                    "Weekend Coverage",

                requestedShift:
                    "Evening Shift",

                date: "2026-05-16",

                status: "Approved",

                reason:
                    "Family event",

                submitted:
                    "2026-05-09 01:15 PM",
            },

            {
                id: "SWAP-003",

                requester:
                    "Emma Wilson",

                requesterDepartment:
                    "Engineering",

                replacement:
                    "No replacement assigned",

                replacementDepartment:
                    "-",

                originalShift:
                    "Night Rotation",

                requestedShift:
                    "Open Coverage Request",

                date: "2026-05-18",

                status: "Open",

                reason:
                    "Schedule conflict",

                submitted:
                    "2026-05-10 04:45 PM",
            },
        ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selectedRequest, setSelectedRequest] =
        useState(swapRequests[0]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    /* ---------------------------------------------------------------- */
    /* FILTERED REQUESTS                                                */
    /* ---------------------------------------------------------------- */

    const filteredRequests = useMemo(() => {
        return swapRequests.filter((request) => {
            const matchesSearch =
                request.requester
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                request.originalShift
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                request.status ===
                    statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [swapRequests, search, statusFilter]);

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        return {
            pending: swapRequests.filter(
                (x) =>
                    x.status === "Pending"
            ).length,

            approved: swapRequests.filter(
                (x) =>
                    x.status === "Approved"
            ).length,

            open: swapRequests.filter(
                (x) => x.status === "Open"
            ).length,

            rejected: swapRequests.filter(
                (x) =>
                    x.status === "Rejected"
            ).length,
        };
    }, [swapRequests]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                          */
    /* ---------------------------------------------------------------- */

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "success";

            case "Pending":
                return "warning";

            case "Rejected":
                return "danger";

            case "Open":
                return "primary";

            default:
                return "secondary";
        }
    };

    const updateStatus = (
        id,
        newStatus
    ) => {
        setSwapRequests((prev) =>
            prev.map((request) =>
                request.id === id
                    ? {
                          ...request,

                          status:
                              newStatus,
                      }
                    : request
            )
        );

        if (selectedRequest?.id === id) {
            setSelectedRequest({
                ...selectedRequest,

                status: newStatus,
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
                            <FaExchangeAlt className="text-primary" />
                            Shift Swap Center
                        </h4>
                        <small className="text-muted">
                            Workforce shift
                            exchange requests,
                            schedule reassignment,
                            and coverage transfer
                            management
                        </small>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-warning text-dark">
                            Pending:{' '}{stats.pending}
                        </span>
                        <span className="badge bg-success">
                            Approved:{' '}{stats.approved}
                        </span>
                        <span className="badge bg-primary">
                            Open: {stats.open}
                        </span>
                        <span className="badge bg-danger">
                            Rejected:{' '}{stats.rejected}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* LEFT SIDE */}
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
                                placeholder="Search requests..."
                                value={search}
                            />
                        </div>
                        <select
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="form-select"
                            value={statusFilter}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Open">Open</option>
                        </select>
                    </div>

                    {/* REQUEST LIST */}
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaLayerGroup />
                            <strong>Swap Requests</strong>
                        </div>
                        <div
                            style={{
                                maxHeight: 700,
                                overflowY: "auto"
                            }}
                        >
                            {filteredRequests.map((request) => (
                                    <div
                                        onClick={() => setSelectedRequest(request)}
                                        className={`border-bottom pointer p-3 ${
                                            selectedRequest?.id === request.id ? 'bg-primary bg-opacity-10' : ''
                                        }`}
                                        key={request.id}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-semibold">{request.requester}</div>
                                                <div className="small text-muted">{request.originalShift}</div>
                                            </div>
                                            <span
                                                className={`badge bg-${getStatusColor(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </span>
                                        </div>
                                        <div className="small text-muted">
                                            {request.date}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-xl-8">
                    {/* OVERVIEW */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                            <div>
                                <h5 className="mb-1">{selectedRequest?.requester}</h5>
                                <div className="small text-muted">
                                    {selectedRequest?.requesterDepartment}
                                </div>
                            </div>
                            <span
                                className={`badge bg-${getStatusColor(
                                    selectedRequest?.status
                                )}`}
                            >
                                {selectedRequest?.status}
                            </span>
                        </div>
                    </div>

                    {/* SHIFT TRANSFER */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaRandom />
                            <h5 className="mb-0">Shift Exchange</h5>
                        </div>
                        <div className="row g-3 align-items-center">
                            {/* REQUESTER */}
                            <div className="col-12 col-md-5">
                                <div className="border rounded p-3 h-100">
                                    <div className="fw-semibold mb-2">Original Assignment</div>
                                    <div className="small mb-1">
                                        <FaUsers className="me-2" />
                                        {selectedRequest?.requester}
                                    </div>
                                    <div className="small mb-1">
                                        <FaClock className="me-2" />
                                        {selectedRequest?.originalShift}
                                    </div>
                                    <div className="small text-muted">
                                        <FaCalendarAlt className="me-2" />
                                        {selectedRequest?.date}
                                    </div>
                                </div>
                            </div>

                            {/* ARROW */}
                            <div className="col-12 col-md-2 text-center">
                                <FaArrowRight
                                    size={28}
                                    className="text-primary"
                                />
                            </div>

                            {/* REPLACEMENT */}
                            <div className="col-12 col-md-5">
                                <div className="border rounded p-3 h-100">
                                    <div className="fw-semibold mb-2">Replacement Assignment</div>
                                    <div className="small mb-1">
                                        <FaUsers className="me-2" />
                                        {selectedRequest?.replacement}
                                    </div>
                                    <div className="small mb-1">
                                        <FaClock className="me-2" />
                                        {selectedRequest?.requestedShift}
                                    </div>
                                    <div className="small text-muted">
                                        {selectedRequest?.replacementDepartment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VALIDATION */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaCheckCircle className="text-success" />
                            <h5 className="mb-0">Validation Results</h5>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">
                                        Schedule Conflict
                                    </div>
                                    <div className="small">No overlap detected</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">
                                        Availability
                                    </div>
                                    <div className="small">Replacement is available</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-warning bg-opacity-10 border-warning">
                                    <div className="fw-semibold text-warning mb-1">Staffing Impact</div>
                                    <div className="small">Coverage reduced by 1</div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-danger bg-opacity-10 border-danger">
                                    <div className="fw-semibold text-danger mb-1">Certification</div>
                                    <div className="small">
                                        Replacement lacks
                                        supervisor
                                        certification
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaUserClock />
                            <h5 className="mb-0">
                                Request Actions
                            </h5>
                        </div>
                        <div className="mb-3">
                            <div className="small fw-semibold mb-1">Reason</div>
                            <div className="text-muted">{selectedRequest?.reason}</div>
                        </div>
                        <div className="small text-muted mb-4">
                            Submitted:{' '}{selectedRequest?.submitted}
                        </div>
                        <div className="d-flex gap-2 flex-wrap">
                            <button
                                onClick={() => updateStatus(selectedRequest.id, 'Approved')}
                                className="btn btn-success"
                            >
                                <FaCheckCircle className="me-2" />
                                Approve Swap
                            </button>
                            <button
                                onClick={() => updateStatus(selectedRequest.id, 'Rejected')}
                                className="btn btn-danger"
                            >
                                <FaTimesCircle className="me-2" />
                                Reject
                            </button>
                            <button className="btn btn-outline-dark">
                                Reassign Coverage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};