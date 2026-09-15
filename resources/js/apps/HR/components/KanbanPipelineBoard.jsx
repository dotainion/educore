import React, { useEffect, useMemo, useState } from "react";
import { KanbanBoard } from "./KanbanBoard";
import { motion } from "framer-motion";
import { routes } from "../../../global/routes/Routes";
import { useNavigate } from "react-router-dom";
import { BiCollapse, BiGrid } from "react-icons/bi";
import { useSearchCallback } from "../../../global/hooks/useSearchCallback";
import { api } from "../../../global/services/Api";

export const KanbanPipelineBoard = ({
    schema: schemaDefault,
    statuses: statusesDefault,
    pipeline,
    renderHeader,
    renderItem,
    renderColumnHeader,
    onItemClick,
    renderSidePanel
}) =>{
    const [loading, setLoading] = useState(true);
    const [schema, setSchema] = useState(schemaDefault);

    const navigate = useNavigate();

    const statuses = useMemo(()=>statusesDefault, []);

    const resetSchema = () =>{
        setSchema((prev)=>{
            let copy = JSON.parse(JSON.stringify(prev));
            Object.keys(prev).forEach((key)=>{
                copy[key].items = [];
            });
            return copy;
        });
    }

    const onKanbanChange = (kanban) =>{
        if(kanban.source === kanban.destination){
            return;
        }

        const data = {
            applicantId: kanban.item.id,
            status: kanban.destination,
            pipeline: pipeline//use for updating activity
        }

        api.applicant.update(data).then((response)=>{

        }).catch((error)=>{

        });

        kanban.updatedItems[kanban.destination].items = 
        kanban.updatedItems[kanban.destination].items.map((applicant)=>{
            if(applicant.id === kanban.item.id){
                return ({
                    ...applicant,
                    attributes: {
                        ...applicant.attributes,
                        status: kanban.destination
                    }
                });
            }
            return applicant;
        });
        setSchema(kanban.updatedItems);
    }

    const update = (updated, current) =>{
        if(schema[updated.attributes.status].items.find((a)=>a.id === updated.id)) return;

        let schemaCopy = JSON.parse(JSON.stringify(schema));
        schemaCopy[current.attributes.status].items =
        schemaCopy[current.attributes.status].items.filter((a)=>a.id !== current.id);

        schemaCopy[updated.attributes.status].items =
        [...schemaCopy[updated.attributes.status].items, updated];
        setSchema(schemaCopy);
    }

    const remove = (item) =>{
        let schemaCopy = JSON.parse(JSON.stringify(schema));
        schemaCopy[item.attributes.status].items =
        schemaCopy[item.attributes.status].items.filter((a)=>a.id !== item.id);
        setSchema(schemaCopy);
    }

    const assignFromApplicants = (applicants) =>{
        let schemaCopy = JSON.parse(JSON.stringify(schema));
        statuses.forEach((stage)=>{
            schemaCopy[stage].items = applicants.filter((a)=>{
                return a.attributes.status === stage;
            });
        });
        setSchema(schemaCopy);
    }

    const search = useSearchCallback((filter)=>{
        resetSchema();
        setLoading(true);
        api.applicant.list(filter).then((response)=>{
            assignFromApplicants(response.data.applicants);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    });

    useEffect(()=>{
        api.applicant.list({status: statuses}).then((response)=>{
            assignFromApplicants(response.data.applicants);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <KanbanBoard
            loading={loading}
            columns={schema}
            onChange={onKanbanChange}
            renderHeader={()=>renderHeader(schema, search)}
            renderItem={renderItem}
            renderColumnHeader={renderColumnHeader}
            onItemClick={onItemClick}
            renderSidePanel={(item, columnId, close)=>
                renderSidePanel(item, columnId, close, update, remove)
            }
        />
    );
}
