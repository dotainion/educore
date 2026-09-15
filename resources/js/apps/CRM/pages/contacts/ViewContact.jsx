import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { useParams } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ViewContact = () => {
    const contact = {
        attributes: {
            name: "Jane Smith",
            title: "Account Manager",
            email: "jane.smith@example.com",
            phone: "+1 555-123-4567",
            company: "Acme Corp",
            owner: {attributes: {fullName: "John Doe"}},
            deals: [
                { attributes: {title: "Project Alpha", value: "$25,000", status: "In Progress"} },
                { attributes: {title: "Project Beta", value: "$12,500", status: "Closed Won"} },
            ],
            notes: "Follow up quarterly. VIP client.",
        }
    };

    const params = useParams();

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={contact.name}
                reserveActions={[
                    { type: 'edit', to: routes.crm.contact.update(params.contactId) },
                    { type: 'delete', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE */}
                <div className="col-12 col-lg-8">
                    {/* Contact Info */}
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
                                    <div className="text-muted small">Title</div>
                                    <div>{contact.attributes.title}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Email</div>
                                    <div>{contact.attributes.email}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Phone</div>
                                    <div>{contact.attributes.phone}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Company</div>
                                    <div>{contact.attributes.company}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Owner</div>
                                    <div>{contact.attributes.owner.attributes.fullName}</div>
                                </div>
                            </div>
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
                            {contact.attributes.deals.map((deal, idx) => (
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
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Notes</h6>
                            <p>{contact.attributes.notes}</p>
                        </div>
                    </motion.div>
                </div>
                {/* RIGHT SIDE */}
                <div className="col-12 col-lg-4">
                    {/* Quick Actions */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-flex flex-column gap-3">
                            <h6 className="mb-3">Actions</h6>
                            <button className="btn btn-sm btn-primary w-100">Edit Contact</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Assign Owner</button>
                            <button className="btn btn-sm btn-danger w-100">Delete Contact</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};