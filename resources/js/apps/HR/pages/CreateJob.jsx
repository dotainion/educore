import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlobalApiToggle } from "../../../global/widgets/GlobalApiToggle";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { GlobalApiTextarea } from "../../../global/widgets/GlobalApiTextarea";
import { useApi } from "../../../global/context/ApiProvider";
import { DepartmentSelect } from "../components/DepartmentSelect";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { api } from "../../../global/services/Api";
import { routes } from "../../../global/routes/Routes";
import { useNavigate } from "react-router-dom";
import { Job } from "../components/Job";

export const CreateJob = () => {
    const navigate = useNavigate();

    const submit = (job) => {
        api.job.create(job).then((response)=>{
            navigate(routes.hr.vewJob(response.data.job.id));
        }).catch((error)=>{
            console.log(error);
        });
    };

    return (
        <div className="bg-white min-vh-100 pb-4">
            <div className="border-bottom px-3 py-3">
                <div className="fw-semibold">Create Job</div>
                <div className="text-muted small">Fully structured job editor</div>
            </div>

            <Job onSubmit={submit} />
        </div>
    );
};

