import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { api } from "../../../../global/services/Api";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { routes } from "../../../../global/routes/Routes";

export const EditActivity = () => {
    const typeRef = useRef();
    const titleRef = useRef();
    const dueDateRef = useRef();
    const priorityRef = useRef();
    const completedRef = useRef();
    const assignedToIdRef = useRef();
    const relatedToRef = useRef();
    const noteRef = useRef();
    
    const payload = () =>{
        return {
            type: typeRef.current.value,
            title: titleRef.current.value,
            dueDate: dueDateRef.current.value,
            priority: priorityRef.current.value,
            completed: completedRef.current.checked,
            assignedToId: assignedToIdRef.current.value,
            relatedTo: relatedToRef.current.value,
            note: noteRef.current.value,
        };
    }

    const create = ()=>{
        const data = payload();
        api.activity.create(data).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
    };

    const update = ()=>{
        const data = payload();
        api.activity.update(data).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
    };

    const hide = ()=>{
        const data = { hide: true };
        api.activity.update(data).then((response)=>{

        }).catch((error)=>{

        });
    };

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add Activity"
                subtitle="Create a new task, call, or email."
                reserveActions={[
                    { type: 'cancel', to: routes.crm.activity.list },
                    { type: 'save', onClick: ()=>create() },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE: Activity Details */}
                <div className="col-12 col-lg-8">
                    {/* Activity Info */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between gap-3 mb-4">
                                <h6 className="mb-0">Activity Details</h6>
                                <button onClick={hide} className="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                            
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <GlobalApiSelect ref={typeRef} className="form-select" label="Activity Type" name="type">
                                        <option>Task</option>
                                        <option>Call</option>
                                        <option>Email</option>
                                    </GlobalApiSelect>
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={titleRef} label="Title" type="text" className="form-control" placeholder="Enter activity title" name="title" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={dueDateRef} label="Due Date" type="date" className="form-control" name="dueDate" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiSelect ref={priorityRef} className="form-select" label="Priority" name="priority">
                                        <option>Normal</option>
                                        <option>High</option>
                                        <option>Low</option>
                                    </GlobalApiSelect>
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
                            <GlobalApiTextarea
                                ref={noteRef}
                                className="form-control"
                                rows="5"
                                placeholder="Add notes or instructions..."
                                name="note"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Settings & Assignments */}
                <div className="col-12 col-lg-4">
                    {/* Assignments */}
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
                                <GlobalApiSelect ref={assignedToIdRef} className="form-select" label="Assigned To" name="assignedToId">
                                    <option>Choose user</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                </GlobalApiSelect>
                            </div>
                            <div className="mb-3">
                                <GlobalApiSelect ref={relatedToRef} className="form-select" label="Related To" name="relatedTo">
                                    <option>Lead</option>
                                    <option>Contact</option>
                                    <option>Company</option>
                                    <option>Deal</option>
                                </GlobalApiSelect>
                            </div>

                            <GlobalApiCheckbox ref={completedRef} trailing="Mark as Completed" name="completed" />
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <button className="btn btn-sm btn-primary w-100">Save Activity</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};