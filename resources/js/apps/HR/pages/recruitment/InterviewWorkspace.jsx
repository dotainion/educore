import { useEffect, useState } from "react";
import { Interview } from "../../components/recruitment/Interview"
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";
import { FiCalendar, FiPlay, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { ApplicantStatusButton } from "../../components/ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";
import { useSmartNavigate } from "../../../../global/hooks/useSmartNavigate";

export const InterviewWorkspace = () =>{
    const [interviewDate] = useState(null);
    const [interviewer] = useState('');
    const [applicant, setApplicant] = useState();
    const [startInterview, setStartInterview] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    const smartNavigate = useSmartNavigate();

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
                    <div>
                        <h5 className="mb-0 text-primary">Interview</h5>
                        <small className="text-muted">
                            Applied → Screening →{" "}
                            <span className="fw-bold text-primary">Interview</span> → Offer → Hired
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
                        {/* Schedule / reschedule */}
                        <button
                            onClick={()=>smartNavigate(routes.hr.createSchedule(params.applicantId))}
                            className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                        >
                            {interviewDate ? 'Reschedule' : 'Schedule'}
                            <FiCalendar />
                        </button>
                        {/* Move forward */}
                        <ApplicantStatusButton
                            className="btn btn-success btn-sm d-flex align-items-center gap-1"
                            payload={{status: 'offer', applicantId: params.applicantId}}
                            to={routes.hr.recruitment.offer(params.applicantId)}
                        >
                            Move to Offer
                            <FiArrowRight />
                        </ApplicantStatusButton>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                    {/* INFO */}
                    <div className="d-flex gap-3 text-muted small">
                        <span>
                            Interview Date:{' '}
                            <strong className="text-dark">
                                {interviewDate || "Not scheduled"}
                            </strong>
                        </span>
                        <span>
                            Interviewer:{' '}
                            <strong className="text-dark">
                                {interviewer || '-'}
                            </strong>
                        </span>
                    </div>
                    {/* STATUS NOTE */}
                    <div className="text-muted small">
                        Candidate is in active evaluation stage
                    </div>
                </div>
            </div>
            {startInterview ? (
                <Interview item={applicant} fullscreen />
            ):(
                <div className="d-flex justify-content-center">
                    <button
                        onClick={()=>setStartInterview(true)}
                        className="btn btn-success btn-lg d-flex align-items-center gap-1"
                    >
                        Start Interview
                        <FiPlay />
                    </button>
                </div>
            )}
        </div>
    )
}
