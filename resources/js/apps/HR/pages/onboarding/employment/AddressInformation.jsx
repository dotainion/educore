import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../../../global/services/Api";
import { Plus } from "lucide-react";
import { AddressesAndModification } from "../../../components/AddressesAndModification";

export const AddressInformation = () => {
    const addrRef = useRef();

    const open = () =>{
        addrRef.current.open();
    }
    
    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* HEADER */}
                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, minWidth: 60, height: 60, minHeight: 60}}
                        >
                            <FaMapMarkerAlt size={22} />
                        </div>
                        <div>
                            <h3 className="mb-1">Address Information</h3>
                            <small className="text-muted">
                                Define residential and mailing addresses for payroll and workforce operations
                            </small>
                        </div>
                    </div>
                    <div>
                        <button onClick={open} className="btn btn-sm btn-light d-flex align-items-center gap-2 text-nowrap">
                            <Plus />
                            New address
                        </button>
                    </div>
                </div>
                <AddressesAndModification ref={addrRef} />
            </motion.div>
        </div>
    );
};