import React, { useMemo, useState } from "react";

import {
    FaBan,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaEdit,
    FaPlus,
    FaSearch,
    FaTrash,
    FaUserClock,
    FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";

export const EmployeeAvailabilityManager = () => {

    /* ---------------------------------------------------------------- */
    /* EMPLOYEES                                                        */
    /* ---------------------------------------------------------------- */

    const [employees] = useState([
        {
            id: "EMP-001",
            name: "Olivia Martin",
            department: "Operations",
            status: "Available",
            maxHours: 40,
        },

        {
            id: "EMP-002",
            name: "Daniel James",
            department: "Engineering",
            status: "Restricted",
            maxHours: 32,
        },

        {
            id: "EMP-003",
            name: "Sophia Brown",
            department: "Support",
            status: "Unavailable",
            maxHours: 20,
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* RULES                                                            */
    /* ---------------------------------------------------------------- */

    const [rules] = useState([
        {
            id: "RULE-001",
            employeeId: "EMP-001",
            title: "Unavailable Sundays",
            description: "Recurring weekly restriction",
        },

        {
            id: "RULE-002",
            employeeId: "EMP-002",
            title: "No Morning Shifts",
            description: "Employee restricted from morning scheduling",
        },

        {
            id: "RULE-003",
            employeeId: "EMP-003",
            title: "Vacation Leave",
            description: "Unavailable until May 20",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selectedEmployee, setSelectedEmployee] =
        useState(employees[0]);

    const [search, setSearch] = useState("");

    /* ---------------------------------------------------------------- */
    /* FILTERED                                                         */
    /* ---------------------------------------------------------------- */

    const filteredEmployees = useMemo(() => {

        return employees.filter((emp) =>
            emp.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [employees, search]);

    /* ---------------------------------------------------------------- */
    /* EMPLOYEE RULES                                                   */
    /* ---------------------------------------------------------------- */

    const employeeRules = useMemo(() => {

        return rules.filter(
            (rule) =>
                rule.employeeId ===
                selectedEmployee?.id
        );

    }, [rules, selectedEmployee]);

    /* ---------------------------------------------------------------- */
    /* STATUS                                                           */
    /* ---------------------------------------------------------------- */

    const getStatusColor = (status) => {

        switch (status) {

            case "Available":
                return "success";

            case "Restricted":
                return "warning";

            case "Unavailable":
                return "danger";

            default:
                return "secondary";
        }
    };

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

                <h3 className="mb-1 d-flex align-items-center gap-2">
                    <FaUserClock className="text-primary" />
                    Employee Availability Manager
                </h3>

                <p className="text-muted mb-0">
                    Manage employee scheduling eligibility, restrictions,
                    and availability rules.
                </p>

            </div>

            <div className="row g-4">

                {/* LEFT SIDE */}
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
                                placeholder="Search employees..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* EMPLOYEE LIST */}
                    <div className="bg-white border rounded overflow-hidden">

                        <div className="p-3 border-bottom d-flex align-items-center gap-2 fw-semibold">

                            <FaUsers />

                            Employees

                        </div>

                        {filteredEmployees.map((emp) => (

                            <div
                                key={emp.id}
                                onClick={() =>
                                    setSelectedEmployee(emp)
                                }
                                className={`p-3 border-bottom ${
                                    selectedEmployee?.id === emp.id
                                        ? "bg-primary bg-opacity-10"
                                        : ""
                                }`}
                                style={{
                                    cursor: "pointer",
                                }}
                            >

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <div className="fw-semibold">
                                            {emp.name}
                                        </div>

                                        <div className="small text-muted">
                                            {emp.department}
                                        </div>

                                    </div>

                                    <span
                                        className={`badge bg-${getStatusColor(
                                            emp.status
                                        )}`}
                                    >
                                        {emp.status}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-xl-8">

                    {/* STATUS */}
                    <div className="bg-white border rounded p-4 mb-4">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                            <div>

                                <h4 className="mb-1">
                                    {selectedEmployee?.name}
                                </h4>

                                <div className="text-muted small">
                                    {selectedEmployee?.department}
                                </div>

                            </div>

                            <span
                                className={`badge bg-${getStatusColor(
                                    selectedEmployee?.status
                                )} px-3 py-2`}
                            >
                                {selectedEmployee?.status}
                            </span>

                        </div>

                        <hr />

                        <div className="row g-3">

                            <div className="col-md-6">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Scheduling Eligibility
                                    </div>

                                    <div className="fw-semibold">
                                        {selectedEmployee?.status === "Available"
                                            ? "Eligible for Scheduling"
                                            : selectedEmployee?.status === "Restricted"
                                            ? "Restricted Scheduling"
                                            : "Not Eligible"}
                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="border rounded p-3 h-100">

                                    <div className="small text-muted mb-1">
                                        Weekly Hour Limit
                                    </div>

                                    <div className="fw-semibold">
                                        {selectedEmployee?.maxHours} hrs/week
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RULES */}
                    <div className="bg-white border rounded p-4 mb-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>

                                <h5 className="mb-1">
                                    Scheduling Restrictions
                                </h5>

                                <div className="small text-muted">
                                    Rules affecting scheduling availability.
                                </div>

                            </div>

                            <button className="btn btn-primary btn-sm">

                                <FaPlus className="me-2" />

                                Add Restriction

                            </button>

                        </div>

                        {!employeeRules.length ? (

                            <div className="alert alert-success mb-0">

                                <FaCheckCircle className="me-2" />

                                No scheduling restrictions found.

                            </div>

                        ) : (

                            <div className="d-flex flex-column gap-3">

                                {employeeRules.map((rule) => (

                                    <div
                                        key={rule.id}
                                        className="border rounded p-3"
                                    >

                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                            <div>

                                                <div className="fw-semibold">
                                                    {rule.title}
                                                </div>

                                                <div className="small text-muted">
                                                    {rule.description}
                                                </div>

                                            </div>

                                            <div className="d-flex gap-2">

                                                <button className="btn btn-sm btn-outline-secondary">

                                                    <FaEdit />

                                                </button>

                                                <button className="btn btn-sm btn-outline-danger">

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* WEEKLY AVAILABILITY */}
                    <div className="bg-white border rounded p-4">

                        <div className="d-flex align-items-center gap-2 mb-4">

                            <FaCalendarAlt />

                            <h5 className="mb-0">
                                Weekly Availability
                            </h5>

                        </div>

                        <div className="row g-2">

                            {[
                                {
                                    day: "Mon",
                                    status: "Available",
                                },

                                {
                                    day: "Tue",
                                    status: "Available",
                                },

                                {
                                    day: "Wed",
                                    status: "Morning Only",
                                },

                                {
                                    day: "Thu",
                                    status: "Unavailable",
                                },

                                {
                                    day: "Fri",
                                    status: "Available",
                                },

                                {
                                    day: "Sat",
                                    status: "Available",
                                },

                                {
                                    day: "Sun",
                                    status: "Unavailable",
                                },
                            ].map((day) => (

                                <div
                                    key={day.day}
                                    className="col-md-3"
                                >

                                    <div className="border rounded p-3 h-100">

                                        <div className="fw-semibold mb-2">
                                            {day.day}
                                        </div>

                                        <div
                                            className={`small fw-medium ${
                                                day.status === "Unavailable"
                                                    ? "text-danger"
                                                    : day.status === "Morning Only"
                                                    ? "text-warning"
                                                    : "text-success"
                                            }`}
                                        >
                                            {day.status}
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </motion.div>
    );
};