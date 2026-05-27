import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCamera, FaEnvelope, FaIdBadge, FaPhone, FaSave, FaUser, FaUsers, FaVenusMars, FaBriefcase, FaBuilding, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../../global/services/Api";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { useApi } from "../../../global/context/ApiProvider";
import { PendingDisplay } from "./PendingDisplay";
import { Spinner } from "../../../global/components/Spinner";

export const Profile = forwardRef(({renderLoading, onChange, onSaved, saving, employee: defaultEmployee}, ref) => {
    const { throwApiError, hasError, flushErrors } = useApi();

    const [noRecord, setNoRecord] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pending, setPending] = useState(true);
    const [employee, setEmployee] = useState({
        userId: '',
        applicantId: '',
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
        status: 'active',
        photo: null
    });

    const params = useParams();

    const saveRef = useRef();

    const genders = useMemo(()=>[
        'Male',
        'Female',
        'Other',
    ], []);

    const statuses = useMemo(()=>[
        'Active',
        'Pending',
        'Suspended',
    ], []);

    const usePayload = () =>{
        if(params.userId) return ({userId: params.userId});
        if(params.employeeId) return ({userId: params.employeeId});
        if(params.applicantId) return ({applicantId: params.applicantId});
        return false;
    };

    const validate = () => {
        flushErrors();
        if (!employee.firstName.trim()) {
            throwApiError('First name is required', 'firstName');
        }
        if (!employee.lastName.trim()) {
            throwApiError('Last name is required', 'lastName');
        }
        if (!employee.email.trim()) {
            throwApiError('Email address is required', 'email');
        }
        if (employee.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
            throwApiError('Invalid email format', 'email');
        }
        if (!employee.gender) {
            throwApiError('Gender is required', 'gender');
        }
        if (!employee.dob) {
            throwApiError('Date of birth is required', 'dob');
        }
        if(!employee.status.trim()){
            throwApiError('Status is required', 'status');
        }
        return !hasError();
    };

    const updateField = (field, value) => {
        setEmployee((prev)=>({...prev, [field]: value}));
    };

    const handlePhoto = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        updateField('photo', URL.createObjectURL(file));
    };

    const setSaving = (state) =>{
        saving?.(state);
        setLoading(state);
    }

    const save = () => {
        if (!validate()) return;
        setSaving(true);
        const data = {
            ...employee,
            applicantId: params.applicantId,
        }
        api.onboarding.profile.primarykey('userId').set(data).then((response)=>{
            onSaved?.(response.data.user);
        }).catch((error)=>{
            
        }).finally(()=>setSaving(false));
    };

    useImperativeHandle(ref, ()=>({
        save
    }), [employee]);

    useEffect(()=>{
        if(!onChange) return;
        onChange(employee);
    }, [employee]);

    useEffect(()=>{
        if(defaultEmployee){
            setEmployee({
                ...defaultEmployee.attributes,
                userId: defaultEmployee.id
            });
            setPending(false);
            setNoRecord(false);
            return;
        }
        if(!params.applicantId && !params.userId){
            setPending(false);
            return;
        }

        const setEntity = (entity) =>{
            setEmployee((prev)=>({
                ...prev,
                userId: (entity.type === 'user') ? entity.id : '',
                applicantId: (entity.type === 'applicant')
                    ? entity.id
                    : entity.attributes.applicantId,
                firstName: entity.attributes.firstName,
                lastName: entity.attributes.lastName,
                email: entity.attributes.email,
                gender: entity.attributes.gender,
                contact: entity.attributes.contact,
                dob: entity.attributes.dob,
                status: 'active',
                photo: null
            }));
        }

        const toEntity = (response) =>{
            if(response.data.user) return response.data.user;
            return response.data.applicant;
        }

        const payload = usePayload();
        if(!payload){
            setPending(false);
            return;
        }
        api.employee.find(payload).then((response)=>{
            setEntity(toEntity(response));
            setPending(false);
            setNoRecord(false);
        }).catch((error)=>{
            (params.applicantId
                ? api.applicant.find({applicantId: params.applicantId})
                : api.employee.find({userId: params.userId || params.employeeId})
            ).then((response)=>{
                setEntity(toEntity(response));
            }).catch((error)=>{
                
            }).finally(()=>setPending(false));
        });
    }, [defaultEmployee]);

    if(pending) return renderLoading;

    return (
        <div className="position-relative">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {noRecord && (
                    <div className="alert alert-warning py-2">
                        Employee profile is required
                    </div>
                )}
                <div className="text-center mb-4">
                    <div className="position-relative mx-auto mb-3" style={{ width: 150, height: 150 }}>
                        <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center w-100 h-100">
                            {employee.photo ? (
                                <img
                                    src={employee.photo}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="profile"
                                />
                            ) : (
                                <FaUser
                                    size={44}
                                    className="text-muted"
                                />
                            )}
                        </div>
                        <label className="btn btn-primary rounded-circle position-absolute bottom-0 end-0" style={{ width: 46, height: 46 }}>
                            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                <FaCamera />
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handlePhoto}
                                />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="bg-white border rounded-3 p-4">
                    <div className="d-flex align-items-center gap-2 my-4">
                        <FaUser className="text-primary" />
                        <h5 className="mb-0">Personal Information</h5>
                    </div>
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <GlobalApiInput
                                label="First Name"
                                name="firstName"
                                className="form-control"
                                placeholder="John"
                                value={employee.firstName}
                                onChange={(e) => updateField('firstName', e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <GlobalApiInput 
                                label="Last Name"
                                name="lastName"
                                className="form-control"
                                placeholder="Do"
                                value={employee.lastName}
                                onChange={(e) => updateField('lastName', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <GlobalApiInput
                                onChange={(e) => updateField('email', e.target.value)}
                                icon={FaEnvelope}
                                label="Email Address"
                                name="email"
                                className="form-control"
                                value={employee.email}
                            />
                        </div>
                        <div className="col-md-6">
                            <GlobalApiInput
                                className="form-control"
                                icon={FaPhone}
                                label="Contact Number"
                                name="contact"
                                value={employee.contact}
                                onChange={(e) => updateField('contact', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* META */}
                    <div className="row g-3 mb-5">
                        <div className="col-md-4">
                            <GlobalApiSelect
                                className="form-select"
                                label="Gender"
                                name="gender"
                                value={employee.gender}
                                onChange={(e) => updateField('gender', e.target.value)}
                            >
                                <option value="" hidden>Select Gender</option>
                                {genders.map((gender) => (
                                    <option value={gender.toLowerCase()} key={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </GlobalApiSelect>
                        </div>
                        <div className="col-md-4">
                            <GlobalApiInput
                                type="date"
                                label="Date of Birth"
                                name="dob"
                                className="form-control"
                                value={employee.dob}
                                onChange={(e) => updateField('dob', e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <GlobalApiSelect
                                className="form-select"
                                label="Status"
                                name="status"
                                value={employee.status}
                                onChange={(e) => updateField('status', e.target.value)}
                            >
                                {statuses.map((status) => (
                                    <option value={status} key={status}>
                                        {status}
                                    </option>
                                ))}
                            </GlobalApiSelect>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Spinner show={loading} absolute md bg="white" />
        </div>
    );
});