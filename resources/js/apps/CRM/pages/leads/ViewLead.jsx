import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { routes } from "../../../../global/routes/Routes";

export const ViewLead = () => {
    const lead = {
        attributes: {
            name: "Jane Smith",
            title: "Marketing Manager",
            email: "jane.smith@example.com",
            phone: "+1 555-123-4567",
            company: "Acme Corp",
            owner: "John Doe",
            status: "Contacted",
            source: "Website",
            notes: "Interested in premium package. Follow up next week.",
        }
    };

    const params = useParams();

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={lead.name}
                reserveActions={[
                    { type: 'edit', to: routes.crm.lead.update(params.leadId) },
                    { type: 'delete', onClick: ()=>null },
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
                                    <div className="text-muted small">Title</div>
                                    <div>{lead.attributes.title}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Email</div>
                                    <div>{lead.attributes.email}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Phone</div>
                                    <div>{lead.attributes.phone}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Company</div>
                                    <div>{lead.attributes.company}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Owner</div>
                                    <div>{lead.attributes.owner}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Status</div>
                                    <div>{lead.attributes.status}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Source</div>
                                    <div>{lead.attributes.source}</div>
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
                            <p>{lead.attributes.notes}</p>
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
                            <button className="btn btn-sm btn-primary w-100">Edit Lead</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Update Status</button>
                            <button className="btn btn-sm btn-danger w-100">Delete Lead</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};