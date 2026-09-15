import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { api } from "../../../global/services/Api";
import { GlobalSearch } from "../../../global/widgets/GlobalSearch";
import { Spinner } from "../../../global/components/Spinner";
import { GlobalSearchFilter } from "../../../global/components/GlobalSearchFilter";

export const Jobs = () => {
    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    
    useEffect(()=>{
        api.job.list().then((response)=>{
            setJobs(response.data.jobs);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container">
            {/* HEADER */}
            <motion.div
                className="d-flex justify-content-between align-items-center mb-4"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h4 className="fw-semibold mb-1">Job Openings</h4>
                    <div className="text-muted small">
                        Manage hiring positions across your company
                    </div>
                </div>
                <button onClick={()=>navigate(routes.hr.createJob)} className="btn btn-light btn-sm px-3">
                    + New Job
                </button>
            </motion.div>

            {/* SEARCH (minimal, not noisy) */}
            <GlobalSearchFilter
                className="mb-4"
                items={[
                    {
                        list: [
                            {title: 'Open', name: 'status', value: 'open'},
                            {title: 'Closed', name: 'status', value: 'close'},
                        ]
                    }
                ]}
            />

            {loading ? (
                <div className="py-5 position-relative">
                    <Spinner show absolute md bg="white" />
                </div>
            ):(
                <div className="row g-3">
                    {
                        jobs.length ?
                        jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                className="col-12 col-sm-6 col-md-4"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className="card border h-100">
                                    <div className="card-body d-flex flex-column">
                                        {/* TOP ROW */}
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="fw-semibold mb-0">{job.attributes.title}</h6>
                                            <div>
                                                <span className={`badge rounded-pill bg-${job.attributes.status === 'open' ? 'success' : 'secondary'}`}>
                                                    {job.attributes.status}
                                                </span>
                                            </div>
                                        </div>
                                        {/* META (compact, clean) */}
                                        <div className="text-muted small mb-3">
                                            {job.attributes.department} • {job.attributes.location}
                                        </div>
                                        {/* FOOTER INFO */}
                                        <div className="text-muted small text-uppercase mb-2">{job.attributes.employmentType}</div>
                                        <div className="d-flex justify-content-end gap-2 mt-auto">
                                            <button
                                                onClick={()=>navigate(routes.hr.viewJob(job.id))}
                                                className="btn btn-sm btn-outline-dark w-100"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={()=>navigate(routes.hr.editJob(job.id))}
                                                className="btn btn-sm btn-outline-dark w-100"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )):
                            <div className="alert alert-primary my-5">
                                No Jobs
                            </div>
                    }
                </div>
            )}
        </div>
    );
};