import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { useParams } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ViewCompany = () => {
    const company = {
        attributes: {
            name: "Acme Corp",
            website: "https://acmecorp.com",
            industry: "Manufacturing",
            phone: "+1 555-123-4567",
            owner: {attributes: { fullName: "John Doe"}},
            vip: true,
            address: {
                attributes: {
                    street: "123 Main St",
                    city: "New York",
                    state: "NY",
                    zip: "10001",
                    country: "USA",
                },
            },
            contacts: [
                { attributes: {name: "Jane Smith", role: "Manager", email: "jane.smith@example.com"} },
                { attributes: {name: "Michael Brown", role: "Engineer", email: "michael.brown@example.com"} },
            ],
            deals: [
                { attributes: {title: "Project Alpha", value: "$25,000", status: "In Progress"} },
                { attributes: {title: "Project Beta", value: "$12,500", status: "Closed Won"} },
            ],
            notes: "Top priority client. Follow up quarterly.",
        }
    };

    const params = useParams();

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={company.name}
                subtitle={company.vip ? <span className="badge bg-warning text-dark">VIP</span> : null}
                reserveActions={[
                    { type: 'edit', to: routes.crm.company.update(params.companyId) },
                    { type: 'delete', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE */}
                <div className="col-12 col-lg-8">
                    {/* Company Info */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Company Information</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="text-muted small">Industry</div>
                                    <div>{company.attributes.industry}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Phone</div>
                                    <div>{company.attributes.phone}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Website</div>
                                    <div>{company.attributes.website}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Owner</div>
                                    <div>{company.attributes.owner.attributes.fullName}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Address</h6>
                            <div>{company.attributes.address.attributes.street}</div>
                            <div>{company.attributes.address.attributes.city}, {company.attributes.address.attributes.state} {company.attributes.address.attributes.zip}</div>
                            <div>{company.attributes.address.attributes.country}</div>
                        </div>
                    </motion.div>

                    {/* Contacts */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Contacts</h6>
                            {company.attributes.contacts.map((contact, idx) => (
                                <div key={idx} className="border-bottom pb-2 mb-2 last-child:border-0">
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-semibold">{contact.attributes.name}</span>
                                        <small className="text-muted">{contact.attributes.role}</small>
                                    </div>
                                    <div className="text-muted">{contact.attributes.email}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Deals */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Deals</h6>
                            {company.attributes.deals.map((deal, idx) => (
                                <div key={idx} className="border-bottom pb-2 mb-2 last-child:border-0">
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-semibold">{deal.attributes.title}</span>
                                        <small className="text-muted">{deal.attributes.status}</small>
                                    </div>
                                    <div className="text-muted">{deal.attributes.value}</div>
                                </div>
                            ))}
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
                            <p>{company.attributes.notes}</p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-lg-4">
                    {/* Quick Actions */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-flex flex-column gap-3">
                            <h6 className="mb-3">Actions</h6>
                            <button className="btn btn-sm btn-primary w-100">Edit Company</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Change Owner</button>
                            <button className="btn btn-sm btn-danger w-100">Delete Company</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};