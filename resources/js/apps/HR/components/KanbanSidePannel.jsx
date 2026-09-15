import React, { useState, useMemo, useEffect, useRef } from "react";
import { api } from "../../../global/services/Api";
import { ApplicantStatusButton } from "./ApplicantStatusButton";
import { Applied } from "./recruitment/Applied";
import { Screening } from "./recruitment/Screening";
import { Interview } from "./recruitment/Interview";
import { Offer } from "./recruitment/Offer";
import { Hired } from "./recruitment/Hired";
import { Rejected } from "./recruitment/Rejected";
import { BiDownArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";

export const KanbanSidePannel = ({ status, close, captureScreen, children }) => {
    const [fullscreen, setFullscreen] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const [neverShown, setNeverShown] = useState(true);


    const containerRef = useRef();

    const OFFSET = 30;

    const scroll = (e) =>{
        const height = containerRef.current.scrollHeight;
        const top = containerRef.current.scrollTop;
        const client = containerRef.current.clientHeight;
        if(e.type === 'scroll' && !showIndicator){
            setNeverShown(false);
        }
        setShowIndicator(!((top + client + OFFSET) >= height));  
    }

    const toBottom = () =>{
        containerRef.current.scrollTo({
            behavior: 'smooth',
            top: containerRef.current.scrollHeight,
        });
    }
    
    const style = fullscreen
        ? { inset: 0, zIndex: 9999 }
        : { top: 0, right: 0, width: '400px', height: '100vh', zIndex: 1050 };

    useEffect(()=>{
        scroll({type: 'invoke'});
        captureScreen(fullscreen);
    }, [fullscreen]);

    return (
        <div className="bg-white position-fixed top-0 end-0 shadow vh-100 w-sm-100" style={style}>
            <div ref={containerRef} onScroll={scroll} className="position-relative overflow-auto w-100 h-100">
                <div className="container p-2 pt-0 p-md-3">
                    <div className="position-sticky top-0 d-flex justify-content-between gap-2 pt-2" style={{zIndex: 1050}}>
                        <div>
                            <div className="badge bg-primary text-uppercase">{status}</div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-end gap-2 mb-2">
                                <button className="btn btn-sm btn-light" onClick={()=>setFullscreen(!fullscreen)}>
                                    {fullscreen ? '🗗' : '⛶'}
                                </button>
                                <button className="btn btn-sm btn-light text-danger" onClick={close}>
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            {showIndicator && neverShown && (
                <motion.div
                    className="position-absolute start-50 bottom-0 translate-middle-x mb-5"
                    style={{ zIndex: 1550 }}
                >
                    <button onClick={toBottom} className="btn btn-light bounce border rounded-circle d-block mx-auto p-1">
                        <BiDownArrowAlt className="text-primary fs-3" />
                    </button>
                    <div className="border-top border-0 border-2 border-primary"></div>
                </motion.div>
            )}
        </div>
    );
};
