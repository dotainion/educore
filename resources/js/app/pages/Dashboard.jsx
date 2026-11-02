import { useState } from "react";

export const Dashboard = () => {
    const [selectedTerm, setSelectedTerm] = useState("Term 1");

    const stats = [
        {
            title: "Total Students",
            value: "1,248",
            change: "+8.2%",
            description: "Compared to last year",
            icon: "bi-people",
            color: "primary",
            trend: "up",
        },
        {
            title: "Teaching Staff",
            value: "64",
            change: "+4",
            description: "New teachers this year",
            icon: "bi-person-workspace",
            color: "success",
            trend: "up",
        },
        {
            title: "Attendance Rate",
            value: "94.6%",
            change: "+2.4%",
            description: "Compared to last month",
            icon: "bi-calendar-check",
            color: "info",
            trend: "up",
        },
        {
            title: "Outstanding Fees",
            value: "$24,850",
            change: "12.5%",
            description: "Of expected school fees",
            icon: "bi-wallet2",
            color: "warning",
            trend: "down",
        },
    ];

    const attendanceData = [
        { day: "Mon", value: 96 },
        { day: "Tue", value: 91 },
        { day: "Wed", value: 94 },
        { day: "Thu", value: 88 },
        { day: "Fri", value: 97 },
    ];

    const classes = [
        { name: "Form 1A", teacher: "Mrs. James", students: 32, attendance: 96 },
        { name: "Form 2B", teacher: "Mr. Charles", students: 29, attendance: 91 },
        { name: "Form 3A", teacher: "Mrs. Thomas", students: 34, attendance: 88 },
        { name: "Form 4B", teacher: "Mr. Francis", students: 27, attendance: 94 },
    ];

    const activities = [
        {
            title: "New student enrolled",
            description: "Amelia Roberts was enrolled in Form 1A.",
            time: "10 minutes ago",
            icon: "bi-person-plus",
            color: "primary",
        },
        {
            title: "Attendance submitted",
            description: "Form 3A attendance was recorded.",
            time: "35 minutes ago",
            icon: "bi-calendar-check",
            color: "success",
        },
        {
            title: "Grades updated",
            description: "Mathematics grades were updated for Form 4B.",
            time: "1 hour ago",
            icon: "bi-journal-check",
            color: "info",
        },
        {
            title: "Fee payment received",
            description: "A school fee payment was recorded.",
            time: "2 hours ago",
            icon: "bi-cash-stack",
            color: "warning",
        },
    ];

    const upcomingEvents = [
        { title: "Midterm Examinations", date: "Oct 26", category: "Academic" },
        { title: "Parent-Teacher Meeting", date: "Oct 29", category: "Meeting" },
        { title: "Sports Day", date: "Nov 05", category: "School Event" },
    ];

    const quickActions = [
        { title: "Add Student", icon: "bi-person-plus", route: "/students/create", color: "primary" },
        { title: "Add Teacher", icon: "bi-person-workspace", route: "/teachers/create", color: "success" },
        { title: "Take Attendance", icon: "bi-calendar-check", route: "/attendance", color: "info" },
        { title: "View Reports", icon: "bi-file-earmark-bar-graph", route: "/reports-analytics", color: "warning" },
    ];

    return (
        <div className="container-fluid px-0">
            {/* Page Heading */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Dashboard</h3>
                    <p className="text-secondary mb-0">
                        Here's what's happening at your school today.
                    </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <select
                        className="form-select"
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                        aria-label="Select academic term"
                    >
                        <option value="Term 1">Term 1</option>
                        <option value="Term 2">Term 2</option>
                        <option value="Term 3">Term 3</option>
                    </select>

                    <button
                        type="button"
                        className="btn btn-primary text-nowrap"
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer me-2"></i>
                        Print
                    </button>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="card border-0 shadow-sm mb-4 overflow-hidden">
                <div className="card-body p-4 p-lg-5 bg-primary text-white">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <span className="badge bg-white text-primary mb-3">
                                {selectedTerm} · Academic Year 2026/2027
                            </span>

                            <h2 className="fw-bold mb-2">
                                Welcome back, Administrator!
                            </h2>

                            <p className="mb-0 opacity-75">
                                Your school at a glance. Monitor student performance,
                                attendance, academic progress, and daily activities
                                from one place.
                            </p>
                        </div>

                        <div className="col-lg-4 text-lg-end">
                            <i className="bi bi-mortarboard display-1 opacity-75"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="row g-3 mb-4">
                {stats.map((stat) => (
                    <div className="col-12 col-sm-6 col-xl-3" key={stat.title}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <p className="text-secondary small mb-2">
                                            {stat.title}
                                        </p>
                                        <h3 className="fw-bold mb-0">{stat.value}</h3>
                                    </div>

                                    <div
                                        className={`bg-${stat.color}-subtle text-${stat.color} rounded-3 p-3`}
                                    >
                                        <i className={`bi ${stat.icon} fs-4`}></i>
                                    </div>
                                </div>

                                <div className="small">
                                    <span
                                        className={
                                            stat.trend === "up"
                                                ? "text-success fw-semibold"
                                                : "text-warning fw-semibold"
                                        }
                                    >
                                        {stat.trend === "up" && (
                                            <i className="bi bi-arrow-up-right me-1"></i>
                                        )}
                                        {stat.change}
                                    </span>
                                    <span className="text-secondary ms-2">
                                        {stat.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="fw-bold mb-1">Quick Actions</h5>
                            <p className="text-secondary small mb-0">
                                Common tasks at your fingertips
                            </p>
                        </div>
                    </div>

                    <div className="row g-3">
                        {quickActions.map((action) => (
                            <div className="col-6 col-lg-3" key={action.title}>
                                <a
                                    href={action.route}
                                    className="btn btn-light border w-100 h-100 p-3 text-start"
                                >
                                    <i
                                        className={`bi ${action.icon} fs-4 text-${action.color} d-block mb-2`}
                                    ></i>
                                    <span className="fw-semibold">{action.title}</span>
                                    <i className="bi bi-arrow-up-right float-end text-secondary"></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Attendance Overview */}
                <div className="col-12 col-xl-7">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">Attendance Overview</h5>
                                    <p className="text-secondary small mb-0">
                                        Daily student attendance this week
                                    </p>
                                </div>

                                <span className="badge bg-success-subtle text-success">
                                    <i className="bi bi-arrow-up-right me-1"></i>
                                    94.6% average
                                </span>
                            </div>

                            <div className="d-flex align-items-end justify-content-around gap-3">
                                {attendanceData.map((item) => (
                                    <div
                                        key={item.day}
                                        className="d-flex flex-column align-items-center flex-fill"
                                    >
                                        <span className="small fw-semibold mb-2">
                                            {item.value}%
                                        </span>

                                        <div
                                            className="w-100 bg-body-secondary rounded-top overflow-hidden"
                                            style={{ height: "180px" }}
                                        >
                                            <div
                                                className="bg-primary rounded-top w-100"
                                                style={{
                                                    height: `${item.value}%`,
                                                    marginTop: `${100 - item.value}%`,
                                                }}
                                            ></div>
                                        </div>

                                        <span className="text-secondary small mt-2">
                                            {item.day}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-top mt-4 pt-3 d-flex justify-content-between">
                                <span className="text-secondary small">
                                    Target attendance
                                </span>
                                <span className="fw-semibold small">95%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="col-12 col-xl-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">Upcoming Events</h5>
                                    <p className="text-secondary small mb-0">
                                        Important dates to remember
                                    </p>
                                </div>
                                <i className="bi bi-calendar-event fs-4 text-primary"></i>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {upcomingEvents.map((event) => (
                                    <div
                                        key={event.title}
                                        className="d-flex align-items-center gap-3 border-bottom pb-3"
                                    >
                                        <div className="bg-primary-subtle text-primary rounded-3 p-3 text-center">
                                            <i className="bi bi-calendar2-week fs-4"></i>
                                        </div>

                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-1">
                                                {event.title}
                                            </h6>
                                            <span className="text-secondary small">
                                                {event.category}
                                            </span>
                                        </div>

                                        <span className="badge bg-light text-dark border">
                                            {event.date}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-primary w-100 mt-3"
                                onClick={() => window.alert("Connect this button to your calendar page.")}
                            >
                                View School Calendar
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Class Overview */}
                <div className="col-12 col-xl-7">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">Class Overview</h5>
                                    <p className="text-secondary small mb-0">
                                        Attendance and enrollment by class
                                    </p>
                                </div>
                                <a href="/classes" className="btn btn-sm btn-outline-primary">
                                    View All
                                </a>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Class</th>
                                            <th>Class Teacher</th>
                                            <th>Students</th>
                                            <th>Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classes.map((item) => (
                                            <tr key={item.name}>
                                                <td className="fw-semibold">{item.name}</td>
                                                <td className="text-secondary">
                                                    {item.teacher}
                                                </td>
                                                <td>{item.students}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div
                                                            className="progress flex-grow-1"
                                                            role="progressbar"
                                                            aria-valuenow={item.attendance}
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            aria-label={`${item.name} attendance`}
                                                            style={{ height: "6px" }}
                                                        >
                                                            <div
                                                                className={`progress-bar ${
                                                                    item.attendance >= 95
                                                                        ? "bg-success"
                                                                        : item.attendance >= 90
                                                                          ? "bg-primary"
                                                                          : "bg-warning"
                                                                }`}
                                                                style={{
                                                                    width: `${item.attendance}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="small fw-semibold">
                                                            {item.attendance}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-12 col-xl-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <h5 className="fw-bold mb-1">Recent Activity</h5>
                                <p className="text-secondary small mb-0">
                                    Latest updates across your school
                                </p>
                            </div>

                            <div className="d-flex flex-column gap-4">
                                {activities.map((activity) => (
                                    <div
                                        key={activity.title}
                                        className="d-flex gap-3"
                                    >
                                        <div
                                            className={`bg-${activity.color}-subtle text-${activity.color} rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
                                            style={{ width: "42px", height: "42px" }}
                                        >
                                            <i className={`bi ${activity.icon}`}></i>
                                        </div>

                                        <div className="flex-grow-1">
                                            <h6 className="fw-semibold mb-1">
                                                {activity.title}
                                            </h6>
                                            <p className="text-secondary small mb-1">
                                                {activity.description}
                                            </p>
                                            <span className="text-secondary small">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="alert alert-light border d-flex align-items-start gap-2 mb-0">
                <i className="bi bi-info-circle text-primary fs-5"></i>
                <div className="small text-secondary">
                    <strong className="text-dark">Demo data:</strong> Dashboard figures,
                    events, and activities are sample values. Connect your backend
                    APIs to display real school information.
                </div>
            </div>
        </div>
    );
};