
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../service/Api';

export const Teachers = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getName = (attributes = {}) =>
        attributes.fullName ||
        [attributes.firstName, attributes.lastName].filter(Boolean).join(' ') ||
        'Unnamed teacher';

    const getSubjects = (attributes = {}) => {
        const subjects = attributes.subjects || [];

        return subjects.map((subject) =>
            typeof subject === 'string'
                ? subject
                : subject.attributes?.name || subject.name || ''
        ).filter(Boolean);
    };

    const getClasses = (attributes = {}) => {
        const classes = attributes.classes || [];

        return classes.map((classItem) =>
            typeof classItem === 'string'
                ? classItem
                : classItem.attributes?.name || classItem.name || ''
        ).filter(Boolean);
    };

    const getInitials = (name = '') =>
        name.trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase();

    const getStatusClass = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'active':
                return 'bg-success-subtle text-success';
            case 'inactive':
                return 'bg-secondary-subtle text-secondary';
            default:
                return 'bg-warning-subtle text-warning-emphasis';
        }
    };

    const filteredTeachers = useMemo(() => {
        const term = search.trim().toLowerCase();

        return teachers.filter((teacher) => {
            const attributes = teacher.attributes || {};
            const name = getName(attributes);
            const subjects = getSubjects(attributes);
            const classes = getClasses(attributes);

            const searchableText = [
                name,
                attributes.email,
                attributes.contact,
                attributes.phone,
                attributes.gender,
                ...subjects,
                ...classes,
            ].filter(Boolean).join(' ').toLowerCase();

            const matchesSearch = searchableText.includes(term);

            const matchesStatus =
                statusFilter === 'All' ||
                (attributes.status || '').toLowerCase() ===
                    statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [teachers, search, statusFilter]);

    const activeCount = teachers.filter(
        (teacher) =>
            teacher.attributes?.status?.toLowerCase() === 'active'
    ).length;

    const inactiveCount = teachers.filter(
        (teacher) =>
            teacher.attributes?.status?.toLowerCase() === 'inactive'
    ).length;

    const resetFilters = () => {
        setSearch('');
        setStatusFilter('All');
    };

    const loadTeachers = () => {
        setLoading(true);
        setError('');

        api.get('/user/list')
            .then((response) => {
                setTeachers(response.data.users || []);
            })
            .catch((err) => {
                console.error('Failed to load teachers:', err);
                setError('Unable to load teachers. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (event, id, name) => {
        event.stopPropagation();

        if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
            return;
        }

        api.get('/user/delete', { params: { userId: id } })
            .then(() => {
                setTeachers((previous) =>
                    previous.filter((teacher) => teacher.id !== id)
                );
            })
            .catch((err) => {
                console.error('Failed to delete teacher:', err);
                window.alert('Unable to delete this teacher. Please try again.');
            });
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    return (
        <div className="container-fluid py-3 py-lg-4 px-3 px-lg-4">
            {/* Header */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Teachers</h3>
                    <p className="text-body-secondary mb-0">
                        Manage teaching staff and their assignments.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={() => window.dispatchEvent(new Event('add-teacher'))}
                >
                    <i className="bi bi-plus-lg" />
                    Add teacher
                </button>
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
                                <div className="small text-body-secondary">
                                    Total teachers
                                </div>
                                <h4 className="fw-bold mb-0">
                                    {teachers.length}
                                </h4>
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
                                <div className="small text-body-secondary">
                                    Active teachers
                                </div>
                                <h4 className="fw-bold mb-0">
                                    {activeCount}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-secondary-subtle text-secondary p-2">
                                <i className="bi bi-person-dash fs-4" />
                            </div>
                            <div>
                                <div className="small text-body-secondary">
                                    Inactive teachers
                                </div>
                                <h4 className="fw-bold mb-0">
                                    {inactiveCount}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Directory */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-body border-0 p-3 p-lg-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                        <div>
                            <h5 className="fw-bold mb-1">Teacher directory</h5>
                            <p className="small text-body-secondary mb-0">
                                Showing {filteredTeachers.length} of {teachers.length} teachers
                            </p>
                        </div>

                        {(search || statusFilter !== 'All') && (
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
                        <div className="col-12 col-lg-8">
                            <div className="input-group">
                                <span className="input-group-text bg-body-tertiary border-end-0">
                                    <i className="bi bi-search text-body-secondary" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control bg-body-tertiary border-start-0"
                                    placeholder="Search name, email, contact, subject..."
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    aria-label="Search teachers"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                aria-label="Filter by status"
                            >
                                <option value="All">All statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Teacher Cards */}
                <div className="card-body p-3 p-lg-4 bg-body-tertiary">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-body-secondary mt-2 mb-0">
                                Loading teachers...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-5">
                            <i className="bi bi-exclamation-circle fs-1 text-danger d-block mb-3" />
                            <p className="text-body-secondary mb-3">{error}</p>
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={loadTeachers}
                            >
                                <i className="bi bi-arrow-clockwise me-2" />
                                Try again
                            </button>
                        </div>
                    ) : filteredTeachers.length > 0 ? (
                        <div className="row g-3">
                            {filteredTeachers.map((teacher) => {
                                const attributes = teacher.attributes || {};
                                const name = getName(attributes);
                                const subjects = getSubjects(attributes);
                                const classes = getClasses(attributes);
                                const status = attributes.status || 'Unknown';

                                return (
                                    <div
                                        className="col-12 col-sm-6 col-lg-4 col-xl-4"
                                        key={teacher.id}
                                    >
                                        <div className="card border-0 shadow-sm h-100">
                                            <div className="card-body p-3">
                                                {/* Teacher identity */}
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <div
                                                        className="rounded-circle bg-primary-subtle text-primary fw-semibold d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{ width: '42px', height: '42px' }}
                                                    >
                                                        {getInitials(name) || (
                                                            <i className="bi bi-person" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-grow-1">
                                                        <h6 className="fw-bold mb-1 text-break">
                                                            {name}
                                                        </h6>
                                                        <span className={`badge rounded-pill ${getStatusClass(status)}`}>
                                                            {status}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-danger flex-shrink-0"
                                                        title="Delete teacher"
                                                        aria-label={`Delete ${name}`}
                                                        onClick={(event) =>
                                                            handleDelete(event, teacher.id, name)
                                                        }
                                                    >
                                                        <i className="bi bi-trash3" />
                                                    </button>
                                                </div>

                                                <div className="d-flex flex-column gap-2">
                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-envelope text-body-secondary mt-1" />
                                                        <span className="small text-break">
                                                            {attributes.email || 'No email provided'}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-telephone text-body-secondary mt-1" />
                                                        <span className="small text-break">
                                                            {attributes.contact ||
                                                                attributes.phone ||
                                                                'No contact provided'}
                                                        </span>
                                                    </div>

                                                    {attributes.gender && (
                                                        <div className="d-flex align-items-start gap-2">
                                                            <i className="bi bi-person text-body-secondary mt-1" />
                                                            <span className="small">
                                                                {attributes.gender}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <hr className="my-3" />

                                                {/* Subjects */}
                                                <div className="mb-3">
                                                    <div className="small fw-semibold text-body-secondary mb-2">
                                                        <i className="bi bi-book me-2" />
                                                        Subjects
                                                    </div>

                                                    {subjects.length > 0 ? (
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {subjects.slice(0, 3).map((subject, index) => (
                                                                <span
                                                                    key={`${subject}-${index}`}
                                                                    className="badge bg-primary-subtle text-primary fw-normal text-wrap text-start"
                                                                >
                                                                    {subject}
                                                                </span>
                                                            ))}

                                                            {subjects.length > 3 && (
                                                                <span className="badge bg-body-secondary text-body fw-normal">
                                                                    +{subjects.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="small text-body-secondary">
                                                            No subjects assigned
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Classes */}
                                                <div>
                                                    <div className="small fw-semibold text-body-secondary mb-2">
                                                        <i className="bi bi-people me-2" />
                                                        Classes
                                                    </div>

                                                    {classes.length > 0 ? (
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {classes.slice(0, 3).map((className, index) => (
                                                                <span
                                                                    key={`${className}-${index}`}
                                                                    className="badge bg-body-secondary text-body fw-normal text-wrap text-start"
                                                                >
                                                                    {className}
                                                                </span>
                                                            ))}

                                                            {classes.length > 3 && (
                                                                <span className="badge bg-body-secondary text-body fw-normal">
                                                                    +{classes.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="small text-body-secondary">
                                                            No classes assigned
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <i className="bi bi-people fs-1 text-body-secondary" />
                            <h6 className="fw-bold mt-3 mb-1">
                                {teachers.length ? 'No teachers found' : 'No teachers available'}
                            </h6>
                            <p className="text-body-secondary small mb-3">
                                {teachers.length
                                    ? 'Try changing your search or status filter.'
                                    : 'Teachers will appear here when available.'}
                            </p>

                            {(search || statusFilter !== 'All') && (
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
                        Showing {filteredTeachers.length} of {teachers.length} teachers
                    </small>
                </div>
            </div>
        </div>
    );
};
