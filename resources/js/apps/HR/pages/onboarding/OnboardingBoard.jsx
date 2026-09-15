import React, { useEffect, useMemo, useState } from "react";
import { KanbanBoard } from "../../components/KanbanBoard";
import { motion } from "framer-motion";
import { api } from "../../../../global/services/Api";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";
import { KanbanOnboardingHeader } from "../../components/onboarding/KanbanOnboardingHeader";
import { useSearchCallback } from "../../../../global/hooks/useSearchCallback";
import { OnboardingEmployeeSidePannel } from "../../components/onboarding/OnboardingEmployeeSidePannel";
import { ApplicantOnboardingCard } from "../../components/onboarding/ApplicantOnboardingCard";
import { KanbanPipelineBoard } from "../../components/KanbanPipelineBoard";

export const OnboardingBoard = () =>{
    const schema = {
        activation: {
            name: 'Activation',
            items: [],
        },
        HRSetup: {
            name: 'HR Setup',
            items: [],
        },
        ITSetup: {
            name: 'IT Setup',
            items: [],
        },
        documents: {
            name: 'Documents',
            items: [],
        },
        training: {
            name: 'Training',
            items: [],
        },
        firstDay: {
            name: 'First Day',
            items: [],
        },
        completed: {
            name: 'Completed',
            items: [],
        },
    };

    const navigate = useNavigate();

    const statuses = [
        'activation',
        'HRSetup',
        'ITSetup',
        'documents',
        'training',
        'firstDay',
        'completed'
    ];

    return (
        <KanbanPipelineBoard
            schema={schema}
            statuses={statuses}
            pipeline="onboarding"
            renderHeader={(schema, search)=>(
                <KanbanOnboardingHeader
                    columns={schema}
                    onChange={search}
                />
            )}
            renderItem={(applicant, snapshot, colId, i) => (
                <ApplicantOnboardingCard
                    applicant={applicant}
                    index={i}
                    key={applicant.id}
                >
                    <div className="d-grid gap-2">
                        {applicant.attributes.status === 'hired' && (
                            <button
                                onClick={()=>navigate(routes.hr.onboarding.activate(applicant.id))}
                                className="btn btn-sm btn-success px-3 w-100 mt-3"
                            >Create Employee</button>
                        )}
                    </div>
                </ApplicantOnboardingCard >
            )}
            renderColumnHeader={(col) => (
                <div className="mb-2 small">
                    <h6 className="mb-0">{col.name}</h6>
                    <small className="text-muted">{col.items.length} candidates</small>
                </div>
            )}
            //onItemClick={(item, colId)=>console.log(item, colId)}
            renderSidePanel={(item, columnId, close, update, remove)=>(
                <OnboardingEmployeeSidePannel
                    item={item}
                    columnId={columnId}
                    close={close}
                    updateApplicant={update}
                />
            )}
        />
    );
}