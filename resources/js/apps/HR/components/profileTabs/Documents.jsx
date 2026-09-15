import { useEffect, useState } from "react";
import { api } from "../../../../global/services/Api";
import { motion } from "framer-motion";
import { Spinner } from "../../../../global/components/Spinner";
import { FaDownload } from "react-icons/fa";
import { DocumentDropzoneOverlay } from "../DocumentDropzoneOverlay";
import axios from "axios";
import { token } from "../../../../global/utils/Token";

export const Documents = () =>{
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const imgSize = 70;

    const onLoaded = (doc) =>{
        setDocuments((docs)=>[doc, ...docs]);
        setOpen(false);
    }

    useEffect(()=>{
        api.document.list().then((response)=>{
            setDocuments(response.data.documents);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="d-flex justify-content-between gap-3 mb-3">
                <h6>Documents</h6>
                <div>
                    <button onClick={()=>setOpen(true)} className="btn btn-sm btn-light d-flex align-items-center gap-2">
                        <FaDownload className="text-primary" />
                        Upload
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="position-relative py-4">
                    <Spinner show absolute md bg="white" />
                </div>
            ):(
                <div className="list-group text-break">
                    {documents.map((document)=>(
                        <div className="list-group-item d-flex justify-content-between gap-3" key={document.id}>
                            <div className="d-flex gap-3">
                                <div
                                    className="rounded-4 border overflow-hidden"
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
                                        src={document.attributes.url}
                                        alt={document.attributes.documentType.attributes.name}
                                    />
                                </div>
                                <div>
                                    <h6>{document.attributes.documentType.attributes.name}</h6>
                                    <div>{document.attributes.originalName}</div>
                                    <div className="d-flex flex-wrap gap-2 small text-muted">Expiry: {document.attributes.expiry}</div>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                {document.attributes.verified ? (
                                    <span className="badge bg-success">Verified</span>
                                ):(
                                    <span className="badge bg-warning">Verified</span>
                                )}
                                <a
                                    href={document.attributes.url}
                                    className="btn btn-sm btn-outline-primary"
                                    target="_blank"
                                >View</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <DocumentDropzoneOverlay
                show={open}
                close={()=>setOpen(false)}
                uploaded={onLoaded}
            />
        </motion.div>
    )
}
