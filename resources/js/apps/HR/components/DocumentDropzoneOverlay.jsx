import { X } from "lucide-react"
import { DocumentDropzone } from "./DocumentDropzone"
import { motion } from "framer-motion"
import { useState } from "react"
import { Spinner } from "../../../global/components/Spinner"

export const DocumentDropzoneOverlay = ({ show, close, uploaded }) =>{
    const [loading, setLoading] = useState(false);

    if(!show) return null;
    return(
        <motion.div
            className="position-fixed top-0 start-0 w-100 vh-100 overflow-auto overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{zIndex: 1060}}
        >
            <div className="w-100 bg-white bg-opacity-75 d-flex align-items-center justify-content-center">
                <div className="container py-4" style={{maxWidth: '768px'}}>
                    <div className="position-sticky top-0 d-flex justify-content-end">
                        <button onClick={close} className="btn btn-sm link-danger border-0 p-0">
                            <X />
                        </button>
                    </div>
                    <DocumentDropzone saving={setLoading} onUploaded={uploaded} />
                </div>
            </div>
            <Spinner show={loading} bg="white" />
        </motion.div>
    )
}