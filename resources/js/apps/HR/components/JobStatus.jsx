import { useState } from "react";
import { Spinner } from "../../../global/components/Spinner"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { api } from "../../../global/services/Api";

export const JobStatus = ({ job }) =>{
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const clone = () =>{
        setLoading(true);
        const data = {
            ...job.attributes,
            status: 'open',
            featured: true,
            published: false,
            title: `${job.attributes.title} Copy`,
        }
        api.job.create(data).then((response)=>{
            console.log(routes.hr.editJob(response.data.job.id));
            navigate(routes.hr.editJob(response.data.job.id));
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }

    if(
        job.attributes.status !== 'close' &&
        !job.attributes.published &&
        !job.attributes.featured
    ) return null;
    return(
        <div className="d-flex flex-wrap justify-content-end gap-2 px-3">
            {job.attributes.status === 'close' && (
                <div className="d-flex justify-content-between gap-2 alert alert-warning py-1 small rounded-pill">
                    This job is close
                    <button onClick={clone} className="btn btn-sm btn-outline-primary rounded-pill py-0 position-relative d-flex gap-2">
                        Clone Job
                        <Spinner show={loading} sm absolute bg="white" />
                    </button>
                </div>
            )}
            {job.attributes.published && (
                <div className="alert alert-info py-1 small rounded-pill">
                    This job as been published
                </div>
            )}
            {job.attributes.featured && (
                <div className="alert alert-primary py-1 small rounded-pill fw-bold">
                    Featured Job
                </div>
            )}
        </div>
    )
}