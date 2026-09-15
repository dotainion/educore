import { useEffect, useState } from "react";
import { Hired } from "../../components/recruitment/Hired"
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";
import { FiCheckCircle, FiRotateCcw } from "react-icons/fi";
import { ReconsiderButton } from "../../components/recruitment/ReconsiderButton";

export const HiredWorkspace = () =>{
    const [hireDate] = useState('');
    const [position] = useState('');
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
            <div className="bg-white border-bottom p-3 mb-4">
                {/* TOP ROW */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    {/* LEFT: TITLE + PIPELINE */}
                    <div className="d-flex align-items-center gap-2">
                        <FiCheckCircle className="text-success" size={20} />
                        <div>
                            <h5 className="mb-0 text-success">Hired</h5>
                            <small className="text-muted">
                                Applied → Screening → Interview → Offer →{" "}
                                <span className="fw-bold text-success">Hired</span>
                            </small>
                        </div>
                    </div>
                    {/* RIGHT: CONTROL ACTIONS */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm">
                            Start Onboarding
                        </button>
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
                            Position: <strong className="text-dark">{position || "—"}</strong>
                        </span>
                        <span>
                            Hire Date: <strong className="text-dark">{hireDate || "—"}</strong>
                        </span>
                    </div>
                    {/* STATUS NOTE */}
                    <div className="text-muted small">
                        Final hiring decision completed (can be reopened if required)
                    </div>
                </div>
            </div>
            {loading ? <Spinner show absolute md /> : (
                <Hired item={applicant} fullscreen />
            )}
        </div>
    )
}
