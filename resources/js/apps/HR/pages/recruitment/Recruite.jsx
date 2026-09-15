import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";
import { GrAdd } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import { HiOutlineViewBoards, HiUsers } from "react-icons/hi";
import { GlobalSearch } from "../../../../global/widgets/GlobalSearch";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { GlobalSearchFilter } from "../../../../global/components/GlobalSearchFilter";
import { useSearchCallback } from "../../../../global/hooks/useSearchCallback";

export const Recruite = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    
    const totalJobs = jobs.length;
    const openJobs = 7;
    const totalApplicants = 100;

    const items = useMemo(()=>[
        {
            list: [
                {title: 'Open', name: 'status', value: 'open'},
                {title: 'Closed', name: 'status', value: 'close'},
            ]
        }
    ], []);

    const search = useSearchCallback((filter) =>{
        setLoading(true);
        setJobs([]);

        api.job.search({...filter}).then((response)=>{
            setJobs(response.data.jobs);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    });

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
                className="mb-4"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="fw-semibold mb-1">Recruitment</h4>
                <div className="text-muted small">
                    Manage hiring positions and applicants
                </div>
            </motion.div>

            {/* ACTIONS */}
            <div className="d-flex overflow-auto text-nowrap gap-2 mb-3">
                {[
                    {
                        title: "Jobs",
                        icon: MdWork,
                        route: routes.hr.jobs,
                    },{
                        title: "Create Job",
                        icon: GrAdd,
                        route: routes.hr.createJob,
                    },{
                        title: "Applicants",
                        icon: HiUsers,
                        route: routes.hr.allApplicants,
                    },{
                        title: "Onboarding",
                        icon: HiOutlineViewBoards,
                        route: routes.hr.onboarding.board,
                    },
                ].map((btn, i) => (
                    <motion.button
                        key={i}
                        onClick={()=>navigate(btn.route)}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <btn.icon />
                        {btn.title}
                    </motion.button>
                ))}
            </div>

            {/* STATS */}
            <div className="row m-0 gap-0 mb-4 d-none d-sm-flex">
                {[{
                    label: "Total Jobs",
                    value: totalJobs,
                },{
                    label: "Open Jobs",
                    value: openJobs,
                },{
                    label: "Total Applicants",
                    value: totalApplicants,
                }].map((s, i) => (
                    <div className="col-sm-4 p-1" key={i}>
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

            {/* FILTERS */}
            <GlobalSearchFilter
                className="mb-4"
                onChange={search}
                mapSameNameToArray="STRING_ON_SINGLE_ITEM"
                placeholder="Search applicant, email, contact..."
                name="title"
                items={items}
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
                                className="col-12 col-sm-6 col-md-4"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={job.id}
                            >
                                <div
                                    onClick={()=>navigate(routes.hr.recruitment.board(job.id))}
                                    className={`card action border h-100 ${job.attributes.featured ? 'border-warning' : ''}`}
                                >
                                    <div className="card-body d-flex flex-column position-relative">
                                        <h6 className="fw-semibold mb-1">{job.attributes.title}</h6>
                                        <div className="text-muted small mb-2">
                                            {job.attributes.department} • <span className="text-uppercase">{job.attributes.location}</span>
                                        </div>
                                        <div className="mb-2 d-flex gap-1 flex-wrap">
                                            <span className={`badge bg-${job.attributes.status === 'open' ? 'success' : 'secondary'}`}>
                                                {job.attributes.status}
                                            </span>
                                            {job.attributes.featured && (
                                                <span className="badge bg-warning text-dark">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <div className="small text-muted mb-2 text-uppercase">
                                            {job.attributes.employmentType}
                                        </div>
                                        <div className="small text-muted">
                                            Deadline: {job.attributes.deadline}
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