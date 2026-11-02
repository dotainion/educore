import React, { useMemo, useState } from 'react';

const academicYears = ['2025/2026', '2026/2027', '2027/2028'];

const terms = ['All Terms', 'Term 1', 'Term 2', 'Term 3'];

const reportCategories = [
    'All Reports',
    'Academic Performance',
    'Attendance',
    'Enrollment',
    'Staff',
];

const classes = [
    { id: 1, name: 'Form 1A', students: 28, teacher: 'Mrs. James' },
    { id: 2, name: 'Form 1B', students: 25, teacher: 'Mr. Charles' },
    { id: 3, name: 'Form 2A', students: 30, teacher: 'Mrs. Thomas' },
    { id: 4, name: 'Form 2B', students: 27, teacher: 'Mr. Joseph' },
    { id: 5, name: 'Form 3A', students: 24, teacher: 'Mrs. Peters' },
    { id: 6, name: 'Form 4A', students: 22, teacher: 'Mr. Francis' },
];

const performanceData = [
    { subject: 'Mathematics', score: 76 },
    { subject: 'English', score: 84 },
    { subject: 'Science', score: 79 },
    { subject: 'Social Studies', score: 82 },
    { subject: 'ICT', score: 91 },
    { subject: 'French', score: 73 },
];

const monthlyAttendance = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 89 },
    { month: 'Mar', rate: 94 },
    { month: 'Apr', rate: 91 },
    { month: 'May', rate: 96 },
    { month: 'Jun', rate: 93 },
];

const enrollmentData = [
    { year: '2021', boys: 310, girls: 325 },
    { year: '2022', boys: 326, girls: 341 },
    { year: '2023', boys: 338, girls: 355 },
    { year: '2024', boys: 352, girls: 368 },
    { year: '2025', boys: 361, girls: 379 },
    { year: '2026', boys: 374, girls: 391 },
];

const reports = [
    {
        id: 1,
        name: 'Academic Performance Summary',
        category: 'Academic Performance',
        description: 'Student grades, subject averages, and pass rates.',
        updated: '18 Oct 2026',
        icon: 'bi-mortarboard',
        color: 'primary',
    },
    {
        id: 2,
        name: 'Student Attendance Report',
        category: 'Attendance',
        description: 'Attendance rates, absences, lateness, and trends.',
        updated: '18 Oct 2026',
        icon: 'bi-calendar2-check',
        color: 'success',
    },
    {
        id: 3,
        name: 'Enrollment Statistics',
        category: 'Enrollment',
        description: 'Enrollment by class, gender, and academic year.',
        updated: '17 Oct 2026',
        icon: 'bi-people',
        color: 'info',
    },
    {
        id: 4,
        name: 'Class Performance Comparison',
        category: 'Academic Performance',
        description: 'Compare average grades and pass rates across classes.',
        updated: '17 Oct 2026',
        icon: 'bi-bar-chart',
        color: 'warning',
    },
    {
        id: 5,
        name: 'Staff Overview',
        category: 'Staff',
        description: 'Staff numbers, department distribution, and assignments.',
        updated: '16 Oct 2026',
        icon: 'bi-person-workspace',
        color: 'secondary',
    },
    {
        id: 6,
        name: 'At-Risk Students',
        category: 'Academic Performance',
        description: 'Students requiring additional academic support.',
        updated: '16 Oct 2026',
        icon: 'bi-exclamation-triangle',
        color: 'danger',
    },
];

const classPerformance = [
    { name: 'Form 1A', average: 78, passRate: 89, attendance: 94 },
    { name: 'Form 1B', average: 74, passRate: 84, attendance: 91 },
    { name: 'Form 2A', average: 82, passRate: 93, attendance: 96 },
    { name: 'Form 2B', average: 76, passRate: 87, attendance: 90 },
    { name: 'Form 3A', average: 85, passRate: 96, attendance: 95 },
    { name: 'Form 4A', average: 80, passRate: 91, attendance: 92 },
];

