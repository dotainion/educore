import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { routes } from "../../../../global/routes/Routes";

export const EditLead = () => {
    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add Lead"
                subtitle="Create a new lead in the CRM."
                reserveActions={[
                    { type: 'cancel', to: routes.crm.lead.list },
                    { type: 'save', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE: Lead Info */}
                <div className="col-12 col-lg-8">
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Lead Information</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter first name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Enter last name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" placeholder="Enter phone number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Company</label>
                                    <select className="form-select">
                                        <option>Select company</option>
                                        <option>Acme Corp</option>
                                        <option>Globex Inc</option>
                                        <option>Soylent Corp</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Owner</label>
                                    <select className="form-select">
                                        <option>Select owner</option>
                                        <option>John Doe</option>
                                        <option>Jane Smith</option>
                                        <option>Michael Brown</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Status</label>
                                    <select className="form-select">
                                        <option>Select status</option>
                                        <option>New</option>
                                        <option>Contacted</option>
                                        <option>Qualified</option>
                                        <option>Lost</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Source</label>
                                    <select className="form-select">
                                        <option>Select source</option>
                                        <option>Website</option>
                                        <option>Email</option>
                                        <option>Referral</option>
                                        <option>Social Media</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notes */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Notes</h6>
                            <textarea
                                className="form-control"
                                rows="5"
                                placeholder="Add notes about this lead..."
                            ></textarea>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Actions */}
                <div className="col-12 col-lg-4">
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <h6 className="mb-3">Actions</h6>
                            <button className="btn btn-sm btn-primary w-100">Save Lead</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};