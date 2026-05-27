import { useState } from "react";
import { Spinner } from "../../../global/components/Spinner"
import { useNavigate } from "react-router-dom";
import { api } from "../../../global/services/Api";

export const ApplicantDeleteButton = ({ className, applicantId, to, onSuccess, children }) =>{
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const update = () =>{
        setLoading(true);
        api.applicant.delete({params: {applicantId}}).then((response)=>{
            to && navigate(to);
            onSuccess?.(response.data.applicant);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }

    return(
        <button onClick={update} className={`position-relative ${className || ''}`}>
            {children}
            <Spinner show={loading} absolute />
        </button>
    )
}