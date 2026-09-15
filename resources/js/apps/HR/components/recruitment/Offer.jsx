import React, { useEffect, useMemo, useRef, useState } from "react";
import { ApplicantStatusButton } from "../ApplicantStatusButton";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { api } from "../../../../global/services/Api";
import { FiArrowRight, FiSend, FiX } from "react-icons/fi";
import { useTimeoutEffect } from "../../../../global/hooks/useTimeoutEffect";

export const Offer = ({ item, fullscreen, onUpdate }) => {

    if (item.attributes.status !== 'offer') {
        return null;
    }

    const [offer, setOffer] = useState({
        offerId: null,
        // compensation
        salaryBase: 0,
        salaryCurrency: "USD",
        bonus: 0,
        equity: 0,

        // offer terms
        startDate: "",
        contractType: "full-time",
        probationPeriod: 3,

        // benefits
        healthInsurance: false,
        remoteWork: false,
        pension: false,
        flexibleHours: false,
        annualLeave: 0,

        // negotiation
        candidateExpectation: "",
        negotiationNotes: "",

        // compliance
        backgroundCheckRequired: true,
    });
    
    const changedRef = useRef(false);

    const update = (key, value) => {
        changedRef.current = true;
        setOffer((prev)=>({...prev, [key]: value}));
    };

    const totalPackage = useMemo(() => {
        return (
            Number(offer.salaryBase || 0) +
            Number(offer.bonus || 0) +
            Number(offer.equity || 0)
        );
    }, [offer]);
    
    useTimeoutEffect(()=>{
        if(!changedRef.current) return;
        
        const data = {
            ...offer,
            applicantId: item.id
        };
        (data.offerId
            ? api.offer.update(data)
            : api.offer.create(data)
        ).then((response)=>{
            setScreening((prev)=>({
                ...prev,
                offerId: response.data.offer.id
            }));
        }).catch((error)=>{

        }).finally(()=>changedRef.current = false);
    }, [offer]);
    
    useEffect(()=>{
        if(!item.id) return;
        api.offer.find({applicantId: item.id}).then((response)=>{
            setOffer((prev)=>({
                ...response.data.offer.attributes,
                offerId: response.data.offer.id,
            }))
        }).catch((error)=>{

        });
    }, [item]);

    return (
        <>
            <div className="row m-0">
                <div className={`col-12 ${fullscreen ? 'col-md-8' : ''}`}>
                    <div className="mb-3">
                        <div className="fw-semibold mb-2">Compensation</div>
                        <GlobalApiInput
                            type="number"
                            name="salaryBase"
                            label="Base salary"
                            className="form-control form-control-sm mb-2"
                            placeholder="Base salary"
                            value={offer.salaryBase}
                            onChange={(e) => update("salaryBase", e.target.value)}
                        />

                        <div className="d-flex gap-2 mb-2">
                            <div>
                                <GlobalApiInput
                                    type="number"
                                    name="bonus"
                                    label="Bonus"
                                    className="form-control form-control-sm"
                                    placeholder="Bonus"
                                    value={offer.bonus}
                                    onChange={(e) => update("bonus", e.target.value)}
                                />
                            </div>
                            <div>
                                <GlobalApiInput
                                    type="number"
                                    name="equity"
                                    label="Equity"
                                    className="form-control form-control-sm"
                                    placeholder="Equity"
                                    value={offer.equity}
                                    onChange={(e) => update("equity", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="small text-muted">
                            Total Package: {totalPackage}
                        </div>
                    </div>

                    {/* ================= TERMS ================= */}
                    <div className="mb-3">
                        <GlobalApiInput
                            type="date"
                            name="startDate"
                            label="Terms"
                            className="form-control form-control-sm mb-2"
                            value={offer.startDate}
                            onChange={(e)=>update("startDate", e.target.value)}
                        />
                        <GlobalApiSelect
                            className="form-select form-select-sm mb-2"
                            name="contractType"
                            value={offer.contractType}
                            onChange={(e)=>update("contractType", e.target.value)}
                        >
                            <option value="full-time">Full-time</option>
                            <option value="contract">Contract</option>
                            <option value="part-time">Part-time</option>
                        </GlobalApiSelect>
                        <GlobalApiInput
                            type="number"
                            name="probationPeriod"
                            label="Probation"
                            className="form-control form-control-sm"
                            placeholder="Probation (months)"
                            value={offer.probationPeriod}
                            onChange={(e)=>update("probationPeriod", e.target.value)}
                        />
                    </div>

                    {/* ================= BENEFITS ================= */}
                    <ul className="list-group mb-3">
                        <li className="list-group-item fw-semibold">Benefits</li>
                        {[
                            ['healthInsurance', 'Health insurance'],
                            ['remoteWork', 'Remote work'],
                            ['pension', 'Pension plan'],
                            ['flexibleHours', 'Flexible hours']
                        ].map(([key, label]) => (
                            <li key={key} className="list-group-item list-group-item-action pointer small p-0">
                                <GlobalApiCheckbox
                                    className="w-100 d-flex justify-content-between pointer px-3 py-2"
                                    name={key}
                                    content={label}
                                    checked={offer[key]}
                                    onChange={(e) => update(key, e.target.checked)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="mb-3">
                        <GlobalApiInput
                            type="number"
                            name="annualLeave"
                            label="Annual leave days"
                            className="form-control form-control-sm"
                            placeholder="Annual leave days"
                            value={offer.annualLeave}
                            onChange={(e) => update('annualLeave', e.target.value)}
                        />
                    </div>

                    {/* ================= NEGOTIATION ================= */}
                    <div className="mb-3">
                        <GlobalApiTextarea
                            className="form-control form-control-sm mb-3"
                            name="candidateExpectation"
                            label="Candidate expectations"
                            rows="2"
                            placeholder="Expectations..."
                            value={offer.candidateExpectation}
                            onChange={(e) => update('candidateExpectation', e.target.value)}
                        />
                        <GlobalApiTextarea
                            className="form-control form-control-sm"
                            name="negotiationNotes"
                            label="Negotiation notes"
                            rows="2"
                            placeholder="Notes..."
                            value={offer.negotiationNotes}
                            onChange={(e) => update('negotiationNotes', e.target.value)}
                        />
                    </div>

                    {/* ================= COMPLIANCE ================= */}
                    <ul className="list-group mb-3">
                        <li className="list-group-item list-group-item-action pointer small p-0">
                            <GlobalApiCheckbox
                                className="w-100 d-flex justify-content-between pointer px-3 py-2"
                                name={'backgroundCheckRequired'}
                                content="Background check required"
                                checked={offer.backgroundCheckRequired}
                                onChange={(e)=>update('backgroundCheckRequired', e.target.checked)}
                            
                            />
                        </li>
                    </ul>
                </div>

                <div className={`col-12 ${fullscreen ? 'col-md-4' : ''}`}>
                    <div className="position-sticky top-0 h-100" style={{maxHeight: '90vh'}}>
                        <div className="d-grid d-sm-flex gap-2 pt-3 pt-md-4 mb-5">
                            <ApplicantStatusButton
                                className="btn btn-sm btn-primary px-3 d-flex align-items-center gap-1"
                                payload={{status: 'offer', applicantId: item.id}}
                                onSuccess={onUpdate}
                            >
                                Send Offer
                                <FiSend />
                            </ApplicantStatusButton>
                            <ApplicantStatusButton
                                className="btn btn-sm btn-success px-3 d-flex align-items-center gap-1"
                                payload={{status: 'hired', applicantId: item.id}}
                                onSuccess={onUpdate}
                            >
                                Move to Hired
                                <FiArrowRight />
                            </ApplicantStatusButton>
                            <ApplicantStatusButton
                                className="btn btn-sm btn-danger px-3 d-flex align-items-center gap-1"
                                payload={{status: 'rejected', applicantId: item.id}}
                                onSuccess={onUpdate}
                            >
                                Reject
                                <FiX />
                            </ApplicantStatusButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};