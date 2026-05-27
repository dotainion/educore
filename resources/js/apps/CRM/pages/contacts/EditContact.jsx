import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { routes } from "../../../../global/routes/Routes";

export const EditContact = () => {
    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add Contact"
                subtitle="Create a new contact in the CRM."
                reserveActions={[
                    { type: 'cancel', to: routes.crm.contact.list },
                    { type: 'save', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE: Contact Info */}
                <div className="col-12 col-lg-8">
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Contact Information</h6>
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
                                placeholder="Add notes about this contact..."
                            ></textarea>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Settings & Actions */}
                <div className="col-12 col-lg-4">
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <h6 className="mb-3">Settings</h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="vipSwitch" />
                                <label className="form-check-label" htmlFor="vipSwitch">Mark as VIP</label>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <button className="btn btn-sm btn-primary w-100">Save Contact</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};