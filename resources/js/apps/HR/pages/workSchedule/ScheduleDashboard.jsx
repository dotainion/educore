import React from "react";
import {
    FaArrowRight,
    FaCalendarAlt,
    FaCalendarCheck,
    FaCheckCircle,
    FaClipboardList,
    FaClock,
    FaCogs,
    FaExchangeAlt,
    FaExclamationTriangle,
    FaHistory,
    FaMagic,
    FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ScheduleDashboard = () => {
    const navigate = useNavigate();

    const priorityActions = [
        {
            title: "Open Schedule Calendar",
            description: "View and manage current schedules",
            icon: FaCalendarAlt,
            route: routes.hr.workSchedule.calendarView,
        },
        {
            title: "Generate Schedule",
            description: "Auto-build schedules using staffing rules",
            icon: FaMagic,
            route: routes.hr.workSchedule.autoScheduleGenerator,
        },
        {
            title: "Assign Employees",
            description: "Assign employees to shifts and rotations",
            icon: FaClipboardList,
            route: routes.hr.workSchedule.assignmentCenter,
        },
    ];

    const tools = [
        {
            label: "Approvals",
            icon: FaCheckCircle,
            route: routes.hr.workSchedule.approvalWorkflow,
        },
        {
            label: "Availability",
            icon: FaUsers,
            route: routes.hr.workSchedule.employeeAvailabilityManager,
        },
        {
            label: "Coverage Monitor",
            icon: FaClock,
            route: routes.hr.workSchedule.coverageMonitor,
        },
        {
            label: "Shift Swaps",
            icon: FaExchangeAlt,
            route: routes.hr.workSchedule.shiftSwapCenter,
        },
        {
            label: "Rules Builder",
            icon: FaCogs,
            route: routes.hr.workSchedule.ruleBuilder,
        },
        {
            label: "Publish Center",
            icon: FaCheckCircle,
            route: routes.hr.workSchedule.publishCenter,
        },{
            label: 'Shift Builder',
            icon: FaCalendarCheck,
            route: routes.hr.workSchedule.shiftBuilder,
        },
        {
            label: "Audit Logs",
            icon: FaHistory,
            route: routes.hr.workSchedule.auditTrailViewer,
        },
    ];

    return (
        <motion.div
            className="container-fluid px-4 py-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* HEADER */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">

                <div>
                    <h3 className="mb-1">Workforce Scheduling</h3>

                    <p className="text-muted mb-0">
                        Manage schedules, assignments, approvals, and workforce coverage.
                    </p>
                </div>

                {/* OPERATIONAL STATUS */}
                <div className="d-flex flex-wrap gap-2">

                    <div
                        className="d-flex align-items-center gap-2 px-3 py-2 bg-white border"
                        style={{
                            borderRadius: 999,
                            fontSize: 14,
                        }}
                    >
                        <span
                            className="bg-danger"
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                            }}
                        />

                        <span className="fw-medium">
                            2 Conflicts
                        </span>
                    </div>

                    <div
                        className="d-flex align-items-center gap-2 px-3 py-2 bg-white border"
                        style={{
                            borderRadius: 999,
                            fontSize: 14,
                        }}
                    >
                        <span
                            className="bg-warning"
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                            }}
                        />

                        <span className="fw-medium">
                            5 Pending Approvals
                        </span>
                    </div>

                    <div
                        className="d-flex align-items-center gap-2 px-3 py-2 bg-white border"
                        style={{
                            borderRadius: 999,
                            fontSize: 14,
                        }}
                    >
                        <span
                            className="bg-primary"
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                            }}
                        />

                        <span className="fw-medium">
                            Next Week Unpublished
                        </span>
                    </div>

                </div>
            </div>

            {/* PRIMARY ACTIONS */}
            <div className="row g-3 mb-4">

                {priorityActions.map((action) => (
                    <div
                        key={action.title}
                        className="col-12 col-lg-4"
                    >
                        <div
                            className="bg-white border rounded p-4 h-100"
                            role="button"
                            onClick={() => navigate(action.route)}
                            style={{
                                transition: "0.2s ease",
                                borderRadius: 14,
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 24px rgba(0,0,0,0.06)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">

                                <div
                                    className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 14,
                                    }}
                                >
                                    <action.icon size={18} />
                                </div>

                                <FaArrowRight className="text-muted" />
                            </div>

                            <h5 className="mb-2">
                                {action.title}
                            </h5>

                            <p className="text-muted small mb-0">
                                {action.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* TOOLS */}
            <div className="bg-white border rounded p-4">

                <div className="d-flex align-items-center justify-content-between mb-3">

                    <div>
                        <h5 className="mb-1">
                            Scheduling Tools
                        </h5>

                        <small className="text-muted">
                            Additional workforce scheduling operations and configuration tools.
                        </small>
                    </div>
                </div>

                <div className="row g-3">

                    {tools.map((tool) => (
                        <div
                            key={tool.label}
                            className="col-12 col-sm-6 col-lg-4"
                        >
                            <div
                                className="border rounded p-3 h-100 d-flex align-items-center justify-content-between"
                                role="button"
                                onClick={() => navigate(tool.route)}
                                style={{
                                    transition: "0.2s ease",
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    background: "white",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f8f9fa";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "white";
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">

                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light"
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <tool.icon className="text-primary" />
                                    </div>

                                    <span className="fw-medium">
                                        {tool.label}
                                    </span>
                                </div>

                                <FaArrowRight
                                    className="text-muted"
                                    size={12}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};