const studentPerformance = [
    { id: 'STU001', name: 'Amelia Roberts', className: 'Form 1A', average: 94, attendance: 98, trend: 'Up' },
    { id: 'STU002', name: 'Noah Williams', className: 'Form 1A', average: 87, attendance: 94, trend: 'Up' },
    { id: 'STU003', name: 'Olivia Charles', className: 'Form 2A', average: 91, attendance: 96, trend: 'Stable' },
    { id: 'STU004', name: 'Liam Joseph', className: 'Form 1B', average: 62, attendance: 78, trend: 'Down' },
    { id: 'STU005', name: 'Sophia Thomas', className: 'Form 3A', average: 96, attendance: 99, trend: 'Up' },
    { id: 'STU006', name: 'Ethan Peters', className: 'Form 2B', average: 58, attendance: 72, trend: 'Down' },
    { id: 'STU007', name: 'Mia Francis', className: 'Form 4A', average: 89, attendance: 93, trend: 'Stable' },
    { id: 'STU008', name: 'Lucas George', className: 'Form 2A', average: 67, attendance: 81, trend: 'Down' },
];

export const ReportsAnalytics = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [academicYear, setAcademicYear] = useState('2026/2027');
    const [selectedTerm, setSelectedTerm] = useState('All Terms');
    const [selectedClass, setSelectedClass] = useState('');
    const [reportCategory, setReportCategory] = useState('All Reports');
    const [reportSearch, setReportSearch] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [sortBy, setSortBy] = useState('average');
    const [notice, setNotice] = useState('');

    const filteredReports = useMemo(
        () =>
            reports.filter((report) => {
                const matchesCategory =
                    reportCategory === 'All Reports' ||
                    report.category === reportCategory;

                const term = reportSearch.toLowerCase();
                const matchesSearch =
                    !term ||
                    report.name.toLowerCase().includes(term) ||
                    report.description.toLowerCase().includes(term);

                return matchesCategory && matchesSearch;
            }),
        [reportCategory, reportSearch]
    );

    const filteredClassPerformance = useMemo(
        () =>
            classPerformance.filter(
                (item) => !selectedClass || item.name === selectedClass
            ),
        [selectedClass]
    );

    const filteredStudents = useMemo(() => {
        const term = studentSearch.toLowerCase();

        return studentPerformance
            .filter((student) => {
                const matchesSearch =
                    !term ||
                    student.name.toLowerCase().includes(term) ||
                    student.id.toLowerCase().includes(term);

                const matchesClass =
                    !selectedClass || student.className === selectedClass;

                return matchesSearch && matchesClass;
            })
            .sort((a, b) => {
                if (sortBy === 'attendance') return b.attendance - a.attendance;
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                return b.average - a.average;
            });
    }, [studentSearch, selectedClass, sortBy]);

    const totalStudents = classes.reduce((total, item) => total + item.students, 0);
    const totalStaff = 48;
    const schoolAverage = Math.round(
        performanceData.reduce((total, item) => total + item.score, 0) /
            performanceData.length
    );

    const summaryCards = [
        {
            label: 'Total Students',
            value: totalStudents,
            detail: '+4.8% from last year',
            icon: 'bi-people',
            color: 'primary',
        },
        {
            label: 'Academic Average',
            value: `${schoolAverage}%`,
            detail: 'Across all subjects',
            icon: 'bi-mortarboard',
            color: 'success',
        },
        {
            label: 'Attendance Rate',
            value: '92.5%',
            detail: 'Current academic year',
            icon: 'bi-calendar2-check',
            color: 'info',
        },
        {
            label: 'Teaching Staff',
            value: totalStaff,
            detail: 'Across all departments',
            icon: 'bi-person-workspace',
            color: 'warning',
        },
    ];

    const exportReport = (reportName) => {
        setNotice(
            `${reportName} is ready for export. Connect this action to your report generation or download endpoint.`
        );
        console.log('Export report:', {
            reportName,
            academicYear,
            selectedTerm,
            selectedClass,
        });
    };

    const printReport = () => {
        window.print();
    };

    const renderSummaryCard = (item) => (
        <div className="col-6 col-xl-3" key={item.label}>
            <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-3 p-lg-4">
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                        <span className={`rounded-3 bg-${item.color}-subtle text-${item.color} p-2`}>
                            <i className={`bi ${item.icon} fs-5`} />
                        </span>
                        <span className="badge bg-success-subtle text-success">
                            <i className="bi bi-arrow-up-right me-1" />
                            Trend
                        </span>
                    </div>
                    <div className="h3 fw-bold mb-1">{item.value}</div>
                    <div className="small text-body-secondary">{item.label}</div>
                    <div className="small text-body-secondary mt-2">{item.detail}</div>
                </div>
            </div>
        </div>
    );

    const renderSectionHeading = (title, description, action) => (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
            <div>
                <h5 className="fw-bold mb-1">{title}</h5>
                <p className="text-body-secondary small mb-0">{description}</p>
            </div>
            {action}
        </div>
    );

    const renderPerformanceBars = () => (
        <div className="d-flex flex-column gap-3">
            {performanceData.map((item) => (
                <div key={item.subject}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small fw-semibold">{item.subject}</span>
                        <span className="small fw-bold">{item.score}%</span>
                    </div>
                    <div className="progress">
                        <div
                            className={`progress-bar ${item.score >= 85 ? 'bg-success' : item.score >= 75 ? 'bg-primary' : 'bg-warning'}`}
                            style={{ width: `${item.score}%` }}
                            role="progressbar"
                            aria-valuenow={item.score}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container-fluid py-4">
            <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="text-primary">
                            <i className="bi bi-bar-chart-line fs-3" />
                        </span>
                        <h2 className="fw-bold mb-0">Reports &amp; Analytics</h2>
                    </div>
                    <p className="text-body-secondary mb-0">
                        Monitor school performance, explore trends, and generate reports.
                    </p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={printReport}
                    >
                        <i className="bi bi-printer me-2" />
                        Print
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setActiveTab('reports');
                            setNotice('');
                        }}
                    >
                        <i className="bi bi-file-earmark-arrow-down me-2" />
                        Generate Report
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
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-4 col-xl-3">
                            <label className="form-label">Academic Year</label>
                            <select
                                className="form-select"
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value)}
                            >
                                {academicYears.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-md-4 col-xl-3">
                            <label className="form-label">Term</label>
                            <select
                                className="form-select"
                                value={selectedTerm}
                                onChange={(e) => setSelectedTerm(e.target.value)}
                            >
                                {terms.map((term) => (
                                    <option key={term} value={term}>{term}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-md-4 col-xl-3">
                            <label className="form-label">Class</label>
                            <select
                                className="form-select"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">All Classes</option>
                                {classes.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-xl-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setAcademicYear('2026/2027');
                                    setSelectedTerm('All Terms');
                                    setSelectedClass('');
                                    setNotice('');
                                }}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2" />
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-2">
                    <ul className="nav nav-pills flex-nowrap overflow-auto gap-1">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2' },
                            { id: 'academic', label: 'Academic Performance', icon: 'bi-mortarboard' },
                            { id: 'attendance', label: 'Attendance', icon: 'bi-calendar2-check' },
                            { id: 'enrollment', label: 'Enrollment', icon: 'bi-people' },
                            { id: 'students', label: 'Student Insights', icon: 'bi-person-lines-fill' },
                            { id: 'reports', label: 'Reports Library', icon: 'bi-file-earmark-bar-graph' },
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
                        {summaryCards.map(renderSummaryCard)}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-7">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Subject Performance',
                                        'Average student results by subject',
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setActiveTab('academic')}
                                        >
                                            Details
                                        </button>
                                    )}
                                    {renderPerformanceBars()}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-5">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Attendance Trend',
                                        'Monthly school attendance rate',
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setActiveTab('attendance')}
                                        >
                                            View Report
                                        </button>
                                    )}
                                    <div className="d-flex align-items-end justify-content-between gap-2 mt-4">
                                        {monthlyAttendance.map((item) => (
                                            <div
                                                className="d-flex flex-column align-items-center gap-2 flex-fill"
                                                key={item.month}
                                            >
                                                <span className="small fw-semibold">{item.rate}%</span>
                                                <div className="progress w-100 rounded-2" style={{ height: '140px', alignItems: 'end' }}>
                                                    <div
                                                        className="progress-bar bg-info w-100 rounded-2"
                                                        style={{ height: `${item.rate}%` }}
                                                    />
                                                </div>
                                                <span className="small text-body-secondary">{item.month}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-7">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Class Performance',
                                        'Compare class averages and pass rates',
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setActiveTab('academic')}
                                        >
                                            View All
                                        </button>
                                    )}
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Class</th>
                                                    <th>Average</th>
                                                    <th>Pass Rate</th>
                                                    <th>Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {classPerformance.slice(0, 5).map((item) => (
                                                    <tr key={item.name}>
                                                        <td className="fw-semibold">{item.name}</td>
                                                        <td>{item.average}%</td>
                                                        <td>
                                                            <span className="text-success fw-semibold">
                                                                {item.passRate}%
                                                            </span>
                                                        </td>
                                                        <td>{item.attendance}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-5">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Students Requiring Support',
                                        'Students with lower grades or attendance',
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setActiveTab('students')}
                                        >
                                            View All
                                        </button>
                                    )}
                                    {studentPerformance
                                        .filter((student) => student.average < 70 || student.attendance < 85)
                                        .slice(0, 4)
                                        .map((student) => (
                                            <div
                                                className="d-flex align-items-center gap-3 py-3 border-bottom"
                                                key={student.id}
                                            >
                                                <div className="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center p-2">
                                                    <i className="bi bi-person-exclamation fs-5" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="fw-semibold">{student.name}</div>
                                                    <div className="small text-body-secondary">
                                                        {student.className} · {student.id}
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fw-bold text-danger">{student.average}%</div>
                                                    <div className="small text-body-secondary">
                                                        {student.attendance}% attendance
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            {renderSectionHeading(
                                'Frequently Used Reports',
                                'Quick access to common school reports',
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setActiveTab('reports')}
                                >
                                    Browse All
                                </button>
                            )}
                            <div className="row g-3">
                                {reports.slice(0, 3).map((report) => (
                                    <div className="col-12 col-md-4" key={report.id}>
                                        <div className="border rounded-3 p-3 h-100">
                                            <div className={`rounded-3 bg-${report.color}-subtle text-${report.color} d-inline-flex p-2 mb-3`}>
                                                <i className={`bi ${report.icon} fs-5`} />
                                            </div>
                                            <h6 className="fw-bold">{report.name}</h6>
                                            <p className="small text-body-secondary">
                                                {report.description}
                                            </p>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => exportReport(report.name)}
                                            >
                                                <i className="bi bi-file-earmark-arrow-down me-2" />
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'academic' && (
                <>
                    <div className="row g-3 mb-4">
                        {renderSummaryCard({
                            label: 'Overall Average',
                            value: `${schoolAverage}%`,
                            icon: 'bi-mortarboard',
                            color: 'primary',
                            detail: 'Across listed subjects',
                        })}
                        {renderSummaryCard({
                            label: 'Highest Subject',
                            value: 'ICT',
                            icon: 'bi-trophy',
                            color: 'success',
                            detail: '91% average',
                        })}
                        {renderSummaryCard({
                            label: 'Subjects Tracked',
                            value: performanceData.length,
                            icon: 'bi-journal-bookmark',
                            color: 'info',
                            detail: 'Current sample dataset',
                        })}
                        {renderSummaryCard({
                            label: 'Class Pass Rate',
                            value: '90%',
                            icon: 'bi-check-circle',
                            color: 'warning',
                            detail: 'Approximate school average',
                        })}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Subject Averages',
                                        'Performance by subject'
                                    )}
                                    {renderPerformanceBars()}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Performance by Class',
                                        'Filter to compare a particular class'
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label">Class</label>
                                        <select
                                            className="form-select"
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                        >
                                            <option value="">All Classes</option>
                                            {classes.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {filteredClassPerformance.map((item) => (
                                        <div className="mb-4" key={item.name}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="fw-semibold small">{item.name}</span>
                                                <span className="small">{item.average}% average</span>
                                            </div>
                                            <div className="progress mb-2">
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: `${item.average}%` }}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between small text-body-secondary">
                                                <span>Pass rate: {item.passRate}%</span>
                                                <span>Attendance: {item.attendance}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4">
                            {renderSectionHeading(
                                'Class Performance Report',
                                'Academic averages and pass rates by class',
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => exportReport('Class Performance Report')}
                                >
                                    <i className="bi bi-download me-2" />
                                    Export
                                </button>
                            )}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Class</th>
                                        <th>Average Score</th>
                                        <th>Pass Rate</th>
                                        <th>Attendance</th>
                                        <th>Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClassPerformance.map((item) => (
                                        <tr key={item.name}>
                                            <td className="px-4 fw-semibold">{item.name}</td>
                                            <td>{item.average}%</td>
                                            <td>{item.passRate}%</td>
                                            <td>{item.attendance}%</td>
                                            <td>
                                                <span className={`badge ${item.average >= 80 ? 'bg-success-subtle text-success' : item.average >= 70 ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'}`}>
                                                    {item.average >= 80 ? 'Strong' : item.average >= 70 ? 'Satisfactory' : 'Needs improvement'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'attendance' && (
                <>
                    <div className="row g-3 mb-4">
                        {renderSummaryCard({
                            label: 'Average Attendance',
                            value: '92.5%',
                            icon: 'bi-calendar2-check',
                            color: 'success',
                            detail: 'Selected period',
                        })}
                        {renderSummaryCard({
                            label: 'Average Absence',
                            value: '5.1%',
                            icon: 'bi-person-x',
                            color: 'danger',
                            detail: 'Sample figures',
                        })}
                        {renderSummaryCard({
                            label: 'Late Arrivals',
                            value: '2.4%',
                            icon: 'bi-clock-history',
                            color: 'warning',
                            detail: 'Sample figures',
                        })}
                        {renderSummaryCard({
                            label: 'Classes Tracked',
                            value: classes.length,
                            icon: 'bi-people',
                            color: 'info',
                            detail: 'Classes in this demo',
                        })}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-7">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Monthly Attendance Trend',
                                        'Percentage of students present or late'
                                    )}
                                    <div className="d-flex align-items-end gap-3 mt-4">
                                        {monthlyAttendance.map((item) => (
                                            <div
                                                className="flex-fill text-center"
                                                key={item.month}
                                            >
                                                <div className="small fw-semibold mb-2">
                                                    {item.rate}%
                                                </div>
                                                <div className="progress rounded-2" style={{ height: '180px', alignItems: 'end' }}>
                                                    <div
                                                        className="progress-bar bg-success w-100"
                                                        style={{ height: `${item.rate}%` }}
                                                    />
                                                </div>
                                                <div className="small text-body-secondary mt-2">
                                                    {item.month}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-5">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Attendance by Class',
                                        'Compare current class rates'
                                    )}
                                    {classPerformance.map((item) => (
                                        <div className="mb-3" key={item.name}>
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span>{item.name}</span>
                                                <span className="fw-semibold">{item.attendance}%</span>
                                            </div>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-success"
                                                    style={{ width: `${item.attendance}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            {renderSectionHeading(
                                'Attendance Report',
                                'Download or print an attendance summary',
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => exportReport('Attendance Report')}
                                >
                                    <i className="bi bi-download me-2" />
                                    Export Report
                                </button>
                            )}
                            <p className="text-body-secondary small mb-0">
                                For individual attendance records and detailed absence history, use the Attendance History page.
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'enrollment' && (
                <>
                    <div className="row g-3 mb-4">
                        {renderSummaryCard({
                            label: 'Total Enrollment',
                            value: totalStudents,
                            icon: 'bi-people',
                            color: 'primary',
                            detail: 'Students across listed classes',
                        })}
                        {renderSummaryCard({
                            label: 'Classes',
                            value: classes.length,
                            icon: 'bi-door-open',
                            color: 'success',
                            detail: 'Current sample dataset',
                        })}
                        {renderSummaryCard({
                            label: 'Average Class Size',
                            value: Math.round(totalStudents / classes.length),
                            icon: 'bi-person-lines-fill',
                            color: 'info',
                            detail: 'Students per class',
                        })}
                        {renderSummaryCard({
                            label: 'Academic Year',
                            value: academicYear,
                            icon: 'bi-calendar3',
                            color: 'warning',
                            detail: 'Selected reporting year',
                        })}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-7">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Enrollment Trend',
                                        'Student enrollment over the years'
                                    )}
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Year</th>
                                                    <th>Boys</th>
                                                    <th>Girls</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enrollmentData.map((item) => (
                                                    <tr key={item.year}>
                                                        <td className="fw-semibold">{item.year}</td>
                                                        <td>{item.boys}</td>
                                                        <td>{item.girls}</td>
                                                        <td className="fw-semibold">{item.boys + item.girls}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-5">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    {renderSectionHeading(
                                        'Enrollment by Class',
                                        'Student distribution'
                                    )}
                                    {classes.map((item) => (
                                        <div className="mb-3" key={item.id}>
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span>{item.name}</span>
                                                <span className="fw-semibold">{item.students} students</span>
                                            </div>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-primary"
                                                    style={{ width: `${(item.students / Math.max(...classes.map((c) => c.students))) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4">
                            {renderSectionHeading(
                                'Class Enrollment Details',
                                'Class sizes and assigned teachers',
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => exportReport('Enrollment Report')}
                                >
                                    <i className="bi bi-download me-2" />
                                    Export
                                </button>
                            )}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Class</th>
                                        <th>Class Teacher</th>
                                        <th>Students</th>
                                        <th>Share of Enrollment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 fw-semibold">{item.name}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.students}</td>
                                            <td>{Math.round((item.students / totalStudents) * 100)}%</td>
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
                    <div className="row g-3 mb-4">
                        {renderSummaryCard({
                            label: 'Students Analyzed',
                            value: studentPerformance.length,
                            icon: 'bi-people',
                            color: 'primary',
                            detail: 'Students in sample dataset',
                        })}
                        {renderSummaryCard({
                            label: 'High Performers',
                            value: studentPerformance.filter((student) => student.average >= 85).length,
                            icon: 'bi-trophy',
                            color: 'success',
                            detail: 'Average grade of 85% or above',
                        })}
                        {renderSummaryCard({
                            label: 'At-Risk Students',
                            value: studentPerformance.filter((student) => student.average < 70 || student.attendance < 85).length,
                            icon: 'bi-exclamation-triangle',
                            color: 'danger',
                            detail: 'Low grades or attendance',
                        })}
                        {renderSummaryCard({
                            label: 'Average Score',
                            value: `${Math.round(studentPerformance.reduce((total, student) => total + student.average, 0) / studentPerformance.length)}%`,
                            icon: 'bi-graph-up',
                            color: 'info',
                            detail: 'Across listed students',
                        })}
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-3 p-lg-4">
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-lg-5">
                                    <label className="form-label">Search students</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-search" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Name or student ID"
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <label className="form-label">Class</label>
                                    <select
                                        className="form-select"
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        <option value="">All Classes</option>
                                        {classes.map((item) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <label className="form-label">Sort by</label>
                                    <select
                                        className="form-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="average">Academic Average</option>
                                        <option value="attendance">Attendance Rate</option>
                                        <option value="name">Student Name</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-body border-0 p-4 d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div>
                                <h5 className="fw-bold mb-1">Student Performance Insights</h5>
                                <p className="small text-body-secondary mb-0">
                                    {filteredStudents.length} student(s) match your filters
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => exportReport('Student Performance Report')}
                            >
                                <i className="bi bi-download me-2" />
                                Export
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Student</th>
                                        <th>Class</th>
                                        <th>Average Grade</th>
                                        <th>Attendance</th>
                                        <th>Trend</th>
                                        <th className="text-end px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-4">
                                                <div className="fw-semibold">{student.name}</div>
                                                <div className="small text-body-secondary">{student.id}</div>
                                            </td>
                                            <td>{student.className}</td>
                                            <td>
                                                <span className={`fw-semibold ${student.average < 70 ? 'text-danger' : student.average >= 85 ? 'text-success' : ''}`}>
                                                    {student.average}%
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`fw-semibold ${student.attendance < 85 ? 'text-danger' : 'text-success'}`}>
                                                    {student.attendance}%
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${student.trend === 'Up' ? 'bg-success-subtle text-success' : student.trend === 'Down' ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'}`}>
                                                    <i className={`bi ${student.trend === 'Up' ? 'bi-arrow-up-right' : student.trend === 'Down' ? 'bi-arrow-down-right' : 'bi-dash'} me-1`} />
                                                    {student.trend}
                                                </span>
                                            </td>
                                            <td className="text-end px-4">
                                                <div className="d-inline-flex gap-1">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="View student report"
                                                        onClick={() => console.log('View student report:', student)}
                                                    >
                                                        <i className="bi bi-eye" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        title="Export student report"
                                                        onClick={() => exportReport(`Student Report: ${student.name}`)}
                                                    >
                                                        <i className="bi bi-download" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredStudents.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5 text-body-secondary">
                                                No students match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'reports' && (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-lg-7">
                            <label className="form-label">Search reports</label>
                            <div className="input-group">
                                <span className="input-group-text bg-body">
                                    <i className="bi bi-search" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search by report name or description"
                                    value={reportSearch}
                                    onChange={(e) => setReportSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <label className="form-label">Report category</label>
                            <select
                                className="form-select"
                                value={reportCategory}
                                onChange={(e) => setReportCategory(e.target.value)}
                            >
                                {reportCategories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="fw-bold mb-1">Reports Library</h5>
                            <p className="text-body-secondary small mb-0">
                                {filteredReports.length} available report templates
                            </p>
                        </div>
                    </div>

                    <div className="row g-3">
                        {filteredReports.map((report) => (
                            <div className="col-12 col-md-6 col-xl-4" key={report.id}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                            <span className={`rounded-3 bg-${report.color}-subtle text-${report.color} p-3`}>
                                                <i className={`bi ${report.icon} fs-4`} />
                                            </span>
                                            <span className="badge bg-light text-body-secondary border">
                                                {report.category}
                                            </span>
                                        </div>
                                        <h5 className="fw-bold">{report.name}</h5>
                                        <p className="text-body-secondary small">{report.description}</p>
                                        <div className="small text-body-secondary mb-4">
                                            <i className="bi bi-clock me-2" />
                                            Updated {report.updated}
                                        </div>
                                        <div className="d-flex gap-2 mt-auto">
                                            <button
                                                type="button"
                                                className="btn btn-primary flex-grow-1"
                                                onClick={() => exportReport(report.name)}
                                            >
                                                <i className="bi bi-file-earmark-arrow-down me-2" />
                                                Generate
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                title="Print report"
                                                onClick={printReport}
                                            >
                                                <i className="bi bi-printer" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredReports.length === 0 && (
                            <div className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body text-center py-5">
                                        <i className="bi bi-file-earmark-x fs-1 text-body-secondary" />
                                        <h5 className="fw-bold mt-3">No reports found</h5>
                                        <p className="text-body-secondary mb-0">
                                            Try another search or category.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="text-body-secondary small mt-4">
                <i className="bi bi-info-circle me-1" />
                This page uses sample data for demonstration. Report generation and export buttons are placeholders until connected to your backend and actual school records.
            </div>
        </div>
    );
};
