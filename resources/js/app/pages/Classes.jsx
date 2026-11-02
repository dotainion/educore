
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../service/Api';

export const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const levels = useMemo(
        () => [
            ...new Set(
                classes
                    .map((item) => item.attributes?.level)
                    .filter(Boolean)
            ),
        ],
        [classes]
    );

    const filteredClasses = useMemo(() => {
        const term = search.trim().toLowerCase();

        return classes.filter((item) => {
            const attributes = item.attributes ?? {};

            const matchesSearch =
                (attributes.name ?? '').toLowerCase().includes(term) ||
                (attributes.level ?? '').toLowerCase().includes(term) ||
                (attributes.room ?? '').toLowerCase().includes(term) ||
                (attributes.description ?? '').toLowerCase().includes(term);

            const matchesLevel =
                selectedLevel === 'All' ||
                attributes.level === selectedLevel;

            const matchesStatus =
                selectedStatus === 'All' ||
                (attributes.status ?? 'Inactive').toLowerCase() ===
                    selectedStatus.toLowerCase();

            return matchesSearch && matchesLevel && matchesStatus;
        });
    }, [classes, search, selectedLevel, selectedStatus]);

    const activeClasses = classes.filter(
        (item) =>
            (item.attributes?.status ?? '').toLowerCase() === 'active'
    ).length;

    useEffect(() => {
        api.get('/class/list')
            .then((response) => {
                setClasses(response.data.classForms ?? []);
            })
            .catch((err) => {
                console.error('Failed to load classes:', err);
                setError('Unable to load classes. Please try again.');
            })
            .finally(() => setLoading(false));
    }, []);

    const resetFilters = () => {
        setSearch('');
        setSelectedLevel('All');
        setSelectedStatus('All');
    };

    const getStatusClass = (status) =>
        (status ?? '').toLowerCase() === 'active'
            ? 'bg-success-subtle text-success'
            : 'bg-secondary-subtle text-secondary';

    const getTeacherName = (attributes) =>
        attributes.teacher?.attributes?.fullName ||
        attributes.teacher?.attributes?.name ||
        attributes.teacherName ||
        'Not assigned';

    return (
        <div className="container-fluid py-3 py-md-4">
            {/* Page Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Classes</h2>
                    <p className="text-muted mb-0">
                        View and manage your school's classes.
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-xl-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-primary-subtle text-primary p-2">
                                <i className="bi bi-collection fs-4" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-muted small">
                                    Total Classes
                                </div>
                                <h4 className="fw-bold mb-0">
                                    {classes.length}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-xl-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-success-subtle text-success p-2">
                                <i className="bi bi-check-circle fs-4" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-muted small">
                                    Active Classes
                                </div>
                                <h4 className="fw-bold mb-0">
                                    {activeClasses}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Class Directory */}
            <div className="card border-0 shadow-sm">
                {/* Search and Filters */}
                <div className="card-header bg-white border-0 p-3 p-md-4">
                    <div className="d-flex flex-column flex-xl-row justify-content-between gap-3">
                        <div>
                            <h5 className="fw-bold mb-1">Class Directory</h5>
                            <p className="text-muted small mb-0">
                                Showing {filteredClasses.length} of {classes.length} classes
                            </p>
                        </div>

                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-search text-muted" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control bg-light border-start-0"
                                    placeholder="Search classes..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    aria-label="Search classes"
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-secondary text-nowrap"
                                onClick={resetFilters}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2" />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mt-2">
                        <div className="col-12 col-sm-6 col-lg-4">
                            <select
                                className="form-select"
                                value={selectedLevel}
                                onChange={(event) =>
                                    setSelectedLevel(event.target.value)
                                }
                                aria-label="Filter by level"
                            >
                                <option value="All">All Forms</option>
                                {levels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-4">
                            <select
                                className="form-select"
                                value={selectedStatus}
                                onChange={(event) =>
                                    setSelectedStatus(event.target.value)
                                }
                                aria-label="Filter by status"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Responsive Class Cards */}
                <div className="card-body p-3 p-md-4 bg-light">
                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                            <p className="text-muted mt-2 mb-0">
                                Loading classes...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-5">
                            <i className="bi bi-exclamation-circle fs-1 text-danger d-block mb-3" />
                            <p className="text-muted mb-3">{error}</p>
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                    setLoading(true);
                                    setError('');
                                    api.get('/class/list')
                                        .then((response) => {
                                            setClasses(
                                                response.data.classForms ?? []
                                            );
                                        })
                                        .catch((err) => {
                                            console.error(
                                                'Failed to load classes:',
                                                err
                                            );
                                            setError(
                                                'Unable to load classes. Please try again.'
                                            );
                                        })
                                        .finally(() => setLoading(false));
                                }}
                            >
                                <i className="bi bi-arrow-clockwise me-2" />
                                Try Again
                            </button>
                        </div>
                    ) : filteredClasses.length > 0 ? (
                        <div className="row g-3">
                            {filteredClasses.map((item) => {
                                const attributes = item.attributes ?? {};
                                const status = attributes.status || 'Inactive';

                                return (
                                    <div
                                        className="col-12 col-sm-6 col-lg-4 col-xl-4"
                                        key={
                                            item.id ||
                                            attributes.name
                                        }
                                    >
                                        <div className="card border-0 shadow-sm h-100">
                                            <div className="card-body p-3">
                                                {/* Card Header */}
                                                <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                                    <div className="d-flex align-items-center gap-2 min-w-0">
                                                        <div className="rounded-3 bg-primary-subtle text-primary p-2 flex-shrink-0">
                                                            <i className="bi bi-people fs-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h6 className="fw-bold mb-1 text-break">
                                                                {attributes.name ||
                                                                    'Unnamed Class'}
                                                            </h6>
                                                            <div className="text-muted small">
                                                                {attributes.level ||
                                                                    'Level not specified'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`badge rounded-pill flex-shrink-0 ${getStatusClass(status)}`}
                                                    >
                                                        {status}
                                                    </span>
                                                </div>

                                                <hr className="my-3" />

                                                {/* Class Details */}
                                                <div className="d-flex flex-column gap-3">
                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-person text-muted mt-1" />
                                                        <div className="min-w-0">
                                                            <div className="text-muted small">
                                                                Teacher
                                                            </div>
                                                            <div className="small fw-medium text-break">
                                                                {getTeacherName(
                                                                    attributes
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-door-open text-muted mt-1" />
                                                        <div className="min-w-0">
                                                            <div className="text-muted small">
                                                                Room
                                                            </div>
                                                            <div className="small fw-medium text-break">
                                                                {attributes.room ||
                                                                    'Not specified'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {attributes.capacity != null && (
                                                        <div className="d-flex align-items-start gap-2">
                                                            <i className="bi bi-person-lines-fill text-muted mt-1" />
                                                            <div>
                                                                <div className="text-muted small">
                                                                    Capacity
                                                                </div>
                                                                <div className="small fw-medium">
                                                                    {attributes.capacity} students
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {attributes.description && (
                                                    <>
                                                        <hr className="my-3" />
                                                        <p className="text-muted small mb-0">
                                                            {attributes.description}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <div className="rounded-circle bg-white shadow-sm d-inline-flex align-items-center justify-content-center p-4 mb-3">
                                <i className="bi bi-people fs-2 text-muted" />
                            </div>
                            <h6 className="fw-bold">
                                {classes.length
                                    ? 'No classes found'
                                    : 'No classes available'}
                            </h6>
                            <p className="text-muted small mb-3">
                                {classes.length
                                    ? 'Try changing your search or filters.'
                                    : 'Classes will appear here when available.'}
                            </p>
                            {(search ||
                                selectedLevel !== 'All' ||
                                selectedStatus !== 'All') && (
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
            </div>
        </div>
    );
};
