import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaUpload, FaCheckCircle, FaExclamationTriangle, FaTrash, FaCalendarAlt, FaShieldAlt, FaSave, FaArrowRight } from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { useApi } from "../../../../../global/context/ApiProvider";
import { api } from "../../../../../global/services/Api";
import { useParams } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import { DocumentDropzone } from "../../../components/DocumentDropzone";
import { X } from "lucide-react";
import { PendingDisplay } from "../../../components/PendingDisplay";
import { AnimatePresence } from "framer-motion";
import { Spinner } from "../../../../../global/components/Spinner";
import { DocumentDropzoneOverlay } from "../../../components/DocumentDropzoneOverlay";

export const DocumentsCompliance = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError, hasError } = useApi();

    const [pending, setPending] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [showDropzone, setShowDropzone] = useState(false);

    const params = useParams();

    const remove = (doc) => {
        setDocuments((prevs)=>prevs.filter((d)=>d.id !== doc.id));
    };

    useEffect(()=>{
        api.onboarding.documents.list({userId: params.userId}).then((response)=>{
            setDocuments(response.data.documents);
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setPending(false));
    }, []);
            
    if(pending) return(
        <PendingDisplay message="Loading documents" />
    )

    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* HEADER */}
                <div className="mb-4">
                    <div className="d-flex gap-3">
                        <div
                            className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, minWidth: 60, height: 60, minHeight: 60 }}
                        >
                            <FaShieldAlt size={22} />
                        </div>
                        <div>
                            <h4 className="mb-0">Documents & Compliance</h4>
                            <small className="text-muted">
                                Manage employee documents, contracts, and compliance records
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row g-2 g-sm-4">
                    {/* RIGHT FORM */}
                    <div className="col-12 col-xl-8">
                        <div className="bg-white border rounded-3 p-2 p-sm-4">
                            {/* ADD DOCUMENT */}
                            <div className="mb-4">
                                <h6 className="mb-3">Add Document</h6>
                                <button onClick={()=>setShowDropzone(true)} className="btn btn-sm btn-primary d-flex align-items-center gap-2">
                                    <FaUpload />
                                    New Document
                                </button>
                            </div>

                            <hr />

                            {/* DOCUMENT LIST */}
                            <h6 className="mb-3">Uploaded Documents</h6>

                            {documents.map((doc) => (
                                <DocumentRow
                                    document={doc}
                                    onRemoved={remove}
                                    key={doc.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            <DocumentDropzoneOverlay
                show={showDropzone}
                close={()=>setShowDropzone(false)}
            />
        </div>
    );
};

const DocumentRow = ({ document: doc, onRemoved }) =>{
    const [loading, setLoading] = useState(false);

    const imgSize = 70;

    const remove = () =>{
        setLoading(true);
        api.onboarding.documents.delete({documentId: doc.id}).then((response)=>{
            onRemoved?.(response.data.document);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }

    return(
        <AnimatePresence>
            <div className="border rounded-4 p-3 mb-2 d-flex align-items-center justify-content-between text-break">
                <div className="d-flex gap-3">
                    <div
                        className="rounded-4 border"
                        style={{
                            width: `${imgSize}px`,
                            minWidth: `${imgSize}px`,
                            maxWidth: `${imgSize}px`,
                            height: `${imgSize}px`,
                            minHeight: `${imgSize}px`,
                            maxHeight: `${imgSize}px`
                        }}
                    >
                        <img
                            className="w-100 h-100"
                            src={doc.attributes.path}
                            alt={doc.attributes.documentType.attributes.name}
                        />
                    </div>
                    <div>
                        <div className="fw-semibold">{doc.attributes.originalName}</div>
                        <div className="small text-muted">
                            {doc.attributes.documentType.attributes.name}
                            {doc.attributes.expiry && (
                                <> • Expires: {doc.attributes.expiry}</>
                            )}
                        </div>
                        <div className="text-muted small">
                            {doc.attributes.note}
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    {doc.attributes.verified ? (
                        <FaCheckCircle className="text-success" />
                    ) : (
                        <FaExclamationTriangle className="text-warning" />
                    )}
                    <button
                        onClick={remove}
                        className="btn link-danger border-0 position-relative"
                        disabled={loading}
                    >
                        <FaTrash />
                        <Spinner show={loading} absolute bg="white" />
                    </button>
                </div>
            </div>
        </AnimatePresence>
    )
}