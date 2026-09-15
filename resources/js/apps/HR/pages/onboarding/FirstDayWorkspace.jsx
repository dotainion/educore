import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { FirstDay } from "../../components/onboarding/FirstDay";
import { Spinner } from "../../../../global/components/Spinner";
import { api } from "../../../../global/services/Api";
import { useParams } from "react-router-dom";

export const FirstDayWorkspace = () => {
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
                <FirstDay employee={employee} fullscreen />
            )}
        </div>
    );
};
