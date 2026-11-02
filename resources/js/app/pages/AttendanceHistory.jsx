import React, { useMemo, useState } from 'react';

const classes = [
    { id: 1, name: 'Form 1A', teacher: 'Mrs. James' },
    { id: 2, name: 'Form 1B', teacher: 'Mr. Charles' },
    { id: 3, name: 'Form 2A', teacher: 'Mrs. Thomas' },
    { id: 4, name: 'Form 3A', teacher: 'Mr. Joseph' },
];

const students = [
    { id: 1, studentId: 'STU001', name: 'Amelia Roberts', classId: 1 },
    { id: 2, studentId: 'STU002', name: 'Noah Williams', classId: 1 },
    { id: 3, studentId: 'STU003', name: 'Olivia Charles', classId: 1 },
    { id: 4, studentId: 'STU004', name: 'Liam Joseph', classId: 1 },
    { id: 5, studentId: 'STU005', name: 'Sophia Thomas', classId: 1 },
    { id: 6, studentId: 'STU006', name: 'Ethan Peters', classId: 2 },
    { id: 7, studentId: 'STU007', name: 'Mia Francis', classId: 2 },
    { id: 8, studentId: 'STU008', name: 'Lucas George', classId: 2 },
    { id: 9, studentId: 'STU009', name: 'Isabella Lewis', classId: 2 },
    { id: 10, studentId: 'STU010', name: 'James Brown', classId: 3 },
    { id: 11, studentId: 'STU011', name: 'Charlotte Clarke', classId: 3 },
    { id: 12, studentId: 'STU012', name: 'Benjamin Alexander', classId: 3 },
    { id: 13, studentId: 'STU013', name: 'Grace Martin', classId: 4 },
    { id: 14, studentId: 'STU014', name: 'Daniel Edwards', classId: 4 },
    { id: 15, studentId: 'STU015', name: 'Ella Mitchell', classId: 4 },
];

const dateOffset = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
};

