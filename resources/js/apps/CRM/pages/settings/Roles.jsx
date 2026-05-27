import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";

export const Roles = () => {
    const roles = [
        { name: "Administrator", description: "Full access to all CRM features." },
        { name: "Manager", description: "Manage leads, deals, and users." },
        { name: "Sales Rep", description: "Access only assigned leads and deals." },
        { name: "Support", description: "Access to contacts and activities only." },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Roles"
                actions={[{ title: 'Add Role', onClick: ()=>null }]}
            />

            {/* Role Cards */}
            <div className="row g-3">
                {roles.map((role, idx) => (
                    <motion.div
                        key={idx}
                        className="col-12 col-md-6 col-xl-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="card border h-100">
                            <div className="card-body d-flex flex-column justify-content-between">

                                {/* Card Header */}
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="card-title mb-0">{role.name}</h6>
                                </div>

                                {/* Role Description */}
                                <p className="text-muted mb-3">{role.description}</p>

                                {/* Actions */}
                                <div className="d-flex gap-2 mt-auto">
                                    <button className="btn btn-sm btn-outline-secondary flex-grow-1">Edit</button>
                                    <button className="btn btn-sm btn-danger flex-grow-1">Delete</button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};