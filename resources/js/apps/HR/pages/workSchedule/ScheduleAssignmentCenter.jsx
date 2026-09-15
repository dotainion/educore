import React, { useMemo, useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaCalendarAlt,
    FaUserClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSearch,
    FaClock,
    FaLayerGroup,
    FaRegCalendarCheck,
    FaTimes,
    FaUsers,
    FaBars,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

/* ---------------------------------------------------------------- */
/* HELPERS                                                          */
/* ---------------------------------------------------------------- */

const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
];

const weekdays = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat",
];

const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
};

/* ---------------------------------------------------------------- */
/* REAL CALENDAR GRID                                               */
/* ---------------------------------------------------------------- */

const getCalendarDays = (year, month) => {

    const firstDayOfMonth = new Date(year, month, 1);

    const startDay = firstDayOfMonth.getDay();

    const startDate = new Date(year, month, 1 - startDay);

    const calendar = [];

    for (let i = 0; i < 42; i++) {

        const date = new Date(startDate);

        date.setDate(startDate.getDate() + i);

        calendar.push({
            date,
            currentMonth:
                date.getMonth() === month,
        });
    }

    return calendar;
};

/* ---------------------------------------------------------------- */
/* COMPONENT                                                        */
/* ---------------------------------------------------------------- */

export const ScheduleAssignmentCenter = () => {

    /* ---------------------------------------------------------------- */
    /* EMPLOYEES                                                        */
    /* ---------------------------------------------------------------- */

    const employees = [
        {
            id: "EMP-001",
            name: "Olivia Martin",
            department: "Operations",
            role: "Supervisor",
        },
        {
            id: "EMP-002",
            name: "Daniel James",
            department: "Engineering",
            role: "Technician",
        },
        {
            id: "EMP-003",
            name: "Sophia Brown",
            department: "Support",
            role: "Analyst",
        },
        {
            id: "EMP-004",
            name: "Michael Lee",
            department: "Operations",
            role: "Operator",
        },
        {
            id: "EMP-005",
            name: "Emma Wilson",
            department: "Engineering",
            role: "Engineer",
        },
    ];

    /* ---------------------------------------------------------------- */
    /* RULES                                                            */
    /* ---------------------------------------------------------------- */

    const scheduleRules = [
        {
            id: "RULE-001",
            name: "Corporate Day Shift",
            start: "08:00",
            end: "16:00",
            type: "Fixed",
        },
        {
            id: "RULE-002",
            name: "Night Rotation",
            start: "22:00",
            end: "06:00",
            type: "Rotating",
        },
    ];

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const today = new Date();

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedDate, setSelectedDate] = useState(
        formatDateKey(today)
    );

    const [search, setSearch] = useState("");

    const [selectedRule, setSelectedRule] = useState(
        scheduleRules[0].id
    );

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [activeEmployee, setActiveEmployee] = useState(null);

    /* ---------------------------------------------------------------- */
    /* ASSIGNMENTS                                                      */
    /* ---------------------------------------------------------------- */

    const [assignments, setAssignments] = useState({
        "2026-05-11": [
            {
                employeeId: "EMP-001",
                ruleId: "RULE-001",
            },
            {
                employeeId: "EMP-002",
                ruleId: "RULE-001",
            },
        ],

        "2026-05-13": [
            {
                employeeId: "EMP-003",
                ruleId: "RULE-002",
            },
        ],
    });

    /* ---------------------------------------------------------------- */
    /* CALENDAR DATA                                                    */
    /* ---------------------------------------------------------------- */

    const calendarDays = useMemo(() => {

        return getCalendarDays(
            currentYear,
            currentMonth
        );

    }, [currentYear, currentMonth]);

    /* ---------------------------------------------------------------- */
    /* FILTERED EMPLOYEES                                               */
    /* ---------------------------------------------------------------- */

    const filteredEmployees = useMemo(() => {

        return employees.filter((emp) =>
            emp.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [search]);

    /* ---------------------------------------------------------------- */
    /* SELECTED ASSIGNMENTS                                             */
    /* ---------------------------------------------------------------- */

    const selectedAssignments =
        assignments[selectedDate] || [];

    /* ---------------------------------------------------------------- */
    /* ACTIONS                                                          */
    /* ---------------------------------------------------------------- */

    const goPrevMonth = () => {

        if (currentMonth === 0) {

            setCurrentMonth(11);

            setCurrentYear((y) => y - 1);

        } else {

            setCurrentMonth((m) => m - 1);
        }
    };

    const goNextMonth = () => {

        if (currentMonth === 11) {

            setCurrentMonth(0);

            setCurrentYear((y) => y + 1);

        } else {

            setCurrentMonth((m) => m + 1);
        }
    };

    const openSidebarForDate = (key) => {

        setSelectedDate(key);

        setSidebarOpen(true);

        setActiveEmployee(null);
    };

    const openEmployee = (employee) => {

        setActiveEmployee(employee);

        setSidebarOpen(true);
    };

    const toggleEmployee = (id) => {

        setSelectedEmployees((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const assignSchedule = () => {

        if (!selectedEmployees.length) return;

        const existing =
            assignments[selectedDate] || [];

        const newAssignments =
            selectedEmployees.map((id) => ({
                employeeId: id,
                ruleId: selectedRule,
            }));

        setAssignments({
            ...assignments,

            [selectedDate]: [
                ...existing,
                ...newAssignments,
            ],
        });

        setSelectedEmployees([]);
    };

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {

        const totalAssignments =
            Object.values(assignments).flat().length;

        return {
            totalAssignments,
            employees: employees.length,
        };

    }, [assignments]);

    /* ---------------------------------------------------------------- */
    /* UI                                                               */
    /* ---------------------------------------------------------------- */

    return (

        <div className="container-fluid p-3 bg-light min-vh-100">

            {/* HEADER */}

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border rounded shadow-sm p-3 mb-3"
            >

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h4 className="mb-1 d-flex align-items-center gap-2">
                            <FaCalendarAlt className="text-primary" />
                            Schedule Assignment Center
                        </h4>

                        <small className="text-muted">
                            Operational workforce scheduling calendar
                        </small>

                    </div>

                    <div className="d-flex gap-2">

                        <span className="badge bg-dark">
                            Employees {stats.employees}
                        </span>

                        <span className="badge bg-primary">
                            Assignments {stats.totalAssignments}
                        </span>

                    </div>

                </div>

            </motion.div>

            {/* CALENDAR */}

            <div className="bg-white border rounded shadow-sm overflow-hidden">

                {/* CALENDAR TOP */}

                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center gap-2">
                        <FaRegCalendarCheck />
                        <strong>Workforce Calendar</strong>
                    </div>

                    <div className="d-flex align-items-center gap-2">

                        <button
                            onClick={goPrevMonth}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="fw-semibold px-3">
                            {monthNames[currentMonth]} {currentYear}
                        </div>

                        <button
                            onClick={goNextMonth}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            <FaChevronRight />
                        </button>

                    </div>

                </div>

                {/* WEEKDAYS */}

                <div className="row g-0 border-bottom bg-light">

                    {weekdays.map((day) => (
                        <div
                            key={day}
                            className="col text-center py-2 fw-semibold small border-end"
                        >
                            {day}
                        </div>
                    ))}

                </div>

                {/* DAYS */}

                <div className="row g-0">

                    {calendarDays.map((item, idx) => {

                        const key = formatDateKey(item.date);

                        const dayAssignments =
                            assignments[key] || [];

                        const isSelected =
                            selectedDate === key;

                        const isToday =
                            formatDateKey(today) === key;

                        return (

                            <motion.div
                                key={idx}

                                whileHover={{
                                    scale: 1.01,
                                }}

                                onClick={() =>
                                    openSidebarForDate(key)
                                }

                                className={`
                                    col
                                    border-end
                                    border-bottom
                                    p-2
                                    position-relative
                                    cursor-pointer
                                    ${isSelected
                                        ? "bg-primary bg-opacity-10"
                                        : "bg-white"
                                    }
                                `}

                                style={{
                                    height: 150,
                                    minWidth: "14.28%",
                                    cursor: "pointer",
                                    opacity:
                                        item.currentMonth
                                            ? 1
                                            : 0.45,
                                }}
                            >

                                {/* DAY HEADER */}

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div
                                        className={`
                                            fw-semibold
                                            rounded-circle
                                            d-flex
                                            align-items-center
                                            justify-content-center
                                            ${
                                                isToday
                                                    ? "bg-primary text-white"
                                                    : ""
                                            }
                                        `}
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    >
                                        {item.date.getDate()}
                                    </div>

                                    {dayAssignments.length > 0 ? (
                                        <span className="badge bg-success">
                                            {dayAssignments.length}
                                        </span>
                                    ) : (
                                        <span className="text-danger small">
                                            Empty
                                        </span>
                                    )}

                                </div>

                                {/* ASSIGNED STAFF */}

                                <div className="small">

                                    {dayAssignments
                                        .slice(0, 3)
                                        .map((a, i) => {

                                            const employee =
                                                employees.find(
                                                    (e) =>
                                                        e.id ===
                                                        a.employeeId
                                                );

                                            return (
                                                <motion.div
                                                    whileHover={{
                                                        x: 3,
                                                    }}

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        openEmployee(employee);
                                                    }}

                                                    key={i}

                                                    className="bg-light border rounded px-2 py-1 mb-1 text-truncate"
                                                >
                                                    {employee?.name}
                                                </motion.div>
                                            );
                                        })}

                                </div>

                            </motion.div>
                        );
                    })}
                </div>

            </div>

            {/* OVERLAY */}

            <AnimatePresence>

                {sidebarOpen && (

                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.35 }}
                            exit={{ opacity: 0 }}
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                            style={{
                                zIndex: 1040,
                            }}
                        />

                        {/* SIDEBAR */}

                        <motion.div

                            initial={{ x: 420 }}

                            animate={{ x: 0 }}

                            exit={{ x: 420 }}

                            transition={{
                                type: "spring",
                                damping: 26,
                            }}

                            className="position-fixed top-0 end-0 bg-white shadow-lg h-100"

                            style={{
                                width: 420,
                                zIndex: 1050,
                                overflowY: "auto",
                            }}
                        >

                            {/* SIDEBAR HEADER */}

                            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">

                                <div>

                                    <h5 className="mb-1">
                                        {activeEmployee
                                            ? "Employee Details"
                                            : "Schedule Details"}
                                    </h5>

                                    <small className="text-muted">
                                        {activeEmployee
                                            ? activeEmployee.name
                                            : selectedDate}
                                    </small>

                                </div>

                                <button
                                    onClick={() =>
                                        setSidebarOpen(false)
                                    }
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    <FaTimes />
                                </button>

                            </div>

                            {/* EMPLOYEE PANEL */}

                            {activeEmployee ? (

                                <div className="p-3">

                                    <div className="border rounded p-3 mb-3">

                                        <div className="fw-semibold fs-5">
                                            {activeEmployee.name}
                                        </div>

                                        <div className="text-muted">
                                            {activeEmployee.department}
                                        </div>

                                        <div className="small mt-2">
                                            {activeEmployee.role}
                                        </div>

                                    </div>

                                    <button className="btn btn-primary w-100">
                                        View Full Profile
                                    </button>

                                </div>

                            ) : (

                                <div className="p-3">

                                    {/* RULE */}

                                    <div className="mb-3">

                                        <label className="form-label small">
                                            Schedule Rule
                                        </label>

                                        <select
                                            className="form-select"
                                            value={selectedRule}
                                            onChange={(e) =>
                                                setSelectedRule(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {scheduleRules.map(
                                                (rule) => (
                                                    <option
                                                        key={rule.id}
                                                        value={rule.id}
                                                    >
                                                        {rule.name}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                    </div>

                                    {/* SEARCH */}

                                    <div className="position-relative mb-3">

                                        <FaSearch
                                            className="position-absolute text-muted"
                                            style={{
                                                top: 12,
                                                left: 12,
                                            }}
                                        />

                                        <input
                                            className="form-control ps-5"
                                            placeholder="Search employees"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {/* EMPLOYEE LIST */}

                                    <div
                                        className="border rounded p-2 mb-3"
                                        style={{
                                            maxHeight: 350,
                                            overflowY: "auto",
                                        }}
                                    >

                                        {filteredEmployees.map(
                                            (emp) => (

                                                <motion.div

                                                    whileHover={{
                                                        scale: 1.01,
                                                    }}

                                                    key={emp.id}

                                                    onClick={() =>
                                                        toggleEmployee(
                                                            emp.id
                                                        )
                                                    }

                                                    className={`
                                                        border
                                                        rounded
                                                        p-2
                                                        mb-2
                                                        cursor-pointer
                                                        ${
                                                            selectedEmployees.includes(
                                                                emp.id
                                                            )
                                                                ? "border-primary bg-primary bg-opacity-10"
                                                                : ""
                                                        }
                                                    `}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >

                                                    <div className="fw-semibold">
                                                        {emp.name}
                                                    </div>

                                                    <div className="small text-muted">
                                                        {emp.department} •{" "}
                                                        {emp.role}
                                                    </div>

                                                </motion.div>
                                            )
                                        )}

                                    </div>

                                    <button
                                        onClick={assignSchedule}
                                        className="btn btn-primary w-100"
                                    >
                                        <FaCheckCircle className="me-2" />
                                        Assign Schedule
                                    </button>

                                    {/* CURRENT ASSIGNMENTS */}

                                    <div className="mt-4">

                                        <div className="fw-semibold mb-2">
                                            Current Assignments
                                        </div>

                                        {!selectedAssignments.length ? (

                                            <div className="alert alert-warning small">
                                                <FaExclamationTriangle className="me-2" />
                                                No employees scheduled
                                            </div>

                                        ) : (

                                            selectedAssignments.map(
                                                (assignment, idx) => {

                                                    const employee =
                                                        employees.find(
                                                            (e) =>
                                                                e.id ===
                                                                assignment.employeeId
                                                        );

                                                    const rule =
                                                        scheduleRules.find(
                                                            (r) =>
                                                                r.id ===
                                                                assignment.ruleId
                                                        );

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="border rounded p-2 mb-2"
                                                        >

                                                            <div className="fw-semibold">
                                                                {employee?.name}
                                                            </div>

                                                            <div className="small text-muted">
                                                                {rule?.name}
                                                            </div>

                                                        </div>
                                                    );
                                                }
                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        </motion.div>
                    </>
                )}

            </AnimatePresence>

        </div>
    );
};