import React from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { useParams } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

export const ViewActivity = () => {
    const activity = {
        attributes: {
            type: "Call",
            title: "Follow up with Lead",
            dueDate: "2026-04-01",
            priority: "High",
            completed: false,
            assignedTo: "Jane Smith",
            relatedTo: "Lead: Acme Corp",
            notes: "Discuss the proposal and answer any questions. Confirm next steps.",
        }
    };

    const params = useParams();

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={activity.title}
                reserveActions={[
                    { type: 'edit', to: routes.crm.activity.update(params.activityId) },
                    { type: 'delete', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE: Activity Info */}
                <div className="col-12 col-lg-8">
                    {/* Activity Details */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Activity Details</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="text-muted small">Type</div>
                                    <div>{activity.attributes.type}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Priority</div>
                                    <div>{activity.attributes.priority}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-muted small">Due Date</div>
                                    <div>{activity.attributes.dueDate}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-check form-switch mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={activity.attributes.completed}
                                            readOnly
                                        />
                                        <label className="form-check-label">Completed</label>
                                    </div>
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
                            <p>{activity.attributes.notes}</p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Assignments & Related */}
                <div className="col-12 col-lg-4">
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Assignments</h6>
                            <div className="mb-3">
                                <div className="text-muted small">Assigned To</div>
                                <div>{activity.attributes.assignedTo}</div>
                            </div>
                            <div className="mb-3">
                                <div className="text-muted small">Related To</div>
                                <div>{activity.attributes.relatedTo}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <button className="btn btn-sm btn-primary w-100">Edit Activity</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Mark as Completed</button>
                            <button className="btn btn-sm btn-danger w-100">Delete Activity</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};