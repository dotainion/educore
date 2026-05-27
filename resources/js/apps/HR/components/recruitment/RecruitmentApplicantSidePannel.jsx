import React, { useState, useMemo, useEffect, useRef } from "react";
import { api } from "../../../../global/services/Api";
import { ApplicantStatusButton } from "../ApplicantStatusButton";
import { Applied } from "./Applied";
import { Screening } from "./Screening";
import { Interview } from "./Interview";
import { Offer } from "./Offer";
import { Hired } from "./Hired";
import { Rejected } from "./Rejected";
import { BiArrowToBottom } from "react-icons/bi";
import { motion } from "framer-motion";
import { KanbanSidePannel } from "../KanbanSidePannel";

export const RecruitmentApplicantSidePannel = ({ item, close, updateApplicant, removeApplicant }) => {
    const [fullscreen, setFullscreen] = useState(false);
    return (
        <KanbanSidePannel status={item.attributes.status} close={close} captureScreen={setFullscreen}>
            <div className="text-muted fw-semibold mb-2">{item.attributes.position}</div>
            <div className="mb-3 small">
                <h5 className="mb-2">{item.attributes.fullName}</h5>
                <div className="text-muted">
                    {item.attributes.email} • {item.attributes.contact}
                </div>
                <div className="small">{item.attributes.createdAt.split('.')[0].replace('T', ' ')}</div>
            </div>

            {/* ================= LAYOUT ================= */}
            <div className="row g-3">

                {/* LEFT */}
                <div className="col-12">
                    {/* BASIC PROFILE */}
                    <div className="card border mb-3">
                        <div className="card-body">
                            <h6 className="text-muted">Profile</h6>
                            <div className="small text-muted">Skills:</div>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {item.attributes.skills.map((skill)=>(
                                    <span className="small rounded-pill bg-light px-3" key={skill}>{skill}</span>
                                ))}
                            </div>
                            <div className="small text-muted">Experience:</div>
                            <div className="small bg-light rounded-3 p-2">{item.attributes.experience}</div>
                        </div>
                    </div>

                    {/* DOCUMENTS */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <h6 className="text-muted">Documents</h6>

                            <div className="row g-2">
                                {(item.attributes.documents || []).map((doc, i) => (
                                    <div className="col-6" key={i}>
                                        <a className="card action border rounded p-2 text-center text-decoration-none" href={doc.attributes.url} target="_blank" rel="noreferrer">
                                            <div className="fs-3">📄</div>
                                            <div className="small text-truncate">
                                                {doc.attributes.name || `Document ${i + 1}`}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-12">

                </div>
            </div>

            <Applied item={item} onUpdate={updateApplicant} fullscreen={fullscreen} />
            <Screening item={item} onUpdate={updateApplicant} fullscreen={fullscreen} />
            <Interview item={item} onUpdate={updateApplicant} fullscreen={fullscreen} />
            <Offer item={item} onUpdate={updateApplicant} fullscreen={fullscreen} />
            <Hired item={item} onUpdate={updateApplicant} fullscreen={fullscreen} />
            <Rejected item={item} onUpdate={updateApplicant} fullscreen={fullscreen} onRemove={removeApplicant} />

        </KanbanSidePannel>
    );
};
