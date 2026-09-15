import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Training } from "../../components/onboarding/Training";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";

export const TrainingWorkspace = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(()=>{
        const payload = {
            applicantId: params.applicantId
        }
        api.user.find(payload).then((response)=>{
            setEmployee(response.data.user);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container position-relative vh-100">
            {loading ? <Spinner show absolute md bg="white" /> : (
                <Training employee={employee} fullscreen />
            )}
        </div>
    );
};
