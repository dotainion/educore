import { CheckCircle, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ApiErrorWrapper } from "../../../global/components/ApiErrorWrapper";

export const DropZone = ({ name, label, className, file: defaultFile, onDrop, onSelect, onChange }) =>{
    const [file, setFile] = useState();

    const fileRef = useRef();
    const errorRef = useRef();

    const Icon = file ? CheckCircle : UploadCloud;

    const change = (files) =>{
        errorRef.current.setValueAndTriggerChange(JSON.stringify(files[0]));
        onChange?.(files[0]);
    }
    
    const onFileDrop = (e, key) => {
        e.preventDefault();
        if (!e.dataTransfer.files.length) return;
        setFile(e.dataTransfer.files[0]);
        onDrop?.(e);
        change?.(e.dataTransfer.files);
    }

    const onFileSelect = (e) =>{
        if (!e.target.files.length) return;
        setFile(e.target.files[0]);
        onSelect?.(e);
        change?.(e.target.files);
    }

    useEffect(()=>{
        if(!defaultFile || defaultFile === file) return;
        setFile(defaultFile);
    }, [defaultFile]);

    useEffect(()=>{
        const copy = JSON.stringify(file);
        errorRef.current.value = copy;
    }, []);

    return (
        <div className={className}>
            <ApiErrorWrapper ref={errorRef} name={name}>
                {(attributes)=>(
                    <div
                        {...attributes}
                        className={`card action border border-dashed border-2 pointer rounded-4 p-4 text-center position-relative ${
                            file ? 'border-secondary bg-light' : ''
                        } overflow-hidden`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onFileDrop}
                        onClick={() => fileRef.current.click()}
                        style={{ minHeight: '110px' }}
                    >
                        <input
                            ref={fileRef}
                            type="file"
                            hidden
                            onChange={onFileSelect}
                        />
                        {attributes.className.includes('is-invalid') && (
                            <div className="position-absolute top-0 end-0 text-danger fs-5 fw-bold mt-3 me-3">
                                <div
                                    className="rounded-circle border border-danger border-2 d-flex align-items-center justify-content-center"
                                    style={{width: '30px', height: '30px'}}
                                >!</div>
                            </div>
                        )}
                        <Icon className="text-secondary mx-auto mb-2" size={40} />
                        <div className="fw-medium">{label || 'Upload File'}</div>
                        {file ? (
                            <div className="small text-muted text-truncate">{file.name}</div>
                        ) : (
                            <div className="small text-muted">
                                Drag & drop file here or tap to upload
                            </div>
                        )}
                    </div>
                )}
            </ApiErrorWrapper>
        </div>
    );
}