import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiTextarea } from "../../../global/widgets/GlobalApiTextarea";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { api } from "../../../global/services/Api";
import { DropZone } from "../components/Dropzone";
import { GlobalApiToggle } from "../../../global/widgets/GlobalApiToggle";
import { useParams } from "react-router-dom";
import { useApi } from "../../../global/context/ApiProvider";
import { Clock } from "lucide-react";

export const DocumentDropzone = ({saving, onUploaded}) => {
    const { throwApiError, hasError, flushErrors } = useApi();

    const [requiredExpiration, setRequiredExpiration] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [fileTempName, setFileTempName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [form, setForm] = useState({
        documentId: '',
        documentTypeId: '',
        file: null,
        expiry: '',
        note: '',
        verified: 0
    });

    const params = useParams();

    const rule = documentTypes.find((docType)=>docType === form.documentTypeId);

    const validate = () => {
        flushErrors();
        if (!form.file) throwApiError('Please upload a document file.', 'file');
        if (!form.documentTypeId) throwApiError('Please select document type.', 'documentTypeId');
        return !hasError();
    };
    
    const renameFile = (file, fileName) => {
        const extension = file.name.substring(file.name.lastIndexOf('.'));
        return new File([file], `${fileName}${extension}`, {
            type: file.type,
            lastModified: file.lastModified,
        });
    };

    const submit = () => {
        if (!validate()) return;
        saving?.(true);

        const data = new FormData();
        Object.keys(form).forEach((key)=>data.set(key, form[key]));
        data.set('employeeId', params.userId || params.employeeId);
        
        api.onOnetimeEmptyContentType(()=>{
            api.onboarding.documents.primarykey('documentId').set(data).then((response)=>{
                setSubmitted(true);
                onUploaded?.(response.data.document);
            }).catch((error)=>{

            }).finally(()=>saving?.(false));
        });
    };

    const onFileChange = (file) => {
        if(fileTempName) file = renameFile(file, fileTempName);
        else {
            const name = file['name'];
            setFileTempName(name.substring(0, name.indexOf('.')));
        }
        setForm((p) => ({ ...p, file }));
    };

    useEffect(()=>{
        if(!form.file) return;
        setForm((prev)=>({
            ...prev,
            file: renameFile(form.file, fileTempName)
        }));
    }, [fileTempName]);

    useEffect(()=>{
        api.documentType.list().then((response)=>{
            setDocumentTypes(response.data.documentTypes);
        }).catch((error)=>{

        });
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="row g-3">
                    {/* MAIN UPLOAD */}
                    <div className={rule ? 'col-lg-8' : 'col-12'}>
                        <motion.div
                            className="p-4 border rounded-4 bg-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* TYPE */}
                            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                                <div className="flex-fill w-sm-100">
                                    <GlobalApiSelect
                                        className="form-select"
                                        label="Document Type"
                                        name="documentTypeId"
                                        value={form.documentType}
                                        onChange={(e)=>setForm((p)=>({ ...p, documentTypeId: e.target.value }))}
                                    >
                                        <option hidden value="">Select a document type</option>
                                        {documentTypes.map((docType) => (
                                            <option value={docType.id} key={docType.id}>
                                                {docType.attributes.label}
                                            </option>
                                        ))}
                                    </GlobalApiSelect>
                                </div>
                                <div className="w-sm-100">
                                    <div className="btn-group">
                                        <GlobalApiInput
                                            label="Expiry"
                                            type="date"
                                            name="expiry"
                                            className="form-control"
                                            value={form.expiry}
                                            onChange={(e) =>setForm((p) => ({ ...p, expiry: e.target.value }))}
                                        />
                                        <div className="d-flex flex-column justify-content-end">
                                            <button
                                                onClick={()=>setForm((prev)=>({...prev, expiry: ''}))}
                                                className="btn border-0"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DROPZONE */}
                            <DropZone
                                className="mb-3"
                                name="file"
                                onChange={onFileChange}
                            />

                            {/* EXTRA FIELDS */}
                            <GlobalApiInput
                                label="File Name"
                                type="text"
                                name="fileName"
                                parentClassName="mb-3"
                                className="form-control"
                                placeholder="File name"
                                value={fileTempName}
                                onChange={(e) =>setFileTempName(e.target.value)}
                            />
                            <GlobalApiTextarea
                                label="Note"
                                parentClassName="mb-3"
                                className="form-control"
                                name="note"
                                rows={3}
                                value={form.note}
                                placeholder="Add a note"
                                onChange={(e)=>setForm((p) => ({ ...p, note: e.target.value }))}
                                style={{resize: 'none'}}
                            />
                            <div className="d-flex flex-column flex-sm-row justify-content-between gap-4 mt-4">
                                <GlobalApiToggle
                                    className="text-primary w-100"
                                    name="verified"
                                    trailing="Mark document as verified"
                                    checked={form.verified}
                                    onChange={(e)=>setForm((p) => ({ ...p, verified: e.target.checked ? 1 : 0 }))}
                                />
                                <button onClick={submit} className="btn btn-sm btn-primary">
                                    Upload Document
                                </button>
                            </div>
                            {submitted && (
                                <div className="alert alert-success mt-3 py-2 small">
                                    Submitted to <b>Inbox</b>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {rule && (
                        <div className="col-lg-4">
                            <div className="p-3 border rounded-4 bg-white">
                                <h6 className="mb-2">Workflow</h6>
                                <div className="small text-muted mb-2">
                                    Risk: <b>{rule.attributes.risk}</b>
                                </div>
                                <div className="small text-muted mb-3">
                                    Auto Approve: <b>{rule.attributes.autoApprove ? 'Yes' : 'No'}</b>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    {rule.attributes.steps.map((step, i) => (
                                        <div className="d-flex align-items-center gap-2" key={`step-${step}-${i}`}>
                                            <div className="rounded-circle bg-primary" style={{width: 8, height: 8}}/>
                                            <div className="small">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};