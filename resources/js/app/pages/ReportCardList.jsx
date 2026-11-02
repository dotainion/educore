import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialReportCards = [
    {
        id: 1,
        studentId: "STU-2026-001",
        student: "Amelia James",
        className: "Form 1A",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Published",
        visibility: "Public",
    },
    {
        id: 2,
        studentId: "STU-2026-002",
        student: "Noah Charles",
        className: "Form 2B",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Ready",
        visibility: "Private",
    },
    {
        id: 3,
        studentId: "STU-2026-003",
        student: "Sophia Roberts",
        className: "Form 3A",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Draft",
        visibility: "Private",
    },
    {
        id: 4,
        studentId: "STU-2026-004",
        student: "Ethan Williams",
        className: "Form 1B",
        term: "Michaelmas",
        academicYear: "2026/2027",
        status: "Published",
        visibility: "Private",
    },
    {
        id: 5,
        studentId: "STU-2026-005",
        student: "Olivia Peters",
        className: "Form 2A",
        term: "Hillary",
        academicYear: "2026/2027",
        status: "Ready",
        visibility: "Public",
    },
];

const statusStyles = {
    Draft: "bg-secondary-subtle text-secondary",
    Ready: "bg-warning-subtle text-warning-emphasis",
    Published: "bg-success-subtle text-success",
};

const visibilityStyles = {
    Private: "bg-secondary-subtle text-secondary",
    Public: "bg-primary-subtle text-primary",
};

const statusOptions = [
    { label: "All Statuses", value: "All Statuses" },
    { label: "Draft", value: "Draft" },
    { label: "Ready", value: "Ready" },
    { label: "Published", value: "Published" },
];

const termOptions = [
    { label: "All Terms", value: "All Terms" },
    { label: "Michaelmas", value: "Michaelmas" },
    { label: "Hillary", value: "Hillary" },
    { label: "Trinity", value: "Trinity" },
];

const summaryCards = [
    {
        label: "Total Report Cards",
        icon: "bi-mortarboard",
        color: "primary",
        getValue: (cards) => cards.length,
    },
    {
        label: "Published",
        icon: "bi-check-circle",
        color: "success",
        getValue: (cards) =>
            cards.filter((card) => card.status === "Published").length,
    },
    {
        label: "Awaiting Publication",
        icon: "bi-clock-history",
        color: "warning",
        getValue: (cards) =>
            cards.filter((card) => card.status !== "Published").length,
    },
];

