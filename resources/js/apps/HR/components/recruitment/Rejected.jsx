import React, { useEffect, useMemo, useRef, useState } from "react";
import { ApplicantDeleteButton } from "../ApplicantDeleteButton";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { api } from "../../../../global/services/Api";
import { useTimeoutEffect } from "../../../../global/hooks/useTimeoutEffect";

export const Rejected = ({ item, fullscreen, onUpdate, onRemove }) => {

    if (item.attributes.status !== 'rejected') {
        return null;
    }

    const [rejected, setRejected] = useState({
        rejectedId: null,
        // core reason classification (IMPORTANT FOR ATS REPORTING)
        reason: '',
        reasonCategory: 'not_selected',

        // structured rejection taxonomy (real ATS feature)
        skillsMismatch: false,
        experienceInsufficient: false,
        cultureFit: false,
        salaryMismatch: false,
        availabilityIssue: false,
        poorInterviewPerformance: false,
        failedAssessment: false,
        backgroundIssue: false,

        // human explanation
        note: '',
    });
    
    const changedRef = useRef(false);
    const hasHrDataRef = useRef(false);

    const update = (key, value) => {
        changedRef.current = true;
        setRejected((prev)=>({...prev, [key]: value}));
    };

    const selectedCount = useMemo(() => {
        const data = {
            skillsMismatch: rejected.skillsMismatch,
            experienceInsufficient: rejected.experienceInsufficient,
            cultureFit: rejected.cultureFit,
            salaryMismatch: rejected.salaryMismatch,
            availabilityIssue: rejected.availabilityIssue,
            poorInterviewPerformance: rejected.poorInterviewPerformance,
            failedAssessment: rejected.failedAssessment,
            backgroundIssue: rejected.backgroundIssue
        }
        return Object.values(data).filter(Boolean).length;
    }, [rejected]);
    
    useTimeoutEffect(()=>{
        if(!changedRef.current) return;
        
        const data = {
            ...rejected,
            applicantId: item.id
        };
        (data.screeningId
            ? api.rejected.update(data)
            : api.rejected.create(data)
        ).then((response)=>{
            setRejected((prev)=>({
                ...prev,
                rejectedId: response.data.rejected.id
            }));
        }).catch((error)=>{

        }).finally(()=>changedRef.current = false);
    }, [rejected]);
    
    useEffect(()=>{
        if(!item.id) return;
        api.rejected.find({applicantId: item.id}).then((response)=>{
            setRejected((prev)=>({
                ...response.data.rejected.attributes,
                rejectedId: response.data.rejected.id,
            }))
        }).catch((error)=>{

        });
    }, [item]);

    return (
        <>
            <div className="row m-0">
                <div className={`col-12 ${fullscreen ? 'col-md-8' : ''} m-auto`}>
                    <div className="mb-3">
                        <GlobalApiSelect
                            className="form-select form-select-sm"
                            name="reasonCategory"
                            label="Rejected reason"
                            value={rejected.reasonCategory}
                            onChange={(e)=>update('reasonCategory', e.target.value)}
                        >
                            <option value="not_selected">Not selected</option>
                            <option value="skills">Skills mismatch</option>
                            <option value="experience">Experience insufficient</option>
                            <option value="culture">Culture fit</option>
                            <option value="salary">Salary mismatch</option>
                            <option value="availability">Availability</option>
                            <option value="performance">Interview performance</option>
                            <option value="assessment">Failed assessment</option>
                            <option value="background">Background issue</option>
                        </GlobalApiSelect>
                    </div>

                    <ul className="list-group mb-3">
                        <li className="list-group-item fw-semibold">Detailed Reasons ({selectedCount})</li>
                        {[
                            ['skillsMismatch', 'Skills mismatch'],
                            ['experienceInsufficient', 'Insufficient experience'],
                            ['cultureFit', 'Poor culture fit'],
                            ['salaryMismatch', 'Salary expectations mismatch'],
                            ['availabilityIssue', 'Availability issue'],
                            ['poorInterviewPerformance', 'Interview performance'],
                            ['failedAssessment', 'Assessment failure'],
                            ['backgroundIssue', 'Background concern']
                        ].map(([key, label]) => (
                            <li key={key} className="list-group-item list-group-item-action pointer small p-0">
                                <GlobalApiCheckbox
                                    className="d-flex justify-content-between pointer px-3 py-2"
                                    content={label}
                                    name={key}
                                    checked={rejected[key]}
                                    onChange={(e) => update(key, e.target.checked)}
                                />
                            </li>
                        ))}
                    </ul>

                    {/* ================= NOTES ================= */}
                    <div className="mb-3">
                        <GlobalApiTextarea
                            className="form-control form-control-sm"
                            name="note"
                            label="Rejection note"
                            rows="3"
                            placeholder="Internal rejection note..."
                            value={rejected.note}
                            onChange={(e) => update('note', e.target.value)}
                        />
                    </div>
                    <div className="pt-3 mb-5">
                        <ApplicantDeleteButton
                            className="btn btn-sm btn-primary w-100"
                            applicantId={item.id}
                            onSuccess={onRemove}
                        >
                            Remove from pipeline →
                        </ApplicantDeleteButton>
                    </div>
                </div>
            </div>
        </>
    );
};