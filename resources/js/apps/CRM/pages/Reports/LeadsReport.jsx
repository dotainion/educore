import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";

export const LeadsReport = () => {
    const reportData = [
        { title: "Total Leads", value: 120, color: "primary" },
        { title: "Contacted", value: 75, color: "success" },
        { title: "Qualified", value: 40, color: "info" },
        { title: "Lost", value: 5, color: "danger" },
    ];

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Leads Report"
                actions={[{ title: 'Export Report', onClick: ()=>null }]}
            />

            {/* Summary Cards */}
            <div className="row g-3 mb-3">
                {reportData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="col-12 col-sm-6 col-xl-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className={`card border text-center py-4`}>
                            <div className={`text-${item.color} h1 mb-2`}>{item.value}</div>
                            <div className="text-muted">{item.title}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="row g-3">
                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Leads by Stage</h5>
                            <div className="text-center text-muted" style={{ minHeight: "200px" }}>
                                {/* Placeholder for chart */}
                                Chart goes here
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="col-12 col-lg-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Leads by Source</h5>
                            <div className="text-center text-muted" style={{ minHeight: "200px" }}>
                                {/* Placeholder for chart */}
                                Chart goes here
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};