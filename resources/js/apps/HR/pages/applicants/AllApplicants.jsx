import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";
import { api } from "../../../../global/services/Api";
import { MobileTransformable, MobileTransformableButton, MobileTransformableInvisible, MobileTransformablePage, MobileTransformableProvider, MobileTransformableVisible } from "../../../../global/components/MobileTransformable";
import { BiSearch } from "react-icons/bi";
import { createPortal } from "react-dom";
import { GlobalSearchFilter } from "../../../../global/components/GlobalSearchFilter";

export const AllApplicants = () => {
    const navigate = useNavigate();

    // -------------------------
    // STATE
    // -------------------------
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [jobFilter, setJobFilter] = useState("All");
    const [selected, setSelected] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [jobs, setJobs] = useState([]);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    useEffect(()=>{
        const data = {

        }
        api.applicant.list(data).then((response)=>{
            console.log(response.data.applicants);
            setApplicants(response.data.applicants);
        }).catch((error)=>{

        });
        api.job.list().then((response)=>{
            setJobs(response.data.jobs);
        }).catch((error)=>{

        });
    }, []);

    return (
        <MobileTransformableProvider>
            <div className="container">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3"
                >
                    <h4 className="fw-semibold">All Applicants</h4>
                    <div className="text-muted small">
                        Search, filter and manage candidates across all jobs
                    </div>
                </motion.div>

                {/* TOP STATS */}
                <MobileTransformableInvisible>
                    <div className="row m-0 mb-3">
                        {[
                            { label: 'Total', value: applicants.length },
                            { label: 'Selected', value: selected.length },
                            { label: 'Hired', value: applicants.filter(a => a.status === 'hired').length },
                        ].map((s, i) => (
                            <div className="col-6 col-sm-4 p-1 p-sm-2" key={i}>
                                <motion.div
                                    className="card p-3 text-center h-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div className="fw-semibold">{s.value}</div>
                                    <div className="small text-muted">{s.label}</div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </MobileTransformableInvisible>

                {/* FILTERS */}
                <GlobalSearchFilter
                    className="mb-4"
                    onChange={console.log}
                    items={[
                        {
                            title: 'Status',
                            list: [
                                {title: 'All', name: 'all', value: true},
                                {title: 'Applied', name: 'applied', value: true},
                                {title: 'Interview', name: 'interview', value: true},
                                {title: 'Hired', name: 'hired', value: true},
                                {title: 'Rejected', name: 'rejected', value: true},
                            ]
                        },{
                            title: 'Jobs',
                            list: [
                                {title: 'Fisirsaf', name: 'fisher', value: 'sd'},
                                {title: 'Testing', name: 'fish', value: 'gs'},
                            ]
                        }
                    ]}
                    placeholder="Search name, email, skill, job..."
                />

                {/* BULK ACTION BAR */}
                {selected.length > 0 && (
                    <motion.div
                        className="alert alert-primary d-flex justify-content-between align-items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span>{selected.length} selected</span>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-success">
                                Shortlist
                            </button>
                            <button className="btn btn-sm btn-danger">
                                Reject
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* APPLICANTS GRID */}
                <div className="row g-3">
                    <AnimatePresence>
                        {
                            applicants.length ?
                            applicants.map((a) => (
                                <motion.div
                                    key={a.id}
                                    className="col-md-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    layout
                                >
                                    <div className="card p-3 h-100 position-relative">
                                        <input
                                            onChange={()=>toggleSelect(a.id)}
                                            className="form-check-input position-absolute top-0 end-0 m-2"
                                            checked={selected.includes(a.id)}
                                            type="checkbox"
                                        />
                                        <h6 className="mb-1">{a.attributes.fullName}</h6>
                                        <div className="text-muted small">{a.attributes.email}</div>
                                        <div className="small mt-2">Job: {a.attributes.job.attributes.title}</div>
                                        <div className="d-flex gap-2 mt-2 flex-wrap">
                                            <span className="badge bg-primary">{a.attributes.status}</span>
                                            <span className="badge bg-secondary">{a.attributes.job.attributes.location}</span>
                                        </div>
                                        <div className="mt-2 mb-auto">
                                            {a.attributes.skills.map((s, i) => (
                                                <span className="badge bg-light text-dark me-1" key={i}>{s}</span>
                                            ))}
                                        </div>
                                        <div className="mt-3 d-flex gap-2">
                                            <button
                                                onClick={()=>navigate(routes.hr.applicant(a.id))}
                                                className="btn btn-sm btn-outline-dark w-100"
                                            >
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-outline-success w-100">
                                                Shortlist
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )):
                            <div className="alert alert-primary my-5">
                                No Applicantion
                            </div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </MobileTransformableProvider>
    );
};