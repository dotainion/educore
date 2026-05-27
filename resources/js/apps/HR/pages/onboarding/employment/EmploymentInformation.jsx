import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUserTie, FaFileSignature, FaIdCard, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { PendingDisplay } from "../../../components/PendingDisplay";
import { Employment } from "../../../components/Employment";

export const EmploymentInformation = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();

    const [employment, setEmployment] = useState(null);

    const params = useParams();
    
    useEffect(()=>{
        const unsubscribe = listener('NEXT', ({on, off}) =>{
            off();
            save();
        });
        return () =>unsubscribe();
    }, [employment]);

    //<div className="col-12 col-xl-8---"></div>
    return (
        <Employment
            onChange={setEmployment}
            onSaved={()=>to.next(params.userId)}
            saving={setLoading}
            renderLoading={(
                <PendingDisplay
                    message="Loading employment information"
                />
            )}
        />
    );
};