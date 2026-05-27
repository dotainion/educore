import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaCamera,
    FaEnvelope,
    FaIdBadge,
    FaPhone,
    FaSave,
    FaUser,
    FaUsers,
    FaVenusMars,
    FaBriefcase,
    FaBuilding,
    FaCheckCircle,
} from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { GlobalApiInput } from "../../../../../global/widgets/GlobalApiInput";
import { useApi } from "../../../../../global/context/ApiProvider";
import { GlobalApiSelect } from "../../../../../global/widgets/GlobalApiSelect";
import { api } from "../../../../../global/services/Api";
import { useSearchCallback } from "../../../../../global/hooks/useSearchCallback";
import { Tags } from "../../../../../global/components/Tags";
import { Spinner } from "../../../../../global/components/Spinner";
import { PendingDisplay } from "../../../components/PendingDisplay";
import { Profile } from "../../../components/Profile";

export const EmployeeProfile = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();

    const [employee, setEmployee] = useState(null);

    const profileRef = useRef();

    useEffect(()=>{
        const unsubscribe = listener('NEXT', ({on, off}) =>{
            off();
            profileRef.current.save();
        });
        return () =>unsubscribe();
    }, [employee]);

    return (
        <Profile
            ref={profileRef}
            saving={setLoading}
            onSaved={(user)=>to.next(user.id, {replace: true})}
            onChange={setEmployee}
            renderLoading={(
                <PendingDisplay
                    message="Extracting applicant data"
                />
            )}
        />
    );
};