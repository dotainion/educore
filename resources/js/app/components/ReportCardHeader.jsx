
import { useState } from "react";

export const ReportCardHeader = ({
    reportCardData = {},
    onPublish,
    onVisibilityChange,
    onPublicationDetails,
    onViewHistory,
    onView,
    onDownload,
    onPrint,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const [localData, setLocalData] = useState(null);

    const data = localData || reportCardData || {};
    const student = data.student || {};

    const studentName =
        student.name ||
        [student.firstName, student.middleName, student.lastName]
            .filter(Boolean)
            .join(" ") ||
        data.studentName ||
        "Student Name";

    const studentId =
        student.studentId || student.student_id || student.id ||
        data.studentId || "—";

    const className =
        student.className || student.class_name ||
        data.className || data.class_name || "—";

    const term = data.term || "—";
    const academicYear = data.academicYear || data.academic_year || "—";
    const status = data.status || "Draft";
    const visibility = data.visibility || "Private";

    const isPublished = status.toLowerCase() === "published";
    const isPublic = visibility.toLowerCase() === "public";

    const createdBy = data.createdBy?.name || data.created_by?.name ||
        data.createdBy || data.created_by || "—";

    const updatedBy = data.updatedBy?.name || data.updated_by?.name ||
        data.updatedBy || data.updated_by || "—";

    const publishedBy = data.publishedBy?.name || data.published_by?.name ||
        data.publishedBy || data.published_by || "—";

    const createdAt = data.createdAt || data.created_at;
    const updatedAt = data.updatedAt || data.updated_at;
    const publishedAt = data.publishedAt || data.published_at;

    const formatDate = (value) => {
        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return String(value);

        return date.toLocaleString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const runAction = (callback, payload = data) => {
        setMenuOpen(false);

        if (typeof callback === "function") {
            callback(payload);
        }
    };

    const updateLocalData = (updates) => {
        const updatedData = { ...data, ...updates };

        setLocalData(updatedData);

        return updatedData;
    };

    const handlePublish = () => {
        setMenuOpen(false);

        if (isPublished) return;

        if (typeof onPublish === "function") {
            onPublish(data);
            return;
        }

        setModal("publish");
    };

    const confirmPublish = () => {
        const now = new Date().toISOString();

        const updatedData = updateLocalData({
            status: "Published",
            publishedAt: now,
            published_at: now,
            updatedAt: now,
            updated_at: now,
        });

        setModal(null);
    };

    const handleVisibilityChange = () => {
        setMenuOpen(false);

        if (!isPublished) {
            setModal("notPublished");
            return;
        }

        if (typeof onVisibilityChange === "function") {
            onVisibilityChange({
                ...data,
                visibility: isPublic ? "Private" : "Public",
            });
            return;
        }

        setModal("visibility");
    };

    const confirmVisibilityChange = () => {
        updateLocalData({
            visibility: isPublic ? "Private" : "Public",
            updatedAt: new Date().toISOString(),
        });

        setModal(null);
    };

    const handlePublicationDetails = () => {
        setMenuOpen(false);

        if (typeof onPublicationDetails === "function") {
            onPublicationDetails(data);
        } else {
            setModal("publication");
        }
    };

    const handleHistory = () => {
        setMenuOpen(false);

        if (typeof onViewHistory === "function") {
            onViewHistory(data);
        } else {
            setModal("history");
        }
    };

    const handleDownload = () => {
        setMenuOpen(false);

        if (typeof onDownload === "function") {
            onDownload(data);
        } else {
            window.print();
        }
    };

    const handlePrint = () => {
        setMenuOpen(false);

        if (typeof onPrint === "function") {
            onPrint(data);
        } else {
            window.print();
        }
    };

    const handleView = () => {
        runAction(onView);
    };

    const badgeClass =
        status.toLowerCase() === "published"
            ? "bg-success-subtle text-success"
            : status.toLowerCase() === "ready"
              ? "bg-info-subtle text-info-emphasis"
              : "bg-secondary-subtle text-secondary";

    const actionItems = [
        ...(!isPublished
            ? [{
                label: "Publish Report Card",
                icon: "bi-cloud-arrow-up",
                action: handlePublish,
            }]
            : [{
                label: isPublic ? "Make Private" : "Make Public",
                icon: isPublic ? "bi-lock" : "bi-globe",
                action: handleVisibilityChange,
            }]),
        {
            label: "Publication Details",
            icon: "bi-file-earmark-text",
            action: handlePublicationDetails,
        },
        { divider: true },
        {
            label: "View Report Card",
            icon: "bi-eye",
            action: handleView,
        },
        {
            label: "View History",
            icon: "bi-clock-history",
            action: handleHistory,
        },
        { divider: true },
        {
            label: "Print Report Card",
            icon: "bi-printer",
            action: handlePrint,
        },
    ];

    return (
        <>
            <div className="card border-0 shadow-sm mb-4">
                {/* Main header */}
                <div className="card-body p-3 p-lg-4">
                    <div className="d-flex flex-column flex-xl-row justify-content-between gap-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-primary-subtle text-primary p-3 d-flex align-items-center justify-content-center flex-shrink-0">
                                <i className="bi bi-mortarboard fs-3"></i>
                            </div>

                            <div className="min-w-0">
                                <h4 className="mb-1 fw-bold text-dark">
                                    {studentName}
                                </h4>

                                <div className="d-flex flex-wrap align-items-center gap-2 text-secondary">
                                    <span>{studentId}</span>
                                    <span>•</span>
                                    <span>{className}</span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap align-items-center gap-4">
                            <div>
                                <div className="small text-secondary mb-1">
                                    <i className="bi bi-calendar me-2"></i>
                                    Term
                                </div>
                                <div className="fw-semibold">{term}</div>
                            </div>

                            <div>
                                <div className="small text-secondary mb-1">
                                    <i className="bi bi-calendar3 me-2"></i>
                                    Academic Year
                                </div>
                                <div className="fw-semibold">
                                    {academicYear}
                                </div>
                            </div>

                            <div>
                                <div className="small text-secondary mb-1">
                                    Status
                                </div>

                                <span className={`badge rounded-pill px-3 py-2 ${badgeClass}`}>
                                    <i className="bi bi-check-circle me-1"></i>
                                    {status}
                                </span>
                            </div>
                        </div>

                        {/* Header actions */}
                        <div className="d-flex align-items-start gap-2 flex-shrink-0">
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center gap-2"
                                onClick={handleDownload}
                            >
                                <i className="bi bi-download"></i>
                                Download
                                <i className="bi bi-chevron-down ms-1"></i>
                            </button>

                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                                    aria-expanded={menuOpen}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    Actions
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {menuOpen && (
                                    <>
                                        <div
                                            className="position-fixed top-0 start-0 w-100 h-100"
                                            style={{ zIndex: 1000 }}
                                            onClick={() => setMenuOpen(false)}
                                        />

                                        <div
                                            className="dropdown-menu dropdown-menu-end show shadow-sm mt-2"
                                            style={{
                                                zIndex: 1001,
                                                minWidth: "230px",
                                            }}
                                        >
                                            {actionItems.map((item, index) =>
                                                item.divider ? (
                                                    <div
                                                        key={`divider-${index}`}
                                                        className="dropdown-divider"
                                                    />
                                                ) : (
                                                    <button
                                                        key={item.label}
                                                        type="button"
                                                        className="dropdown-item d-flex align-items-center gap-3 py-2"
                                                        onClick={item.action}
                                                    >
                                                        <i className={`bi ${item.icon} fs-5`}></i>
                                                        {item.label}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-0" />

                {/* Publication and audit information */}
                <div className="card-body p-3 p-lg-4">
                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="d-flex gap-3">
                                <i className="bi bi-globe text-primary fs-4"></i>
                                <div>
                                    <div className="small text-secondary mb-1">
                                        Visibility
                                    </div>
                                    <div className="fw-semibold">
                                        {isPublished ? visibility : "Not published"}
                                    </div>
                                    <small className="text-secondary">
                                        {isPublished
                                            ? isPublic
                                                ? "Public access enabled"
                                                : "Restricted access"
                                            : "Publish to manage visibility"}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="d-flex gap-3">
                                <i className="bi bi-calendar-check text-primary fs-4"></i>
                                <div>
                                    <div className="small text-secondary mb-1">
                                        Published
                                    </div>
                                    <div className="fw-semibold">
                                        {isPublished
                                            ? formatDate(publishedAt)
                                            : "Not published"}
                                    </div>
                                    {isPublished && (
                                        <small className="text-secondary">
                                            by {publishedBy}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="d-flex gap-3">
                                <i className="bi bi-arrow-repeat text-primary fs-4"></i>
                                <div>
                                    <div className="small text-secondary mb-1">
                                        Last Updated
                                    </div>
                                    <div className="fw-semibold">
                                        {formatDate(updatedAt)}
                                    </div>
                                    <small className="text-secondary">
                                        by {updatedBy}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="d-flex gap-3">
                                <i className="bi bi-person text-primary fs-4"></i>
                                <div>
                                    <div className="small text-secondary mb-1">
                                        Created
                                    </div>
                                    <div className="fw-semibold">
                                        {formatDate(createdAt)}
                                    </div>
                                    <small className="text-secondary">
                                        by {createdBy}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Built-in confirmation and information modals */}
            {modal && (
                <>
                    <div
                        className="modal-backdrop show"
                        onClick={() => setModal(null)}
                    ></div>

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-semibold">
                                        {modal === "publish" && "Publish Report Card"}
                                        {modal === "visibility" && "Change Visibility"}
                                        {modal === "notPublished" && "Report Not Published"}
                                        {modal === "publication" && "Publication Details"}
                                        {modal === "history" && "Report Card History"}
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setModal(null)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    {modal === "publish" && (
                                        <>
                                            <p>
                                                Are you sure you want to publish the report card for{" "}
                                                <strong>{studentName}</strong>?
                                            </p>
                                            <p className="text-secondary small mb-0">
                                                Ensure the report has been reviewed before publishing.
                                            </p>
                                        </>
                                    )}

                                    {modal === "visibility" && (
                                        <>
                                            <p>
                                                Change visibility from{" "}
                                                <strong>{visibility}</strong> to{" "}
                                                <strong>{isPublic ? "Private" : "Public"}</strong>?
                                            </p>
                                            <p className="text-secondary small mb-0">
                                                Public access should only be enabled when appropriate access controls are in place.
                                            </p>
                                        </>
                                    )}

                                    {modal === "notPublished" && (
                                        <p className="mb-0">
                                            Publish this report card before changing its visibility.
                                        </p>
                                    )}

                                    {modal === "publication" && (
                                        <div className="list-group list-group-flush">
                                            {[
                                                ["Status", status],
                                                ["Visibility", visibility],
                                                ["Published by", publishedBy],
                                                ["Published on", formatDate(publishedAt)],
                                            ].map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="list-group-item px-0 d-flex justify-content-between gap-3"
                                                >
                                                    <span className="text-secondary">{label}</span>
                                                    <strong className="text-end">{value}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {modal === "history" && (
                                        <div className="list-group list-group-flush">
                                            {[
                                                ["Report created", createdBy, createdAt],
                                                ["Last updated", updatedBy, updatedAt],
                                                ...(isPublished
                                                    ? [["Report published", publishedBy, publishedAt]]
                                                    : []),
                                            ].map(([label, person, date]) => (
                                                <div
                                                    key={label}
                                                    className="list-group-item px-0"
                                                >
                                                    <div className="fw-semibold">{label}</div>
                                                    <small className="text-secondary">
                                                        {person} · {formatDate(date)}
                                                    </small>
                                                </div>
                                            ))}

                                            <p className="text-secondary small mt-3 mb-0">
                                                This summary uses the supplied report data. A complete audit history requires backend records.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setModal(null)}
                                    >
                                        Cancel
                                    </button>

                                    {modal === "publish" && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={confirmPublish}
                                        >
                                            Confirm Publish
                                        </button>
                                    )}

                                    {modal === "visibility" && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={confirmVisibilityChange}
                                        >
                                            Confirm Change
                                        </button>
                                    )}

                                    {modal === "notPublished" && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setModal("publish")}
                                        >
                                            Publish Report
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

