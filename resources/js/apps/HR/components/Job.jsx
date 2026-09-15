import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GlobalApiToggle } from "../../../global/widgets/GlobalApiToggle";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { GlobalApiTextarea } from "../../../global/widgets/GlobalApiTextarea";
import { useApi } from "../../../global/context/ApiProvider";
import { DepartmentSelect } from "./DepartmentSelect";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { api } from "../../../global/services/Api";
import { routes } from "../../../global/routes/Routes";
import { useNavigate } from "react-router-dom";
import { ManagerSelect } from "./ManagerSelect";
import { useSearchCallback } from "../../../global/hooks/useSearchCallback";

export const Job = ({ job: jobData, onSubmit, autoSubmit, readOnly }) => {
    const { throwApiError, flushErrors, hasError } = useApi();

    const [skillInput, setSkillInput] = useState('');
    const [job, setJob] = useState({
        jobId: '',
        title: '',
        department: '',
        employmentType: 'fulltime',
        interviewerId: '',
        workplace: '',
        location: 'office',
        description: '',
        responsibilities: '',
        benefits: '',
        salaryMin: 0,
        salaryMax: 0,
        currency: 'ECD',
        payType: 'monthly',
        showSalary: true,
        experienceLevel: '',
        minExperience: '',
        education: '',
        skills: [],
        documents: [],
        deadline: '',
        applicationType: 'internal',
        status: 'open',
        featured: true,
        published: false,
        hires: 1,
    });

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const update = (k, v) =>{
        setJob(p=>({...p, [k]: v}));
    }

    const addSkill = () => {
        flushErrors('skills');
        let hasError = false;
        const value = skillInput.trim();
        if (!value) hasError = throwApiError('Enter a skill', 'skills');
        if (job.skills.includes(value)) hasError = throwApiError('Skill already added', 'skills');
        if(hasError) return;

        update('skills', [...job.skills, value]);
        setSkillInput('');
    };

    const removeSkill = (i) => {
        update('skills', job.skills.filter((_, idx) => idx !== i));
    };

    const validate = () => {
        flushErrors();
        if (!job.title) throwApiError('Job title required', 'title');
        if (!job.department) throwApiError('Department required', 'department');
        if (!job.location) throwApiError('Location required', 'location');
        if (!job.description) throwApiError('Description required', 'description');
        if (!job.responsibilities) throwApiError('Responsibilities required', 'responsibilities');
        if (!job.benefits) throwApiError('Benefits required', 'benefits');
        if (!job.skills.length) throwApiError('Add at least one skill', 'skills');
        if (!job.deadline) throwApiError('Deadline required', 'deadline');
        if (!job.hires || job.hires < 1) throwApiError('Invalid hires count', 'hires');
        return !hasError();
    };

    const submit = () =>{
        if (!validate()) return;
        let data = { ...job }
        if(autoSubmit){
            let skimedData = {};
            Object.keys(data).forEach((key)=>{
                if(typeof data[key] === 'string' && !data[key]) return;
                skimedData[key] = data[key];
            });
            data = skimedData;
        }
        onSubmit?.(data);
    }

    const autoTriggerSubmit = useSearchCallback((e) =>{
        if(!autoSubmit) return;

        flushErrors();
        clearTimeout(timeoutRef.current);

        let value = e.target.value;
        if(e.target.type === 'checkbox'){
            value = e.target.checked;
        }
        onSubmit?.({[e.target.name]: value});
    });

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    useEffect(()=>{
        if(!jobData) return;
        setJob(jobData);
    }, [jobData]);

    return (
        <div onChange={autoTriggerSubmit}>
            <motion.div
                className="container pb-3"
                style={{ maxWidth: 820 }}
                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className="rounded-3 pb-3 mb-3">
                    <div className="fw-semibold mb-2">Core Information</div>
                    <div className="mb-3">
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Job Title"
                            name="title"
                            value={job.title}
                            placeholder="e.g. Senior Developer"
                            onChange={(e) => update("title", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>

                    <div className="mb-3">
                        <GlobalApiSelect
                            className="form-select rounded-3 border"
                            label="Application Type"
                            name="applicationType"
                            value={job.applicationType}
                            onChange={(e) => update('applicationType', e.target.value)}
                            readOnly={readOnly}
                        >
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                        </GlobalApiSelect>
                    </div>

                    <div className="row g-2">
                        <div className="col-6">
                            <div className="mb-3">
                                <DepartmentSelect
                                    className="form-select rounded-3 border"
                                    label="Department"
                                    name="department"
                                    value={job.department}
                                    valueAsName
                                    onChange={(e) => update("department", e.target.value)}
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <ManagerSelect
                                    className="form-select rounded-3 border"
                                    label="Interviewer"
                                    name="interviewerId"
                                    value={job.interviewerId}
                                    onChange={(e) => update("interviewerId", e.target.value)}
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row g-2">
                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiSelect
                                    className="form-select rounded-3 border"
                                    label="Employment Type"
                                    name="employmentType"
                                    value={job.employmentType}
                                    onChange={(e) => update("employmentType", e.target.value)}
                                    readOnly={readOnly}
                                >
                                    <option value="fulltime">Full-time</option>
                                    <option value="parttime">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="intern">Intern</option>
                                </GlobalApiSelect>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiSelect
                                    className="form-select rounded-3 border"
                                    label="Location"
                                    name="location"
                                    value={job.location}
                                    onChange={(e) => update("location", e.target.value)}
                                    readOnly={readOnly}
                                >
                                    <option value="remote">Remote</option>
                                    <option value="office">Office</option>
                                    <option value="hybrid">Hybrid</option>
                                </GlobalApiSelect>
                            </div>
                        </div>
                    </div>

                    <div>
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Workplace"
                            name="workplace"
                            value={job.workplace}
                            placeholder="Optional location detail"
                            onChange={(e) => update("workplace", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>
                </div>

                <div className="border-top"></div>

                <div className="mb-3 rounded-3 py-3">
                    <div className="fw-semibold mb-2">Job Content</div>
                    <div className="mb-3">
                        <GlobalApiTextarea
                            className="form-control rounded-3 border"
                            label="Description"
                            name="description"
                            value={job.description}
                            placeholder="Describe the role..."
                            onChange={(e) => update("description", e.target.value)}
                            readOnly={readOnly}
                            rows={3}
                        />
                    </div>

                    <div className="mb-3">
                        <GlobalApiTextarea
                            className="form-control rounded-3 border"
                            label="Responsibilities"
                            name="responsibilities"
                            value={job.responsibilities}
                            placeholder="List responsibilities..."
                            onChange={(e) => update("responsibilities", e.target.value)}
                            readOnly={readOnly}
                            rows={3}
                        />
                    </div>

                    <div>
                        <GlobalApiTextarea
                            className="form-control rounded-3 border"
                            label="Benefits"
                            name="benefits"
                            value={job.benefits}
                            placeholder="e.g. health insurance..."
                            onChange={(e) => update("benefits", e.target.value)}
                            readOnly={readOnly}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="border-top"></div>

                <div className="mb-3 rounded-3 py-3">
                    <div className="fw-semibold mb-2">Compensation</div>
                    <div className="row g-2">
                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiInput
                                    className="form-control rounded-3 border"
                                    label="Min Salary"
                                    name="salaryMin"
                                    value={job.salaryMin}
                                    onChange={(e) => update("salaryMin", e.target.value)}
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiInput
                                    className="form-control rounded-3 border"
                                    label="Max Salary"
                                    name="salaryMax"
                                    value={job.salaryMax}
                                    onChange={(e) => update("salaryMax", e.target.value)}
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row g-2">
                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiSelect
                                    className="form-select rounded-3 border"
                                    label="Currency"
                                    name="currency"
                                    value={job.currency}
                                    onChange={(e) => update("currency", e.target.value)}
                                    readOnly={readOnly}
                                >
                                    <option value="ECD">ECD</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </GlobalApiSelect>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="mb-3">
                                <GlobalApiSelect
                                    className="form-select rounded-3 border"
                                    label="Pay Type"
                                    name="payType"
                                    value={job.payType}
                                    onChange={(e) => update("payType", e.target.value)}
                                    readOnly={readOnly}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="hourly">Hourly</option>
                                </GlobalApiSelect>
                            </div>
                        </div>
                    </div>

                    <GlobalApiToggle
                        name="showSalary"
                        trailing="Show Salary"
                        value={job.showSalary}
                        onChange={(v) => update("showSalary", v)}
                        readOnly={readOnly}
                    />
                </div>

                <div className="border-top"></div>

                <div className="mb-3 rounded-3 py-3">
                    <div className="fw-semibold mb-2">Requirements</div>
                    <div className="mb-3">
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Experience Level"
                            name="experienceLevel"
                            value={job.experienceLevel}
                            onChange={(e) => update("experienceLevel", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>

                    <div className="mb-3">
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Min Experience"
                            name="minExperience"
                            value={job.minExperience}
                            onChange={(e) => update("minExperience", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>

                    <div className="mb-3">
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Education"
                            name="education"
                            value={job.education}
                            onChange={(e) => update("education", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>

                    <motion.div variants={item} className="mt-3">
                        <div className="text-muted small mb-1">Skills</div>
                        
                        {!readOnly && (
                            <div className="d-flex gap-2">
                                <div className="flex-fill">
                                    <GlobalApiInput
                                        className="form-control rounded-3"
                                        name="skills"
                                        value={skillInput}
                                        onChange={(e)=>setSkillInput(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button className="btn btn-dark" onClick={addSkill}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="d-flex flex-wrap gap-1 mt-2">
                            {job.skills.map((s, i) => (
                                <motion.span
                                    onClick={()=>removeSkill(i)}
                                    className="bg-primary text-white rounded-pill pointer d-flex align-items-center gap-1 px-2"
                                    key={i}
                                >
                                    {s}
                                    <span>×</span>
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="border-top"></div>

                <div className="mb-3 rounded-3 py-3">
                    <div className="fw-semibold mb-2">Hiring Info</div>
                    <div className="mb-3">
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Deadline"
                            name="deadline"
                            type="date"
                            value={job.deadline}
                            onChange={(e) => update("deadline", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>

                    <div>
                        <GlobalApiInput
                            className="form-control rounded-3 border"
                            label="Hires"
                            name="hires"
                            value={job.hires}
                            onChange={(e) => update("hires", e.target.value)}
                            readOnly={readOnly}
                        />
                    </div>
                </div>

                <div className="border-top"></div>
            
                <div className="list-group pt-3">
                    <label className={`${readOnly ? '' : 'list-group-item list-group-item-action'}`}>
                        <GlobalApiToggle
                            name="featured"
                            trailing="Featured"
                            onChange={(e) => update("featured", e.target.checked)}
                            defaultChecked={job.featured}
                            readOnly={readOnly}
                        />
                    </label>
                </div>
            </motion.div>
            {!autoSubmit && !readOnly && (
                <div className="d-flex justify-content-end p-3">
                    <GlobalApiSubmit onClick={submit} className="btn btn-sm btn-dark rounded-pill px-4">
                        Save
                    </GlobalApiSubmit>
                </div>
            )}
        </div>
    );
};

