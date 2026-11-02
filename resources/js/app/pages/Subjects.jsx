
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/Routes';
import { api } from '../service/Api';

export const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/subject/list')
            .then((response) => {
                setSubjects(response.data.subjects || []);
            })
            .catch((error) => {
                console.error('Failed to load subjects:', error);
                setError('Unable to load subjects. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const categories = useMemo(() => {
        return [
            ...new Set(
                subjects
                    .map((subject) => subject.attributes?.category)
                    .filter(Boolean)
            ),
        ];
    }, [subjects]);

    const filteredSubjects = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return subjects.filter((subject) => {
            const attributes = subject.attributes || {};
            const teachers = attributes.users || [];
            const classes = attributes.classes || [];

            const teacherNames = teachers.map((user) => {
                const teacher = user.attributes || {};
                return (
                    teacher.fullName ||
                    `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() ||
                    teacher.name ||
                    ''
                );
            }).join(' ');

            const classNames = classes.map((schoolClass) => {
                return schoolClass.attributes?.name || '';
            }).join(' ');

            const matchesSearch =
                !search ||
                (attributes.name || '').toLowerCase().includes(search) ||
                (attributes.code || '').toLowerCase().includes(search) ||
                (attributes.category || '').toLowerCase().includes(search) ||
                teacherNames.toLowerCase().includes(search) ||
                classNames.toLowerCase().includes(search);

            const matchesCategory =
                categoryFilter === 'All' ||
                attributes.category === categoryFilter;

            const matchesStatus =
                statusFilter === 'All' ||
                attributes.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [subjects, searchTerm, categoryFilter, statusFilter]);

    const activeCount = subjects.filter(
        (subject) => subject.attributes?.status === 'Active'
    ).length;

    const inactiveCount = subjects.filter(
        (subject) => subject.attributes?.status === 'Inactive'
    ).length;

    const assignedTeacherCount = subjects.filter(
        (subject) => (subject.attributes?.users || []).length > 0
    ).length;

    const getCategoryBadge = (category) => {
        const badges = {
            Core: 'text-bg-primary',
            Elective: 'text-bg-info',
            Practical: 'text-bg-warning',
        };

        return badges[category] || 'text-bg-secondary';
    };

    const resetFilters = () => {
        setSearchTerm('');
        setCategoryFilter('All');
        setStatusFilter('All');
    };

    const getTeacherName = (user) => {
        const teacher = user.attributes || {};

        return (
            teacher.fullName ||
            `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() ||
            teacher.name ||
            'Teacher'
        );
    };

    const retryLoading = () => {
        setLoading(true);
        setError('');

        api.get('/subject/list')
            .then((response) => {
                setSubjects(response.data.subjects || []);
            })
            .catch((error) => {
                console.error('Failed to load subjects:', error);
                setError('Unable to load subjects. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Subjects</h2>
                    <p className="text-secondary mb-0">
                        Manage the subjects offered at your school.
                    </p>
                </div>

                <Link to={routes.addSubject} className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Subject
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-secondary mb-1">Total Subjects</p>
                                <h3 className="fw-bold mb-1">{subjects.length}</h3>
                                <small className="text-secondary">Registered subjects</small>
                            </div>
                            <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                                <i className="bi bi-book fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-secondary mb-1">Active Subjects</p>
                                <h3 className="fw-bold mb-1">{activeCount}</h3>
                                <small className="text-success">
                                    <i className="bi bi-check-circle me-1"></i>
                                    Currently offered
                                </small>
                            </div>
                            <div className="rounded-3 bg-success bg-opacity-10 text-success p-3">
                                <i className="bi bi-journal-check fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-secondary mb-1">With Teachers</p>
                                <h3 className="fw-bold mb-1">{assignedTeacherCount}</h3>
                                <small className="text-secondary">Subjects with assignments</small>
                            </div>
                            <div className="rounded-3 bg-info bg-opacity-10 text-info p-3">
                                <i className="bi bi-person-workspace fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject Directory */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 p-3 p-md-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                        <div>
                            <h5 className="fw-bold mb-1">Subject Directory</h5>
                            <p className="text-secondary small mb-0">
                                Search, filter, and review subject assignments.
                            </p>
                        </div>

                        <span className="badge rounded-pill text-bg-light border">
                            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'subject' : 'subjects'}
                        </span>
                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-lg-6">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-search text-secondary"></i>
                                </span>
                                <input
                                    type="search"
                                    className="form-control bg-light border-start-0"
                                    placeholder="Search name, code, teacher, or class..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    aria-label="Search subjects"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-2">
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                aria-label="Filter by category"
                            >
                                <option value="All">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-2">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                aria-label="Filter by status"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="col-12 col-lg-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={resetFilters}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2"></i>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body border-top p-3 p-md-4">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-secondary mt-3 mb-0">
                                Loading subjects...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-5">
                            <div className="rounded-circle bg-danger bg-opacity-10 text-danger d-inline-flex align-items-center justify-content-center p-3 mb-3">
                                <i className="bi bi-exclamation-triangle fs-3"></i>
                            </div>
                            <h5 className="fw-bold">Couldn't load subjects</h5>
                            <p className="text-secondary mb-3">{error}</p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={retryLoading}
                            >
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Try Again
                            </button>
                        </div>
                    ) : filteredSubjects.length === 0 ? (
                        <div className="text-center py-5">
                            <div className="rounded-circle bg-light text-secondary d-inline-flex align-items-center justify-content-center p-3 mb-3">
                                <i className="bi bi-journal-x fs-2"></i>
                            </div>
                            <h5 className="fw-bold">
                                {subjects.length === 0 ? 'No subjects yet' : 'No subjects found'}
                            </h5>
                            <p className="text-secondary mb-3">
                                {subjects.length === 0
                                    ? 'Add a subject to start building your subject directory.'
                                    : 'Try changing your search or filters.'}
                            </p>
                            {subjects.length === 0 ? (
                                <Link to={routes.addSubject} className="btn btn-primary">
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Subject
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={resetFilters}
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="row g-3">
                            {filteredSubjects.map((subject) => {
                                const attributes = subject.attributes || {};
                                const teachers = attributes.users || [];
                                const classes = attributes.classes || [];

                                return (
                                    <div
                                        className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                                        key={attributes.subjectId || attributes.code || attributes.name}
                                    >
                                        <div className="card h-100 border shadow-sm">
                                            <div className="card-body d-flex flex-column p-3 p-md-4">
                                                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                                    <div className="d-flex align-items-center gap-3 min-w-0">
                                                        <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 flex-shrink-0">
                                                            <i className="bi bi-book-half fs-4"></i>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h6 className="fw-bold mb-1 text-break">
                                                                {attributes.name || 'Unnamed Subject'}
                                                            </h6>
                                                            <span className="small text-secondary">
                                                                {attributes.code || 'No code'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span className={`badge flex-shrink-0 ${attributes.status === 'Active' ? 'text-bg-success' : 'text-bg-secondary'}`}>
                                                        {attributes.status || 'Unknown'}
                                                    </span>
                                                </div>

                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    <span className={`badge ${getCategoryBadge(attributes.category)}`}>
                                                        {attributes.category || 'Uncategorized'}
                                                    </span>
                                                </div>

                                                <div className="border-top pt-3 mb-3">
                                                    <div className="d-flex align-items-start gap-2 mb-3">
                                                        <i className="bi bi-people text-secondary mt-1"></i>
                                                        <div className="flex-grow-1">
                                                            <div className="small text-secondary mb-1">
                                                                Assigned Teachers
                                                            </div>
                                                            {teachers.length > 0 ? (
                                                                <div className="d-flex flex-wrap gap-1">
                                                                    {teachers.map((user, index) => (
                                                                        <span
                                                                            className="badge text-bg-light border text-dark fw-normal"
                                                                            key={user.attributes?.userId || user.attributes?.email || `${getTeacherName(user)}-${index}`}
                                                                        >
                                                                            {getTeacherName(user)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span className="small text-secondary fst-italic">
                                                                    No teachers assigned
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-start gap-2">
                                                        <i className="bi bi-building text-secondary mt-1"></i>
                                                        <div className="flex-grow-1">
                                                            <div className="small text-secondary mb-1">
                                                                Assigned Classes
                                                            </div>
                                                            {classes.length > 0 ? (
                                                                <div className="d-flex flex-wrap gap-1">
                                                                    {classes.map((schoolClass, index) => (
                                                                        <span
                                                                            className="badge text-bg-light border text-dark fw-normal"
                                                                            key={schoolClass.attributes?.classId || `${schoolClass.attributes?.name || 'class'}-${index}`}
                                                                        >
                                                                            {schoolClass.attributes?.name || 'Unnamed Class'}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span className="small text-secondary fst-italic">
                                                                    No classes assigned
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center gap-2">
                                                    <span className="small text-secondary">
                                                        <i className="bi bi-bookmark-check me-1"></i>
                                                        Subject
                                                    </span>
                                                    <span className="small fw-semibold text-secondary">
                                                        {classes.length} {classes.length === 1 ? 'class' : 'classes'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
