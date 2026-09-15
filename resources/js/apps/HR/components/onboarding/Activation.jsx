import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, AlertCircle, User, Briefcase, Mail, Phone, ArrowRight } from "lucide-react";
import { api } from "../../../../global/services/Api";
import { BsArrowLeft } from "react-icons/bs";
import { ApplicantStatusButton } from "../ApplicantStatusButton";
import { routes } from "../../../../global/routes/Routes";
import { FiArrowLeft } from "react-icons/fi";
import { Spinner } from "../../../../global/components/Spinner";
import { useSmartNavigate } from "../../../../global/hooks/useSmartNavigate";

export const Activation = ({ applicant, employee, fullscreen }) => {
    const [hired, setHired] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useSmartNavigate({referrer: routes.hr.onboarding.HRSetup(applicant.id)});

    const readyForActivation = useMemo(() => {
        if(!hired) return false;
        return hired.attributes.jobAccepted && applicant.attributes.status === 'activation';
    }, [hired, applicant.attributes.status]);

    const handleConvert = async () => {
        if (!readyForActivation) return console.error('Required user input first.');
        navigate(routes.hr.onboarding.employee.convertToEmployeeProfile(applicant.id));
    };

    useEffect(()=>{
        api.hired.find({applicantId: applicant.id}).then((response)=>{
            setHired(response.data.hired);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container bg-white border rounded">
            {/* HEADER */}
            <div className="p-2 p-md-4 border-bottom bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                    <h4 className="mb-1">Activation</h4>
                    <small className="text-muted">Convert applicant into employee</small>
                </div>
                <span className={`badge mt-2 mt-md-0 bg-${employee ? 'success' : 'warning text-dark'}`}>
                    {employee ? 'Employee Created' : 'Pending Activation'}
                </span>
            </div>

            {loading ? (
                <div className="position-relative py-5">
                    <Spinner show absolute md bg="white" />
                </div>
            ) : (
                <div className="row m-0 text-break">
                    {/* MAIN */}
                    <div className="col-12 p-3 p-md-4">
                        {/* APPLICANT */}
                        <div className="border rounded p-3 p-md-4 mb-3">
                            <h5 className="mb-3 d-flex align-items-center gap-2">
                                <Briefcase size={18} /> Applicant
                            </h5>
                            <div className="row text-sm">
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 mb-2`}>
                                    <strong className="text-nowrap">Name:</strong>{' '}
                                    {applicant.attributes.firstName} {applicant.attributes.lastName}
                                </div>
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 align-items-center mb-2`}>
                                    <div><Mail size={14} /></div> {applicant.attributes.email}
                                </div>
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 align-items-center mb-2`}>
                                    <div><Phone size={14} /></div> {applicant.attributes.contact}
                                </div>
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 mb-2`}>
                                    <strong className="text-nowrap">Position:</strong> {applicant.attributes.position}
                                </div>
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 mb-2`}>
                                    <strong className="text-nowrap">Experience:</strong> {applicant.attributes.experience}
                                </div>
                                <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} d-flex gap-2 mb-2`}>
                                    <strong className="text-nowrap">Status:</strong> {applicant.attributes.status}
                                </div>
                            </div>
                        </div>

                        {/* VALIDATION */}
                        <div className="border rounded p-3 p-md-4 mb-3">
                            <h5>Validation</h5>
                            <ChecklistItem
                                checked={applicant.attributes.status === "hired"}
                                label="Hired Status"
                            />
                            {!readyForActivation && (
                                <div className="text-danger small mt-2">
                                    Not ready for activation
                                </div>
                            )}
                        </div>

                        {/* ACTION */}
                        {!employee && (
                            <div className="d-flex flex-sm-row flex-column justify-content-between gap-3 mt-4">
                                <ApplicantStatusButton
                                    className="btn w-100 w-md-auto btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                                    payload={{status: 'hired', applicantId: applicant.id}}
                                    to={routes.hr.recruitment.board(applicant.attributes.job.id)}
                                >
                                    <FiArrowLeft />
                                    Move back to hire process
                                </ApplicantStatusButton>
                                <button
                                    onClick={handleConvert}
                                    disabled={!readyForActivation}
                                    className={`btn w-100 w-md-auto btn-sm btn-${readyForActivation ? 'primary' : 'secondary'}`}
                                >
                                    Convert to Employee
                                </button>
                            </div>
                        )}

                        {/* EMPLOYEE */}
                        {employee && (
                            <div className="border rounded p-3 p-md-4 mt-3">
                                <h5 className="d-flex align-items-center gap-2 mb-3">
                                    <User size={18} /> Employee
                                </h5>
                                <div className="row">
                                    <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} mb-2`}>
                                        <strong>ID:</strong> {employee.attributes.employeeId}
                                    </div>
                                    <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} mb-2`}>
                                        <strong>Name:</strong>{" "}
                                        {employee.attributes.firstName} {employee.attributes.lastName}
                                    </div>
                                    <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} mb-2`}>
                                        <strong>Email:</strong> {employee.attributes.email}
                                    </div>
                                    <div className={`col-12 ${fullscreen ? 'col-md-6' : ''} mb-2`}>
                                        <strong>Contact:</strong> {employee.attributes.contact}
                                    </div>
                                </div>
                                <button className="btn btn-success mt-3 d-flex gap-2 align-items-center m-auto">
                                    Move to HR Setup <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const ChecklistItem = ({ checked, label }) =>{
    return (
        <div className="d-flex align-items-center gap-2 mt-2">
            {checked ? (
                <CheckCircle className="text-success" size={16} />
            ) : (
                <AlertCircle className="text-muted" size={16} />
            )}
            <span className="small">{label}</span>
        </div>
    );
}
