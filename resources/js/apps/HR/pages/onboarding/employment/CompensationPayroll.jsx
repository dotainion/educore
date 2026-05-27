import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCoins, FaPercentage, FaClock, FaPlus, FaTrash, FaSave, FaArrowRight } from "react-icons/fa";
import { useApi } from "../../../../../global/context/ApiProvider";
import { useParams } from "react-router-dom";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { api } from "../../../../../global/services/Api";
import { GlobalApiToggle } from "../../../../../global/widgets/GlobalApiToggle";
import { GlobalApiInput } from "../../../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../../../global/widgets/GlobalApiSelect";
import { PendingDisplay } from "../../../components/PendingDisplay";

export const CompensationPayroll = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError, hasError, flushErrors } = useApi();

    const [pending, setPending] = useState(true);
    const [comp, setComp] = useState({
        compensationId: '',
        userId: '',
        salary: '',
        currency: 'ecd',
        payFrequency: 'monthly',
        overtimeRate: 1.5,
        bonusEligible: true,
        taxCategory: 'standard',
        allowances: [],
    });
    const [newAllowance, setNewAllowance] = useState({
        name: '',
        amount: '',
        type: 'Fixed',
    });

    const params = useParams();

    const update = (key, value) => {
        setComp((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const updateAllowance = (key, value) => {
        setNewAllowance((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const addAllowance = () => {
        if (!newAllowance.name || !newAllowance.amount) return;

        setComp((prev) => ({
            ...prev,
            allowances: [
                ...prev.allowances,
                { ...newAllowance, id: Date.now() },
            ],
        }));

        setNewAllowance({
            name: '',
            amount: '',
            type: 'Fixed',
        });
    };

    const removeAllowance = (id) => {
        setComp((prev) => ({
            ...prev,
            allowances: prev.allowances.filter(a => a.id !== id),
        }));
    };

    const validate = () =>{
        flushErrors();
        if (!comp.salary) {
            throwApiError('Base salary is required', 'salary');
        }
        if (!comp.currency) {
            throwApiError('Currency is required', 'currency');
        }
        if (!comp.payFrequency) {
            throwApiError('Pay frequency is required', 'payFrequency');
        }
        if (!comp.overtimeRate) {
            throwApiError('Overtime rate is required', 'overtimeRate');
        }
        if (!comp.taxCategory) {
            throwApiError('Tax category is required', 'taxCategory');
        }
        return !hasError();
    }

    const save = async () => {
        if(!validate()) return;
        setLoading(true);
        const data = {
            ...comp,
            userId: params.userId
        }
        api.onboarding.compensation.primarykey('compensationId').set(data).then((response)=>{
            to.next(params.userId);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    };

    const totalAllowances = useMemo(() => {
        return comp.allowances.reduce((sum, a) => sum + Number(a.amount || 0), 0);
    }, [comp.allowances]);

    useEffect(()=>{
        api.onboarding.compensation.find({userId: params.userId}).then((response)=>{
            const compensation = response.data.compensation;
            setComp({
                compensationId: compensation.id,
                userId: compensation.attributes.userId,
                salary: compensation.attributes.salary,
                currency: compensation.attributes.currency,
                payFrequency: compensation.attributes.payFrequency,
                overtimeRate: compensation.attributes.overtimeRate,
                bonusEligible: compensation.attributes.bonusEligible,
                taxCategory: compensation.attributes.taxCategory,
                allowances: [],
            });
        }).catch((error)=>{

        }).finally(() => setPending(false));
    }, []);
    
    useEffect(()=>{
        const unsubscribe = listener('NEXT', ({on, off}) =>{
            off();
            save();
        });
        return () =>unsubscribe();
    }, [comp]);
        
    if(pending) return(
        <PendingDisplay message="Loading compensation data" />
    )

    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* HEADER */}
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 60 }}>
                            <FaMoneyBillWave size={24} />
                        </div>
                        <div>
                            <h3 className="mb-1">Compensation & Payroll</h3>
                            <small className="text-muted">
                                Define salary structure, overtime rules, and compensation components
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* RIGHT FORM */}
                    <div className="col-12 col-xl-8">
                        <div className="bg-white border rounded-3 p-4">
                            {/* BASE */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        type="number"
                                        className="form-control"
                                        label="Base Salary"
                                        name="salary"
                                        placeholder="0.00"
                                        value={comp.salary}
                                        onChange={(e) => update('salary', e.target.value.trim())}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Currency"
                                        name="currency"
                                        value={comp.currency}
                                        onChange={(e) => update('currency', e.target.value)}
                                    >
                                        <option value="usd">USD</option>
                                        <option value="ecd">ECD</option>
                                    </GlobalApiSelect>
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Pay Frequency"
                                        name="payFrequency"
                                        value={comp.payFrequency}
                                        onChange={(e) => update('payFrequency', e.target.value)}
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="biweekly">Biweekly</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="on-contract-end">On contract end</option>
                                    </GlobalApiSelect>
                                </div>
                            </div>

                            {/* RULES */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <GlobalApiInput
                                        type="number"
                                        step="0.1"
                                        className="form-control"
                                        label="Overtime Rate"
                                        name="overtimeRate"
                                        value={comp.overtimeRate}
                                        onChange={(e) => update('overtimeRate', parseFloat(e.target.value || 0))}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Tax Category"
                                        name="taxCategory"
                                        value={comp.taxCategory}
                                        onChange={(e) => update('taxCategory', e.target.value)}
                                    >
                                        <option value="standard">Standard</option>
                                        <option value="reduced">Reduced</option>
                                        <option value="exempt">Exempt</option>
                                    </GlobalApiSelect>
                                </div>
                            </div>

                            {/* TOGGLE */}
                            <div className="mb-4">
                                <GlobalApiToggle
                                    name="bonusEligible"
                                    trailing="Bonus Eligible"
                                    checked={comp.bonusEligible}
                                    onChange={(e) => update('bonusEligible', e.target.checked)}
                                />
                            </div>

                            {/* ALLOWANCES */}
                            <hr />
                            <div className="text-danger">This need work: require pondering still</div>
                            <h6 className="mb-3">Allowances</h6>
                            <div className="row g-2 mb-3">
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        placeholder="Allowance name"
                                        value={newAllowance.name}
                                        onChange={(e) => updateAllowance("name", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input
                                        className="form-control"
                                        placeholder="Amount"
                                        value={newAllowance.amount}
                                        onChange={(e) => updateAllowance("amount", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={newAllowance.type}
                                        onChange={(e) => updateAllowance("type", e.target.value)}
                                    >
                                        <option>Fixed</option>
                                        <option>Percentage</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-primary w-100" onClick={addAllowance}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                            {comp.allowances.map((a) => (
                                <div key={a.id} className="d-flex justify-content-between border rounded p-2 mb-2">
                                    <div>
                                        <strong>{a.name}</strong> — {a.amount} ({a.type})
                                    </div>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeAllowance(a.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};