import React, { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../../../global/services/Api";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiRange } from "../../../../global/widgets/GlobalApiRange";
import { useScreen } from "../../../../global/components/MobileTransformable";
import { useTimeoutEffect } from "../../../../global/hooks/useTimeoutEffect";
import { FiPlay } from "react-icons/fi";

export const Interview = ({ item, fullscreen, onUpdate }) => {

    if (item.attributes.status !== 'interview') {
        return null;
    }

    const [startInterview, setStartInterview] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [interview, setInterview] = useState({
        interviewId: null,

        // scheduling
        interviewType: 'Onsite',

        // structured scoring
        communication: 0,
        technical: 0,
        problemSolving: 0,
        cultureFit: 0,
        confidence: 0,

        // qualitative feedback
        feedback: '',
        strengths: '',
        concerns: '',

        // decision
        recommendation: 'pending',

        // checklist
        preparationGood: false,
        answeredClearly: false,
        technicalDepth: false,
        culturalAlignment: false,
        roleUnderstanding: false
    });
    
    const changedRef = useRef(false);

    const update = (key, value) => {
        changedRef.current = true;
        setInterview(prev => ({...prev, [key]: value}));
    };

    const totalScore = useMemo(() => {
        const vals = [
            interview.communication,
            interview.technical,
            interview.problemSolving,
            interview.cultureFit,
            interview.confidence
        ];

        const sum = vals.reduce((a, b) => a + Number(b || 0), 0);
        return Math.round(sum / vals.length);
    }, [interview]);

    useScreen((SIZE)=>{
        setIsMobile(SIZE === 'SM' || SIZE === 'MD');
    }, []);
    
    useTimeoutEffect(()=>{
        if(!changedRef.current) return;
        
        const data = {
            ...interview,
            applicantId: item.id
        };
        (data.interviewId
            ? api.interview.update(data)
            : api.interview.create(data)
        ).then((response)=>{
            setInterview((prev)=>({
                ...prev,
                interviewId: response.data.interview.id
            }));
        }).catch((error)=>{

        }).finally(()=>changedRef.current = false);
    }, [interview]);

    useEffect(()=>{
        if(!item.id) return;
        api.interview.find({applicantId: item.id}).then((response)=>{
            setInterview((prev)=>({
                ...response.data.interview.attributes,
                interviewId: response.data.interview.id,
            }))
        }).catch((error)=>{

        });
    }, [item]);

    return (
        <>
            {startInterview ? (
                <>
                    <div className="fw-semibold">Interview Workspace</div>
                    <div className="text-muted small mb-2 mb-sm-4">
                        {item.attributes.fullName} • {item.attributes.position}
                    </div>

                    {/* ================= SCHEDULING ================= */}
                    <div className={`d-block ${fullscreen ? 'd-sm-flex' : ''} gap-3 mb-3`}>
                        <div className="mb-2">
                            <GlobalApiSelect
                                className="form-select form-select-sm"
                                label="Interview"
                                name="interviewType"
                                value={interview.interviewType}
                                onChange={(e) => update('interviewType', e.target.value)}
                            >
                                <option value="phone">Phone</option>
                                <option value="video">Video</option>
                                <option value="onsite">Onsite</option>
                            </GlobalApiSelect>
                        </div>
                    </div>

                    <div className="mb-4 border-bottom d-sm-block d-none"></div>

                    <div className={`d-block ${fullscreen ? 'd-md-flex' : 'd-flex flex-column'} gap-3 mb-0 mb-md-4`}>
                        <div className={`${isMobile ? '' : 'border rounded-3'} w-100 p-0 overflow-hidden`}>
                            {/* ================= CHECKLIST ================= */}
                            <ul className={`list-group ${isMobile ? '' : 'rounded-0'} mb-3`}>
                                <li className={`list-group-item fw-semibold ${isMobile ? '' : 'border-top-0 border-start-0 border-end-0'}`}>Interview Checklist</li>
                                {[
                                    ['preparationGood', 'Candidate prepared'],
                                    ['answeredClearly', 'Clear communication'],
                                    ['technicalDepth', 'Technical depth'],
                                    ['culturalAlignment', 'Culture fit'],
                                    ['roleUnderstanding', 'Understands role']
                                ].map(([key, label]) => (
                                    <li key={key} className={`list-group-item list-group-item-action pointer small ${isMobile ? '' : 'border-start-0 border-end-0'} p-0`}>
                                        <GlobalApiCheckbox
                                            className="d-flex justify-content-between pointer px-3 py-2"
                                            name={key}
                                            content={label}
                                            checked={interview[key]}
                                            onChange={(e)=>update(key, e.target.checked)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${isMobile ? '' : 'border rounded-3'} w-100 p-md-3`}>
                            {/* ================= SCORING ================= */}
                            <div className="mb-3">
                                <div className="fw-semibold mb-2">Scoring</div>
                                {[
                                    ['communication', 'Communication'],
                                    ['technical', 'Technical'],
                                    ['problemSolving', 'Problem Solving'],
                                    ['cultureFit', 'Culture Fit'],
                                    ['confidence', 'Confidence']
                                ].map(([key, label]) => (
                                    <div key={key} className="mb-2">
                                        <GlobalApiRange
                                            label={label}
                                            name={key}
                                            value={interview[key]}
                                            onChange={(e) => update(key, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}

                                <div className="fw-semibold mt-2">
                                    Total Score: {totalScore}/100
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= FEEDBACK ================= */}
                    <div className="mb-4">
                        <div className="mb-3">
                            <GlobalApiTextarea
                                className="form-control form-control-sm mb-3"
                                label="Strengths"
                                name="strengths"
                                rows="2"
                                placeholder="Strengths..."
                                value={interview.strengths}
                                onChange={(e) => update('strengths', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <GlobalApiTextarea
                                className="form-control form-control-sm mb-3"
                                label="Concerns"
                                name="concerns"
                                rows="2"
                                placeholder="Concerns..."
                                value={interview.concerns}
                                onChange={(e) => update('concerns', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <GlobalApiTextarea
                                className="form-control form-control-sm"
                                label="Feedback"
                                name="feedback"
                                rows="3"
                                placeholder="Full interview feedback..."
                                value={interview.feedback}
                                onChange={(e) => update('feedback', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row m-0">
                        {/* ================= DECISION ================= */}
                        <div className={`col-12 ${fullscreen ? 'col-sm-6' : ''} p-0 mb-5`}>
                            <GlobalApiInput
                                className="form-select form-select-sm"
                                label="Recommendation"
                                name="recommendation"
                                value={interview.recommendation}
                                onChange={(e) => update('recommendation', e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="strong">Strong Hire</option>
                                <option value="hire">Hire</option>
                                <option value="maybe">Maybe</option>
                                <option value="reject">Reject</option>
                            </GlobalApiInput>
                        </div>
                    </div>
                </>
            ):(
                <div className="d-flex justify-content-center">
                    <button
                        onClick={()=>setStartInterview(true)}
                        className="btn btn-success btn-lg d-flex align-items-center gap-1"
                    >
                        Start Interview
                        <FiPlay />
                    </button>
                </div>
            )}
        </>
    );
};