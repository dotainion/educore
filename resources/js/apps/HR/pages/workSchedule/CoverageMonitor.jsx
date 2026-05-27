import React, { useMemo, useState } from "react";
import {
    FaExclamationTriangle,
    FaCheckCircle,
    FaUsers,
    FaLayerGroup,
    FaCalendarAlt,
    FaClock,
    FaFilter,
    FaSearch,
    FaUserSlash,
    FaBuilding,
    FaArrowUp,
    FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const CoverageMonitor = () => {
    /* ---------------------------------------------------------------- */
    /* SAMPLE COVERAGE DATA                                             */
    /* ---------------------------------------------------------------- */

    const [coverageData] = useState([
        {
            id: 1,

            department: "Operations",

            shift: "Morning Shift",

            required: 8,

            assigned: 6,

            supervisors: 1,

            requiredSupervisors: 1,

            date: "2026-05-12",
        },

        {
            id: 2,

            department: "Engineering",

            shift: "Night Rotation",

            required: 5,

            assigned: 2,

            supervisors: 0,

            requiredSupervisors: 1,

            date: "2026-05-12",
        },

        {
            id: 3,

            department: "Support",

            shift: "Weekend Coverage",

            required: 4,

            assigned: 5,

            supervisors: 1,

            requiredSupervisors: 1,

            date: "2026-05-13",
        },

        {
            id: 4,

            department: "Operations",

            shift: "Evening Shift",

            required: 7,

            assigned: 3,

            supervisors: 0,

            requiredSupervisors: 1,

            date: "2026-05-14",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* UNSCHEDULED EMPLOYEES                                            */
    /* ---------------------------------------------------------------- */

    const [unassignedEmployees] = useState([
        {
            id: "EMP-101",

            name: "Emma Wilson",

            department: "Engineering",
        },

        {
            id: "EMP-102",

            name: "Noah Thomas",

            department: "Operations",
        },

        {
            id: "EMP-103",

            name: "James Anderson",

            department: "Support",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [search, setSearch] = useState("");

    const [departmentFilter, setDepartmentFilter] =
        useState("all");

    /* ---------------------------------------------------------------- */
    /* FILTERED DATA                                                    */
    /* ---------------------------------------------------------------- */

    const filteredCoverage = useMemo(() => {
        return coverageData.filter((item) => {
            const matchesSearch =
                item.shift
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesDepartment =
                departmentFilter === "all" ||
                item.department ===
                    departmentFilter;

            return (
                matchesSearch &&
                matchesDepartment
            );
        });
    }, [coverageData, search, departmentFilter]);

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        const critical = coverageData.filter(
            (x) => x.assigned < x.required
        ).length;

        const healthy = coverageData.filter(
            (x) => x.assigned >= x.required
        ).length;

        const totalGaps = coverageData.reduce(
            (acc, item) => {
                const gap =
                    item.required -
                    item.assigned;

                return gap > 0
                    ? acc + gap
                    : acc;
            },

            0
        );

        return {
            critical,

            healthy,

            totalGaps,

            unassigned:
                unassignedEmployees.length,
        };
    }, [coverageData, unassignedEmployees]);

    /* ---------------------------------------------------------------- */
    /* HELPERS                                                          */
    /* ---------------------------------------------------------------- */

    const getCoveragePercent = (
        assigned,
        required
    ) => {
        return Math.round(
            (assigned / required) * 100
        );
    };

    const getCoverageStatus = (
        assigned,
        required
    ) => {
        if (assigned >= required)
            return {
                label: "Healthy",

                color: "success",
            };

        if (assigned >= required * 0.7)
            return {
                label: "Warning",

                color: "warning",
            };

        return {
            label: "Critical",

            color: "danger",
        };
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
                            <FaLayerGroup className="text-primary" />

                            Coverage Monitor
                        </h4>

                        <small className="text-muted">
                            Workforce staffing
                            visibility, schedule
                            coverage analysis, and
                            operational staffing
                            alerts
                        </small>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-danger">
                            Critical:{" "}
                            {stats.critical}
                        </span>

                        <span className="badge bg-success">
                            Healthy:{" "}
                            {stats.healthy}
                        </span>

                        <span className="badge bg-warning text-dark">
                            Gaps:{" "}
                            {stats.totalGaps}
                        </span>

                        <span className="badge bg-dark">
                            Unassigned:{" "}
                            {stats.unassigned}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* LEFT SIDE */}
                <div className="col-12 col-xl-8">
                    {/* FILTERS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="row g-2">
                            <div className="col-12 col-md-8">
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
                                        placeholder="Search shifts..."
                                        value={
                                            search
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setSearch(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <select
                                    className="form-select"
                                    value={
                                        departmentFilter
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setDepartmentFilter(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                >
                                    <option value="all">
                                        All
                                        Departments
                                    </option>

                                    <option value="Operations">
                                        Operations
                                    </option>

                                    <option value="Engineering">
                                        Engineering
                                    </option>

                                    <option value="Support">
                                        Support
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* COVERAGE GRID */}
                    <div className="bg-white border rounded shadow-sm">
                        <div className="p-3 border-bottom d-flex align-items-center gap-2">
                            <FaCalendarAlt />

                            <strong>
                                Shift Coverage
                            </strong>
                        </div>

                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>
                                            Department
                                        </th>

                                        <th>
                                            Shift
                                        </th>

                                        <th>
                                            Coverage
                                        </th>

                                        <th>
                                            Supervisors
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCoverage.map(
                                        (
                                            item
                                        ) => {
                                            const percent =
                                                getCoveragePercent(
                                                    item.assigned,
                                                    item.required
                                                );

                                            const status =
                                                getCoverageStatus(
                                                    item.assigned,
                                                    item.required
                                                );

                                            const gap =
                                                item.required -
                                                item.assigned;

                                            return (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {
                                                                item.department
                                                            }
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="fw-semibold">
                                                            {
                                                                item.shift
                                                            }
                                                        </div>

                                                        <div className="small text-muted">
                                                            Required:{" "}
                                                            {
                                                                item.required
                                                            }
                                                        </div>
                                                    </td>

                                                    <td style={{ width: 250 }}>
                                                        <div className="d-flex justify-content-between small mb-1">
                                                            <span>
                                                                {
                                                                    item.assigned
                                                                }

                                                                /
                                                                {
                                                                    item.required
                                                                }
                                                            </span>

                                                            <span>
                                                                {
                                                                    percent
                                                                }

                                                                %
                                                            </span>
                                                        </div>

                                                        <div className="progress">
                                                            <div
                                                                className={`progress-bar bg-${status.color}`}
                                                                style={{
                                                                    width: `${Math.min(
                                                                        percent,
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            />
                                                        </div>

                                                        {gap >
                                                            0 && (
                                                            <div className="small text-danger mt-1">
                                                                <FaArrowDown className="me-1" />

                                                                Gap:{" "}
                                                                {
                                                                    gap
                                                                }
                                                            </div>
                                                        )}

                                                        {gap <
                                                            0 && (
                                                            <div className="small text-success mt-1">
                                                                <FaArrowUp className="me-1" />

                                                                Overstaffed
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <div>
                                                            {
                                                                item.supervisors
                                                            }

                                                            /
                                                            {
                                                                item.requiredSupervisors
                                                            }
                                                        </div>

                                                        {item.supervisors <
                                                            item.requiredSupervisors && (
                                                            <div className="small text-danger">
                                                                Supervisor
                                                                Missing
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge bg-${status.color}`}
                                                        >
                                                            {
                                                                status.label
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="small text-muted">
                                                        {
                                                            item.date
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-xl-4">
                    {/* ALERTS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaExclamationTriangle className="text-danger" />

                            <h5 className="mb-0">
                                Coverage Alerts
                            </h5>
                        </div>

                        <div className="border rounded p-3 mb-2 bg-danger bg-opacity-10 border-danger">
                            <div className="fw-semibold text-danger">
                                Night Rotation
                            </div>

                            <div className="small">
                                Engineering short by
                                3 employees
                            </div>
                        </div>

                        <div className="border rounded p-3 mb-2 bg-warning bg-opacity-10 border-warning">
                            <div className="fw-semibold text-warning">
                                Evening Shift
                            </div>

                            <div className="small">
                                Supervisor not
                                assigned
                            </div>
                        </div>

                        <div className="border rounded p-3 bg-success bg-opacity-10 border-success">
                            <div className="fw-semibold text-success">
                                Weekend Coverage
                            </div>

                            <div className="small">
                                Fully staffed and
                                operational
                            </div>
                        </div>
                    </div>

                    {/* UNSCHEDULED EMPLOYEES */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaUserSlash />

                            <h5 className="mb-0">
                                Unassigned Employees
                            </h5>
                        </div>

                        {unassignedEmployees.map(
                            (emp) => (
                                <div
                                    key={emp.id}
                                    className="border rounded p-3 mb-2"
                                >
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="fw-semibold">
                                                {
                                                    emp.name
                                                }
                                            </div>

                                            <div className="small text-muted">
                                                <FaBuilding className="me-1" />

                                                {
                                                    emp.department
                                                }
                                            </div>
                                        </div>

                                        <button className="btn btn-sm btn-outline-primary">
                                            Assign
                                        </button>
                                    </div>
                                </div>
                            )
                        )}

                        {!unassignedEmployees.length && (
                            <div className="alert alert-success small mb-0">
                                <FaCheckCircle className="me-2" />

                                All employees are
                                scheduled
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};