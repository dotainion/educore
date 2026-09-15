import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export const PublishJob = () => {
    const [loading, setLoading] = useState(false);

    const [channels, setChannels] = useState({
        linkedin: true,
        facebook: false,
        instagram: false,
        twitter: false,
    });

    const toggleChannel = (key) => {
        setChannels((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    
    const submit = () => {
        setLoading(true);
        api.job.update({jobId, published: true}).then((response)=>{
            navigate(routes.hr.vewJob(response.data.job.id));
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    };

    const publishJob = async () => {
        setLoading(true);

        try {
            // TODO: call API
            // await api.post("/jobs/publish", { channels });

            setTimeout(() => {
                setLoading(false);
                alert("Job published successfully!");
            }, 1200);
        } catch (e) {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h4 className="fw-semibold mb-1">Publish Job</h4>
                <p className="text-muted small mb-0">
                    Distribute this job posting across your selected platforms.
                </p>
            </div>

            <div className="row g-3">
                {/* ================= JOB PREVIEW ================= */}
                <div className="col-12 col-lg-5">
                    <div className="bg-white border rounded-4 p-3 h-100">
                        <div className="text-uppercase text-muted small mb-2">
                            Job Preview
                        </div>
                        <div className="fw-semibold">Frontend Developer</div>
                        <div className="text-muted small mb-3">
                            Engineering • Full-time • Remote
                        </div>
                        <p className="small text-muted">
                            We are looking for a skilled frontend developer experienced in React,
                            API integration, and modern UI systems.
                        </p>
                        <div className="d-flex flex-wrap gap-2 mt-3">
                            <span className="badge bg-light text-dark border">React</span>
                            <span className="badge bg-light text-dark border">API</span>
                            <span className="badge bg-light text-dark border">UI/UX</span>
                        </div>
                    </div>
                </div>

                {/* ================= CHANNELS ================= */}
                <div className="col-12 col-lg-7">
                    <div className="bg-white border rounded-4 p-3">
                        <div className="text-uppercase text-muted small mb-3">
                            Distribution Channels
                        </div>
                        <div className="d-grid gap-2">
                            {/* LinkedIn */}
                            <ChannelItem
                                icon={FaLinkedinIn}
                                title="LinkedIn"
                                desc="Professional job network"
                                active={channels.linkedin}
                                onClick={()=>toggleChannel("linkedin")}
                            />

                            {/* Facebook */}
                            <ChannelItem
                                icon={FaFacebook}
                                title="Facebook"
                                desc="Social reach & community groups"
                                active={channels.facebook}
                                onClick={()=>toggleChannel("facebook")}
                            />

                            {/* Instagram */}
                            <ChannelItem
                                icon={FaInstagram}
                                title="Instagram"
                                desc="Brand visibility & stories"
                                active={channels.instagram}
                                onClick={()=>toggleChannel("instagram")}
                            />

                            {/* Twitter/X */}
                            <ChannelItem
                                icon={FaTwitter}
                                title="X (Twitter)"
                                desc="Fast job distribution"
                                active={channels.twitter}
                                onClick={() => toggleChannel("twitter")}
                            />
                        </div>

                        {/* ================= ACTION ================= */}
                        <div className="mt-4 d-flex justify-content-end">
                            <button
                                onClick={publishJob}
                                disabled={loading}
                                className="btn btn-primary px-4 d-flex align-items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        🚀 Publish Job
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

/* ================= CHANNEL ITEM ================= */
const ChannelItem = ({ icon: Icon, title, desc, active, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={onClick}
            className={`d-flex align-items-center justify-content-between p-3 border rounded-3 cursor-pointer ${
                active ? 'border-primary bg-light' : ''
            }`}
        >
            <div className="d-flex align-items-center gap-3">
                <Icon className="fs-3" />
                <div>
                    <div className="fw-semibold small">{title}</div>
                    <div className="text-muted" style={{fontSize: '12px'}}>{desc}</div>
                </div>
            </div>
            <div className="form-check form-switch m-0">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={active}
                    onChange={onClick}
                />
            </div>
        </motion.div>
    );
};