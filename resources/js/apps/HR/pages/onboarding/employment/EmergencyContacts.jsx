import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaUserFriends, FaPlus, FaTrash, FaExclamationTriangle, FaSave, FaArrowRight, FaHeart, FaCheckCircle } from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { useApi } from "../../../../../global/context/ApiProvider";
import { api } from "../../../../../global/services/Api";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTimeoutEffect } from "../../../../../global/hooks/useTimeoutEffect";

const defaultEmergencyContact = () =>({
    contactId: '',
    userId: '',
    name: '',
    relationship: '',
    phone: '',
    primary: false,
    note: '',
});

export const EmergencyContacts = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError, hasError } = useApi();

    const [pending, setPending] = useState(true);
    const [contacts, setContacts] = useState([]);

    const params = useParams();

    const updateContact = (index, key, value) => {
        setContacts((prev) => prev.map((c, i) => {
            if(index === i) return {...c, [key]: value};
            return c
        }));
    };

    const add = (id) => {
        const copies = [];
        contacts.forEach((contact)=>{
            copies.push(contact);
            if(contact.id === id){
                copies.push(defaultEmergencyContact());
            }
        });
        setContacts(copies);
    };

    const remove = (id) => {
        setContacts((prev)=>prev.filter((c) => c.id !== id));
    };

    const save = async () => {
        setLoading(true);
        const copies = contacts.map((contact)=>({
            ...contact,
            userId: params.userId,
        }));

        if(!copies.length) return to.next(params.userId);

        const createContacts = copies.filter((c)=>!c.contactId);
        const updateContacts = copies.filter((c)=>c.contactId);

        const promises = [];
        if(createContacts.length){
            promises.push(()=>(
                api.onboarding.emergencyContact.create({contacts: createContacts})
            ));
        }
        if(updateContacts.length){
            promises.push(()=>(
                api.onboarding.emergencyContact.update({contacts: updateContacts})
            ));
        }

        Promise.all([
            ...promises.map((promise)=>promise())
        ]).then((response)=>{
            to.next(params.userId);
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false))
    };

    useEffect(()=>{
        api.onboarding.emergencyContact.list({userId: params.userId}).then((response)=>{
            const employment = response.data.emergencyContacts;
            setContacts(response.data.emergencyContacts.map((contact)=>({
                ...contact.attributes,
                contactId: contact.id
            })));
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setPending(false));
    }, []);
        
    useTimeoutEffect(()=>{
        const unsubscribe = listener('NEXT', ({on, off}) =>{
            off();
            save();
        });
        return () =>unsubscribe();
    }, [contacts]);

    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 60 }}>
                            <FaPhone size={22} />
                        </div>
                        <div>
                            <h3 className="mb-1">Emergency & Contacts</h3>
                            <small className="text-muted">
                                Define emergency contacts and critical safety information
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* RIGHT FORM */}
                    <div className="col-12 col-xl-8">
                        <div className="bg-white border rounded-3 p-4">
                            <h5 className="mb-0">Emergency Contacts</h5>
                            <div className="small text-muted mb-3">
                                This information is only used for emergency response and safety compliance.
                            </div>

                            {
                                contacts.length ?
                                contacts.map((c, index) => (
                                    <motion.div
                                        className="position-relative bg-light border rounded p-3 mb-3"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={`${c.contactId}-${index}`}
                                    >
                                        <div className="d-md-flex gap-2 mb-3">
                                            <div className="row g-2">
                                                <div className="col-md-4">
                                                    <label className="form-label small text-muted">Name</label>
                                                    <input
                                                        className="form-control"
                                                        value={c.name}
                                                        onChange={(e)=>updateContact(index, 'name', e.target.value)}
                                                        placeholder="Emergency contact full name"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small text-muted">Relationship</label>
                                                    <input
                                                        className="form-control"
                                                        value={c.relationship}
                                                        onChange={(e)=>updateContact(index, 'relationship', e.target.value)}
                                                        placeholder="Relations between employee"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small text-muted">Phone</label>
                                                    <input
                                                        className="form-control"
                                                        value={c.phone}
                                                        onChange={(e)=>updateContact(index, 'phone', e.target.value)}
                                                        placeholder="1 654 787 0099"
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end">
                                                <div className="d-none d-md-block">
                                                    <button onClick={()=>remove(c.id)} className="btn btn-outline-danger border-0 px-2 mb-1">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="position-absolute-md top-0 end-0 d-md-none p-2">
                                                    <button onClick={()=>remove(c.id)} className="btn-close"></button>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="mb-2 d-flex align-items-center gap-2 small">
                                            <FaHeart className="text-danger" />
                                            Medical / Safety Notes
                                        </h6>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            placeholder="Allergies, conditions, emergency instructions..."
                                            value={c.note}
                                            onChange={(e)=>updateContact(index, 'note', e.target.value)}
                                        />
                                        <div className="d-flex justify-content-between mt-4">
                                            <button
                                                onClick={()=>updateContact(index, 'primary', !c.primary)}
                                                className={`btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2 ${
                                                    c.primary ? 'text-success' : ''
                                                }`}
                                            >
                                                {c.primary && (
                                                    <FaCheckCircle className="text-success" />
                                                )}
                                                Primary Emergency Contact
                                            </button>
                                            <button onClick={()=>add(c.id)} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2">
                                                <FaPlus />
                                                Add Contact
                                            </button>
                                        </div>
                                    </motion.div>
                                )):
                                <div>
                                    <button
                                        onClick={()=>setContacts([defaultEmergencyContact()])}
                                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                                    >
                                        <FaPlus />
                                        Add Contact
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};