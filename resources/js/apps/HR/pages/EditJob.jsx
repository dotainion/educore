import { useNavigate, useParams } from "react-router-dom";
import { Job } from "../components/Job"
import { api } from "../../../global/services/Api";
import { useEffect, useState } from "react";
import { Spinner } from "../../../global/components/Spinner";
import { routes } from "../../../global/routes/Routes";
import { CloseJobButton } from "../components/CloseJobButton";
import { JobStatus } from "../components/JobStatus";

export const EditJob = () =>{
    const [job, setJob] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const submit = (data) => {
        api.job.update({...data, jobId: params.jobId}).then((response)=>{
            console.log('success...');
        }).catch((error)=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        api.job.find({jobId: params.jobId}).then((response)=>{
            setJob(response.data.job);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="bg-white min-vh-100 pb-4">
            <div className="d-flex flex-wrap justify-content-between border-bottom gap-2 px-3 py-3">
                <div>
                    <div className="fw-semibold">Update Job</div>
                    <div className="text-muted small">Fully structured job editor</div>
                </div>
                <div>
                    <div className="btn-group">
                        <button
                            onClick={()=>navigate(routes.hr.jobs)}
                            className="btn btn-sm btn-light border px-3"
                        >List</button>
                        <CloseJobButton
                            className="btn btn-sm btn-light border px-3"
                            job={job}
                            jobId={params.jobId}
                            onSuccess={setJob}
                        >
                            Close
                        </CloseJobButton>
                        <button
                            onClick={()=>navigate(routes.hr.publishJob(params.jobId))}
                            className="btn btn-sm btn-light border text-primary px-3"
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
                                <Job onSubmit={submit} job={{...job.attributes}} autoSubmit />
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