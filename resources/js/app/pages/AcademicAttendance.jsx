import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/Routes';

export const AcademicAttendance = () => {
    const attendanceOptions = [
        {
            title: 'Take Attendance',
            description: 'Record daily attendance for students in each class and manage their attendance status.',
            icon: 'bi-calendar2-check',
            route: routes.takeAttendance,
            label: 'Open Attendance',
            color: 'primary',
        },
        {
            title: 'Attendance History',
            description: 'Review previous attendance records and track student attendance over time.',
            icon: 'bi-clock-history',
            route: routes.attendanceHistory,
            label: 'View History',
            color: 'success',
        },
    ];

    return (
        <div className="container-fluid py-3 py-md-4">
            {/* Page Header */}
            <div className="mb-4">
                <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
                    <i className="bi bi-grid"></i>
                    <span>School Management</span>
                    <i className="bi bi-chevron-right"></i>
                    <span className="text-primary fw-semibold">Attendance</span>
                </div>

                <h2 className="fw-bold mb-2">Attendance Management</h2>

                <p className="text-secondary mb-0">
                    Manage daily student attendance and review attendance records.
                </p>
            </div>

            {/* Navigation Options */}
            <div className="row g-4">
                {attendanceOptions.map((option) => (
                    <div className="col-12 col-md-6" key={option.title}>
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4 p-lg-5">
                                <div className="d-flex align-items-start justify-content-between gap-3 mb-4">
                                    <div
                                        className={`rounded-4 bg-${option.color} bg-opacity-10 text-${option.color} d-flex align-items-center justify-content-center`}
                                        style={{ width: '64px', height: '64px' }}
                                    >
                                        <i className={`bi ${option.icon} fs-2`}></i>
                                    </div>

                                    <span className="badge rounded-pill text-bg-light border text-secondary px-3 py-2">
                                        Attendance
                                    </span>
                                </div>

                                <h4 className="fw-bold mb-2">{option.title}</h4>

                                <p className="text-secondary mb-4">
                                    {option.description}
                                </p>

                                <Link
                                    to={option.route}
                                    className={`btn btn-${option.color} rounded-3 px-4 py-2`}
                                >
                                    {option.label}
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>

                            <div
                                className={`border-top border-${option.color} border-3 opacity-50`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
