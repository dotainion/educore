import { useEffect, useState } from "react";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiUser, FiArrowRight, FiX } from "react-icons/fi";
import { ApplicantStatusButton } from "../../components/ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";


export const AppliedWorkspace = () =>{
    const [total] = useState(0);
    const [newToday] = useState(0);
    const [applicant, setApplicant] = useState();
    const [loading, setLoading] = useState(true);
    
    const params = useParams();

    useEffect(()=>{
        api.applicant.find({applicantId: params.applicantId}).then((response)=>{
            setApplicant(response.data.applicant);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="container py-4">
            <div className="bg-white border-bottom p-3">
                {/* TOP ROW */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    {/* LEFT */}
                    <div>
                        <h5 className="mb-0 text-primary">Applied</h5>
                        <small className="text-muted">
                            Applied → Screening → Interview → Offer → Hired
                        </small>
                    </div>
                    {/* RIGHT ACTIONS */}
                    <div className="d-flex flex-wrap gap-2">
                        {applicant && (
                            <button
                                onClick={()=>navigate(routes.hr.recuitment.search(applicant.attributes.job.id))}
                                className="btn btn-secondary btn-sm d-flex align-items-center gap-1"
                            >
                                <FiArrowLeft />
                                Search
                            </button>
                        )}
                        <ApplicantStatusButton
                            className="btn btn-success btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'screening', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.screening(params.applicantId)}
                        >
                            Move to Screening
                            <FiArrowRight />
                        </ApplicantStatusButton>
                        <ApplicantStatusButton
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'rejected', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.rejected(params.applicantId)}
                        >
                            Reject
                            <FiX />
                        </ApplicantStatusButton>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                    {/* STATS */}
                    <div className="d-flex gap-3 text-muted small">
                    <span>
                        <strong className="text-dark">{total}</strong> Applicants
                    </span>
                    <span>
                        New Today: <strong className="text-primary">{newToday}</strong>
                    </span>
                    </div>
                    <div className="text-muted small">
                        Viewing selected applicant in Applied stage
                    </div>
                </div>
            </div>

            {loading ? <Spinner show absolute md /> : (
                <div className="py-4">
                    {/* BASIC INFO */}
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-light border rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: 50, height: 50 }}
                        >
                            <FiUser />
                        </div>
                        <div>
                            <h5 className="mb-0">{applicant.attributes.fullName}</h5>
                            <small className="text-muted">
                                {applicant.attributes.email} • {applicant.attributes.contact}
                            </small>
                        </div>
                    </div>
                    <hr />
                    {/* DETAILS */}
                    <div className="text-muted fw-semibold mb-2">{applicant.attributes.position}</div>
                    <div className="mb-3 small">
                        <div className="small">{applicant.attributes.createdAt.split('.')[0].replace('T', ' ')}</div>
                    </div>

                    <hr />

                    <div className="card border mb-3">
                        <div className="card-body">
                            <h6 className="text-muted">Profile</h6>
                            <div className="small text-muted">Skills:</div>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {applicant.attributes.skills.map((skill)=>(
                                    <span className="small rounded-pill bg-light px-3" key={skill}>{skill}</span>
                                ))}
                            </div>
                            <div className="small text-muted">Experience:</div>
                            <div className="small bg-light rounded-3 p-2">{applicant.attributes.experience}</div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="d-flex gap-2">
                        <ApplicantStatusButton
                            className="btn btn-success btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'screening', applicantId: applicant.id}}
                            to={routes.hr.recruitment.screening(applicant.id)}
                        >
                            <FiArrowRight />
                            Move to Screening
                        </ApplicantStatusButton>
                        <ApplicantStatusButton
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'rejected', applicantId: applicant.id}}
                            to={routes.hr.recruitment.rejected(applicant.id)}
                        >
                            <FiX />
                            Reject
                        </ApplicantStatusButton>
                    </div>
                </div>
            )}
        </div>
    )
}
