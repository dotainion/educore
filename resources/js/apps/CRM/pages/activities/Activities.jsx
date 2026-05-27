import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { GlobalCardButton } from "../../../../global/widgets/GlobalCardButton";
import { api } from "../../../../global/services/Api";
import { routes } from "../../../../global/routes/Routes";

export const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(()=>{
        api.activity.list().then((response)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.log(error.response)
        });
    }, []);

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Activities"
                reserveActions={[{ type: 'create', to: routes.crm.activity.create }]}
            />

            {/* Activity Cards */}
            <div className="row g-3 m-0">
                <GlobalCardButton to={routes.crm.activity.create} />
                {activities.map((activity, idx) => (
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
                                    <h6 className="card-title mb-0">{activity.attributes.title}</h6>
                                    <span
                                        className={`badge ${
                                          activity.attributes.priority === "High" ? "bg-danger" : activity.attributes.priority === "Normal" ? "bg-primary" : "bg-secondary"
                                        }`}
                                    >
                                        {activity.attributes.priority}
                                    </span>
                                </div>

                                {/* Activity Info */}
                                <div className="text-muted small mb-3">
                                    <div>Type: {activity.attributes.type}</div>
                                    <div>Due: {activity.attributes.dueDate}</div>
                                    <div>Assigned To: {activity.attributes.assignedTo}</div>
                                    <div>Status: {activity.attributes.completed ? "Completed" : "Pending"}</div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex gap-2 mt-auto">
                                    <Link to={routes.crm.activity.view(activity.id)} className="btn btn-sm btn-outline-secondary flex-grow-1">View</Link>
                                    <Link to={routes.crm.activity.update(activity.id)} className="btn btn-sm btn-primary flex-grow-1">Edit</Link>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};