export const ReportCardList = () => {
    const navigate = useNavigate();

    const [reportCards, setReportCards] = useState(initialReportCards);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("All Classes");
    const [termFilter, setTermFilter] = useState("All Terms");
    const [statusFilter, setStatusFilter] = useState("All Statuses");

    const classes = useMemo(
        () =>
            [...new Set(reportCards.map((card) => card.className))].sort(),
        [reportCards]
    );

    const filteredCards = useMemo(() => {
        const query = search.trim().toLowerCase();

        return reportCards.filter((card) => {
            const matchesSearch = [
                card.student,
                card.studentId,
                card.className,
            ].some((value) => value.toLowerCase().includes(query));

            return (
                matchesSearch &&
                (classFilter === "All Classes" ||
                    card.className === classFilter) &&
                (termFilter === "All Terms" || card.term === termFilter) &&
                (statusFilter === "All Statuses" ||
                    card.status === statusFilter)
            );
        });
    }, [reportCards, search, classFilter, termFilter, statusFilter]);

    const clearFilters = () => {
        setSearch("");
        setClassFilter("All Classes");
        setTermFilter("All Terms");
        setStatusFilter("All Statuses");
    };

    const viewCard = (card) =>
        navigate(`/report/card`, {
            state: {
                studentId: card.studentId,
                studentName: card.student,
                className: card.className,
                term: card.term,
                academicYear: card.academicYear,
            },
        });

    const updateCard = (cardId, changes) => {
        setReportCards((current) =>
            current.map((card) =>
                card.id === cardId ? { ...card, ...changes } : card
            )
        );
    };

    const publishCard = (card) => {
        if (card.status === "Draft") {
            window.alert(
                "This report card is still a draft. Complete and approve it before publishing."
            );
            return;
        }

        if (card.status === "Published") return;

        if (
            !window.confirm(
                `Publish the report card for ${card.student}?`
            )
        ) {
            return;
        }

        updateCard(card.id, { status: "Published" });
    };

    const toggleVisibility = (card) => {
        if (card.status !== "Published") {
            window.alert(
                "Publish the report card before changing its visibility."
            );
            return;
        }

        const nextVisibility =
            card.visibility === "Public" ? "Private" : "Public";

        const message =
            nextVisibility === "Public"
                ? `Make ${card.student}'s report card publicly available?`
                : `Restrict public access to ${card.student}'s report card?`;

        if (!window.confirm(message)) return;

        updateCard(card.id, { visibility: nextVisibility });
    };

    const getActions = (card) => [
        {
            label: "View Report Card",
            icon: "bi-eye",
            className: "text-primary",
            onClick: () => viewCard(card),
        },
        ...(card.status === "Ready"
            ? [
                  {
                      label: "Publish Report Card",
                      icon: "bi-cloud-upload",
                      className: "text-success",
                      onClick: () => publishCard(card),
                  },
              ]
            : []),
        ...(card.status === "Draft"
            ? [
                  {
                      label: "Review Report Card",
                      icon: "bi-pencil-square",
                      className: "text-secondary",
                      onClick: () => viewCard(card),
                  },
              ]
            : []),
        ...(card.status === "Published"
            ? [
                  {
                      label:
                          card.visibility === "Public"
                              ? "Make Private"
                              : "Make Public",
                      icon:
                          card.visibility === "Public"
                              ? "bi-lock"
                              : "bi-globe",
                      className: "text-primary",
                      onClick: () => toggleVisibility(card),
                  },
                  {
                      label: "Publication Details",
                      icon: "bi-info-circle",
                      className: "text-secondary",
                      onClick: () =>
                          window.alert(
                              `Status: ${card.status}\nVisibility: ${card.visibility}\nStudent: ${card.student}`
                          ),
                  },
              ]
            : []),
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
            column: "col-6 col-lg-3",
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
                    <h2 className="fw-bold mb-1">Report Cards</h2>
                    <p className="text-body-secondary mb-0">
                        Review student report cards and manage publication
                        and access settings.
                    </p>
                </div>

                <div className="d-flex align-items-center gap-2 text-body-secondary small">
                    <i className="bi bi-shield-check fs-5 text-success" />
                    Report cards are retained in the system
                </div>
            </div>

            {/* Summary */}
            <div className="row g-2 mb-4">
                {summaryCards.map((item) => (
                    <div className="col-6 col-lg-4" key={item.label}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className={`rounded-3 bg-${item.color}-subtle text-${item.color} p-2`}
                                    >
                                        <i className={`bi ${item.icon} fs-5`} />
                                    </div>
                                    <div>
                                        <div className="small text-body-secondary">
                                            {item.label}
                                        </div>
                                        <div className="fs-4 fw-bold lh-1 mt-1">
                                            {item.getValue(reportCards)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Card Listing */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-body border-0 px-3 px-lg-4 pt-4 pb-3">
                    <h5 className="fw-bold mb-1">All Report Cards</h5>
                    <p className="text-body-secondary small mb-0">
                        Select a student to view their report card or use the
                        actions menu to manage publication.
                    </p>
                </div>

                <div className="card-body px-3 px-lg-4">
                    {/* Search and Filters */}
                    <div className="row g-2 mb-3">
                        <div className="col-12 col-lg-3">
                            <div className="input-group">
                                <span className="input-group-text bg-body">
                                    <i className="bi bi-search" />
                                </span>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search student or ID..."
                                    aria-label="Search report cards"
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
                                {filteredCards.length}
                            </strong>{" "}
                            of {reportCards.length} report cards
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

                    {/* Responsive Table */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="py-3">Student</th>
                                    <th className="py-3">Class</th>
                                    <th className="py-3">Term</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Visibility</th>
                                    <th className="py-3 text-end">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCards.map((card) => (
                                    <tr
                                        key={card.id}
                                        role="link"
                                        tabIndex={0}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => viewCard(card)}
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault();
                                                viewCard(card);
                                            }
                                        }}
                                    >
                                        <td className="py-3">
                                            <div className="fw-semibold">
                                                {card.student}
                                            </div>
                                            <div className="small text-body-secondary mt-1">
                                                {card.studentId}
                                            </div>
                                        </td>
                                        <td>{card.className}</td>
                                        <td>
                                            <div>{card.term}</div>
                                            <div className="small text-body-secondary">
                                                {card.academicYear}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    statusStyles[card.status]
                                                }`}
                                            >
                                                {card.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    visibilityStyles[
                                                        card.visibility
                                                    ]
                                                }`}
                                            >
                                                <i
                                                    className={`bi ${
                                                        card.visibility ===
                                                        "Public"
                                                            ? "bi-globe"
                                                            : "bi-lock"
                                                    } me-1`}
                                                />
                                                {card.visibility}
                                            </span>
                                        </td>

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
                                                    aria-label={`Actions for ${card.student}`}
                                                >
                                                    <i className="bi bi-three-dots-vertical" />
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                                    {getActions(card).map(
                                                        (action, index) => (
                                                            <li key={action.label}>
                                                                <button
                                                                    type="button"
                                                                    className={`dropdown-item d-flex align-items-center gap-2 ${
                                                                        action.className ??
                                                                        ""
                                                                    }`}
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

                                {filteredCards.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-5"
                                        >
                                            <i className="bi bi-folder2-open fs-1 text-body-secondary" />
                                            <h6 className="fw-semibold mt-3">
                                                No report cards found
                                            </h6>
                                            <p className="text-body-secondary small mb-3">
                                                Try changing your search or
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

                    <div className="border-top mt-3 pt-3 d-flex align-items-start gap-2 small text-body-secondary">
                        <i className="bi bi-info-circle mt-1" />
                        <span>
                            Report cards are retained for school records.
                            Public visibility should only be enabled when
                            permitted by school policy and applicable privacy
                            requirements.
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};
