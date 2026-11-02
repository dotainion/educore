import { useMemo, useState } from "react";

export const Notifications = () => {
    const teachers = [
        { id: 1, name: "Sarah James", department: "Mathematics", email: "sarah.james@school.edu" },
        { id: 2, name: "Michael Thomas", department: "Science", email: "michael.thomas@school.edu" },
        { id: 3, name: "Alicia Roberts", department: "Languages", email: "alicia.roberts@school.edu" },
        { id: 4, name: "David Charles", department: "Mathematics", email: "david.charles@school.edu" },
        { id: 5, name: "Janelle Peters", department: "Administration", email: "janelle.peters@school.edu" },
        { id: 6, name: "Kevin Joseph", department: "Science", email: "kevin.joseph@school.edu" },
        { id: 7, name: "Nadia Francis", department: "Languages", email: "nadia.francis@school.edu" },
        { id: 8, name: "Ryan Williams", department: "Physical Education", email: "ryan.williams@school.edu" },
    ];

    const initialNotifications = [
        {
            id: 1,
            title: "Staff meeting scheduled for Friday",
            message: "All staff members are required to attend the monthly staff meeting this Friday at 2:30 PM in the conference room. Please review the meeting agenda beforehand and bring any departmental updates.",
            category: "Announcement",
            priority: "High",
            audienceType: "all",
            recipientIds: [],
            author: "Administrator",
            createdAt: "2026-10-19T09:15:00",
            status: "Published",
        },
        {
            id: 2,
            title: "Submit assessment grades",
            message: "Please ensure that all assessment grades for the current term are submitted before the end of the week. Contact the academic office if you require assistance.",
            category: "Reminder",
            priority: "High",
            audienceType: "selected",
            recipientIds: [1, 3, 4],
            author: "Academic Office",
            createdAt: "2026-10-18T14:20:00",
            status: "Published",
        },
        {
            id: 3,
            title: "Science laboratory maintenance",
            message: "The science laboratory will be unavailable on Wednesday morning due to scheduled maintenance. Please arrange alternative activities for any affected classes.",
            category: "Maintenance",
            priority: "Normal",
            audienceType: "department",
            department: "Science",
            recipientIds: [],
            author: "School Administrator",
            createdAt: "2026-10-17T11:05:00",
            status: "Published",
        },
        {
            id: 4,
            title: "Updated examination timetable",
            message: "The examination timetable has been updated. Please review the revised schedule and inform your students of any changes that affect their classes.",
            category: "Announcement",
            priority: "Normal",
            audienceType: "all",
            recipientIds: [],
            author: "Academic Office",
            createdAt: "2026-10-16T08:40:00",
            status: "Published",
        },
        {
            id: 5,
            title: "Parent consultation preparation",
            message: "Prepare student progress notes ahead of the upcoming parent consultation sessions. Department heads will share the final schedule shortly.",
            category: "Reminder",
            priority: "Normal",
            audienceType: "selected",
            recipientIds: [2, 5, 6],
            author: "Academic Office",
            createdAt: "2026-10-15T13:10:00",
            status: "Scheduled",
            scheduledAt: "2026-10-25T08:00:00",
        },
    ];

    const emptyForm = {
        title: "",
        message: "",
        category: "Announcement",
        priority: "Normal",
        audienceType: "selected",
        recipientIds: [],
        department: "Mathematics",
        delivery: "Now",
        scheduledDate: "",
        scheduledTime: "08:00",
    };

    const [notifications, setNotifications] = useState(initialNotifications);
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [activeNotification, setActiveNotification] = useState(null);
    const [showComposer, setShowComposer] = useState(false);
    const [menuId, setMenuId] = useState(null);
    const [notice, setNotice] = useState("");
    const [noticeType, setNoticeType] = useState("success");
    const [teacherSearch, setTeacherSearch] = useState("");

    const departments = [
        ...new Set(teachers.map((teacher) => teacher.department)),
    ];

    const updateForm = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const getRecipients = (notification) => {
        if (notification.audienceType === "all") {
            return teachers;
        }

        if (notification.audienceType === "department") {
            return teachers.filter(
                (teacher) =>
                    teacher.department === notification.department
            );
        }

        return teachers.filter((teacher) =>
            notification.recipientIds?.includes(teacher.id)
        );
    };

    const getAudienceLabel = (notification) => {
        if (notification.audienceType === "all") {
            return "All teachers";
        }

        if (notification.audienceType === "department") {
            return `${notification.department} department`;
        }

        const count = getRecipients(notification).length;

        return `${count} selected teacher${count === 1 ? "" : "s"}`;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            Announcement: "bi-megaphone",
            Reminder: "bi-alarm",
            Maintenance: "bi-tools",
            Event: "bi-calendar-event",
            Emergency: "bi-exclamation-triangle",
        };

        return icons[category] || "bi-bell";
    };

    const getCategoryColor = (category) => {
        const colors = {
            Announcement: "primary",
            Reminder: "success",
            Maintenance: "warning",
            Event: "info",
            Emergency: "danger",
        };

        return colors[category] || "secondary";
    };

    const formatDate = (date) =>
        new Date(date).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

    const filteredNotifications = useMemo(() => {
        const term = search.toLowerCase().trim();

        return notifications.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(term) ||
                item.message.toLowerCase().includes(term) ||
                item.category.toLowerCase().includes(term) ||
                getAudienceLabel(item).toLowerCase().includes(term);

            return (
                matchesSearch &&
                (categoryFilter === "All" ||
                    item.category === categoryFilter) &&
                (statusFilter === "All" ||
                    item.status === statusFilter) &&
                (priorityFilter === "All" ||
                    item.priority === priorityFilter)
            );
        });
    }, [notifications, search, categoryFilter, statusFilter, priorityFilter]);

    const stats = [
        {
            label: "Total notifications",
            value: notifications.length,
            icon: "bi-bell",
            color: "primary",
            description: "All notification records",
        },
        {
            label: "Announcements",
            value: notifications.filter(
                (item) => item.category === "Announcement"
            ).length,
            icon: "bi-megaphone",
            color: "info",
            description: "School-wide updates",
        },
        {
            label: "Reminders",
            value: notifications.filter(
                (item) => item.category === "Reminder"
            ).length,
            icon: "bi-alarm",
            color: "success",
            description: "Tasks and deadlines",
        },
        {
            label: "High priority",
            value: notifications.filter(
                (item) => item.priority === "High"
            ).length,
            icon: "bi-exclamation-triangle",
            color: "danger",
            description: "Urgent communications",
        },
    ];

    const openComposer = () => {
        setForm({ ...emptyForm });
        setTeacherSearch("");
        setNotice("");
        setShowComposer(true);
    };

    const closeComposer = () => {
        setShowComposer(false);
        setForm({ ...emptyForm });
        setTeacherSearch("");
    };

    const toggleTeacher = (teacherId) => {
        updateForm(
            "recipientIds",
            form.recipientIds.includes(teacherId)
                ? form.recipientIds.filter((id) => id !== teacherId)
                : [...form.recipientIds, teacherId]
        );
    };

    const visibleTeachers = teachers.filter((teacher) => {
        const term = teacherSearch.toLowerCase().trim();

        return (
            teacher.name.toLowerCase().includes(term) ||
            teacher.department.toLowerCase().includes(term) ||
            teacher.email.toLowerCase().includes(term)
        );
    });

    const selectVisibleTeachers = () => {
        const visibleIds = visibleTeachers.map((teacher) => teacher.id);
        const allVisibleSelected = visibleIds.every((id) =>
            form.recipientIds.includes(id)
        );

        updateForm(
            "recipientIds",
            allVisibleSelected
                ? form.recipientIds.filter((id) => !visibleIds.includes(id))
                : [...new Set([...form.recipientIds, ...visibleIds])]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.title.trim() || !form.message.trim()) {
            setNoticeType("danger");
            setNotice("Enter a notification title and message.");
            return;
        }

        if (
            form.audienceType === "selected" &&
            form.recipientIds.length === 0
        ) {
            setNoticeType("danger");
            setNotice("Select at least one teacher to receive this notification.");
            return;
        }

        if (
            form.delivery === "Later" &&
            (!form.scheduledDate || !form.scheduledTime)
        ) {
            setNoticeType("danger");
            setNotice("Choose a date and time for the scheduled notification.");
            return;
        }

        if (
            form.delivery === "Later" &&
            new Date(`${form.scheduledDate}T${form.scheduledTime}`) <=
                new Date()
        ) {
            setNoticeType("danger");
            setNotice("Choose a future date and time.");
            return;
        }

        const newNotification = {
            id: Date.now(),
            title: form.title.trim(),
            message: form.message.trim(),
            category: form.category,
            priority: form.priority,
            audienceType: form.audienceType,
            department:
                form.audienceType === "department" ? form.department : "",
            recipientIds:
                form.audienceType === "selected"
                    ? [...form.recipientIds]
                    : [],
            author: "Administrator",
            createdAt: new Date().toISOString(),
            scheduledAt:
                form.delivery === "Later"
                    ? `${form.scheduledDate}T${form.scheduledTime}:00`
                    : null,
            status: form.delivery === "Later" ? "Scheduled" : "Published",
        };

        setNotifications((current) => [newNotification, ...current]);
        setShowComposer(false);
        setForm({ ...emptyForm });
        setTeacherSearch("");
        setNoticeType("success");
        setNotice(
            form.delivery === "Later"
                ? "Notification added to the scheduled list."
                : "Notification added to the list. Connect your backend to deliver it to recipients."
        );
    };

    const deleteNotification = (id) => {
        if (
            !window.confirm(
                "Delete this notification? This action cannot be undone."
            )
        ) {
            return;
        }

        setNotifications((current) =>
            current.filter((item) => item.id !== id)
        );

        if (activeNotification?.id === id) {
            setActiveNotification(null);
        }

        setMenuId(null);
        setNoticeType("success");
        setNotice("Notification deleted from this demo.");
    };

    const duplicateNotification = (item) => {
        const copy = {
            ...item,
            id: Date.now(),
            title: `${item.title} (Copy)`,
            createdAt: new Date().toISOString(),
            scheduledAt: null,
            status: "Draft",
        };

        setNotifications((current) => [copy, ...current]);
        setMenuId(null);
        setNoticeType("success");
        setNotice("Notification duplicated as a draft.");
    };

    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <h3 className="fw-bold mb-0">Notifications</h3>
                        <span className="badge text-bg-light border">
                            {notifications.length} total
                        </span>
                    </div>
                    <p className="text-secondary mb-0">
                        Send announcements, reminders, and updates to the right
                        teachers.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={openComposer}
                >
                    <i className="bi bi-plus-lg"></i>
                    Create notification
                </button>
            </div>

            {notice && (
                <div
                    className={`alert alert-${noticeType} alert-dismissible fade show d-flex align-items-center gap-2`}
                    role="alert"
                >
                    <i
                        className={`bi ${
                            noticeType === "danger"
                                ? "bi-exclamation-circle"
                                : "bi-check-circle"
                        }`}
                    ></i>
                    <span>{notice}</span>
                    <button
                        type="button"
                        className="btn-close ms-auto"
                        onClick={() => setNotice("")}
                        aria-label="Dismiss"
                    ></button>
                </div>
            )}

            <div className="row g-3 mb-4">
                {stats.map((stat) => (
                    <div className="col-6 col-xl-3" key={stat.label}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3 p-lg-4">
                                <div className="d-flex justify-content-between align-items-start gap-2">
                                    <div>
                                        <div className="small text-secondary mb-2">
                                            {stat.label}
                                        </div>
                                        <div className="fs-3 fw-bold">
                                            {stat.value}
                                        </div>
                                    </div>
                                    <div
                                        className={`rounded-3 bg-${stat.color}-subtle text-${stat.color} d-flex align-items-center justify-content-center`}
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <i
                                            className={`bi ${stat.icon} fs-5`}
                                        ></i>
                                    </div>
                                </div>
                                <div className="text-secondary small mt-3">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom p-3 p-lg-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div>
                            <h5 className="fw-bold mb-1">
                                Notification centre
                            </h5>
                            <p className="small text-secondary mb-0">
                                Click any notification to see its full message
                                and recipient list.
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="small text-secondary text-nowrap">
                                {filteredNotifications.length} results
                            </span>
                            <button
                                type="button"
                                className="btn btn-light border btn-sm"
                                onClick={() => {
                                    setSearch("");
                                    setCategoryFilter("All");
                                    setStatusFilter("All");
                                    setPriorityFilter("All");
                                }}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mt-2">
                        <div className="col-12 col-lg-5">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-search text-secondary"></i>
                                </span>
                                <input
                                    type="search"
                                    className="form-control bg-light border-start-0"
                                    placeholder="Search notifications..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-6 col-lg-2">
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(event) =>
                                    setCategoryFilter(event.target.value)
                                }
                                aria-label="Filter category"
                            >
                                <option value="All">All categories</option>
                                <option value="Announcement">Announcements</option>
                                <option value="Reminder">Reminders</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Event">Events</option>
                                <option value="Emergency">Emergencies</option>
                            </select>
                        </div>
                        <div className="col-6 col-lg-2">
                            <select
                                className="form-select"
                                value={priorityFilter}
                                onChange={(event) =>
                                    setPriorityFilter(event.target.value)
                                }
                                aria-label="Filter priority"
                            >
                                <option value="All">All priorities</option>
                                <option value="High">High priority</option>
                                <option value="Normal">Normal priority</option>
                                <option value="Low">Low priority</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(event.target.value)
                                }
                                aria-label="Filter status"
                            >
                                <option value="All">All statuses</option>
                                <option value="Published">Published</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="list-group list-group-flush">
                    {filteredNotifications.map((item) => (
                        <div
                            key={item.id}
                            className="list-group-item px-3 px-lg-4 py-3"
                        >
                            <div className="d-flex align-items-start gap-3">
                                <div
                                    className={`rounded-3 bg-${getCategoryColor(
                                        item.category
                                    )}-subtle text-${getCategoryColor(
                                        item.category
                                    )} d-flex align-items-center justify-content-center flex-shrink-0`}
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                    }}
                                >
                                    <i
                                        className={`bi ${getCategoryIcon(
                                            item.category
                                        )} fs-5`}
                                    ></i>
                                </div>

                                <button
                                    type="button"
                                    className="btn p-0 border-0 text-start flex-grow-1"
                                    onClick={() => setActiveNotification(item)}
                                >
                                    <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                                        <span className="fw-semibold text-dark">
                                            {item.title}
                                        </span>
                                        <span
                                            className={`badge text-bg-${getCategoryColor(
                                                item.category
                                            )}-subtle text-${getCategoryColor(
                                                item.category
                                            )}`}
                                        >
                                            {item.category}
                                        </span>
                                        {item.priority === "High" && (
                                            <span className="badge text-bg-danger-subtle text-danger">
                                                <i className="bi bi-flag-fill me-1"></i>
                                                High priority
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-secondary small mb-2">
                                        {item.message.length > 125
                                            ? `${item.message.slice(0, 125).trim()}…`
                                            : item.message}
                                    </p>

                                    <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small">
                                        <span>
                                            <i className="bi bi-people me-1"></i>
                                            {getAudienceLabel(item)}
                                        </span>
                                        <span>·</span>
                                        <span>
                                            <i className="bi bi-clock me-1"></i>
                                            {formatDate(item.createdAt)}
                                        </span>
                                        <span>·</span>
                                        <span>
                                            <i className="bi bi-person me-1"></i>
                                            {item.author}
                                        </span>
                                    </div>
                                </button>

                                <div className="d-flex flex-column align-items-end gap-2 flex-shrink-0">
                                    <span
                                        className={`badge ${
                                            item.status === "Published"
                                                ? "text-bg-success-subtle text-success"
                                                : item.status === "Scheduled"
                                                  ? "text-bg-warning-subtle text-warning-emphasis"
                                                  : "text-bg-secondary-subtle text-secondary"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-sm border-0"
                                            aria-label="Notification actions"
                                            onClick={() =>
                                                setMenuId((current) =>
                                                    current === item.id
                                                        ? null
                                                        : item.id
                                                )
                                            }
                                        >
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        {menuId === item.id && (
                                            <div
                                                className="dropdown-menu dropdown-menu-end show"
                                                style={{
                                                    display: "block",
                                                    position: "absolute",
                                                    right: 0,
                                                    left: "auto",
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setActiveNotification(item);
                                                        setMenuId(null);
                                                    }}
                                                >
                                                    <i className="bi bi-eye me-2"></i>
                                                    View details
                                                </button>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        duplicateNotification(item)
                                                    }
                                                >
                                                    <i className="bi bi-copy me-2"></i>
                                                    Duplicate as draft
                                                </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    type="button"
                                                    className="dropdown-item text-danger"
                                                    onClick={() =>
                                                        deleteNotification(item.id)
                                                    }
                                                >
                                                    <i className="bi bi-trash me-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredNotifications.length === 0 && (
                        <div className="text-center py-5 px-3">
                            <i className="bi bi-bell-slash fs-1 text-secondary"></i>
                            <h6 className="fw-semibold mt-3">
                                No notifications found
                            </h6>
                            <p className="text-secondary small mb-3">
                                Try changing your filters or create a
                                notification.
                            </p>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={openComposer}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                Create notification
                            </button>
                        </div>
                    )}
                </div>

                <div className="card-footer bg-white border-top px-3 px-lg-4 py-3">
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <span className="small text-secondary">
                            Showing {filteredNotifications.length} of{" "}
                            {notifications.length} notifications
                        </span>
                        <span className="small text-secondary">
                            <i className="bi bi-info-circle me-1"></i>
                            Select a notification to view its recipients
                        </span>
                    </div>
                </div>
            </div>

            {/* Notification details overlay */}
            {activeNotification && (
                <div
                    className="modal d-block"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="notification-detail-title"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setActiveNotification(null);
                        }
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header px-4 py-3">
                                <div>
                                    <h5
                                        className="modal-title fw-bold"
                                        id="notification-detail-title"
                                    >
                                        Notification details
                                    </h5>
                                    <div className="small text-secondary mt-1">
                                        {formatDate(
                                            activeNotification.createdAt
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setActiveNotification(null)}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body p-4">
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span
                                        className={`badge text-bg-${getCategoryColor(
                                            activeNotification.category
                                        )}-subtle text-${getCategoryColor(
                                            activeNotification.category
                                        )}`}
                                    >
                                        {activeNotification.category}
                                    </span>
                                    <span
                                        className={`badge ${
                                            activeNotification.priority === "High"
                                                ? "text-bg-danger-subtle text-danger"
                                                : "text-bg-light text-secondary"
                                        }`}
                                    >
                                        {activeNotification.priority} priority
                                    </span>
                                    <span className="badge text-bg-light border text-secondary">
                                        {activeNotification.status}
                                    </span>
                                </div>

                                <h4 className="fw-bold mb-3">
                                    {activeNotification.title}
                                </h4>

                                <p
                                    className="text-body-secondary mb-4"
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {activeNotification.message}
                                </p>

                                <div className="border rounded-3 overflow-hidden">
                                    <div className="bg-light border-bottom p-3">
                                        <div className="d-flex justify-content-between align-items-center gap-2">
                                            <div>
                                                <h6 className="fw-bold mb-1">
                                                    Recipients
                                                </h6>
                                                <div className="small text-secondary">
                                                    {getAudienceLabel(
                                                        activeNotification
                                                    )}
                                                </div>
                                            </div>
                                            <span className="badge text-bg-primary rounded-pill">
                                                {
                                                    getRecipients(
                                                        activeNotification
                                                    ).length
                                                }{" "}
                                                teachers
                                            </span>
                                        </div>
                                    </div>

                                    {activeNotification.audienceType === "all" ? (
                                        <div className="p-3">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                                                    <i className="bi bi-people-fill fs-5"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">
                                                        All teachers
                                                    </div>
                                                    <div className="small text-secondary">
                                                        This notification is
                                                        assigned to every teacher
                                                        in the school.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-top mt-3 pt-3">
                                                <div className="small text-secondary mb-2">
                                                    Teacher list in this demo
                                                </div>
                                                <div className="row g-2">
                                                    {getRecipients(
                                                        activeNotification
                                                    ).map((teacher) => (
                                                        <div
                                                            className="col-12 col-md-6"
                                                            key={teacher.id}
                                                        >
                                                            <TeacherRecipient
                                                                teacher={teacher}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : activeNotification.audienceType ===
                                      "department" ? (
                                        <div className="p-3">
                                            <div className="d-flex align-items-start gap-3 mb-3">
                                                <div className="rounded-circle bg-info-subtle text-info d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                                                    <i className="bi bi-building fs-5"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">
                                                        {activeNotification.department} department
                                                    </div>
                                                    <div className="small text-secondary">
                                                        Assigned to teachers in
                                                        this department.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-2">
                                                {getRecipients(
                                                    activeNotification
                                                ).map((teacher) => (
                                                    <div
                                                        className="col-12 col-md-6"
                                                        key={teacher.id}
                                                    >
                                                        <TeacherRecipient
                                                            teacher={teacher}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3">
                                            <p className="small text-secondary mb-3">
                                                This notification was assigned
                                                to the following selected
                                                teachers.
                                            </p>
                                            <div className="row g-2">
                                                {getRecipients(
                                                    activeNotification
                                                ).map((teacher) => (
                                                    <div
                                                        className="col-12 col-md-6"
                                                        key={teacher.id}
                                                    >
                                                        <TeacherRecipient
                                                            teacher={teacher}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {activeNotification.scheduledAt && (
                                    <div className="alert alert-warning d-flex gap-2 mt-3 mb-0">
                                        <i className="bi bi-calendar-event fs-5"></i>
                                        <div>
                                            <div className="fw-semibold">
                                                Scheduled delivery
                                            </div>
                                            <div className="small">
                                                {formatDate(
                                                    activeNotification.scheduledAt
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="small text-secondary mt-3">
                                    Created by {activeNotification.author}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light border"
                                    onClick={() => setActiveNotification(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create notification overlay */}
            {showComposer && (
                <div
                    className="modal d-block"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-notification-title"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeComposer();
                        }
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <form
                            className="modal-content border-0 shadow-lg"
                            onSubmit={handleSubmit}
                        >
                            <div className="modal-header px-4 py-3">
                                <div>
                                    <h5
                                        className="modal-title fw-bold"
                                        id="create-notification-title"
                                    >
                                        Create notification
                                    </h5>
                                    <p className="small text-secondary mb-0 mt-1">
                                        Write your message and select the exact
                                        recipients.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeComposer}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body p-4">
                                {notice && noticeType === "danger" && (
                                    <div className="alert alert-danger py-2 small">
                                        {notice}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        maxLength={120}
                                        placeholder="Enter notification title"
                                        value={form.title}
                                        onChange={(event) =>
                                            updateForm("title", event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Message <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows={5}
                                        placeholder="Write your notification..."
                                        value={form.message}
                                        onChange={(event) =>
                                            updateForm("message", event.target.value)
                                        }
                                        required
                                    ></textarea>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Category
                                        </label>
                                        <select
                                            className="form-select"
                                            value={form.category}
                                            onChange={(event) =>
                                                updateForm("category", event.target.value)
                                            }
                                        >
                                            <option>Announcement</option>
                                            <option>Reminder</option>
                                            <option>Maintenance</option>
                                            <option>Event</option>
                                            <option>Emergency</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Priority
                                        </label>
                                        <select
                                            className="form-select"
                                            value={form.priority}
                                            onChange={(event) =>
                                                updateForm("priority", event.target.value)
                                            }
                                        >
                                            <option>Normal</option>
                                            <option>High</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Send to
                                    </label>
                                    <select
                                        className="form-select"
                                        value={form.audienceType}
                                        onChange={(event) => {
                                            updateForm("audienceType", event.target.value);
                                            updateForm("recipientIds", []);
                                        }}
                                    >
                                        <option value="selected">
                                            Select one or more teachers
                                        </option>
                                        <option value="department">
                                            All teachers in a department
                                        </option>
                                        <option value="all">
                                            All teachers in the school
                                        </option>
                                    </select>
                                </div>

                                {form.audienceType === "selected" && (
                                    <div className="border rounded-3 overflow-hidden mb-4">
                                        <div className="p-3 bg-light border-bottom">
                                            <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                                                <label className="form-label fw-semibold mb-0">
                                                    Select teachers
                                                </label>
                                                <span className="badge text-bg-primary">
                                                    {form.recipientIds.length} selected
                                                </span>
                                            </div>
                                            <div className="input-group input-group-sm">
                                                <span className="input-group-text bg-white">
                                                    <i className="bi bi-search"></i>
                                                </span>
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search teachers or departments..."
                                                    value={teacherSearch}
                                                    onChange={(event) =>
                                                        setTeacherSearch(event.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <small className="text-secondary">
                                                    Choose one teacher or several.
                                                </small>
                                                <button
                                                    type="button"
                                                    className="btn btn-link btn-sm p-0 text-decoration-none"
                                                    onClick={selectVisibleTeachers}
                                                >
                                                    {visibleTeachers.length > 0 &&
                                                    visibleTeachers.every((teacher) =>
                                                        form.recipientIds.includes(teacher.id)
                                                    )
                                                        ? "Deselect visible"
                                                        : "Select visible"}
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                                            {visibleTeachers.map((teacher) => (
                                                <label
                                                    key={teacher.id}
                                                    className="d-flex align-items-center gap-3 p-3 border-bottom"
                                                >
                                                    <input
                                                        className="form-check-input mt-0"
                                                        type="checkbox"
                                                        checked={form.recipientIds.includes(
                                                            teacher.id
                                                        )}
                                                        onChange={() =>
                                                            toggleTeacher(teacher.id)
                                                        }
                                                    />
                                                    <div
                                                        className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-semibold flex-shrink-0"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                        }}
                                                    >
                                                        {teacher.name
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .join("")}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold">
                                                            {teacher.name}
                                                        </div>
                                                        <div className="small text-secondary">
                                                            {teacher.department} · {teacher.email}
                                                        </div>
                                                    </div>
                                                    {form.recipientIds.includes(teacher.id) && (
                                                        <i className="bi bi-check-circle-fill text-primary"></i>
                                                    )}
                                                </label>
                                            ))}

                                            {visibleTeachers.length === 0 && (
                                                <div className="text-center text-secondary small py-4">
                                                    No teachers match your search.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {form.audienceType === "department" && (
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Department
                                        </label>
                                        <select
                                            className="form-select"
                                            value={form.department}
                                            onChange={(event) =>
                                                updateForm("department", event.target.value)
                                            }
                                        >
                                            {departments.map((department) => (
                                                <option key={department}>
                                                    {department}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="form-text">
                                            {teachers.filter(
                                                (teacher) =>
                                                    teacher.department === form.department
                                            ).length}{" "}
                                            teachers will be included in this demo.
                                        </div>
                                    </div>
                                )}

                                {form.audienceType === "all" && (
                                    <div className="alert alert-primary d-flex gap-2 mb-4">
                                        <i className="bi bi-people-fill fs-5"></i>
                                        <div>
                                            <div className="fw-semibold">
                                                All teachers selected
                                            </div>
                                            <div className="small">
                                                The notification will be assigned
                                                to all teachers in the school.
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="border rounded-3 p-3">
                                    <label className="form-label fw-semibold">
                                        Delivery
                                    </label>
                                    <div className="d-flex flex-column flex-sm-row gap-3">
                                        <label className="d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="delivery"
                                                checked={form.delivery === "Now"}
                                                onChange={() => updateForm("delivery", "Now")}
                                            />
                                            Publish now
                                        </label>
                                        <label className="d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="delivery"
                                                checked={form.delivery === "Later"}
                                                onChange={() =>
                                                    updateForm("delivery", "Later")
                                                }
                                            />
                                            Schedule for later
                                        </label>
                                    </div>

                                    {form.delivery === "Later" && (
                                        <div className="row g-3 mt-1">
                                            <div className="col-sm-7">
                                                <label className="form-label small">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    min={new Date().toLocaleDateString("en-CA")}
                                                    value={form.scheduledDate}
                                                    onChange={(event) =>
                                                        updateForm(
                                                            "scheduledDate",
                                                            event.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-sm-5">
                                                <label className="form-label small">
                                                    Time
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    value={form.scheduledTime}
                                                    onChange={(event) =>
                                                        updateForm(
                                                            "scheduledTime",
                                                            event.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="alert alert-info d-flex gap-2 small mt-3 mb-0">
                                    <i className="bi bi-info-circle fs-5"></i>
                                    <div>
                                        This is mock data. Connecting your backend
                                        will be necessary to load your actual
                                        teachers and deliver notifications.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer px-4 py-3">
                                <button
                                    type="button"
                                    className="btn btn-light border"
                                    onClick={closeComposer}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                                >
                                    <i
                                        className={`bi ${
                                            form.delivery === "Later"
                                                ? "bi-calendar-check"
                                                : "bi-send"
                                        }`}
                                    ></i>
                                    {form.delivery === "Later"
                                        ? "Schedule notification"
                                        : "Publish notification"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {(showComposer || activeNotification) && (
                <div
                    className="modal-backdrop show"
                    onClick={() => {
                        closeComposer();
                        setActiveNotification(null);
                    }}
                ></div>
            )}
        </div>
    );
};

const TeacherRecipient = ({ teacher }) => (
    <div className="d-flex align-items-center gap-2 border rounded-3 p-2 h-100">
        <div
            className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-semibold flex-shrink-0"
            style={{ width: "38px", height: "38px" }}
        >
            {teacher.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
        </div>
        <div className="min-w-0">
            <div className="small fw-semibold text-truncate">
                {teacher.name}
            </div>
            <div className="small text-secondary text-truncate">
                {teacher.department}
            </div>
            <div className="small text-secondary text-truncate">
                {teacher.email}
            </div>
        </div>
    </div>
);