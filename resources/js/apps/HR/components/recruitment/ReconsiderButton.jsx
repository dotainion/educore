import { FiRotateCcw } from "react-icons/fi";
import { Spinner } from "../../../../global/components/Spinner";
import { api } from "../../../../global/services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


export const ReconsiderButton = ({ className }) =>{
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const lastStatus = (logs) =>{
        if(!logs.length) return 'applied';
        return logs[0].attributes.stageFrom;
    }

    const submit = () =>{
        setLoading(true);
        let data = { applicantId: params.applicantId };
        api.activityLog.list(data).then((response)=>{
            data['status'] = lastStatus(response.data.activityLogs);
            api.applicant.update(data).then((response)=>{
                //todo: if its in kanban then its find but if not then need to navigate differently..
                navigate(routes.hr.recruitment[data.status](params.applicantId));
            }).catch((error)=>{
                console.log(error);
            }).finally(()=>setLoading(false));
        }).catch((error)=>{
            console.log(error);
            setLoading(false);
        });
    }

    return(
        <button onClick={submit} className={`${className || ''} d-flex align-items-center gap-1 position-relative`}>
            Reconsider
            <FiRotateCcw />
            <Spinner show={loading} absolute />
        </button>
    )
}