import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";

export const ViewApplicant = () => {
    const [applicant, setApplicant] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const a = null;
    const job = a?.job?.attributes;
    const address = a?.address?.attributes;

    useEffect(()=>{
        api.applicant.find({applicantId: params.applicantId}).then((response)=>{
            console.log(response.data.applicant);
            setApplicant(response.data.applicant);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container-fluid view-applicant-panel">
            {/* HEADER */}
            <h4 className="fw-semibold mb-0">Applicant Profile</h4>
            <div className="text-muted small">Complete applicant overview</div>

            {loading ? <Spinner show absolute md /> : (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="row gap-0 mt-3"
                >
                    {/* PERSONAL INFO */}
                    <div className="col-12 col-md-6 p-2">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="text-muted">{applicant.attributes.fullName}</h5>
                                <div className="text-muted small mb-3">
                                    {applicant.attributes.email} • {applicant.attributes.contact}
                                </div>
                                <span className="badge bg-primary text-uppercase">
                                    {applicant.attributes.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* EMPLOYMENT STATUS FLAGS */}
                    <div className="col-12 col-md-6 p-2">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body small">
                                <h5 className="text-muted">Employment Progress</h5>
                                <div>System Access: <b>{String(applicant.attributes.systemAccess)}</b></div>
                                <div>First Day Completed: <b>{String(applicant.attributes.firstDayCompleted)}</b></div>
                                <div>Payroll Setup: <b>{String(applicant.attributes.payrollSetup)}</b></div>
                                <div>Equipment Assigned: <b>{String(applicant.attributes.equipmentAssigned)}</b></div>
                            </div>
                        </div>
                    </div>

                    {/* JOB DETAILS */}
                    {applicant.attributes.job && (
                        <div className="col-12 col-md-6 p-2">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body small">
                                    <h5 className="text-muted">Job Details</h5>
                                    <div><b>Title:</b> {applicant.attributes.job.attributes.title}</div>
                                    <div><b>Department:</b> {applicant.attributes.job.attributes.department}</div>
                                    <div><b>Workplace:</b> {applicant.attributes.job.attributes.workplace}</div>
                                    <div><b>Employment Type:</b> {applicant.attributes.job.attributes.employmentType}</div>
                                    <div><b>Location:</b> {applicant.attributes.job.attributes.location}</div>

                                    <hr />

                                    <div><b>Experience Level:</b> {applicant.attributes.job.attributes.experienceLevel}</div>
                                    <div><b>Min Experience:</b> {applicant.attributes.job.attributes.minExperience}</div>
                                    <div><b>Education:</b> {applicant.attributes.job.attributes.education}</div>

                                    <hr />

                                    <div>
                                        <b>Salary:</b> {applicant.attributes.job.attributes.currency} {applicant.attributes.job.attributes.salaryMin} - {applicant.attributes.job.attributes.salaryMax} ({applicant.attributes.job.attributes.payType})
                                    </div>

                                    <div><b>Show Salary:</b> {String(applicant.attributes.job.attributes.showSalary)}</div>
                                    <div><b>Application Type:</b> {applicant.attributes.job.attributes.applicationType}</div>
                                    <div><b>Deadline:</b> {applicant.attributes.job.attributes.deadline}</div>

                                    <div><b>Status:</b> {applicant.attributes.job.attributes.status}</div>
                                    <div><b>Featured:</b> {String(applicant.attributes.job.attributes.featured)}</div>
                                    <div><b>Published:</b> {String(applicant.attributes.job.attributes.published)}</div>
                                    <div><b>Hires:</b> {applicant.attributes.job.attributes.hires}</div>

                                    <hr />

                                    <div>
                                        <b>Skills:</b>
                                        <div className="d-flex flex-wrap gap-1 mt-1">
                                            {applicant.attributes.job.attributes.skills?.map((s, i) => (
                                                <span className="badge bg-light text-dark border" key={i}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <b>Documents:</b>
                                        <div className="d-flex flex-wrap gap-1 mt-1">
                                            {applicant.attributes.job.attributes.documents.map((d, i) => (
                                                <span className="badge bg-secondary" key={i}>{d}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ADDRESS */}
                    {address && (
                        <div className="col-12 col-md-6 p-2">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body small">
                                    <h5 className="text-muted">Address</h5>
                                    <div><b>Street:</b> {address.street}</div>
                                    <div><b>City:</b> {address.city}</div>
                                    <div><b>State:</b> {address.state}</div>
                                    <div><b>Country:</b> {address.country}</div>
                                    <div><b>ZIP:</b> {address.zip}</div>

                                    <hr />

                                    <div>
                                        <b>Full Address:</b><br />
                                        <span className="text-muted">
                                            {address.toString}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPLICATION DATA */}
                    <div className="col-12 col-md-6 p-2">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body small">
                                <h5 className="text-muted">Application Details</h5>
                                <div><b>Job ID:</b> {applicant.attributes.jobId}</div>
                                <div><b>Position:</b> {applicant.attributes.position}</div>
                                <div className="mt-2">
                                    <b>Skills:</b>
                                    <div className="d-flex flex-wrap gap-1 mt-1">
                                        {(applicant.attributes.skills || []).map((s, i) => (
                                            <span className="badge bg-primary" key={i}>{s}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <b>Experience:</b>
                                    <div className="text-muted">{applicant.attributes.experience}</div>
                                </div>
                                <div className="mt-2">
                                    <b>Created:</b> {applicant.attributes.createdAt}
                                </div>
                                <div>
                                    <b>Updated:</b> {applicant.attributes.updatedAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};