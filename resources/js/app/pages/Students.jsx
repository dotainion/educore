
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../service/Api';
import { routes } from '../routes/Routes';
import { StudentsFilter } from '../components/StudentsFilter';

export const Students = () => {
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

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

        api.get('/students/delete', {
            params: { studentId: student.studentId },
        }).then(() => {
            setStudents((current) => current.filter((item) => item.id !== student.id));
        }).catch((error) => {
            console.error('Failed to delete student:', error);
        });
    };

    const activeCount = students.filter(
        (student) => student.attributes.status.toLowerCase() === 'active'
    ).length;

    const transferredCount = students.filter(
        (student) => student.attributes.status.toLowerCase() === 'transferred'
    ).length;

    useEffect(() => {
        api.get('/student/list').then((response) => {
            setStudents(response.data.students);
        }).catch((error) => {
            console.error('Failed to load students:', error);
        });
    }, []);

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
                    to={routes.studentCrud.absolute(routes.studentCrud.information('new'))}
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
                    <StudentsFilter />
                </div>

                {/* Responsive Student Cards */}
                <div className="card-body bg-body-tertiary p-3 p-lg-4">
                    {students.length > 0 ? (
                        <div className="row g-3">
                            {students.map((student) => (
                                <div
                                    className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                                    key={student.id}
                                >
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => navigate(routes.viewStudent(student.id))}
                                    >
                                        <div className="card-body p-3">
                                            {/* Student Identity */}
                                            <div className="d-flex align-items-start gap-2 mb-3">
                                                <div
                                                    className="rounded-circle bg-primary-subtle text-primary fw-semibold d-flex align-items-center justify-content-center flex-shrink-0"
                                                    style={{ width: '44px', height: '44px' }}
                                                >
                                                    {`${student.attributes.firstName.charAt(0)}${student.attributes.lastName.charAt(0)}`.toUpperCase() || (
                                                        <i className="bi bi-person" />
                                                    )}
                                                </div>

                                                <div className="flex-grow-1 min-w-0">
                                                    <h6 className="fw-bold mb-1 text-break">
                                                        {student.attributes.fullName}
                                                    </h6>
                                                    <span className={`badge rounded-pill ${getStatusClass(student.attributes.status)}`}>
                                                        {student.attributes.status}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light text-danger flex-shrink-0"
                                                    title="Delete student"
                                                    aria-label={`Delete ${student.attributes.fullName}`}
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
                                                        {student.attributes.email || 'No email provided'}
                                                    </span>
                                                </div>

                                                <div className="d-flex align-items-start gap-2">
                                                    <i className="bi bi-telephone text-body-secondary mt-1" />
                                                    <span className="small text-break">
                                                        {student.attributes.phone || 'No phone provided'}
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
                                                            {student.attributes.className || 'Not assigned'}
                                                        </div>
                                                    </div>
                                                </div>

                                                {student.attributes.gender && (
                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-person text-body-secondary mt-1" />
                                                        <div>
                                                            <div className="small text-body-secondary">
                                                                Gender
                                                            </div>
                                                            <div className="small fw-semibold">
                                                                {student.attributes.gender}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {student.attributes.nationality && (
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
                            ))}
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
                        </div>
                    )}
                </div>

                <div className="card-footer bg-body border-0 px-3 px-lg-4 py-3">
                    <small className="text-body-secondary">
                        Showing {students.length} students
                    </small>
                </div>
            </div>
        </div>
    );
};
