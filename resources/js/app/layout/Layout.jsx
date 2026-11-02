import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavNotification } from "../components/NavNotification";
import { routes } from "../routes/Routes";
import { useAuth } from "../providers/AuthProvider";

export const Layout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menu = [
        { title: "Dashboard", icon: "bi-grid", route: routes.dashboard },
        { title: "Academic Reports", icon: "bi-journal-bookmark", route: routes.academicReports },
        { title: "Students", icon: "bi-people", route: routes.students },
        { title: "Teachers", icon: "bi-person-workspace", route: routes.teachers },
        { title: "Classes", icon: "bi-building", route: routes.classes },
        { title: "Subjects", icon: "bi-book", route: routes.subjects },
        { title: "Timetable", icon: "bi-calendar3", route: routes.timetable },
        { title: "Academic Attendance", icon: "bi-calendar2-check", route: routes.academicAttendance },
        { title: "Reports & Analytics", icon: "bi-bar-chart-line", route: routes.reportsAnalytics },
        { title: "Notifications", icon: "bi-exclamation-circle", route: routes.notifications },
        { title: "Settings", icon: "bi-gear", route: routes.settings },
    ];

    const optionMenu = [
        { title: "Sign Out", icon: "bi-box-arrow-right", route: routes.signOut },
    ];

    const isActive = (route) =>
        location.pathname === route ||
        (route !== "/" && location.pathname.startsWith(`${route}/`));

    const renderMenu = (items) => {
        return items.map((item) => (
            <Link
                key={item.route}
                to={item.route}
                onClick={() => setSidebarOpen(false)}
                className={`nav-link py-1 px-2 d-flex align-items-center gap-2 w-100 ${
                    isActive(item.route)
                        ? "active"
                        : "text-white"
                }`}
            >
                <i className={`bi ${item.icon} fs-6`}></i>
                <small>{item.title}</small>
            </Link>
        ));
    };

    useEffect(()=>{
        const resize = () =>{
            if(window.innerWidth >= 992){
                setSidebarOpen(false);
            }
        }
        window.addEventListener('resize', resize);
        return ()=> window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="d-flex bg-light vh-100 overflow-hidden">
            {/* Sidebar */}
            <div
                className={`bg-dark text-white ${
                    sidebarOpen
                        ? "d-flex position-fixed top-0 start-0 h-100"
                        : "d-none d-lg-flex position-relative vh-100"
                } flex-column flex-shrink-0`}
                style={{
                    width: "260px",
                    minWidth: "260px",
                    zIndex: 1045,
                }}
            >
                <aside
                    className="d-flex flex-column vh-100 p-3"
                    style={{ width: "260px", minWidth: "260px", zIndex: 1000 }}
                >
                    <Link
                        to="/dashboard"
                        onClick={() => setSidebarOpen(false)}
                        className="d-flex align-items-center gap-2 text-white text-decoration-none mb-4 px-2 flex-shrink-0"
                    >
                        <i className="bi bi-mortarboard-fill fs-3 text-info"></i>
                        <span className="fs-5 fw-bold">EduCore</span>
                    </Link>

                    <div className="border-top border-secondary" />

                    <nav className="nav-scroll nav nav-pills gap-1 overflow-y-auto pb-3">
                        {renderMenu(menu)}
                    </nav>

                    <div className="mt-auto border-top border-secondary pt-3 pb-2 flex-shrink-0">
                        <nav className="nav nav-pills flex-column gap-1">
                            {renderMenu(optionMenu)}
                        </nav>
                    </div>
                </aside>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
                    style={{ zIndex: 1040 }}
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column overflow-auto">
                {/* Top Navigation */}
                <header
                    className="position-sticky top-0 bg-white border-bottom px-3 px-md-4 py-2"
                    style={{ zIndex: 1030 }}
                >
                    <div className="d-flex justify-content-between align-items-center gap-2">
                        <div className="d-flex align-items-center gap-2">
                            {/* Mobile Menu Toggle */}
                            <button
                                type="button"
                                className="btn btn-light border d-lg-none p-2"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                aria-label="Toggle sidebar"
                                aria-expanded={sidebarOpen}
                            >
                                <i className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"} fs-5`}></i>
                            </button>

                            <div>
                                <div className="mb-0 fw-semibold" style={{ fontSize: "0.8rem" }}>
                                    School Management
                                </div>
                                <div className="text-muted lh-1" style={{ fontSize: "0.7rem" }}>
                                    Manage your school in one place
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <NavNotification />

                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold flex-shrink-0"
                                    style={{ width: "30px", height: "30px" }}
                                >
                                    {user.attributes.fullName[0]}
                                </div>

                                <div className="d-none d-md-block">
                                    <div className="fw-semibold" style={{ fontSize: "0.8rem" }}>
                                        Administrator
                                    </div>
                                    <div className="text-muted lh-1" style={{ fontSize: "0.7rem" }}>
                                        School Admin
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow-1 p-2 p-sm-3 p-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};