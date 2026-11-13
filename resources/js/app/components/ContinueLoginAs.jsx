
import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/Routes';

export const ContinueLoginAs = () => {
    const { user } = useAuth();

    const navigate = useNavigate();

    if (!user) return null;

    const onContinue = () => navigate(routes.dashboard);

    const onSwitchAccount = () => navigate(routes.signOut);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5 pt-3">

                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-3 p-md-4 text-center">

                            <div className="mb-3">
                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary
                                    d-flex align-items-center justify-content-center mx-auto fw-bold"
                                    style={{ width: '50px', height: '50px' }}
                                >
                                    {user.attributes.fullName
                                        .split(' ')
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map(name => name.charAt(0).toUpperCase())
                                        .join('')}
                                </div>
                            </div>

                            <h5 className="fw-bold">Welcome back!</h5>
                            <p className="text-secondary">You're already signed in as</p>

                            <div className="bg-light rounded-3 p-2 mb-3">
                                <div className="fw-semibold">{user.attributes.fullName}</div>
                                {user.attributes.email && (
                                    <small className="text-secondary">{user.attributes.email}</small>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary w-100 fw-semibold mb-3 d-flex align-items-center justify-content-center gap-2"
                                onClick={onContinue}
                            >
                                <span className="text-truncate">Continue as {user.attributes.fullName}</span>
                                <i className="bi bi-arrow-right"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={onSwitchAccount}
                            >
                                <i className="bi bi-person-switch me-2"></i>
                                Sign in with another account
                            </button>

                        </div>
                    </div>
                    <p className="text-center text-secondary small mt-4">
                        Not you? 
                        <a
                            onClick={onSwitchAccount}
                            className="ms-2 link-secondary text-decoration-none pointer"
                        >
                            Switch to another account.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
