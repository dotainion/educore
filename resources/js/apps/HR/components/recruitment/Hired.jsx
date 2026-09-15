import React, { useState, useMemo, useRef, useEffect } from "react";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { api } from "../../../../global/services/Api";
import { useSearchCallback } from "../../../../global/hooks/useSearchCallback";
import { useTimeoutEffect } from "../../../../global/hooks/useTimeoutEffect";
import { ApplicantStatusButton } from "../ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";

export const Hired = ({ item, fullscreen, onUpdate }) => {

    if (!['shortlist', 'hired'].includes(item.attributes.status)) {
        return null;
    }

    const [isReady, setIsReady] = useState(false);
    const [hired, setHired] = useState({
        jobAccepted: false,
        jobAcceptedAt: '',
        acceptedDate: '',
    });
    
    const changedRef = useRef(false);

    const update = (key, value) => {
        changedRef.current = true;
        setHired((prev)=>({...prev, [key]: value}));
    };
    
    useTimeoutEffect(()=>{
        if(!changedRef.current) return;
        
        const data = {
            ...hired,
            applicantId: item.id
        };
        (data.hiredId
            ? api.hired.update(data)
            : api.hired.create(data)
        ).then((response)=>{
            setHired((prev)=>({
                ...prev,
                hiredId: response.data.hired.id
            }));
            setIsReady(
                response.data.hired.attributes.jobAccepted &&
                response.data.hired.attributes.startDate
            );
        }).catch((error)=>{

        }).finally(()=>changedRef.current = false);
    }, [hired]);
    
    useEffect(()=>{
        if(!item.id) return;
        api.hired.find({applicantId: item.id}).then((response)=>{
            setHired((prev)=>({
                ...response.data.hired.attributes,
                screeningId: response.data.hired.id,
            }));
            setIsReady(
                response.data.hired.attributes.jobAccepted &&
                response.data.hired.attributes.startDate
            );
        }).catch((error)=>{

        });
    }, [item]);

    return (
        <>
            <div className="row m-0">
                <div className={`col-12 ${fullscreen ? 'col-md-8' : ''} m-auto`}>
                    <div className="mb-3">
                        <div className="fw-semibold mb-2">Offer Confirmation</div>
                        <GlobalApiCheckbox
                            className="d-flex justify-content-between small mb-2"
                            name="jobAccepted"
                            content="Job accepted"
                            checked={hired.jobAccepted}
                            onChange={(e) => {
                                const currentDate = () =>{
                                    const d = new Date();
                                    let month = d.getMonth() +1;
                                    let date = d.getDate();
                                    if(month < 10) month = `0${month}`;
                                    if(date < 10) date = `0${date}`;
                                    return `${d.getFullYear()}-${month}-${date}`;
                                }
                                update('jobAccepted', e.target.checked);
                                update('jobAcceptedAt', currentDate());
                            }}
                        />
                    </div>

                    {/* ================= START DATE ================= */}
                    <div className="mb-5">
                        <GlobalApiInput
                            type="date"
                            name="acceptedDate"
                            label="Start Date"
                            className="form-control form-control-sm"
                            value={hired.startDate}
                            onChange={(e) => update('acceptedDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row m-0">
                <div className={`col-12 ${fullscreen ? 'col-md-8' : ''} m-auto`}>
                    <div className="position-sticky bottom-0 bg-white border-top p-2 pt-4 mb-5">
                        <ApplicantStatusButton
                            className="btn btn-sm btn-success w-100"
                            disabled={!isReady}
                            payload={{status: 'activation', applicantId: item.id}}
                            to={routes.hr.onboarding.activation(item.id)}
                        >
                            Start Onboarding Process →
                        </ApplicantStatusButton>
                        <div className="text-muted small mt-1 text-center">
                            This will move candidate into onboarding
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};