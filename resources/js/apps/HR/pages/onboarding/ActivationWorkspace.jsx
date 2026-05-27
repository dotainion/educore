import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, AlertCircle, User, Briefcase, Mail, Phone, ArrowRight } from "lucide-react";
import { Activation } from "../../components/onboarding/Activation";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { useParams } from "react-router-dom";

export const ActivationWorkspace = () => {
    const [applicant, setApplicant] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(()=>{
        const payload = {
            applicantId: params.applicantId
        }
        Promise.allSettled([
            api.applicant.find(payload).then((response)=>{
                setApplicant(response.data.applicant);
            }).catch((error)=>{

            }),
            api.user.find(payload).then((response)=>{
                setEmployee(response.data.user);
            }).catch((error)=>{

            })
        ]).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container position-relative vh-100">
            {loading ? <Spinner show absolute md bg="white" /> : (
                <Activation
                    applicant={applicant}
                    employee={employee}
                    fullscreen
                />
            )}
        </div>
    );
};
