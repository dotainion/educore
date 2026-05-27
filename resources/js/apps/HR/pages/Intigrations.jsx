import React from "react";
import { motion } from "framer-motion";
import { RecruitmentLayoutHeader } from "../../layouts/RecruitmentLayout";

export const Integrations = () => {

    const integrations = [
        {
            name: "LinkedIn",
            description: "Post jobs and company updates",
            color: "primary",
            status: "not_connected",
            connectUrl: "/api/oauth/linkedin/redirect"
        },
        {
            name: "Facebook",
            description: "Post to pages and job listings",
            color: "primary",
            status: "not_connected",
            connectUrl: "/api/oauth/facebook/redirect"
        },
        {
            name: "Instagram",
            description: "Share hiring posts visually",
            color: "danger",
            status: "not_connected",
            connectUrl: "/api/oauth/instagram/redirect"
        },
        {
            name: "X (Twitter)",
            description: "Post job announcements",
            color: "dark",
            status: "not_connected",
            connectUrl: "/api/oauth/twitter/redirect"
        },
        {
            name: "More Platforms",
            description: "Indeed, Glassdoor, future APIs",
            color: "secondary",
            status: "coming_soon",
            connectUrl: null
        }
    ];

    const handleConnect = (url) => {
        if (!url) return;
        window.location.href = url;
    };

    return (
        <div className="container-fluid integrations-panel">

            {/* HEADER */}
            <div className="mb-3">
                <h4 className="fw-semibold mb-0">Integrations</h4>
                <div className="text-muted small">Connect social platforms to distribute job posts</div>
            </div>

            {/* GRID */}
            <div className="mt-3">

                {integrations.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card mb-3 shadow-sm"
                    >
                        <div className="card-body d-flex justify-content-between align-items-center">

                            {/* LEFT */}
                            <div>
                                <h6 className="mb-1 fw-bold">
                                    {item.name}
                                </h6>

                                <small className="text-muted">
                                    {item.description}
                                </small>

                                <div className="mt-2">
                                    {item.status === "not_connected" && (
                                        <span className="badge bg-warning text-dark">
                                            Not Connected
                                        </span>
                                    )}

                                    {item.status === "connected" && (
                                        <span className="badge bg-success">
                                            Connected
                                        </span>
                                    )}

                                    {item.status === "coming_soon" && (
                                        <span className="badge bg-secondary">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT ACTION */}
                            <div>

                                {item.status === "coming_soon" ? (
                                    <button className="btn btn-outline-secondary btn-sm" disabled>
                                        Locked
                                    </button>
                                ) : (
                                    <button
                                        className={`btn btn-sm btn-${item.color}`}
                                        onClick={() => handleConnect(item.connectUrl)}
                                    >
                                        Connect
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    );
};