const formatDate = (date) => {
    if (!date) return '—';

    return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getClassName = (classId) =>
    classes.find((item) => item.id === Number(classId))?.name || 'Unknown class';

const statusOptions = ['Present', 'Absent', 'Late', 'Excused'];

const statusStyles = {
    Present: 'success',
    Absent: 'danger',
    Late: 'warning',
    Excused: 'info',
};

const initialRecords = [
    { id: 1, date: dateOffset(-1), classId: 1, studentId: 1, status: 'Present', note: '' },
    { id: 2, date: dateOffset(-1), classId: 1, studentId: 2, status: 'Absent', note: 'Reported sick' },
    { id: 3, date: dateOffset(-1), classId: 1, studentId: 3, status: 'Present', note: '' },
    { id: 4, date: dateOffset(-1), classId: 1, studentId: 4, status: 'Late', note: '' },
    { id: 5, date: dateOffset(-1), classId: 1, studentId: 5, status: 'Present', note: '' },
    { id: 6, date: dateOffset(-1), classId: 2, studentId: 6, status: 'Present', note: '' },
    { id: 7, date: dateOffset(-1), classId: 2, studentId: 7, status: 'Present', note: '' },
    { id: 8, date: dateOffset(-1), classId: 2, studentId: 8, status: 'Excused', note: 'Approved absence' },
    { id: 9, date: dateOffset(-1), classId: 2, studentId: 9, status: 'Present', note: '' },
    { id: 10, date: dateOffset(-2), classId: 1, studentId: 1, status: 'Present', note: '' },
    { id: 11, date: dateOffset(-2), classId: 1, studentId: 2, status: 'Present', note: '' },
    { id: 12, date: dateOffset(-2), classId: 1, studentId: 3, status: 'Late', note: '' },
    { id: 13, date: dateOffset(-2), classId: 1, studentId: 4, status: 'Present', note: '' },
    { id: 14, date: dateOffset(-2), classId: 1, studentId: 5, status: 'Absent', note: '' },
    { id: 15, date: dateOffset(-2), classId: 3, studentId: 10, status: 'Present', note: '' },
    { id: 16, date: dateOffset(-2), classId: 3, studentId: 11, status: 'Present', note: '' },
    { id: 17, date: dateOffset(-2), classId: 3, studentId: 12, status: 'Absent', note: '' },
    { id: 18, date: dateOffset(-3), classId: 4, studentId: 13, status: 'Present', note: '' },
    { id: 19, date: dateOffset(-3), classId: 4, studentId: 14, status: 'Late', note: '' },
    { id: 20, date: dateOffset(-3), classId: 4, studentId: 15, status: 'Present', note: '' },
];

const getCounts = (items) => {
    const counts = { Present: 0, Absent: 0, Late: 0, Excused: 0 };

    items.forEach((item) => {
        if (counts[item.status] !== undefined) counts[item.status]++;
    });

    return counts;
};

export const AttendanceHistory = () => {
    const [records, setRecords] = useState(initialRecords);

    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState('all');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [startDate, setStartDate] = useState(dateOffset(-30));
    const [endDate, setEndDate] = useState(dateOffset(0));

    const [notice, setNotice] = useState('');

    const overallCounts = useMemo(() => getCounts(records), [records]);

    const totalEntries = records.length;

    const attendanceRate = totalEntries
        ? Math.round(
              ((overallCounts.Present + overallCounts.Late) / totalEntries) * 100
          )
        : 0;

    const filteredRecords = useMemo(() => {
        return records
            .filter((record) => {
                const student = students.find(
                    (item) => item.id === record.studentId
                );

                const matchesSearch =
                    !searchTerm ||
                    student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student?.studentId.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesClass =
                    !selectedClass ||
                    record.classId === Number(selectedClass);

                const matchesStudent =
                    !selectedStudent ||
                    record.studentId === Number(selectedStudent);

                const matchesStatus =
                    !selectedStatus ||
                    record.status === selectedStatus;

                const matchesStart =
                    !startDate || record.date >= startDate;

                const matchesEnd =
                    !endDate || record.date <= endDate;

                return (
                    matchesSearch &&
                    matchesClass &&
                    matchesStudent &&
                    matchesStatus &&
                    matchesStart &&
                    matchesEnd
                );
            })
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [
        records,
        searchTerm,
        selectedClass,
        selectedStudent,
        selectedStatus,
        startDate,
        endDate,
    ]);

    const selectedStudentRecords = useMemo(
        () =>
            selectedStudent
                ? records
                      .filter((record) => record.studentId === Number(selectedStudent))
                      .sort((a, b) => b.date.localeCompare(a.date))
                : [],
        [records, selectedStudent]
    );

    const selectedStudentCounts = useMemo(
        () => getCounts(selectedStudentRecords),
        [selectedStudentRecords]
    );

    const selectedStudentRate = selectedStudentRecords.length
        ? Math.round(
              ((selectedStudentCounts.Present + selectedStudentCounts.Late) /
                  selectedStudentRecords.length) *
                  100
          )
        : 0;

    const classSummaries = useMemo(
        () =>
            classes.map((classItem) => {
                const classRecords = records.filter(
                    (record) => record.classId === classItem.id
                );

                const counts = getCounts(classRecords);

                return {
                    ...classItem,
                    studentCount: students.filter(
                        (student) => student.classId === classItem.id
                    ).length,
                    recordCount: classRecords.length,
                    counts,
                    rate: classRecords.length
                        ? Math.round(
                              ((counts.Present + counts.Late) /
                                  classRecords.length) *
                                  100
                          )
                        : 0,
                };
            }),
        [records]
    );

    const setView = (mode) => {
        setViewMode(mode);

        if (mode === 'all') {
            setSelectedClass('');
            setSelectedStudent('');
        } else if (mode === 'class') {
            setSelectedStudent('');
        } else if (mode === 'student') {
            setSelectedClass('');
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedClass('');
        setSelectedStudent('');
        setSelectedStatus('');
        setStartDate(dateOffset(-30));
        setEndDate(dateOffset(0));
        setViewMode('all');
    };

    const viewStudent = (studentId) => {
        setSelectedStudent(String(studentId));
        setSelectedClass('');
        setViewMode('student');
        setActiveTab('records');
        setNotice('');
    };

    const viewClass = (classId) => {
        setSelectedClass(String(classId));
        setSelectedStudent('');
        setViewMode('class');
        setActiveTab('records');
        setNotice('');
    };

    const deleteRecord = (recordId) => {
        if (!window.confirm('Delete this attendance history record?')) return;

        setRecords((previous) =>
            previous.filter((record) => record.id !== recordId)
        );

        setNotice('Attendance record deleted from the demo.');
    };

    const renderStatus = (status) => (
        <span className={`badge bg-${statusStyles[status] || 'secondary'}-subtle text-${statusStyles[status] || 'secondary'}`}>
            {status}
        </span>
    );

    const renderSummaryCard = (label, value, icon, color, detail) => (
        <div className="col-6 col-xl-3" key={label}>
            <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-3 p-lg-4">
                    <div className={`rounded-3 bg-${color}-subtle text-${color} d-inline-flex p-2 mb-3`}>
                        <i className={`bi ${icon} fs-5`} />
                    </div>
                    <div className="h3 fw-bold mb-1">{value}</div>
                    <div className="text-body-secondary small">{label}</div>
                    {detail && (
                        <div className="small text-body-secondary mt-2">{detail}</div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderRecordsTable = (items) => (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="px-3 px-lg-4">Student</th>
                        <th>Class</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th className="text-end px-3 px-lg-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((record) => {
                        const student = students.find(
                            (item) => item.id === record.studentId
                        );

                        return (
                            <tr key={record.id}>
                                <td className="px-3 px-lg-4">
                                    <div className="fw-semibold">{student?.name}</div>
                                    <div className="small text-body-secondary">
                                        {student?.studentId}
                                    </div>
                                </td>
                                <td>{getClassName(record.classId)}</td>
                                <td className="text-nowrap">{formatDate(record.date)}</td>
                                <td>{renderStatus(record.status)}</td>
                                <td className="small text-body-secondary">
                                    {record.note || '—'}
                                </td>
                                <td className="text-end px-3 px-lg-4">
                                    <div className="d-inline-flex gap-1">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            title="View student history"
                                            onClick={() => viewStudent(record.studentId)}
                                        >
                                            <i className="bi bi-eye" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            title="Edit attendance"
                                            onClick={() =>
                                                console.log('Navigate to edit attendance:', record)
                                            }
                                        >
                                            <i className="bi bi-pencil" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            title="Delete attendance"
                                            onClick={() => deleteRecord(record.id)}
                                        >
                                            <i className="bi bi-trash" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {items.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-5">
                                <i className="bi bi-inbox fs-2 d-block text-body-secondary mb-2" />
                                <div className="fw-semibold">No attendance records found</div>
                                <div className="small text-body-secondary">
                                    Try adjusting your filters or date range.
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container-fluid py-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="text-primary">
                            <i className="bi bi-calendar2-week fs-3" />
                        </span>
                        <h2 className="fw-bold mb-0">Attendance History</h2>
                    </div>
                    <p className="text-body-secondary mb-0">
                        Review attendance records by class, student, date, and status.
                    </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer me-2" />
                        Print
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => console.log('Export attendance history:', filteredRecords)}
                    >
                        <i className="bi bi-download me-2" />
                        Export
                    </button>
                </div>
            </div>

            {notice && (
                <div className="alert alert-info alert-dismissible" role="alert">
                    {notice}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Dismiss"
                        onClick={() => setNotice('')}
                    />
                </div>
            )}

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-2">
                    <ul className="nav nav-pills flex-nowrap overflow-auto gap-1">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2' },
                            { id: 'records', label: 'Attendance Records', icon: 'bi-list-check' },
                            { id: 'classes', label: 'By Class', icon: 'bi-people' },
                            { id: 'students', label: 'Search', icon: 'bi-person-vcard' },
                        ].map((tab) => (
                            <li className="nav-item flex-shrink-0" key={tab.id}>
                                <button
                                    type="button"
                                    className={`nav-link ${activeTab === tab.id ? 'active' : 'text-body-secondary'}`}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setNotice('');
                                    }}
                                >
                                    <i className={`bi ${tab.icon} me-2`} />
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {activeTab === 'overview' && (
                <>
                    <div className="row g-3 mb-4">
                        {renderSummaryCard(
                            'Total Records',
                            totalEntries,
                            'bi-clipboard-data',
                            'primary',
                            'Saved attendance entries'
                        )}
                        {renderSummaryCard(
                            'Present',
                            overallCounts.Present,
                            'bi-person-check',
                            'success',
                            'Students marked present'
                        )}
                        {renderSummaryCard(
                            'Absent',
                            overallCounts.Absent,
                            'bi-person-x',
                            'danger',
                            'Students marked absent'
                        )}
                        {renderSummaryCard(
                            'Attendance Rate',
                            `${attendanceRate}%`,
                            'bi-graph-up-arrow',
                            'info',
                            'Present and late entries'
                        )}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-7">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-body border-0 p-4 pb-0">
                                    <h5 className="fw-bold mb-1">Attendance Breakdown</h5>
                                    <p className="small text-body-secondary mb-0">
                                        All saved records
                                    </p>
                                </div>
                                <div className="card-body p-4">
                                    {statusOptions.map((status) => {
                                        const count = overallCounts[status];
                                        const percentage = totalEntries
                                            ? Math.round((count / totalEntries) * 100)
                                            : 0;

                                        return (
                                            <div className="mb-4" key={status}>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="small fw-semibold">{status}</span>
                                                    <span className="small text-body-secondary">
                                                        {count} ({percentage}%)
                                                    </span>
                                                </div>
                                                <div className="progress" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                                                    <div
                                                        className={`progress-bar bg-${statusStyles[status]}`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-5">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-body border-0 p-4 pb-0">
                                    <h5 className="fw-bold mb-1">Browse History</h5>
                                    <p className="small text-body-secondary mb-0">
                                        Go directly to the records you need
                                    </p>
                                </div>
                                <div className="card-body p-4">
                                    <button
                                        type="button"
                                        className="btn btn-light border w-100 text-start p-3 mb-3"
                                        onClick={() => {
                                            setView('all');
                                            setActiveTab('records');
                                        }}
                                    >
                                        <i className="bi bi-list-check text-primary fs-5 me-3" />
                                        <span className="fw-semibold">All Attendance Records</span>
                                        <i className="bi bi-arrow-right float-end" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light border w-100 text-start p-3 mb-3"
                                        onClick={() => {
                                            setView('class');
                                            setActiveTab('records');
                                        }}
                                    >
                                        <i className="bi bi-people text-success fs-5 me-3" />
                                        <span className="fw-semibold">Browse by Class</span>
                                        <i className="bi bi-arrow-right float-end" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light border w-100 text-start p-3"
                                        onClick={() => {
                                            setView('student');
                                            setActiveTab('students');
                                        }}
                                    >
                                        <i className="bi bi-person-vcard text-info fs-5 me-3" />
                                        <span className="fw-semibold">Individual Student History</span>
                                        <i className="bi bi-arrow-right float-end" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4 d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div>
                                <h5 className="fw-bold mb-1">Recent Attendance Records</h5>
                                <p className="small text-body-secondary mb-0">
                                    Latest saved records
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setActiveTab('records')}
                            >
                                View All
                            </button>
                        </div>
                        {renderRecordsTable(
                            [...records]
                                .sort((a, b) => b.date.localeCompare(a.date))
                                .slice(0, 6)
                        )}
                    </div>
                </>
            )}

            {activeTab === 'records' && (
                <>
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-3 p-lg-4">
                            <div className="row g-3">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">View records by</label>
                                    <select
                                        className="form-select"
                                        value={viewMode}
                                        onChange={(e) => setView(e.target.value)}
                                    >
                                        <option value="all">All Attendance Records</option>
                                        <option value="class">By Class</option>
                                        <option value="student">By Student</option>
                                    </select>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Search</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-search" />
                                        </span>
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Student name or ID"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Attendance status</label>
                                    <select
                                        className="form-select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <option value="">All statuses</option>
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                {(viewMode === 'all' || viewMode === 'class') && (
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Class</label>
                                        <select
                                            className="form-select"
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                        >
                                            <option value="">All classes</option>
                                            {classes.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {(viewMode === 'all' || viewMode === 'student') && (
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Student</label>
                                        <select
                                            className="form-select"
                                            value={selectedStudent}
                                            onChange={(e) => setSelectedStudent(e.target.value)}
                                        >
                                            <option value="">All students</option>
                                            {students.map((student) => (
                                                <option key={student.id} value={student.id}>
                                                    {student.name} — {student.studentId}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="col-6 col-md-4">
                                    <label className="form-label">From date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        max={endDate || undefined}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-6 col-md-4">
                                    <label className="form-label">To date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        min={startDate || undefined}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 col-md-4 d-flex align-items-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100"
                                        onClick={resetFilters}
                                    >
                                        <i className="bi bi-arrow-counterclockwise me-2" />
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4">
                            <h5 className="fw-bold mb-1">
                                {viewMode === 'class'
                                    ? selectedClass
                                        ? `${getClassName(selectedClass)} Attendance`
                                        : 'Attendance by Class'
                                    : viewMode === 'student'
                                      ? selectedStudent
                                          ? `${students.find((s) => s.id === Number(selectedStudent))?.name || 'Student'} History`
                                          : 'Attendance by Student'
                                      : 'All Attendance Records'}
                            </h5>
                            <p className="small text-body-secondary mb-0">
                                {filteredRecords.length} matching record(s)
                            </p>
                        </div>
                        {renderRecordsTable(filteredRecords)}
                    </div>
                </>
            )}

            {activeTab === 'classes' && (
                <>
                    <div className="row g-3 mb-4">
                        {classSummaries.map((item) => (
                            <div className="col-12 col-md-6 col-xl-3" key={item.id}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h5 className="fw-bold mb-1">{item.name}</h5>
                                                <div className="small text-body-secondary">{item.teacher}</div>
                                            </div>
                                            <span className="rounded-3 bg-primary-subtle text-primary p-2">
                                                <i className="bi bi-people fs-5" />
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between small mb-2">
                                            <span className="text-body-secondary">Students</span>
                                            <span className="fw-semibold">{item.studentCount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small mb-2">
                                            <span className="text-body-secondary">Recorded entries</span>
                                            <span className="fw-semibold">{item.recordCount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small mb-2">
                                            <span className="text-body-secondary">Present</span>
                                            <span className="text-success fw-semibold">{item.counts.Present}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small mb-3">
                                            <span className="text-body-secondary">Absent</span>
                                            <span className="text-danger fw-semibold">{item.counts.Absent}</span>
                                        </div>

                                        <div className="d-flex justify-content-between small mb-2">
                                            <span className="text-body-secondary">Attendance rate</span>
                                            <span className="fw-semibold">{item.rate}%</span>
                                        </div>
                                        <div className="progress mb-4">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${item.rate}%` }}
                                            />
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => viewClass(item.id)}
                                            >
                                                <i className="bi bi-list-check me-2" />
                                                View Class Records
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => {
                                                    setSelectedClass('');
                                                    setSelectedStudent('');
                                                    setViewMode('student');
                                                    setActiveTab('students');
                                                }}
                                            >
                                                <i className="bi bi-person-vcard me-2" />
                                                Browse Students
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4">
                            <h5 className="fw-bold mb-1">Class Attendance Summary</h5>
                            <p className="small text-body-secondary mb-0">
                                Compare attendance records across classes.
                            </p>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Class</th>
                                        <th>Class Teacher</th>
                                        <th>Students</th>
                                        <th>Records</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Rate</th>
                                        <th className="text-end px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classSummaries.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 fw-semibold">{item.name}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.studentCount}</td>
                                            <td>{item.recordCount}</td>
                                            <td className="text-success fw-semibold">{item.counts.Present}</td>
                                            <td className="text-danger fw-semibold">{item.counts.Absent}</td>
                                            <td>{item.rate}%</td>
                                            <td className="text-end px-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => viewClass(item.id)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'students' && (
                <>
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-3 p-lg-4">
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-md-8">
                                    <label className="form-label">Find student</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-search" />
                                        </span>
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search by student name or ID"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label">Class</label>
                                    <select
                                        className="form-select"
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        <option value="">All classes</option>
                                        {classes.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedStudent ? (
                        <>
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    {(() => {
                                        const student = students.find(
                                            (item) => item.id === Number(selectedStudent)
                                        );

                                        return (
                                            <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                                                <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center p-3">
                                                    <i className="bi bi-person fs-3" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h4 className="fw-bold mb-1">{student?.name}</h4>
                                                    <div className="small text-body-secondary">
                                                        {student?.studentId} · {getClassName(student?.classId)}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setSelectedStudent('')}
                                                >
                                                    <i className="bi bi-arrow-left me-2" />
                                                    All Students
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="row g-3 mb-4">
                                {renderSummaryCard('Present', selectedStudentCounts.Present, 'bi-person-check', 'success')}
                                {renderSummaryCard('Absent', selectedStudentCounts.Absent, 'bi-person-x', 'danger')}
                                {renderSummaryCard('Late', selectedStudentCounts.Late, 'bi-clock-history', 'warning')}
                                {renderSummaryCard('Attendance Rate', `${selectedStudentRate}%`, 'bi-graph-up-arrow', 'info')}
                            </div>

                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-body border-0 p-4">
                                    <h5 className="fw-bold mb-1">Student Attendance History</h5>
                                    <p className="small text-body-secondary mb-0">
                                        {selectedStudentRecords.length} recorded day(s)
                                    </p>
                                </div>
                                {renderRecordsTable(
                                    selectedStudentRecords.filter((record) => {
                                        const matchesStatus =
                                            !selectedStatus || record.status === selectedStatus;
                                        const matchesStart =
                                            !startDate || record.date >= startDate;
                                        const matchesEnd =
                                            !endDate || record.date <= endDate;

                                        return matchesStatus && matchesStart && matchesEnd;
                                    })
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="row g-3">
                            {students
                                .filter((student) => {
                                    const term = searchTerm.toLowerCase();

                                    return (
                                        (!term ||
                                            student.name.toLowerCase().includes(term) ||
                                            student.studentId.toLowerCase().includes(term)) &&
                                        (!selectedClass ||
                                            student.classId === Number(selectedClass))
                                    );
                                })
                                .map((student) => {
                                    const history = records.filter(
                                        (record) => record.studentId === student.id
                                    );
                                    const counts = getCounts(history);
                                    const rate = history.length
                                        ? Math.round(
                                              ((counts.Present + counts.Late) /
                                                  history.length) *
                                                  100
                                          )
                                        : 0;

                                    return (
                                        <div className="col-12 col-md-6 col-xl-4" key={student.id}>
                                            <div className="card border-0 shadow-sm h-100">
                                                <div className="card-body p-4">
                                                    <div className="d-flex align-items-center gap-3 mb-3">
                                                        <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center p-3">
                                                            <i className="bi bi-person fs-4" />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="fw-bold mb-1">{student.name}</h6>
                                                            <div className="small text-body-secondary">
                                                                {student.studentId}
                                                            </div>
                                                            <div className="small text-body-secondary">
                                                                {getClassName(student.classId)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <span className="small text-body-secondary">
                                                            Attendance rate
                                                        </span>
                                                        <span className="fw-bold">{rate}%</span>
                                                    </div>
                                                    <div className="progress mb-3">
                                                        <div
                                                            className="progress-bar"
                                                            style={{ width: `${rate}%` }}
                                                        />
                                                    </div>

                                                    <div className="d-flex justify-content-between small mb-3">
                                                        <span className="text-success">
                                                            Present: {counts.Present}
                                                        </span>
                                                        <span className="text-danger">
                                                            Absent: {counts.Absent}
                                                        </span>
                                                        <span className="text-warning">
                                                            Late: {counts.Late}
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-sm w-100"
                                                        onClick={() => viewStudent(student.id)}
                                                    >
                                                        <i className="bi bi-eye me-2" />
                                                        View Attendance History
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </>
            )}

            <div className="text-body-secondary small mt-4">
                <i className="bi bi-info-circle me-1" />
                Demo data only. Connect the records to your backend for permanent storage. Edit buttons are placeholders for your navigation or edit page.
            </div>
        </div>
    );
};

