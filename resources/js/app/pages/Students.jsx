
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../service/Api';
import { routes } from '../routes/Routes';

export const Students = () => {
    const [search, setSearch] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [students, setStudents] = useState([]);

    const normalizedStudents = students.map((student) => {
        const attributes = student.attributes || {};

        return {
            ...attributes,
            id: student.id,
            firstName: attributes.firstName ?? student.firstName ?? '',
            middleName: attributes.middleName ?? student.middleName ?? '',
            lastName: attributes.lastName ?? student.lastName ?? '',
            email: attributes.email ?? student.email ?? '',
            phone: attributes.phone ?? attributes.contact ?? student.phone ?? '',
            gender: attributes.gender ?? student.gender ?? '',
            className: attributes.className ?? student.className ?? '',
            status: attributes.status ?? student.status ?? 'active',
        };
    });

    const availableClasses = [
        ...new Set(normalizedStudents.map((student) => student.className).filter(Boolean)),
    ];

    const filteredStudents = normalizedStudents.filter((student) => {
        const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;

        const matchesSearch = [
            fullName,
            student.email,
            student.phone,
            student.nationality,
            student.previousSchool,
        ]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesClass =
            classFilter === 'All' || student.className === classFilter;

        const matchesStatus =
            statusFilter === 'All' ||
            student.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesClass && matchesStatus;
    });

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-success-subtle text-success';
            case 'inactive':
                return 'bg-secondary-subtle text-secondary';
            case 'transferred':
                return 'bg-warning-subtle text-warning-emphasis';
            case 'graduated':
                return 'bg-info-subtle text-info-emphasis';
            default:
                return 'bg-secondary-subtle text-secondary';
        }
    };

    const handleDelete = (event, student) => {
        event.stopPropagation();

        if (!window.confirm(
            `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
        )) {
            return;
        }

        api.get('/students/delete', {
            params: { studentId: student.studentId },
        })
            .then(() => {
                setStudents((current) =>
                    current.filter((item) => item.id !== student.id)
                );
            })
            .catch((error) => {
                console.error('Failed to delete student:', error);
                window.alert('Unable to delete student. Please try again.');
            });
    };

    const resetFilters = () => {
        setSearch('');
        setClassFilter('All');
        setStatusFilter('All');
    };

    useEffect(() => {
        api.get('/student/list')
            .then((response) => {
                setStudents(response.data.students || []);
            })
            .catch((error) => {
                console.error('Failed to load students:', error);
            });
    }, []);

    const activeCount = normalizedStudents.filter(
        (student) => student.status.toLowerCase() === 'active'
    ).length;

    const transferredCount = normalizedStudents.filter(
        (student) => student.status.toLowerCase() === 'transferred'
    ).length;

    return (
        <div className="container-fluid py-4 px-3 px-lg-4">
            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Students</h3>
                    <p className="text-body-secondary mb-0">
                        Manage student records and class placements.
                    </p>
                </div>

                <Link
                    to={routes.addStudent}
                    className="btn btn-primary d-inline-flex align-items-center gap-2 px-3"
                >
                    <i className="bi bi-plus-lg" />
                    Add student
                </Link>
            </div>

            {/* Summary */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-primary-subtle text-primary p-2">
                                <i className="bi bi-people fs-4" />
                            </div>
                            <div>
                                <div className="text-body-secondary small">
                                    Total students
                                </div>
                                <div className="fs-3 fw-bold">
                                    {students.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-success-subtle text-success p-2">
                                <i className="bi bi-person-check fs-4" />
                            </div>
                            <div>
                                <div className="text-body-secondary small">
                                    Active students
                                </div>
                                <div className="fs-3 fw-bold">
                                    {activeCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-warning-subtle text-warning p-2">
                                <i className="bi bi-person-exclamation fs-4" />
                            </div>
                            <div>
                                <div className="text-body-secondary small">
                                    Transferred students
                                </div>
                                <div className="fs-3 fw-bold">
                                    {transferredCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Directory */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-body border-0 p-3 p-lg-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-2 mb-3">
                        <div>
                            <h5 className="fw-bold mb-1">Student directory</h5>
                            <p className="small text-body-secondary mb-0">
                                Showing {filteredStudents.length} of {students.length} students
                            </p>
                        </div>

                        {(search || classFilter !== 'All' || statusFilter !== 'All') && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary align-self-start"
                                onClick={resetFilters}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2" />
                                Clear filters
                            </button>
                        )}
                    </div>

                    <div className="row g-2">
                        <div className="col-12 col-lg-6">
                            <div className="input-group">
                                <span className="input-group-text bg-body-tertiary border-end-0">
                                    <i className="bi bi-search text-body-secondary" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control bg-body-tertiary border-start-0"
                                    placeholder="Search by name, email or phone"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    aria-label="Search students"
                                />
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <select
                                className="form-select"
                                value={classFilter}
                                onChange={(event) => setClassFilter(event.target.value)}
                                aria-label="Filter by class"
                            >
                                <option value="All">All classes</option>
                                {availableClasses.map((schoolClass) => (
                                    <option key={schoolClass} value={schoolClass}>
                                        {schoolClass}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-6 col-lg-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                aria-label="Filter by status"
                            >
                                <option value="All">All statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="transferred">Transferred</option>
                                <option value="graduated">Graduated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Responsive Student Cards */}
                <div className="card-body bg-body-tertiary p-3 p-lg-4">
                    {filteredStudents.length > 0 ? (
                        <div className="row g-3">
                            {filteredStudents.map((student) => {
                                const fullName = [
                                    student.firstName,
                                    student.middleName,
                                    student.lastName,
                                ].filter(Boolean).join(' ');

                                return (
                                    <div
                                        key={student.id}
                                        className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                                    >
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => navigate('/student/create')}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    navigate('/student/create');
                                                }
                                            }}
                                        >
                                            <div className="card-body p-3">
                                                {/* Student Identity */}
                                                <div className="d-flex align-items-start gap-2 mb-3">
                                                    <div
                                                        className="rounded-circle bg-primary-subtle text-primary fw-semibold d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{ width: '44px', height: '44px' }}
                                                    >
                                                        {`${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase() || (
                                                            <i className="bi bi-person" />
                                                        )}
                                                    </div>

                                                    <div className="flex-grow-1 min-w-0">
                                                        <h6 className="fw-bold mb-1 text-break">
                                                            {fullName || 'Unnamed student'}
                                                        </h6>
                                                        <span className={`badge rounded-pill ${getStatusClass(student.status)}`}>
                                                            {student.status}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-danger flex-shrink-0"
                                                        title="Delete student"
                                                        aria-label={`Delete ${fullName}`}
                                                        onClick={(event) => handleDelete(event, student)}
                                                    >
                                                        <i className="bi bi-trash3" />
                                                    </button>
                                                </div>

                                                {/* Contact Details */}
                                                <div className="d-flex flex-column gap-2">
                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-envelope text-body-secondary mt-1" />
                                                        <span className="small text-break">
                                                            {student.email || 'No email provided'}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-telephone text-body-secondary mt-1" />
                                                        <span className="small text-break">
                                                            {student.phone || 'No phone provided'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <hr className="my-3" />

                                                {/* Class and Student Details */}
                                                <div className="d-flex flex-column gap-2">
                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-people text-body-secondary mt-1" />
                                                        <div className="min-w-0">
                                                            <div className="small text-body-secondary">
                                                                Class
                                                            </div>
                                                            <div className="small fw-semibold text-break">
                                                                {student.className || 'Not assigned'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {student.gender && (
                                                        <div className="d-flex align-items-start gap-2">
                                                            <i className="bi bi-person text-body-secondary mt-1" />
                                                            <div>
                                                                <div className="small text-body-secondary">
                                                                    Gender
                                                                </div>
                                                                <div className="small fw-semibold">
                                                                    {student.gender}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {student.nationality && (
                                                        <div className="d-flex align-items-start gap-2">
                                                            <i className="bi bi-globe text-body-secondary mt-1" />
                                                            <div className="min-w-0">
                                                                <div className="small text-body-secondary">
                                                                    Nationality
                                                                </div>
                                                                <div className="small fw-semibold text-break">
                                                                    {student.nationality}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-5 px-3">
                            <i className="bi bi-people fs-1 text-body-secondary" />
                            <h6 className="fw-semibold mt-3 mb-1">
                                {students.length ? 'No students found' : 'No students available'}
                            </h6>
                            <p className="text-body-secondary small mb-3">
                                {students.length
                                    ? 'Try changing your search or filters.'
                                    : 'Students will appear here when available.'}
                            </p>

                            {(search || classFilter !== 'All' || statusFilter !== 'All') && (
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={resetFilters}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="card-footer bg-body border-0 px-3 px-lg-4 py-3">
                    <small className="text-body-secondary">
                        Showing {filteredStudents.length} of {students.length} students
                    </small>
                </div>
            </div>
        </div>
    );
};
