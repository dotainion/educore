import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../global/components/Spinner";
import { api } from "../../../global/services/Api";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { GlobalApiTextarea } from "../../../global/widgets/GlobalApiTextarea";
import { useSmartRedirect } from "../../../global/hooks/useSmartRedirect";
import { useAuth } from "../../../global/context/AuthProvider";

export const CreateSchedule = () => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [interviewers, setInterviewers] = useState([]);
    const [schedule, setSchedule] = useState();
    const [applicant, setApplicant] = useState();
    const [form, setForm] = useState({
        scheduleId: null,
        type: '',
        duration: '',
        time: '',
        interviewerId: '',
        notes: ''
    });

    const params = useParams();
    const redirect = useSmartRedirect();

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setSaving(true);

        const data = {
            ...form,
            userId: params.applicantId,
            createdById: user.id,
            modelName: 'applicant',
        };

        (data.scheduleId
            ? api.schedule.update(data)
            : api.schedule.create(data)
        ).then((response)=>{
            redirect();
        }).catch((error)=>{

        }).finally(()=>setSaving(false));
    };

    useEffect(() => {
        Promise.allSettled([
            api.schedule.find({userId: params.applicantId}).then((response)=>{
                setSchedule(response.data.schedule);
            }).catch((error)=>{

            }),
            api.applicant.find({applicantId: params.applicantId}).then((response)=>{
                console.log(response.data.applicant);
                setApplicant(response.data.applicant);
            }).catch((error)=>{

            }),
            api.employee.list({}).then((response)=>{
                setInterviewers(response.data.users);
            }).catch((error)=>{

            })
        ]).finally(()=>setLoading(false));
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner show />
        </div>
    );

    return (
        <div className="container py-4">
            <div className="mx-auto" style={{ maxWidth: "720px" }}>
                <div className="mb-3">
                    <h5 className="fw-semibold mb-1">Create Schedule</h5>
                    <div className="fw-semibold">{applicant.attributes.fullName}</div>
                    <div className="text-muted small">{applicant.attributes.email}</div>
                </div>
                {/* ALERT */}
                <div className="alert alert-warning py-2 small">
                    This schedule will be linked to this user and stored in the HR scheduling system.
                </div>
                {/* FORM */}
                <form onSubmit={submit}>
                    {/* TYPE */}
                    <div className="mb-3">
                        <label className="form-label small text-muted">Schedule Type</label>
                        <GlobalApiSelect
                            className="form-select"
                            name="type"
                            value={form.type}
                            onChange={change}
                            required
                        >
                            <option value="" hidden>Select schedule type</option>
                            {/* Hiring Pipeline */}
                            <option value="screening">Screening</option>
                            <option value="initial_interview">Initial Interview</option>
                            <option value="technical_interview">Technical Interview</option>
                            <option value="hr_interview">HR Interview</option>
                            <option value="final_interview">Final Interview</option>
                            <option value="panel_interview">Panel Interview</option>
                            {/* Rescheduling */}
                            <option value="reschedule_interview">Reschedule Interview</option>
                            <option value="reschedule_screening">Reschedule Screening</option>
                            <option value="cancel_interview">Cancel Interview</option>
                            <option value="follow_up_interview">Follow-up Interview</option>
                            {/* Operations */}
                            <option value="training">Training Session</option>
                            <option value="onboarding">Onboarding Session</option>
                            <option value="assessment">Assessment / Test</option>
                            <option value="feedback_review">Feedback Review</option>
                            {/* Special */}
                            <option value="availability_check">Availability Check</option>
                            <option value="emergency_meeting">Emergency Meeting</option>
                            <option value="re_evaluation">Re-evaluation</option>
                        </GlobalApiSelect>
                    </div>

                    {/* DATE + DURATION */}
                    <div className="row g-2">
                        <div className="col-6">
                            <label className="form-label small text-muted">Date & Time</label>
                            <GlobalApiInput
                                type="datetime-local"
                                className="form-control"
                                name="time"
                                value={form.time}
                                onChange={change}
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label small text-muted">Duration</label>
                            <GlobalApiSelect
                                className="form-select"
                                name="duration"
                                value={form.duration}
                                onChange={change}
                                required
                            >
                                <option value="" hidden>Select duration</option>
                                <option value="15min">15 minutes</option>
                                <option value="30min">30 minutes</option>
                                <option value="45min">45 minutes</option>
                                <option value="1hr">1 hour</option>
                                <option value="1.5hr">1.5 hours</option>
                                <option value="2hr">2 hours</option>
                                <option value="3hr">3 hours</option>
                            </GlobalApiSelect>
                        </div>
                    </div>
                    {/* INTERVIEWER */}
                    <div className="mt-3">
                        <label className="form-label small text-muted">Interviewer</label>
                        <GlobalApiSelect
                            className="form-select"
                            name="interviewerId"
                            value={form.interviewerId}
                            onChange={change}
                            required
                        >
                            <option value="" hidden>Select interviewer</option>
                            {interviewers.map((i) => (
                                <option value={i.id} key={i.id}>{i.attributes.fullName}</option>
                            ))}
                        </GlobalApiSelect>
                    </div>
                    <div className="mt-3">
                        <label className="form-label small text-muted">Notes</label>
                        <GlobalApiTextarea
                            className="form-control"
                            rows={4}
                            name="notes"
                            value={form.notes}
                            onChange={change}
                            placeholder="Add instructions, context, expectations..."
                        />
                    </div>
                    <div className="d-flex justify-content-center w-100 mt-4 py-2">
                        <button
                            className="btn btn-sm btn-primary px-4"
                            disabled={saving}
                        >
                            {saving ? 'Creating...' : 'Create Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};