import { useNavigate, useParams } from "react-router-dom";
import { Job } from "../components/Job"
import { api } from "../../../global/services/Api";
import { useEffect, useState } from "react";
import { GlobalFormInputHandlerProvider, GlobalFormInputManualHandler } from "../../../global/components/GlobalFormInputHandler";
import { Spinner } from "../../../global/components/Spinner";
import { routes } from "../../../global/routes/Routes";
import { CloseJobButton } from "../components/CloseJobButton";
import { JobStatus } from "../components/JobStatus";

export const ViewJob = () =>{
    const [job, setJob] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        api.job.find({jobId: params.jobId}).then((response)=>{
            setJob(response.data.job);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="bg-white min-vh-100 pb-4 m-auto" style={{ maxWidth: 820 }}>
            <div className="d-flex flex-wrap justify-content-between gap-3 px-3 py-3">
                <div>
                    <h4>View Job</h4>
                    <div className="text-muted small">Fully structured job editor</div>
                </div>
                <div>
                    <div className="btn-group rounded-pill border overflow-hidden">
                        <button
                            onClick={()=>navigate(routes.hr.jobs)}
                            className="btn btn-sm btn-light px-3"
                        >List</button>
                        <button
                            onClick={()=>navigate(routes.hr.editJob(params.jobId))}
                            className="btn btn-sm btn-light px-3"
                        >Edit</button>
                        <CloseJobButton
                            className="btn btn-sm btn-light px-3 text-danger"
                            job={job}
                            jobId={params.jobId}
                            onSuccess={setJob}
                        >
                            Close
                        </CloseJobButton>
                        <button
                            onClick={()=>navigate(routes.hr.publishJob(params.jobId))}
                            className="btn btn-sm btn-light text-primary px-3"
                        >Publish</button>
                    </div>
                </div>
            </div>

            <div className="position-relative">
                {loading ? (
                    <div className="py-5">
                        <Spinner show absolute md bg="white" />
                    </div>
                ):(
                    <>
                        {job ? (
                            <>
                                <JobStatus job={job} />
                                <Job
                                    readOnly
                                    job={{...job.attributes}}
                                />
                            </>
                        ) : (
                            <div className="alert alert-danger">
                                Job not found
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}