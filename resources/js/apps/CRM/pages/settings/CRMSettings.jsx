import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";

export const CRMSettings = () => {
    return (
        <div className="container">
            <GlobalNavbarPortal
                title="CRM Settings"
                actions={[{ title: 'Save Settings', onClick: ()=>null }]}
            />

            {/* Settings Cards */}
            <div className="row g-3">
                {/* User Settings */}
                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h6 className="mb-3">User Settings</h6>
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="allowRegistrations" />
                                <label className="form-check-label" htmlFor="allowRegistrations">
                                    Allow new user registrations
                                </label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="require2FA" />
                                <label className="form-check-label" htmlFor="require2FA">
                                    Require two-factor authentication
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Email Settings */}
                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h6 className="mb-3">Email Settings</h6>
                            <div className="mb-3">
                                <label className="form-label">SMTP Server</label>
                                <input type="text" className="form-control" placeholder="smtp.example.com" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Port</label>
                                <input type="number" className="form-control" placeholder="587" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">From Email</label>
                                <input type="email" className="form-control" placeholder="no-reply@example.com" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CRM Preferences */}
                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h6 className="mb-3">CRM Preferences</h6>
                            <div className="mb-3">
                                <label className="form-label">Default Lead Status</label>
                                <select className="form-select">
                                    <option>New</option>
                                    <option>Contacted</option>
                                    <option>Qualified</option>
                                    <option>Lost</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Default Deal Stage</label>
                                <select className="form-select">
                                    <option>Prospecting</option>
                                    <option>Proposal</option>
                                    <option>Negotiation</option>
                                    <option>Closed Won</option>
                                    <option>Closed Lost</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h6 className="mb-3">Notifications</h6>
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="notifyEmail" />
                                <label className="form-check-label" htmlFor="notifyEmail">
                                    Notify by Email
                                </label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="notifySMS" />
                                <label className="form-check-label" htmlFor="notifySMS">
                                    Notify by SMS
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};