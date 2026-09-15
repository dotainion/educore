import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { GlobalCardButton } from "../../../../global/widgets/GlobalCardButton";
import { routes } from "../../../../global/routes/Routes";

export const Companies = () => {
    const companies = [
        {
            attributes: {
                name: "Acme Corp",
                industry: "Manufacturing",
                phone: "+1 555-123-4567",
                owner: "John Doe",
                vip: true,
            }
        },{
            attributes: {
                name: "Globex Inc",
                industry: "Technology",
                phone: "+1 555-987-6543",
                owner: "Jane Smith",
                vip: false,
            }
        },{
            attributes: {
                name: "Soylent Corp",
                industry: "Food Production",
                phone: "+1 555-111-2222",
                owner: "Michael Brown",
                vip: true,
            }
        },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Companies"
                reserveActions={[{ type: 'create', to: routes.crm.company.create }]}
            />

            {/* Company Cards */}
            <div className="row g-3 m-0">
                <GlobalCardButton to={routes.crm.company.create} />
                {companies.map((company, idx) => (
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
                                    <h6 className="card-title mb-0">{company.attributes.name}</h6>
                                    {company.attributes.vip && <span className="badge bg-warning text-dark">VIP</span>}
                                </div>

                                {/* Company Info */}
                                <div className="text-muted small mb-3">
                                    <div>Industry: {company.attributes.industry}</div>
                                    <div>Phone: {company.attributes.phone}</div>
                                    <div>Owner: {company.attributes.owner}</div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex gap-2 mt-auto">
                                    <Link to={routes.crm.company.view(company.id)} className="btn btn-sm btn-outline-secondary flex-grow-1">View</Link>
                                    <Link to={routes.crm.company.update(company.id)} className="btn btn-sm btn-primary flex-grow-1">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};