import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { GlobalCardButton } from "../../../../global/widgets/GlobalCardButton";
import { routes } from "../../../../global/routes/Routes";

export const Leads = () => {
    const leads = [
        {
            attributes: {
                name: "Jane Smith",
                title: "Marketing Manager",
                email: "jane.smith@example.com",
                phone: "+1 555-123-4567",
                company: "Acme Corp",
                status: "Contacted",
                vip: true,
            }
        },{
            attributes: {
                name: "John Doe",
                title: "Sales Executive",
                email: "john.doe@example.com",
                phone: "+1 555-987-6543",
                company: "Globex Inc",
                status: "New",
                vip: false,
            }
        },{
            attributes: {
                name: "Michael Brown",
                title: "Product Owner",
                email: "michael.brown@example.com",
                phone: "+1 555-111-2222",
                company: "Soylent Corp",
                status: "Qualified",
                vip: false,
            }
        },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Leads"
                reserveActions={[{ type: 'create', to: routes.crm.lead.create }]}
            />

            <div className="row g-3 m-0">
                <GlobalCardButton to={routes.crm.lead.create} />
                {leads.map((lead, idx) => (
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
                                    <h6 className="card-title mb-0">{lead.attributes.name}</h6>
                                    {lead.attributes.vip && <span className="badge bg-warning text-dark">VIP</span>}
                                </div>
                                {/* Lead Info */}
                                <div className="text-muted small mb-3">
                                    <div>{lead.attributes.title}</div>
                                    <div>{lead.attributes.email}</div>
                                    <div>{lead.attributes.phone}</div>
                                    <div>Company: {lead.attributes.company}</div>
                                    <div>Status: {lead.attributes.status}</div>
                                </div>
                                {/* Actions */}
                                <div className="d-flex gap-2 mt-auto">
                                    <Link to={routes.crm.lead.view(lead.id)} className="btn btn-sm btn-outline-secondary flex-grow-1">View</Link>
                                    <Link to={routes.crm.lead.update(lead.id)} className="btn btn-sm btn-primary flex-grow-1">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};