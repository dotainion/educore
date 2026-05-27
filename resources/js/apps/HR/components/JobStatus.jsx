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
            published: false
        }
        api.job.create(data).then((response)=>{
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
        <div className="p-3 pb-0">
            {job.attributes.status === 'close' && (
                <div className="d-flex justify-content-between alert alert-warning py-2 small mb-2">
                    This job is close
                    <span onClick={clone} className="link-primary pointer position-relative">
                        Clone Job
                        <Spinner show={loading} sm absolute bg="white" />
                    </span>
                </div>
            )}
            {job.attributes.published && (
                <div className="alert alert-info py-2 small mb-2">
                    This job as been published
                </div>
            )}
            {job.attributes.featured && (
                <div className="alert alert-primary py-2 small mb-2 fw-bold">
                    Featured Job
                </div>
            )}
        </div>
    )
}