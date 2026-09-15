import { useState } from "react";
import { Spinner } from "../../../global/components/Spinner";
import { api } from "../../../global/services/Api";

export const CloseJobButton = ({className, job, jobId, onSuccess, children}) =>{
    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);
        api.job.update({jobId, status: 'close'}).then((response)=>{
            onSuccess?.(response.data.job);
            navigate(routes.hr.vewJob(response.data.job.id));
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    };

    if(!jobId || job && job.attributes.status === 'close') return null;

    return(
        <button onClick={submit} className={`position-relative ${className || ''}`}>
            {children}
            <Spinner show={loading} absolute />
        </button>
    )
}