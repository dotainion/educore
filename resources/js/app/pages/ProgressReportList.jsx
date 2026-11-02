import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialReports = [
    {
        id: 1,
        studentId: "STU-2026-001",
        student: "Amelia James",
        className: "Form 1A",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Completed",
    },
    {
        id: 2,
        studentId: "STU-2026-002",
        student: "Noah Charles",
        className: "Form 2B",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "In Progress",
    },
    {
        id: 3,
        studentId: "STU-2026-003",
        student: "Sophia Roberts",
        className: "Form 3A",
        term: "Hillary",
        academicYear: "2026/2027",
        status: "Published",
    },
    {
        id: 4,
        studentId: "STU-2026-004",
        student: "Ethan Williams",
        className: "Form 1B",
        term: "Trinity",
        academicYear: "2026/2027",
        status: "Draft",
    },
    {
        id: 5,
        studentId: "STU-2026-005",
        student: "Olivia Peters",
        className: "Form 2A",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Completed",
    },
];

const statusOptions = [
    { label: "All Statuses", value: "All Statuses" },
    { label: "Draft", value: "Draft" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Published", value: "Published" },
];

const termOptions = [
    { label: "All Terms", value: "All Terms" },
    { label: "Michaelmas", value: "Michaelmas" },
    { label: "Hillary", value: "Hillary" },
    { label: "Trinity", value: "Trinity" },
];

const statusStyles = {
    Draft: "bg-secondary-subtle text-secondary",
    "In Progress": "bg-primary-subtle text-primary",
    Completed: "bg-success-subtle text-success",
    Published: "bg-info-subtle text-info",
};

const summaryCards = [
    {
        label: "Total Reports",
        icon: "bi-file-earmark-text",
        color: "primary",
        getValue: (reports) => reports.length,
    },
    {
        label: "Completed",
        icon: "bi-check-circle",
        color: "success",
        getValue: (reports) =>
            reports.filter((report) =>
                ["Completed", "Published"].includes(report.status)
            ).length,
    },
    {
        label: "Pending",
        icon: "bi-clock-history",
        color: "warning",
        getValue: (reports) =>
            reports.filter((report) =>
                ["Draft", "In Progress"].includes(report.status)
            ).length,
    },
];

export const ProgressReportList = () => {
    const navigate = useNavigate();

    const [reports, setReports] = useState(initialReports);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("All Classes");
    const [termFilter, setTermFilter] = useState("All Terms");
    const [statusFilter, setStatusFilter] = useState("All Statuses");

    const classes = useMemo(
        () => [...new Set(reports.map((report) => report.className))].sort(),
        [reports]
    );

    const filteredReports = useMemo(() => {
        const query = search.trim().toLowerCase();

        return reports.filter((report) => {
            const matchesSearch = [
                report.student,
                report.studentId,
                report.className,
            ].some((value) => value.toLowerCase().includes(query));

            return (
                matchesSearch &&
                (classFilter === "All Classes" ||
                    report.className === classFilter) &&
                (termFilter === "All Terms" || report.term === termFilter) &&
                (statusFilter === "All Statuses" ||
                    report.status === statusFilter)
            );
        });
    }, [reports, search, classFilter, termFilter, statusFilter]);

    const clearFilters = () => {
        setSearch("");
        setClassFilter("All Classes");
        setTermFilter("All Terms");
        setStatusFilter("All Statuses");
    };

    const viewProgressReport = (report) =>
        navigate("/view/progress/report", {
            state: { report, studentId: report.studentId },
        });

    const viewReportCard = (report) =>
        navigate(`/report/card/${encodeURIComponent(report.studentId)}`, {
            state: {
                studentId: report.studentId,
                studentName: report.student,
                className: report.className,
                term: report.term,
                academicYear: report.academicYear,
            },
        });

    const publishReport = (report) => {
        if (report.status !== "Completed") return;

        if (
            !window.confirm(
                `Publish the progress report for ${report.student}?`
            )
        ) {
            return;
        }

        setReports((current) =>
            current.map((item) =>
                item.id === report.id
                    ? { ...item, status: "Published" }
                    : item
            )
        );
    };

    const deleteReport = (report) => {
        if (
            !window.confirm(
                `Delete the progress report for ${report.student}? This action cannot be undone.`
            )
        ) {
            return;
        }

        setReports((current) =>
            current.filter((item) => item.id !== report.id)
        );
    };

    const getActions = (report) => [
        {
            label: "View Progress Report",
            icon: "bi-file-earmark-text",
            className: "text-primary",
            onClick: () => viewProgressReport(report),
        },
        {
            label: "View Report Card",
            icon: "bi-mortarboard",
            className: "text-success",
            onClick: () => viewReportCard(report),
        },
        ...(report.status === "Completed"
            ? [
                  {
                      label: "Publish Report",
                      icon: "bi-cloud-upload",
                      className: "text-primary",
                      onClick: () => publishReport(report),
                  },
              ]
            : []),
        ...(report.status === "Published"
            ? [
                  {
                      label: "Published",
                      icon: "bi-check-circle-fill",
                      className: "text-success",
                      disabled: true,
                      onClick: () => {},
                  },
              ]
            : []),
        { divider: true },
        {
            label: "Delete",
            icon: "bi-trash",
            className: "text-danger",
            onClick: () => deleteReport(report),
        },
    ];

    const filters = [
        {
            label: "Filter by class",
            value: classFilter,
            onChange: setClassFilter,
            options: [
                { label: "All Classes", value: "All Classes" },
                ...classes.map((name) => ({ label: name, value: name })),
            ],
            column: "col-6 col-lg-2",
        },
        {
            label: "Filter by term",
            value: termFilter,
            onChange: setTermFilter,
            options: termOptions,
            column: "col-6 col-lg-3",
        },
        {
            label: "Filter by status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: statusOptions,
            column: "col-12 col-lg-3",
        },
    ];

    return (
        <main className="container-fluid px-3 px-md-4 px-xl-5 py-4">
            {/* Header */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <div className="text-primary fw-semibold small text-uppercase mb-2">
                        Academics / Reports
                    </div>
                    <h2 className="fw-bold mb-1">Progress Reports</h2>
                    <p className="text-body-secondary mb-0">
                        Manage student reports, review progress, and publish
                        completed reports.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary d-inline-flex align-items-center gap-2 align-self-start"
                    onClick={() => navigate("/Progress/report")}
                >
                    <i className="bi bi-plus-lg" />
                    Create Progress Report
                </button>
            </div>

            {/* Summary */}
            <div className="row g-2 mb-4">
                {summaryCards.map((card) => (
                    <div className="col-6 col-lg-4" key={card.label}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className={`rounded-3 bg-${card.color}-subtle text-${card.color} p-2`}
                                    >
                                        <i className={`bi ${card.icon} fs-5`} />
                                    </div>
                                    <div>
                                        <div className="small text-body-secondary">
                                            {card.label}
                                        </div>
                                        <div className="fs-4 fw-bold lh-1 mt-1">
                                            {card.getValue(reports)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Listing */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-body border-0 px-3 px-lg-4 pt-4 pb-3">
                    <h5 className="fw-bold mb-1">All Progress Reports</h5>
                    <p className="text-body-secondary small mb-0">
                        Select a row to open its progress report, or use the
                        actions menu for more options.
                    </p>
                </div>

                <div className="card-body px-3 px-lg-4">
                    {/* Search and filters */}
                    <div className="row g-2 mb-3">
                        <div className="col-12 col-lg-4">
                            <div className="input-group">
                                <span className="input-group-text bg-body">
                                    <i className="bi bi-search" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search student, ID, or class..."
                                    aria-label="Search reports"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {filters.map((filter) => (
                            <div className={filter.column} key={filter.label}>
                                <select
                                    className="form-select"
                                    aria-label={filter.label}
                                    value={filter.value}
                                    onChange={(event) =>
                                        filter.onChange(event.target.value)
                                    }
                                >
                                    {filter.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small text-body-secondary">
                            Showing{" "}
                            <strong className="text-body">
                                {filteredReports.length}
                            </strong>{" "}
                            of {reports.length} reports
                        </span>

                        {(search ||
                            classFilter !== "All Classes" ||
                            termFilter !== "All Terms" ||
                            statusFilter !== "All Statuses") && (
                            <button
                                type="button"
                                className="btn btn-sm btn-link text-decoration-none"
                                onClick={clearFilters}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Responsive table */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="py-3">Student</th>
                                    <th className="py-3">Class</th>
                                    <th className="py-3">Term</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3 text-end">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr
                                        key={report.id}
                                        role="link"
                                        tabIndex={0}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            viewProgressReport(report)
                                        }
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault();
                                                viewProgressReport(report);
                                            }
                                        }}
                                    >
                                        <td className="py-3">
                                            <div className="fw-semibold">
                                                {report.student}
                                            </div>
                                            <div className="small text-body-secondary mt-1">
                                                {report.studentId}
                                            </div>
                                        </td>
                                        <td>{report.className}</td>
                                        <td>
                                            <div>{report.term}</div>
                                            <div className="small text-body-secondary">
                                                {report.academicYear}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    statusStyles[report.status]
                                                }`}
                                            >
                                                {report.status}
                                            </span>
                                        </td>

                                        {/* Actions menu */}
                                        <td
                                            className="text-end"
                                            onClick={(event) =>
                                                event.stopPropagation()
                                            }
                                            onKeyDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        >
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light border"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    aria-label={`Actions for ${report.student}`}
                                                >
                                                    <i className="bi bi-three-dots-vertical" />
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                                    {getActions(report).map(
                                                        (action, index) =>
                                                            action.divider ? (
                                                                <li key={`divider-${index}`}>
                                                                    <hr className="dropdown-divider" />
                                                                </li>
                                                            ) : (
                                                                <li key={action.label}>
                                                                    <button
                                                                        type="button"
                                                                        className={`dropdown-item d-flex align-items-center gap-2 small ${
                                                                            action.className ?? ""
                                                                        }`}
                                                                        disabled={action.disabled}
                                                                        onClick={
                                                                            action.onClick
                                                                        }
                                                                    >
                                                                        <i
                                                                            className={`bi ${action.icon}`}
                                                                        />
                                                                        {action.label}
                                                                    </button>
                                                                </li>
                                                            )
                                                    )}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredReports.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-5"
                                        >
                                            <i className="bi bi-folder2-open fs-1 text-body-secondary" />
                                            <h6 className="fw-semibold mt-3">
                                                No reports found
                                            </h6>
                                            <p className="text-body-secondary small mb-3">
                                                Try adjusting your search or
                                                filters.
                                            </p>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={clearFilters}
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-top mt-3 pt-3 small text-body-secondary">
                        Academic year 2026/2027
                    </div>
                </div>
            </div>
        </main>
    );
};
