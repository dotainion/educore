import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { routes } from "../../../../global/routes/Routes";

export const EditDeal = () => {
    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add Deal"
                subtitle="Create a new deal in the CRM."
                reserveActions={[
                    { type: 'cancel', to: routes.crm.deal.list },
                    { type: 'save', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE: Deal Info */}
                <div className="col-12 col-lg-8">
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Deal Information</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Deal Name</label>
                                    <input type="text" className="form-control" placeholder="Enter deal name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Value</label>
                                    <input type="text" className="form-control" placeholder="Enter deal value" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Stage</label>
                                    <select className="form-select">
                                        <option>Select stage</option>
                                        <option>Prospecting</option>
                                        <option>Proposal</option>
                                        <option>Negotiation</option>
                                        <option>Closed Won</option>
                                        <option>Closed Lost</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Probability</label>
                                    <input type="text" className="form-control" placeholder="Enter probability %" />
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
                                    <label className="form-label">Contact</label>
                                    <select className="form-select">
                                        <option>Select contact</option>
                                        <option>Jane Smith</option>
                                        <option>John Doe</option>
                                        <option>Michael Brown</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Expected Close Date</label>
                                    <input type="date" className="form-control" />
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
                                placeholder="Add notes about this deal..."
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
                            <button className="btn btn-sm btn-primary w-100">Save Deal</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};