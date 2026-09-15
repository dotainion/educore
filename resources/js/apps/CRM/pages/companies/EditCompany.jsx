import React, { useRef } from "react";
import { motion } from "framer-motion";
import { GlobalNavbarPortal } from "../../../../global/components/Navbar";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiTextarea } from "../../../../global/widgets/GlobalApiTextarea";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { GlobalApiCheckbox } from "../../../../global/widgets/GlobalApiCheckbox";
import { api } from "../../../../global/services/Api";
import { routes } from "../../../../global/routes/Routes";

export const EditCompany = () => {
    const nameRef = useRef();
    const industryRef = useRef();
    const phoneRef = useRef();
    const ownerIdRef = useRef();
    const vipRef = useRef();
    const websiteRef = useRef();
    const noteRef = useRef();

    const streetRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipRef = useRef();
    const countryRef = useRef();
    
    const payload = () =>{
        return {
            company: {
                name: nameRef.current.value,
                industry: industryRef.current.value,
                phone: phoneRef.current.value,
                ownerId: ownerIdRef.current.value,
                vip: vipRef.current.value,
                website: websiteRef.current.value,
                note: noteRef.current.value
            },
            address: {
                street: streetRef.current.value,
                city: cityRef.current.value,
                state: stateRef.current.value,
                zip: zipRef.current.value,
                country: countryRef.current.value
            }
        };
    }
    
    const create = ()=>{
        const data = payload();
        api.company.create(data.company).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
        api.address.create(data.address).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
    };
    
    const update = ()=>{
        const data = payload();
        api.company.update(data.company).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
        api.address.update(data.address).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{

        });
    };

    const hide = ()=>{
        const data = { hide: true };
        api.company.update(data).then((response)=>{

        }).catch((error)=>{

        });
        api.address.update(data).then((response)=>{

        }).catch((error)=>{

        });
    };

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add Company"
                subtitle="Create a new company in the CRM"
                reserveActions={[
                    { type: 'cancel', to: routes.crm.company.list },
                    { type: 'save', onClick: ()=>null },
                ]}
            />

            <div className="row g-3 m-0">
                {/* LEFT SIDE */}
                <div className="col-12 col-lg-8">
                    {/* Company Info */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Company Information</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <GlobalApiInput ref={nameRef} type="text" className="form-control" label="Company Name" name="name" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={websiteRef} type="text" className="form-control" label="Website" name="website" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={industryRef} type="text" className="form-control" label="Industry" name="industry" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={phoneRef} type="text" className="form-control" label="Phone" name="phone" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-4">Address</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <GlobalApiInput ref={streetRef} type="text" className="form-control" label="Street" name="street" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={cityRef} type="text" className="form-control" label="City" name="city" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={stateRef} type="text" className="form-control" label="State" name="state" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={zipRef} type="text" className="form-control" label="Zip Code" name="zip" />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiInput ref={countryRef} type="text" className="form-control" label="Country" name="contry" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notes */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <GlobalApiTextarea
                                ref={noteRef}
                                className="form-control"
                                label="Notes"
                                rows="4"
                                placeholder="Add notes about this company..."
                                name="note"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-lg-4">
                    {/* Company Settings */}
                    <motion.div
                        className="card border mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body">
                            <h6 className="mb-3">Settings</h6>
                            <div className="mb-3">
                                <GlobalApiSelect ref={ownerIdRef} className="form-select" label="Owner" name="ownerId">
                                    <option>Assign owner</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                </GlobalApiSelect>
                            </div>

                            <GlobalApiCheckbox ref={vipRef} trailing="Mark as VIP" name="vip" />
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="card border"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-body d-grid gap-2">
                            <button className="btn btn-sm btn-primary w-100">Save Company</button>
                            <button className="btn btn-sm btn-outline-secondary w-100">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};