
export const AuthLoading = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="text-center px-4">
                {/* EduCore Logo */}
                <div className="position-relative d-inline-flex align-items-center justify-content-center mb-4">
                    <div
                        className="rounded-4 bg-primary d-flex align-items-center justify-content-center shadow"
                        style={{ width: "76px", height: "76px" }}
                    >
                        <svg
                            width="46"
                            height="46"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 12.5C13 10 19 11 24 15V39C19 35 13 34 7 36.5V12.5Z"
                                fill="white"
                                fillOpacity="0.95"
                            />
                            <path
                                d="M41 12.5C35 10 29 11 24 15V39C29 35 35 34 41 36.5V12.5Z"
                                fill="white"
                                fillOpacity="0.65"
                            />
                            <path
                                d="M12 19H19M12 24H19M29 19H36M29 24H36"
                                stroke="#2563EB"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <span className="position-absolute top-100 start-50 translate-middle spinner-border spinner-border-sm text-primary mt-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </span>
                </div>

                {/* Brand */}
                <h2 className="fw-bold text-dark mb-1">
                    Edu<span className="text-primary">Core</span>
                </h2>

                <p className="text-secondary small mb-4">
                    Your school. Connected.
                </p>

                {/* Loading indicator */}
                <div className="mx-auto mb-3" style={{ maxWidth: "220px" }}>
                    <div
                        className="progress rounded-pill"
                        role="progressbar"
                        aria-label="Loading application"
                    >
                        <div className="progress-bar progress-bar-striped progress-bar-animated w-100" />
                    </div>
                </div>

                <p className="text-secondary small mb-0">
                    Preparing your learning environment...
                </p>
            </div>
        </div>
    );
};
