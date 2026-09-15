import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ApplicantRecruitmentCard } from "../../components/recruitment/ApplicantRecruitmentCard";
import { api } from "../../../../global/services/Api";
import { routes } from "../../../../global/routes/Routes";
import { BiCollapse, BiGrid } from "react-icons/bi";
import { KanbanRecruitmentBoardHeader } from "../../components/recruitment/KanbanRecruitmentHeader";
import { useSearchCallback } from "../../../../global/hooks/useSearchCallback";
import { RecruitmentApplicantSidePannel } from "../../components/recruitment/RecruitmentApplicantSidePannel";
import { KanbanPipelineBoard } from "../../components/KanbanPipelineBoard";

export const RecruitmentBoard = () =>{
    const schema = {
        applied: {
            name: 'Applied',
            items: [],
        },
        screening: {
            name: 'Screening',
            items: [],
        },
        interview: {
            name: 'Interview',
            items: [],
        },
        offer: {
            name: 'Offer',
            items: [],
        },
        hired: {
            name: 'Hired',
            items: [],
        },
        rejected: {
            name: 'Rejected',
            items: [],
        },
    };

    const statuses = [
        'applied',
        'screening',
        'interview',
        'offer',
        'hired',
        'rejected'
    ];

    return (
        <KanbanPipelineBoard
            schema={schema}
            statuses={statuses}
            pipeline="recruitment"
            renderHeader={(schema, search)=>(
                <KanbanRecruitmentBoardHeader
                    columns={schema}
                    onChange={search}
                />
            )}
            renderItem={(applicant, snapshot, colId, i)=>(
                <ApplicantRecruitmentCard
                    applicant={applicant}
                    index={i}
                    key={applicant.id}
                />
            )}
            renderColumnHeader={(col)=>(
                <div className="d-flex justify-content-between gap-2 mb-2 small">
                    <div>
                        <h6 className="mb-0">{col.name}</h6>
                        <small className="text-muted">{col.items.length} candidates</small>
                    </div>
                    <div className="small">

                    </div>
                </div>
            )}
            //onItemClick={(item, colId)=>console.log(item, colId)}
            renderSidePanel={(item, columnId, close, update, remove)=>(
                <RecruitmentApplicantSidePannel
                    item={item}
                    columnId={columnId}
                    close={close}
                    updateApplicant={(updated)=>update(updated, item)}
                    removeApplicant={(deleted)=>remove(deleted)}
                />
            )}
        />
    );
}
