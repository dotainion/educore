
import { Link } from "react-router-dom";
import { routes } from "../routes/Routes";


export const AcademicReports = () => {
    const reportOptions = [
        {
            title: "Create Progress Report",
            description: "Create and prepare academic progress reports to track student performance throughout the term.",
            icon: "bi-file-earmark-plus",
            route: routes.progressReport,
            label: "Create report",
            color: "primary",
        },{
            title: "Report Cards",
            description: "Access student report cards, academic results, and term performance summaries.",
            icon: "bi-mortarboard",
            route: routes.reportCardList,
            label: "Manage report cards",
            color: "info",
        },{
            title: "View Progress Reports",
            description: "Browse, search, and review existing student progress reports throughout the academic term.",
            icon: "bi-file-earmark-text",
            route: routes.progressReportList,
            label: "View reports",
            color: "success",
        }
    ];

    return (
        <main className="container-fluid px-3 px-md-4 px-xl-5 py-4 py-lg-5">
            {/* Page heading */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 mb-lg-5">
                <div>
                    <div className="d-flex align-items-center gap-2 text-primary small fw-semibold mb-2">
                        <i className="bi bi-journal-bookmark"></i>
                        ACADEMICS
                    </div>

                    <h1 className="h3 fw-bold mb-2">
                        Academic Reports
                    </h1>

                    <p className="text-body-secondary mb-0">
                        Create, review, and manage student academic reports
                        from one place.
                    </p>
                </div>

                <div className="d-flex align-items-center gap-2 rounded-3 border px-3 py-2 align-self-start align-self-md-center">
                    <i className="bi bi-shield-check text-success fs-5"></i>
                    <span className="small text-body-secondary">
                        Academic records
                    </span>
                </div>
            </div>

            {/* Section heading */}
            <div className="mb-3">
                <h2 className="h6 fw-bold mb-1">Report management</h2>
                <p className="text-body-secondary small mb-0">
                    Select a section to continue.
                </p>
            </div>

            {/* Navigation cards */}
            <div className="row g-3 g-lg-4">
                {reportOptions.map((option) => (
                    <div
                        className="col-12 col-md-6 col-xl-4"
                        key={option.route}
                    >
                        <Link
                            to={option.route}
                            className="card h-100 text-decoration-none text-reset shadow-sm"
                            aria-label={`${option.label}: ${option.title}`}
                        >
                            <div className="card-body p-3 p-sm-4 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div
                                        className={`rounded-3 bg-${option.color} bg-opacity-10 text-${option.color} d-flex align-items-center justify-content-center`}
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <i
                                            className={`bi ${option.icon} fs-3`}
                                            aria-hidden="true"
                                        ></i>
                                    </div>

                                    <span className="text-body-secondary">
                                        <i
                                            className="bi bi-arrow-up-right fs-5"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                </div>

                                <h3 className="h5 fw-bold mb-2">
                                    {option.title}
                                </h3>

                                <p className="text-body-secondary mb-4">
                                    {option.description}
                                </p>

                                <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                                    <span
                                        className={`small fw-semibold text-${option.color}`}
                                    >
                                        {option.label}
                                    </span>

                                    <i
                                        className={`bi bi-arrow-right text-${option.color}`}
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Helpful note */}
            <div className="mt-4 mt-lg-5 p-3 p-md-4 rounded-3 border bg-body-tertiary">
                <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-info-circle text-primary fs-5"></i>
                    <div>
                        <h2 className="h6 fw-semibold mb-1">
                            Keep academic records organized
                        </h2>
                        <p className="small text-body-secondary mb-0">
                            Use the appropriate reporting section to prepare
                            reports, review student progress, and access
                            report cards for the relevant academic period.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};
