import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../global/components/Navbar";

export const Dashboard = () => {
    const summaryCards = [
        { title: "Leads", value: 120, color: "primary" },
        { title: "Deals", value: 45, color: "success" },
        { title: "Contacts", value: 80, color: "info" },
        { title: "Companies", value: 25, color: "warning" },
    ];

    const quickLinks = [
        { name: "Leads", icon: "bi-person-plus", link: "/leads" },
        { name: "Deals", icon: "bi-graph-up", link: "/deals" },
        { name: "Contacts", icon: "bi-people", link: "/contacts" },
        { name: "Companies", icon: "bi-building", link: "/companies" },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Dashboard"
                subtitle="Overview of your CRM metrics"
            />

            {/* Summary Cards */}
            <div className="row g-3 mb-3">
                {summaryCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        className="col-12 col-sm-6 col-xl-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className={`card border text-center py-4`}>
                            <div className={`text-${card.color} h1 mb-2`}>{card.value}</div>
                            <div className="text-muted">{card.title}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Links */}
            <div className="row g-3">
                {quickLinks.map((link, idx) => (
                    <motion.div
                        key={idx}
                        className="col-6 col-md-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <a
                          href={link.link}
                          className="card border text-center text-decoration-none py-4 d-flex flex-column justify-content-center align-items-center"
                        >
                            <i className={`bi ${link.icon} fs-1 mb-2 text-primary`}></i>
                            <span className="fw-semibold text-dark">{link.name}</span>
                        </a>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder for Charts or Activity Feed */}
            <motion.div
                className="row g-3 mt-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
            >
                <div className="col-12 col-lg-6">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Recent Activities</h5>
                            <div className="text-center text-muted" style={{ minHeight: "200px" }}>
                                Activity feed placeholder
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Revenue Overview</h5>
                            <div className="text-center text-muted" style={{ minHeight: "200px" }}>
                                Chart placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};