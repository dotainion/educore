import { useEffect, useState } from "react"
import { Screening } from "../../components/recruitment/Screening"
import { api } from "../../../../global/services/Api"
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";
import { FiCheck, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { ApplicantStatusButton } from "../../components/ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";

export const ScreeningWorkspace = () =>{
    const [total] = useState(0);
    const [avgScore] = useState(null);
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
            {loading ? <Spinner show absolute md /> : (
                <>
                    <div className="bg-white border-bottom p-3 mb-4">
                        {/* TOP ROW */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            {/* LEFT: TITLE + PIPELINE */}
                            <div>
                                <h5 className="mb-0 text-info">Screening</h5>
                                <small className="text-muted">
                                    Applied → <span className="fw-bold text-info">Screening</span> → Interview → Offer → Hired
                                </small>
                            </div>
                            {/* RIGHT: ACTIONS */}
                            <div className="d-flex flex-wrap gap-2">
                                <ApplicantStatusButton
                                    className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                                    payload={{status: 'applied', applicantId: params.applicantId}}
                                    to={routes.hr.recruitment.applied(params.applicantId)}
                                >
                                    <FiArrowLeft />
                                    Move back to apply status
                                </ApplicantStatusButton>
                                <ApplicantStatusButton
                                    className="btn btn-success btn-sm d-flex align-items-center gap-1"
                                    payload={{status: 'interview', applicantId: params.applicantId}}
                                    to={routes.hr.recruitment.interview(params.applicantId)}
                                >
                                    Move to Interview
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
                                    <strong className="text-dark">{total}</strong> Candidates
                                </span>
                                <span>
                                    Avg Score: <strong className="text-dark">{avgScore ?? "—"}</strong>
                                </span>
                            </div>

                            {/* STATUS NOTE */}
                            <div className="text-muted small">
                                Initial evaluation and qualification stage
                            </div>
                        </div>
                    </div>
                    <Screening item={applicant} fullscreen />
                </>
            )}
        </div>
    )
}
