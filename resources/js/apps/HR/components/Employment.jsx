import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUserTie, FaFileSignature, FaIdCard, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useApi } from "../../../global/context/ApiProvider";
import { api } from "../../../global/services/Api";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { Spinner } from "../../../global/components/Spinner";

export const Employment = forwardRef(({renderLoading, onChange, onSaved, saving, defaultEmployment }, ref) => {
    const { throwApiError, hasError, flushErrors } = useApi();

    const [pending, setPending] = useState(true);
    const [loading, setLoading] = useState(false);
    const [managers, setManagers] = useState([]);
    const [noRecord, setNoRecord] = useState(true);
    const [employment, setEmployment] = useState({
        employmentId: '',
        employmentType: '',
        contractType: '',
        enrolmentDate: '',
        probationEndDate: '',
        probationPassed: false,
        position: '',
        managerId: '',
        workHoursPerWeek: 40,
        location: '',
        status: 'active',
        userId: '',
    });

    const params = useParams();

    const employmentTypes = useMemo(() => [
        {label: 'Full Time', value: 'fulltime'},
        {label: 'Part Time', value: 'parttime'},
        {label: 'Contract', value: 'contract'},
        {label: 'Temporary', value: 'temporary'},
        {label: 'Intern', value: 'intern'},
        {label: 'Consultant', value: 'consultant'}
    ], []);

    const contractTypes = useMemo(() => [
        {label: 'Permanent', value: 'permanent'},
        {label: 'Fixed Term', value: 'fixed-term'},
        {label: 'Temporary', value: 'temporary'},
        {label: 'Freelance', value: 'freelance'}
    ], []);

    const statuses = useMemo(() => [
        {label: 'Active', value: 'active'},
        {label: 'Probation', value: 'probation'},
        {label: 'On Leave', value: 'on-leave'},
        {label: 'Suspended', value: 'suspended'},
        {label: 'Terminated', value: 'terminated'}
    ], []);

    const workLocations = useMemo(() => [
        {label: 'Remote', value: 'remote'},
        {label: 'Office', value: 'office'},
        {label: 'Hybrid', value: 'hybrid'}
    ], []);

    const positions = useMemo(() => [
        'Software Engineer',
        'Operations Supervisor',
        'HR Officer',
        'Technician',
        'Support Analyst',
    ], []);

    const payFrequencies = useMemo(() => [
        {label: 'Weekly', value: 'weekly'},
        {label: 'Biweekly', value: 'biweekly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'On Contract End', value: 'on-ontract-end'}
    ], []);

    const updateField = (field, value) => {
        setEmployment((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const usePayload = () =>{
        if(params.userId) return ({userId: params.userId});
        if(params.employeeId) return ({userId: params.employeeId});
        return false;
    }

    const validate = () => {
        flushErrors();
        if (!employment.enrolmentDate) {
            throwApiError('Hire date is required', 'enrolmentDate');
        }
        if (!employment.position) {
            throwApiError('Position is required', 'position');
        }
        if (!employment.employmentType) {
            throwApiError('Employment type is required', 'employmentType');
        }
        if (!employment.contractType) {
            throwApiError('Contract type is required', 'contractType');
        }
        if (!employment.probationEndDate) {
            throwApiError('Probation end date is required', 'probationEndDate');
        }
        if (!employment.managerId) {
            throwApiError('A manager is required', 'managerId');
        }
        if (!employment.workHoursPerWeek) {
            throwApiError('Work hours is required', 'workHoursPerWeek');
        }
        return !hasError();
    };

    const setSaving = (state) =>{
        saving?.(state);
        setLoading(state);
    }

    const save = async () => {
        if (!validate()) return;
        setSaving(true);
        const data = {
            ...employment,
            userId: params.userId
        }
        api.onboarding.employmentInfo.primarykey('employmentId').set(data).then((response)=>{
            onSaved?.();
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setSaving(false));
    };

    const completion = useMemo(() => {
        const required = [
            employment.enrolmentDate,
            employment.position,
            employment.location,
        ];

        const completed = required.filter(Boolean).length;
        return Math.round((completed / required.length) * 100);
    }, [employment]);

    useImperativeHandle(ref, ()=>({
        save
    }), [employment]);

    useEffect(()=>{
        if(!onChange) return;
        onChange(employment);
    }, [employment]);

    useEffect(()=>{
        //todo: need a way to fetch managers based on roles
        api.employee.list().then((response)=>{
            setManagers(response.data.users);
        }).catch((error)=>{

        });
        
        const setEntity = (entity) =>{
            const enrolmentDate = entity.attributes.enrolmentDate 
                ? entity.attributes.enrolmentDate.split('T')[0] : '';
            const probationEndDate = entity.attributes.probationEndDate 
                ? entity.attributes.probationEndDate.split('T')[0] : '';
            setEmployment({
                ...entity.attributes,
                employmentId: entity.id,
                enrolmentDate: enrolmentDate,
                probationEndDate: probationEndDate,
            });
        }

        if(defaultEmployment){
            setEntity(defaultEmployment);
            setPending(false);
            setNoRecord(false);
            return;
        }

        const payload = usePayload();
        if(!payload){
            setPending(false);
            return;
        }
        api.onboarding.employmentInfo.find(payload).then((response)=>{
            const employment = response.data.employment;
            setEntity(employment);
            setNoRecord(false);
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setPending(false));
    }, [defaultEmployment]);

    if(pending) return renderLoading;

    return (
        <div className="position-relative">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {noRecord && (
                    <div className="alert alert-warning py-2">
                        Employement is required
                    </div>
                )}
                <div className="row g-4">
                    <div className="col-12">
                        <div className="bg-white border rounded-3 p-4">

                            {/* EMPLOYMENT */}
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <FaUserTie className="text-primary" />
                                <h5 className="mb-0">Employment Setup</h5>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Employment Type"
                                        name="employmentType"
                                        value={employment.employmentType}
                                        onChange={(e)=>updateField('employmentType', e.target.value)}
                                    >
                                        <option value="" hidden>Select a employment type</option>
                                        {employmentTypes.map((type) => (
                                            <option value={type.value} key={type.label}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Contract Type"
                                        name="contractType"
                                        value={employment.contractType}
                                        onChange={(e)=>updateField('contractType', e.target.value)}
                                    >
                                        <option value="" hidden>Select a contract type</option>
                                        {contractTypes.map((type) => (
                                            <option value={type.value} key={type.label}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                            </div>

                            {/* DATES */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        type="date"
                                        className="form-control"
                                        name="enrolmentDate"
                                        label="Hire Date"
                                        value={employment.enrolmentDate}
                                        onChange={(e)=>updateField('enrolmentDate', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        type="date"
                                        className="form-control"
                                        name="probationEndDate"
                                        label="Probation End"
                                        value={employment.probationEndDate}
                                        onChange={(e)=>updateField('probationEndDate', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiSelect
                                        className="form-select"
                                        name="probationPassed"
                                        label="Probation Passed"
                                        value={employment.probationPassed}
                                        onChange={(e)=>updateField('probationPassed', e.target.value === 'yes')}
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </GlobalApiSelect>
                                </div>
                            </div>

                            {/* POSITION */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        value={employment.position}
                                        name="position"
                                        label="Position"
                                        onChange={(e)=>updateField('position', e.target.value)}
                                    >
                                        <option value="" hidden>Select Position</option>
                                        {positions.map((position)=>(
                                            <option value={position} key={position}>
                                                {position}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        name="managerId"
                                        label="Reporting Manager"
                                        value={employment.managerId}
                                        onChange={(e)=>updateField('managerId', e.target.value)}
                                    >
                                        <option value="" hidden>
                                            Select Manager
                                        </option>
                                        {managers.map((manager) => (
                                            <option value={manager.id} key={manager.id}>
                                                {manager.attributes.fullName}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                            </div>

                            {/* WORK */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <GlobalApiInput
                                        type="number"
                                        name="workHoursPerWeek"
                                        label="Weekly Hours"
                                        className="form-control"
                                        value={employment.workHoursPerWeek}
                                        onChange={(e)=>updateField('workHoursPerWeek', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiSelect
                                        className="form-select"
                                        name="status"
                                        label="Status"
                                        value={employment.status}
                                        onChange={(e)=>updateField('status', e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option value={status.value} key={status.label}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Spinner show={loading} absolute md bg="white" />
        </div>
    );
});