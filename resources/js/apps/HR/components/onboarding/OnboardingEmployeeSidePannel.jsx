import React, { useState, useMemo } from "react";
import { KanbanSidePannel } from "../KanbanSidePannel";
import { Activation } from "./Activation";
import { HRSetup } from "./HRSetup";
import { ITSetup } from "./ITSetup";
import { Training } from "./Training";
import { FirstDay } from "./FirstDay";
import { Documents } from "./Documents";
import { Completed } from "./Completed";

export const OnboardingEmployeeSidePannel = ({ item, columnId, close }) => {
    const [fullscreen, setFullscreen] = useState(false);

    const statusEqualTo = useMemo(()=>({
        activation: item.attributes.status === 'activation',
        HRSetup: item.attributes.status === 'HRSetup',
        ITSetup: item.attributes.status === 'ITSetup',
        documents: item.attributes.status === 'documents',
        training: item.attributes.status === 'training',
        firstDay: item.attributes.status === 'firstDay',
        completed: item.attributes.status === 'completed',
    }), [item]);

    return (
        <KanbanSidePannel status={item.attributes.status} close={close} captureScreen={setFullscreen}>
            {statusEqualTo.activation && (<Activation applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.HRSetup && (<HRSetup applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.ITSetup && (<ITSetup applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.documents && (<Documents applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.training && (<Training applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.firstDay && (<FirstDay applicant={item} fullscreen={fullscreen} />)}
            {statusEqualTo.completed && (<Completed applicant={item} fullscreen={fullscreen} />)}
        </KanbanSidePannel>
    );
};