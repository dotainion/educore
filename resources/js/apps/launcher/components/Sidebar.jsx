import { useEffect, useState } from "react";
import { useAuth } from "../../../global/context/AuthProvider";
import { routes } from "../../../global/routes/Routes";
import { LogInButton } from "./LogInButton";

export const Sidebar = () =>{
    const { user, authenticated, loading } = useAuth();
    const [appHistories, setAppHistories] = useState([]);
    
    useEffect(()=>{

    }, []);

    return(
        <div>
            {loading ? (
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" />
                </div>
            ) : (
                <div className="bg-white border rounded-4 p-3 h-100 d-none d-md-flex flex-column">
                    <div className="mb-3 pb-3 border-bottom w-100">                        
                        <div className="fw-semibold small text-truncate">
                            {authenticated ? user.attributes.fullName : "Guest User"}
                        </div>
                        <div className="text-muted" style={{ fontSize: "12px" }}>
                            {authenticated ? user.attributes.role || "Employee" : "Limited Access"}
                        </div>
                    </div>

                    {/* ================= MODULES ================= */}
                    <div className="mb-3">
                        <div className="text-uppercase text-muted small mb-2">History</div>
                        <div className="d-grid gap-1">
                            {appHistories.map((app) => (
                                <button
                                    key={app.title}
                                    onClick={app.to}
                                    className="btn btn-light btn-sm text-start d-flex align-items-center gap-2"
                                >
                                    <Icon icon={app.icon} width="18" />
                                    <span className="small">{app.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ================= QUICK ACTIONS ================= */}
                    {authenticated && (
                        <div className="mb-3">
                            <div className="text-uppercase text-muted small mb-2">Quick Actions</div>
                            <div className="d-grid gap-1">
                                <button className="btn btn-outline-primary btn-sm text-start text-nowrap">
                                    + New Employee
                                </button>
                                <button className="btn btn-outline-primary btn-sm text-start text-nowrap">
                                    Upload Document
                                </button>
                                <button className="btn btn-outline-primary btn-sm text-start text-nowrap">
                                    Create Task
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ================= STATUS (SMALL + CLEAN) ================= */}
                    {authenticated && (
                        <div className="mt-auto pt-3 border-top">
                            <div className="d-flex justify-content-between small">
                                <span className="text-muted">System</span>
                                <span className="badge bg-success">Online</span>
                            </div>
                            <div className="d-flex justify-content-between small mt-1">
                                <span className="text-muted">Access</span>
                                <span className="badge bg-primary">
                                    {user?.attributes?.role || "User"}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ================= GUEST STATE ================= */}
                    {!authenticated && (
                        <div className="mt-auto">
                            <div className="p-3 bg-light border rounded-3 text-center">
                                <div className="fw-semibold small mb-1">
                                    Guest Mode
                                </div>
                                <div className="text-muted small mb-3">
                                    Login to access HR, Payroll, CRM & Projects.
                                </div>
                                <LogInButton className="w-100">
                                    Login
                                </LogInButton>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}