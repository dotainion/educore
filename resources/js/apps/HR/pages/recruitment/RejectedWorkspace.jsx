import { useEffect, useState } from "react";
import { Rejected } from "../../components/recruitment/Rejected"
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { FiRotateCcw, FiInfo } from "react-icons/fi";
import { ApplicantStatusButton } from "../../components/ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";
import { ReconsiderButton } from "../../components/recruitment/ReconsiderButton";

export const RejectedWorkspace = () =>{
    const [rejectedAt] = useState('');
    const [reason] = useState('');
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
                    {/* LEFT: TITLE + PIPELINE */}
                    <div className="d-flex align-items-center gap-2">
                        <FiInfo className="text-danger" size={18} />
                        <div>
                            <h5 className="mb-0 text-danger">Rejected</h5>
                            <small className="text-muted">
                                Applied → Screening → Interview → Offer →{" "}
                                <span className="fw-bold text-danger">Rejected</span>
                            </small>
                        </div>
                    </div>
                    {/* RIGHT: CONTROL ACTION */}
                    <div className="d-flex gap-2">
                        {/* Reconsider / Reopen */}
                        <ReconsiderButton
                            className="btn btn-warning btn-sm"
                        />
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                    {/* INFO */}
                    <div className="d-flex gap-3 text-muted small">
                        <span>
                            Rejected At:{' '}
                            <strong className="text-dark">
                                {rejectedAt || '-'}
                            </strong>
                        </span>
                        <span>
                            Reason:{' '}
                            <strong className="text-dark">
                                {reason || 'Not specified'}
                            </strong>
                        </span>
                    </div>
                    {/* STATUS NOTE */}
                    <div className="text-muted small">
                        Candidate removed from active pipeline
                    </div>
                </div>
            </div>
            {loading ? <Spinner show absolute md /> : (
                <Rejected item={applicant} fullscreen />
            )}
        </div>
    )
}
