import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../../global/routes/Routes";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";

export const ApplicantRecruitmentCard = ({ applicant, active, onClick, index, children }) =>{
    const [recruitmentData, setRecruitmentData] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    useEffect(()=>{
        const data = {
            applicantId: applicant.id
        }

        const apiStage = {
            applied: api.applied,
            screening: api.screening,
            interview: api.interview,
            offer: api.offer,
            hired: api.hired,
            rejected: api.rejected,
        }

        if(!apiStage[applicant.attributes.status]) return;
        setLoading(true);

        apiStage[applicant.attributes.status].find(data).then((response)=>{
            setRecruitmentData(response.data[applicant.attributes.status]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [applicant]);

    return(
        <motion.div
            onClick={()=>onClick?.(applicant)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`card action border mb-2 p-3 ${active ? 'active' : ''} text-break ${
                applicant.attributes.status === 'rejected' ? 'border-danger' : ''
            } ${
                applicant.attributes.status === 'hired' ? 'border-success' : ''
            } ${
                applicant.attributes.shortlisted ? 'border-2 border-warning' : ''
            }`}
        >
            <div className="text-truncate mb-2">
                <div className="d-flex justify-content-between">
                    <div className="fw-semibold text-truncate">{applicant.attributes.fullName}</div>
                    {applicant.attributes.shortlisted && (
                        <div className="small">
                            <span className="small badge bg-primary">Shortlist</span>
                        </div>
                    )}
                </div>
                <div className="text-muted small text-truncate">{applicant.attributes.email}</div>
                <div className="text-muted small text-truncate">{applicant.attributes.contact}</div>
            </div>
            <div className="small text-muted">{applicant.attributes.position}</div>
            <div className="small text-muted text-truncate mb-3">
                <span className="small">{applicant.attributes.createdAt.split('T')[0]}</span>
            </div>
            <div className="text-muted" style={{fontSize: '11px'}}>Skills</div>
            <div className="d-flex flex-wrap gap-2 border-top pt-2 small">
                {applicant.attributes.skills.map((skill)=>(
                    <span className="badge bg-light text-dark" key={skill}>{skill}</span>
                ))}
            </div>
            <div className="position-relative mt-3">
                {loading ? <Spinner show absolute bg="white" /> : (
                    <div className="d-grid gap-2">
                        {recruitmentData ? (
                            <>
                                {applicant.attributes.status === 'hired' && (
                                    <button className="btn btn-sm btn-success px-3 w-100">
                                        Start Onboarding
                                    </button>
                                )}
                            </>
                        ):(
                            <>
                                {applicant.attributes.status === 'applied' ? (
                                    <button className="btn btn-sm btn-primary px-3 w-100">View</button>
                                ):(
                                    <button className="btn btn-sm btn-secondary px-3 w-100">Action Required</button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
