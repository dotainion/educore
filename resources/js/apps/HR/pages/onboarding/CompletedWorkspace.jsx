import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, User, Mail, Phone, Briefcase, ArrowRight } from "lucide-react";
import { Completed } from "../../components/onboarding/Completed";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";

export const CompletedWorkspace = () => {
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
                <Completed employee={employee} fullscreen />
            )}
        </div>
    );
};