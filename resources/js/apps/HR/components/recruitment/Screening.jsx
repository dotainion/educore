import React, { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../../../global/services/Api";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiRange } from "../../../../global/widgets/GlobalApiRange";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { useScreen } from "../../../../global/components/MobileTransformable";
import { useTimeoutEffect } from "../../../../global/hooks/useTimeoutEffect";

export const Screening = ({ item, fullscreen, onUpdate }) => {

    if (item.attributes.status !== 'screening') {
        return null;
    }

    const [isMobile, setIsMobile] = useState(false);
    const [screening, setScreening] = useState({
        screeningId: null,
        // core checks
        skillsMatch: false,
        experienceMatch: false,
        cvQuality: false,
        salaryFit: false,
        availabilityFit: false,
        locationFit: false,

        // evaluation scoring
        technicalScore: 0,
        communicationScore: 0,
        experienceScore: 0,
        cultureFitScore: 0,

        // qualitative
        note: '',
        redFlags: '',
        strengths: '',

        // decision
        recommendation: 'pending',

        // meta
        sourceVerified: false,
        backgroundCheckNeeded: false
    });

    const changedRef = useRef(false);

    const update = (key, value) => {
        changedRef.current = true;
        setScreening(prev=>({...prev, [key]: value}));
    };

    // AUTO SCORE CALCULATION
    const totalScore = useMemo(() => {
        const vals = [
            screening.technicalScore,
            screening.communicationScore,
            screening.experienceScore,
            screening.cultureFitScore
        ];

        const sum = vals.reduce((a, b) => a + Number(b || 0), 0);
        return Math.round(sum / vals.length);
    }, [screening]);
    
    useScreen((SIZE)=>{
        setIsMobile(SIZE === 'SM' || SIZE === 'MD');
    }, []);

    useTimeoutEffect(()=>{
        if(!changedRef.current) return;
        
        const data = {
            ...screening,
            applicantId: item.id
        };
        (data.screeningId
            ? api.screening.update(data)
            : api.screening.create(data)
        ).then((response)=>{
            setScreening((prev)=>({
                ...prev,
                screeningId: response.data.screening.id
            }));
        }).catch((error)=>{

        }).finally(()=>changedRef.current = false);
    }, [screening]);

    useEffect(()=>{
        if(!item.id) return;
        api.screening.find({applicantId: item.id}).then((response)=>{
            setScreening((prev)=>({
                ...response.data.screening.attributes,
                screeningId: response.data.screening.id,
            }));
        }).catch((error)=>{

        });
    }, [item]);

    return (
        <>
            <div className="fw-semibold">Screening Workspace</div>
            <div className="text-muted small mb-2">
                {item.attributes.fullName} • {item.attributes.position}
            </div>

            <div className={`d-block ${fullscreen ? 'd-md-flex' : 'd-flex flex-column'} gap-3 mb-4`}>
                <div className={`${isMobile ? '' : 'border rounded-3'} w-100 p-0 overflow-hidden`}>
                    {/* ================= CHECKLIST ================= */}
                    <ul className={`list-group ${isMobile ? '' : 'rounded-0'} mb-3`}>
                        <li className={`list-group-item fw-semibold ${isMobile ? '' : 'border-top-0 border-start-0 border-end-0'}`}>Eligibility Checks</li>
                        {[
                            ['skillsMatch', 'Skills match role'],
                            ['experienceMatch', 'Experience relevance'],
                            ['cvQuality', 'CV quality'],
                            ['salaryFit', 'Salary expectation fit'],
                            ['availabilityFit', 'Availability match'],
                            ['locationFit', 'Location fit']
                        ].map(([key, label]) => (
                            <li className={`list-group-item list-group-item-action pointer small ${isMobile ? '' : 'border-start-0 border-end-0'} p-0`} key={key}>
                                <GlobalApiCheckbox
                                    className="w-100 d-flex justify-content-between pointer px-3 py-2"
                                    name={key}
                                    content={label}
                                    checked={screening[key]}
                                    onChange={(e)=>update(key, e.target.checked)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${isMobile ? '' : 'border rounded-3 p-3'} w-100 h-100`}>
                    {/* ================= SCORING ================= */}
                    <div className="mb-3">
                        <div className="fw-semibold mb-2">Scoring Breakdown</div>
                        {[
                            ['technicalScore', 'Technical'],
                            ['communicationScore', 'Communication'],
                            ['experienceScore', 'Experience'],
                            ['cultureFitScore', 'Culture Fit']
                        ].map(([key, label]) => (
                            <div className="mb-2" key={key}>
                                <GlobalApiRange
                                    name={key}
                                    label={label}
                                    value={screening[key]}
                                    onChange={(e)=>update(key, parseInt(e.target.value))}
                                />
                            </div>
                        ))}
                        <div className="mt-2 small text-muted">
                            Total Score: {totalScore}/100
                        </div>
                    </div>
                </div>
            </div>
            {/* ================= QUALITATIVE ================= */}
            <div className="mb-3">
                <div className="fw-semibold mb-2">Notes</div>
                <div className="mb-3">
                    <GlobalApiTextarea
                        className="form-control form-control-sm"
                        label="Strengths"
                        name="strengths"
                        rows="2"
                        placeholder="Key strengths..."
                        value={screening.strengths}
                        onChange={(e)=>update('strengths', e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <GlobalApiTextarea
                        className="form-control form-control-sm"
                        label="Red flags / Concerns"
                        name="redFlags"
                        rows="2"
                        placeholder="Red flags / concerns..."
                        value={screening.redFlags}
                        onChange={(e)=>update('redFlags', e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <GlobalApiTextarea
                        className="form-control form-control-sm"
                        label="General notes"
                        name="note"
                        rows="3"
                        placeholder="General screening notes..."
                        value={screening.note}
                        onChange={(e)=>update('note', e.target.value)}
                    />
                </div>
            </div>
            <div className={`d-block ${fullscreen ? 'd-md-flex' : 'd-flex flex-column'} gap-3 mt-md-5`}>
                {/* ================= COMPLIANCE FLAGS ================= */}
                <ul className="list-group mb-3 w-100">
                    <li className="list-group-item fw-semibold">Compliance</li>
                    <li className="list-group-item list-group-item-action pointer small p-0">
                        <GlobalApiCheckbox
                            className="d-flex justify-content-between pointer px-3 py-2"
                            name="sourceVerified"
                            content="Source verified"
                            checked={screening.sourceVerified}
                            onChange={(e)=>update("sourceVerified", e.target.checked)}
                        />
                    </li>
                    <li className="list-group-item list-group-item-action pointer small p-0">
                        <GlobalApiCheckbox
                            className="d-flex justify-content-between pointer px-3 py-2"
                            name="backgroundCheckNeeded"
                            content="Background check required"
                            checked={screening.backgroundCheckNeeded}
                            onChange={(e)=>update('backgroundCheckNeeded', e.target.checked)}
                        />
                    </li>
                </ul>
                {/* ================= DECISION ================= */}
                <div className="mb-5 w-100">
                    <GlobalApiSelect
                        className="form-select form-select-sm"
                        label="Recommendation"
                        name="recommendation"
                        value={screening.recommendation}
                        onChange={(e)=>update('recommendation', e.target.value)}
                    >
                        <option value="" hidden>Choose a recommendation</option>
                        <option value="strong">Strong Candidate</option>
                        <option value="maybe">Maybe</option>
                        <option value="reject">Reject</option>
                    </GlobalApiSelect>
                </div>
            </div>
        </>
    );
};