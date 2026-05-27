import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { useParams } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ViewDeal = () => {
    const deal = {
        attributes: {
            title: "Project Alpha",
            value: "$25,000",
            stage: "Negotiation",
            probability: "70%",
            owner: "Jane Smith",
            company: "Acme Corp",
            contact: "John Doe",
            expectedClose: "2026-04-15",
            notes: "Client requested a discount. Awaiting final approval.",
        }
    };

    const params = useParams();

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={deal.title}
                reserveActions={[
                    { type: 'edit', to: routes.crm.deal.update(params.dealId) },
                    { type: 'delete', onClick: ()=>null },
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
                                    <div className="text-muted small">Value</div>
                                    <div>{deal.attributes.value}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Stage</div>
                                    <div>{deal.attributes.stage}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Probability</div>
                                    <div>{deal.attributes.probability}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Owner</div>
                                    <div>{deal.attributes.owner}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Company</div>
                                    <div>{deal.attributes.company}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Contact</div>
                                    <div>{deal.attributes.contact}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Expected Close</div>
                                    <div>{deal.attributes.expectedClose}</div>
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
                            <p>{deal.attributes.notes}</p>
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
                            <button className="btn btn-sm btn-primary w-100">Edit Deal</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Update Stage</button>
                            <button className="btn btn-sm btn-danger w-100">Delete Deal</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};