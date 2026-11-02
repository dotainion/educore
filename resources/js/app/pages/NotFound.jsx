import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
            <div className="card border-0 shadow-sm text-center" style={{ maxWidth: "380px", width: "100%" }}>
                <div className="card-body p-4">
                    <div className="text-primary mb-3">
                        <i className="bi bi-exclamation-circle fs-2"></i>
                    </div>

                    <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>
                        404
                    </h1>

                    <h2 className="h6 fw-semibold mb-2">
                        Page Not Found
                    </h2>

                    <p className="text-secondary small mb-4">
                        The page you're looking for doesn't exist or may have been moved.
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                        <Link to="/dashboard" className="btn btn-primary btn-sm">
                            <i className="bi bi-house-door me-1"></i>
                            Dashboard
                        </Link>

                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => window.history.back()}
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};