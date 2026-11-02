
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
});

const formatRelativeTime = (timestamp, now) => {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return "";

    const seconds = Math.round((date.getTime() - now) / 1000);
    const absSeconds = Math.abs(seconds);

    const units = [
        { limit: 60, seconds: 1, unit: "second" },
        { limit: 3600, seconds: 60, unit: "minute" },
        { limit: 86400, seconds: 3600, unit: "hour" },
        { limit: 604800, seconds: 86400, unit: "day" },
        { limit: 2629800, seconds: 604800, unit: "week" },
        { limit: 31557600, seconds: 2629800, unit: "month" },
        { limit: Infinity, seconds: 31557600, unit: "year" },
    ];

    const { seconds: divisor, unit } =
        units.find(({ limit }) => absSeconds < limit);

    const value = Math.round(seconds / divisor);

    return relativeTimeFormatter.format(value, unit);
};

export const NavNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [now, setNow] = useState(() => Date.now());

    const unreadCount = notifications.filter((notification) => notification.unread).length;

    useEffect(() => {
        const mockNotifications = [
            {
                id: 1,
                title: "New student enrolled",
                message: "A new student has been added to Form 3A.",
                created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                icon: "bi-person-plus",
                color: "primary",
                unread: true,
            },{
                id: 2,
                title: "Staff meeting reminder",
                message: "The staff meeting is scheduled for tomorrow.",
                created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                icon: "bi-calendar-event",
                color: "warning",
                unread: true,
            },{
                id: 3,
                title: "Report cards generated",
                message: "Term report cards are ready for review.",
                created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                icon: "bi-check-circle",
                color: "success",
                unread: false,
            },
        ];
        setNotifications(mockNotifications);

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dropup">
            <button
                type="button"
                className="btn btn-am btn-light position-relative py-0 px-2"
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="bi bi-bell fs-6"></i>

                {unreadCount > 0 && (
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '9px' }}
                    >
                        {unreadCount}
                        <span className="visually-hidden">
                            unread notifications
                        </span>
                    </span>
                )}
            </button>

            <ul
                className="dropdown-menu dropdown-menu-end p-0 shadow"
                style={{ width: "350px", maxWidth: "calc(100vw - 2rem)" }}
            >
                <li className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
                    <h6 className="mb-0 fw-semibold">Notifications</h6>

                    {unreadCount > 0 && (
                        <button
                            type="button"
                            className="btn btn-sm btn-link text-decoration-none p-0"
                        >
                            Mark all as read
                        </button>
                    )}
                </li>

                <li className="overflow-y-auto" style={{ maxHeight: "320px" }}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <button
                                key={notification.id}
                                type="button"
                                className={`dropdown-item text-wrap p-3 border-bottom ${
                                    notification.unread
                                        ? "bg-body-tertiary"
                                        : ""
                                }`}
                            >
                                <div className="d-flex gap-3">
                                    <span
                                        className={`rounded-circle bg-${notification.color} bg-opacity-10 text-${notification.color} d-flex align-items-center justify-content-center flex-shrink-0`}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                        }}
                                    >
                                        <i
                                            className={`bi ${notification.icon} fs-5`}
                                        ></i>
                                    </span>

                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start gap-2">
                                            <span className="fw-semibold small">
                                                {notification.title}
                                            </span>

                                            {notification.unread && (
                                                <span
                                                    className="rounded-circle bg-primary flex-shrink-0 mt-1"
                                                    style={{
                                                        width: "7px",
                                                        height: "7px",
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <p className="small text-body-secondary mb-1">
                                            {notification.message}
                                        </p>

                                        <span
                                            className="text-body-secondary"
                                            style={{ fontSize: "0.75rem" }}
                                        >
                                            {formatRelativeTime(
                                                notification.created_at,
                                                now
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="text-center text-body-secondary py-4">
                            <i className="bi bi-bell-slash fs-3 d-block mb-2"></i>
                            <p className="small mb-0">
                                You're all caught up!
                            </p>
                        </div>
                    )}
                </li>

                <li>
                    <Link
                        className="dropdown-item text-center text-primary fw-semibold small py-3"
                        to="/notifications"
                    >
                        View all notifications
                    </Link>
                </li>
            </ul>
        </div>
    );
};
