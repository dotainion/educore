import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { GlobalCardButton } from "../../../../global/widgets/GlobalCardButton";
import { routes } from "../../../../global/routes/Routes";

export const Deals = () => {
    const deals = [
        {
            attributes: {
                title: "Project Alpha",
                value: "$25,000",
                stage: "Negotiation",
                probability: "70%",
                company: "Acme Corp",
            }
        },{
            attributes: {
                title: "Project Beta",
                value: "$12,500",
                stage: "Closed Won",
                probability: "100%",
                company: "Globex Inc",
            }
        },{
            attributes: {
                title: "Project Gamma",
                value: "$8,750",
                stage: "Proposal",
                probability: "50%",
                company: "Soylent Corp",
            }
        },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Deals"
                reserveActions={[{ type: 'create', to: routes.crm.deal.create }]}
            />

            {/* Deal Cards */}
            <div className="row g-3 m-0">
                <GlobalCardButton to={routes.crm.deal.create} />
                {deals.map((deal, idx) => (
                    <motion.div
                        key={idx}
                        className="col-12 col-sm-6 col-xl-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="card border h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                {/* Card Header */}
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="card-title mb-0">{deal.attributes.title}</h6>
                                    <span className="badge bg-primary">{deal.attributes.stage}</span>
                                </div>

                                {/* Deal Info */}
                                <div className="text-muted small mb-3">
                                    <div>Value: {deal.attributes.value}</div>
                                    <div>Probability: {deal.attributes.probability}</div>
                                    <div>Company: {deal.attributes.company}</div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex gap-2 mt-auto">
                                    <Link to={routes.crm.deal.view(deal.id)} className="btn btn-sm btn-outline-secondary flex-grow-1">View</Link>
                                    <Link to={routes.crm.deal.update(deal.id)} className="btn btn-sm btn-primary flex-grow-1">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};