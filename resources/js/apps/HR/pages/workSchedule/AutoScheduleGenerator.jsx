import React, { useMemo, useState } from "react";
import {
    FaMagic,
    FaPlay,
    FaPause,
    FaRedo,
    FaUsers,
    FaCalendarAlt,
    FaClock,
    FaLayerGroup,
    FaCheckCircle,
    FaExclamationTriangle,
    FaBrain,
    FaFilter,
    FaSlidersH,
    FaRandom,
    FaChartLine,
    FaUserClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const AutoScheduleGenerator = () => {
    /* ---------------------------------------------------------------- */
    /* GENERATED SCHEDULES                                              */
    /* ---------------------------------------------------------------- */

    const [generatedSchedules, setGeneratedSchedules] =
        useState([
            {
                id: "GEN-001",

                department: "Operations",

                period:
                    "May 11 - May 17",

                generatedAssignments: 48,

                coverage: 96,

                conflicts: 1,

                status: "Generated",
            },

            {
                id: "GEN-002",

                department: "Engineering",

                period:
                    "May 11 - May 24",

                generatedAssignments: 32,

                coverage: 88,

                conflicts: 4,

                status: "Needs Review",
            },

            {
                id: "GEN-003",

                department: "Support",

                period:
                    "May 15 - May 21",

                generatedAssignments: 21,

                coverage: 100,

                conflicts: 0,

                status: "Optimized",
            },
        ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selectedSchedule, setSelectedSchedule] =
        useState(generatedSchedules[0]);

    const [generationSettings, setGenerationSettings] =
        useState({
            optimizeCoverage: true,

            respectAvailability: true,

            avoidOvertime: true,

            balanceWorkload: true,

            prioritizePreferredShifts: false,

            minimumRestPeriods: true,
        });

    const [generating, setGenerating] =
        useState(false);

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        return {
            schedules:
                generatedSchedules.length,

            assignments:
                generatedSchedules.reduce(
                    (acc, s) =>
                        acc +
                        s.generatedAssignments,

                    0
                ),

            avgCoverage: Math.round(
                generatedSchedules.reduce(
                    (acc, s) =>
                        acc +
                        s.coverage,

                    0
                ) /
                    generatedSchedules.length
            ),

            conflicts:
                generatedSchedules.reduce(
                    (acc, s) =>
                        acc + s.conflicts,

                    0
                ),
        };
    }, [generatedSchedules]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                          */
    /* ---------------------------------------------------------------- */

    const getCoverageColor = (
        coverage
    ) => {
        if (coverage >= 95)
            return "success";

        if (coverage >= 80)
            return "warning";

        return "danger";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Generated":
                return "primary";

            case "Needs Review":
                return "warning";

            case "Optimized":
                return "success";

            default:
                return "secondary";
        }
    };

    /* ---------------------------------------------------------------- */
    /* GENERATE                                                         */
    /* ---------------------------------------------------------------- */

    const runGeneration = async () => {
        setGenerating(true);

        await new Promise((res) =>
            setTimeout(res, 2000)
        );

        setGenerating(false);

        alert(
            "Auto scheduling completed successfully"
        );
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
                            <FaMagic className="text-primary" />

                            Auto Schedule Generator
                        </h4>

                        <small className="text-muted">
                            Intelligent workforce
                            schedule generation,
                            staffing optimization,
                            and automated shift
                            balancing
                        </small>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-dark">
                            Schedules:{" "}
                            {stats.schedules}
                        </span>

                        <span className="badge bg-primary">
                            Assignments:{" "}
                            {stats.assignments}
                        </span>

                        <span className="badge bg-success">
                            Avg Coverage:{" "}
                            {stats.avgCoverage}%
                        </span>

                        <span className="badge bg-danger">
                            Conflicts:{" "}
                            {stats.conflicts}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* LEFT SIDE */}
                <div className="col-12 col-xl-4">
                    {/* GENERATION SETTINGS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaSlidersH />

                            <h5 className="mb-0">
                                Generation Rules
                            </h5>
                        </div>

                        {Object.entries(
                            generationSettings
                        ).map(
                            (
                                [
                                    key,
                                    value,
                                ]
                            ) => (
                                <div
                                    key={
                                        key
                                    }
                                    className="form-check form-switch mb-3"
                                >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                            value
                                        }
                                        onChange={() =>
                                            setGenerationSettings(
                                                (
                                                    prev
                                                ) => ({
                                                    ...prev,

                                                    [key]:
                                                        !prev[
                                                            key
                                                        ],
                                                })
                                            )
                                        }
                                    />

                                    <label className="form-check-label text-capitalize">
                                        {key.replace(
                                            /([A-Z])/g,
                                            " $1"
                                        )}
                                    </label>
                                </div>
                            )
                        )}

                        <button
                            className="btn btn-primary w-100 mt-2"
                            onClick={
                                runGeneration
                            }
                            disabled={
                                generating
                            }
                        >
                            {generating ? (
                                <>
                                    <FaPause className="me-2" />

                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FaPlay className="me-2" />

                                    Generate Schedule
                                </>
                            )}
                        </button>
                    </div>

                    {/* GENERATED LIST */}
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaLayerGroup />

                            <strong>
                                Generated Batches
                            </strong>
                        </div>

                        <div
                            style={{
                                maxHeight: 700,
                                overflowY: "auto",
                            }}
                        >
                            {generatedSchedules.map(
                                (
                                    schedule
                                ) => (
                                    <div
                                        key={
                                            schedule.id
                                        }
                                        className={`border-bottom p-3 ${
                                            selectedSchedule?.id ===
                                            schedule.id
                                                ? "bg-primary bg-opacity-10"
                                                : ""
                                        }`}
                                        style={{
                                            cursor:
                                                "pointer",
                                        }}
                                        onClick={() =>
                                            setSelectedSchedule(
                                                schedule
                                            )
                                        }
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-semibold">
                                                    {
                                                        schedule.department
                                                    }
                                                </div>

                                                <div className="small text-muted">
                                                    {
                                                        schedule.period
                                                    }
                                                </div>
                                            </div>

                                            <span
                                                className={`badge bg-${getStatusColor(
                                                    schedule.status
                                                )}`}
                                            >
                                                {
                                                    schedule.status
                                                }
                                            </span>
                                        </div>

                                        <div className="small text-muted">
                                            Coverage:{" "}
                                            {
                                                schedule.coverage
                                            }

                                            %
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
                                <h5 className="mb-1">
                                    {
                                        selectedSchedule?.department
                                    }
                                </h5>

                                <div className="small text-muted">
                                    {
                                        selectedSchedule?.period
                                    }
                                </div>
                            </div>

                            <span
                                className={`badge bg-${getStatusColor(
                                    selectedSchedule?.status
                                )}`}
                            >
                                {
                                    selectedSchedule?.status
                                }
                            </span>
                        </div>
                    </div>

                    {/* METRICS */}
                    <div className="row g-3 mb-3">
                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaUsers className="text-primary" />

                                    <strong>
                                        Assignments
                                    </strong>
                                </div>

                                <div className="fs-4 fw-bold">
                                    {
                                        selectedSchedule?.generatedAssignments
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaChartLine className="text-success" />

                                    <strong>
                                        Coverage
                                    </strong>
                                </div>

                                <div
                                    className={`fs-4 fw-bold text-${getCoverageColor(
                                        selectedSchedule?.coverage
                                    )}`}
                                >
                                    {
                                        selectedSchedule?.coverage
                                    }

                                    %
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaExclamationTriangle className="text-danger" />

                                    <strong>
                                        Conflicts
                                    </strong>
                                </div>

                                <div className="fs-4 fw-bold text-danger">
                                    {
                                        selectedSchedule?.conflicts
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="bg-white border rounded shadow-sm p-3 h-100">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaBrain className="text-dark" />

                                    <strong>
                                        Optimization
                                    </strong>
                                </div>

                                <div className="fs-6 fw-bold">
                                    AI Balanced
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GENERATION RESULTS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaCheckCircle className="text-success" />

                            <h5 className="mb-0">
                                Generation Results
                            </h5>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">
                                        Availability
                                    </div>

                                    <div className="small">
                                        Employee
                                        availability
                                        successfully
                                        respected
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                                    <div className="fw-semibold text-success mb-1">
                                        Shift Balancing
                                    </div>

                                    <div className="small">
                                        Workload evenly
                                        distributed
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-warning bg-opacity-10 border-warning">
                                    <div className="fw-semibold text-warning mb-1">
                                        Coverage Gap
                                    </div>

                                    <div className="small">
                                        2 uncovered
                                        night shifts
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="border rounded p-3 bg-danger bg-opacity-10 border-danger">
                                    <div className="fw-semibold text-danger mb-1">
                                        Conflict Risk
                                    </div>

                                    <div className="small">
                                        Consecutive
                                        shift risk
                                        detected
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GENERATED ACTIONS */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaRedo />

                            <h5 className="mb-0">
                                Schedule Actions
                            </h5>
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-12 col-md-4">
                                <div className="border rounded p-3 text-center">
                                    <FaUserClock
                                        size={28}
                                        className="text-primary mb-2"
                                    />

                                    <div className="fw-semibold">
                                        Shift Rotation
                                    </div>

                                    <div className="small text-muted">
                                        Automatically
                                        balanced
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="border rounded p-3 text-center">
                                    <FaRandom
                                        size={28}
                                        className="text-success mb-2"
                                    />

                                    <div className="fw-semibold">
                                        Fair Distribution
                                    </div>

                                    <div className="small text-muted">
                                        Equalized
                                        assignments
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="border rounded p-3 text-center">
                                    <FaCalendarAlt
                                        size={28}
                                        className="text-warning mb-2"
                                    />

                                    <div className="fw-semibold">
                                        Recurring Rules
                                    </div>

                                    <div className="small text-muted">
                                        Applied
                                        automatically
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                            <button className="btn btn-success">
                                Publish Schedule
                            </button>

                            <button className="btn btn-outline-primary">
                                Open Calendar
                            </button>

                            <button className="btn btn-outline-dark">
                                Regenerate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};