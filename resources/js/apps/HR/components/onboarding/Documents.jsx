import React, { useMemo, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { DropZone } from "../Dropzone";

export const Documents = ({ employee, fullscreen }) => {
    const [docs, setDocs] = useState({
        contract: null,
        idCard: null,
        taxForm: null,
        nda: null,
        bankDetails: null,
        policy: null,
    });

    const allComplete = useMemo(() => {
        return Object.values(docs).every(Boolean);
    }, [docs]);

    const handleDrop = (e, key) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setDocs((prev)=>({...prev, [key]: file}));
    };

    const handleFileSelect = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        setDocs((prev)=>({...prev, [key]: file}));
    };

    const handleComplete = () => {
        alert("Documents Verified → Move to First Day");
    };

    return (
        <div className="container-fluid bg-white border rounded">
            {/* HEADER */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <h4 className="mb-0">Documents</h4>
                    <small className="text-muted">
                        Drag & drop required employee documents
                    </small>
                </div>
                <span className={`badge bg-${allComplete ? 'success' : 'warning text-dark'}`}>
                    {allComplete ? "Verified" : "Pending"}
                </span>
            </div>
            <div className="row">
                {/* LEFT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-8' : ''} p-3`}>
                    {/* EMPLOYEE */}
                    <div className="border rounded p-3 mb-3">
                        <h5>Employee</h5>
                        {employee ? (
                            <div className="row small">
                                <div className="col-6 mb-2"><strong>ID:</strong> {employee.id}</div>
                                <div className="col-6 mb-2"><strong>Name:</strong> {employee.attributes.firstName} {employee.attributes.lastName}</div>
                                <div className="col-6 mb-2"><strong>Email:</strong> {employee.attributes.email}</div>
                                <div className="col-6 mb-2"><strong>Role:</strong> {employee.attributes.position}</div>
                            </div>
                        ):(
                            <div>No employee</div>
                        )}
                        
                    </div>
                    {/* DROP ZONES */}
                    <div className="border rounded p-3">
                        <h5 className="mb-3">Required Documents</h5>
                        <DropZone
                            label="Signed Contract"
                            file={docs.contract}
                            onDrop={(e) => handleDrop(e, "contract")}
                            onSelect={(e) => handleFileSelect(e, "contract")}
                        />
                        <DropZone
                            label="Government ID"
                            file={docs.idCard}
                            onDrop={(e) => handleDrop(e, "idCard")}
                            onSelect={(e) => handleFileSelect(e, "idCard")}
                        />
                        <DropZone
                            label="Tax Form"
                            file={docs.taxForm}
                            onDrop={(e) => handleDrop(e, "taxForm")}
                            onSelect={(e) => handleFileSelect(e, "taxForm")}
                        />
                        <DropZone
                            label="NDA Agreement"
                            file={docs.nda}
                            onDrop={(e) => handleDrop(e, "nda")}
                            onSelect={(e) => handleFileSelect(e, "nda")}
                        />
                        <DropZone
                            label="Bank Details"
                            file={docs.bankDetails}
                            onDrop={(e) => handleDrop(e, "bankDetails")}
                            onSelect={(e) => handleFileSelect(e, "bankDetails")}
                        />
                        <DropZone
                            label="Policy Acknowledgement"
                            file={docs.policy}
                            onDrop={(e) => handleDrop(e, "policy")}
                            onSelect={(e) => handleFileSelect(e, "policy")}
                        />
                    </div>
                    {/* ACTION */}
                    <button
                        className={`btn w-100 mt-3 btn-${allComplete ? 'success' : 'secondary'}`}
                        disabled={!allComplete}
                        onClick={handleComplete}
                    >
                        Complete Documents → Move to First Day
                    </button>
                </div>
                {/* RIGHT */}
                <div className={`col-12 ${fullscreen ? 'col-sm-4' : ''} p-3 bg-light border-top border-lg-start`}>
                    <div className="border bg-white rounded p-3 mb-3">
                        <h6>Status</h6>
                        <div className="d-flex align-items-center gap-2">
                            {allComplete ? (
                                <CheckCircle className="text-success" />
                            ) : (
                                <AlertCircle className="text-warning" />
                            )}
                            <span>
                                {allComplete ? "All Documents Verified" : "Missing Documents"}
                            </span>
                        </div>
                    </div>
                    <div className="border bg-white rounded p-3">
                        <h6>Instruction</h6>
                        <small className="text-muted">
                            Drag & drop files into each box. Click anywhere to upload if needed.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};
