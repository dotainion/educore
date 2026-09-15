import { useEffect, useState } from "react";
import { Offer } from "../../components/recruitment/Offer"
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { FiSend, FiCheck, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { ApplicantStatusButton } from "../../components/ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";

export const OfferWorkspace = () =>{
    const [offerStatus] = useState('pending'); // pending | sent | accepted | rejected
    const [salary] = useState('');
    const [offerDate] = useState(null);
    const [applicant, setApplicant] = useState();
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    const navigate = useNavigate();

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
                    <div>
                        <h5 className="mb-0 text-warning">Offer</h5>
                        <small className="text-muted">
                            Applied → Screening → Interview →{' '}
                            <span className="fw-bold text-warning">Offer</span> → Hired
                        </small>
                    </div>
                    {/* RIGHT: ACTIONS */}
                    <div className="d-flex flex-wrap gap-2">
                        <ApplicantStatusButton
                            className="btn btn-secondary btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'interview', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.interview(params.applicantId)}
                        >
                            <FiArrowLeft />
                            Move back to Interview
                        </ApplicantStatusButton>
                        {/* Send / Resend Offer */}
                        <button
                            onClick={()=>navigate(routes.hr.createOffer(params.applicantId))}
                            className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                        >
                            {offerStatus === 'sent' ? 'Resend Offer' : 'Send Offer'}
                            <FiSend />
                        </button>
                        {/* Accept manually (admin override / internal update) */}
                        <button
                            className="btn btn-success btn-sm d-flex align-items-center gap-1"
                        >
                            Mark Accepted
                            <FiCheck />
                        </button>
                        {/* Reject offer */}
                        <ApplicantStatusButton
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'rejected', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.rejected(params.applicantId)}
                        >
                            Reject
                            <FiX />
                        </ApplicantStatusButton>
                        {/* Move forward */}
                        <ApplicantStatusButton
                            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'hired', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.hired(params.applicantId)}
                        >
                            Move to Hired
                            <FiArrowRight />
                        </ApplicantStatusButton>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                    {/* INFO */}
                    <div className="d-flex gap-3 text-muted small">
                        <span>
                            Offer Status:{' '}
                            <strong className="text-dark">{offerStatus}</strong>
                        </span>
                        <span>
                            Salary: <strong className="text-dark">{salary || '-'}</strong>
                        </span>
                        <span>
                            Offer Date:{' '}
                            <strong className="text-dark">
                                {offerDate || 'Not sent'}
                            </strong>
                        </span>
                    </div>
                    {/* STATUS NOTE */}
                    <div className="text-muted small">
                        Final compensation decision stage
                    </div>
                </div>
            </div>
            {loading ? <Spinner show absolute md /> : (
                <Offer item={applicant} />
            )}
        </div>
    )
}
