import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../service/Api";
import { routes } from "../routes/Routes";

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const getAge = (dob) => {
    if (!dob) return null;

    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export const Student = () => {
    const { studentId } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const links = {
        information: routes.editStudent.information(studentId),
        address: routes.editStudent.address(studentId),
        guardian: routes.editStudent.guardian(studentId),
        contacts: routes.editStudent.contacts(studentId),
        medical: routes.editStudent.medical(studentId),
        documents: routes.editStudent.documents(studentId),
    };

    useEffect(() => {
        setLoading(true);
        setError("");

        api.get('/student/find', {
            params: { studentId: '2826f7ce-6b17-49a2-9af8-116edaa9a239' },
        }).then((response) => {
            setStudent(response.data.student);
        }).catch((error) => {
            setError(error.response?.data?.message || "Unable to load this student record.");
        }).finally(() => setLoading(false));
    }, [studentId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border spinner-border-sm text-primary">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !student) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-person-exclamation display-5 text-secondary"></i>
                <h5 className="fw-semibold mt-3">Student record unavailable</h5>
                <p className="text-secondary mb-0">
                    {error || "The requested student could not be found."}
                </p>
            </div>
        );
    }

    const age = getAge(student.attributes.dob);

    const active = String(student.attributes.status || "").toLowerCase() === "active";

    return (
        <div className="container-fluid px-0">

            {/* Breadcrumb and page actions */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <div className="small text-secondary mb-2">
                        <Link
                            to="/student"
                            className="text-decoration-none text-secondary"
                        >
                            Students
                        </Link>
                        <i className="bi bi-chevron-right mx-2"></i>
                        <span className="text-body">Student profile</span>
                    </div>

                    <h4 className="fw-bold mb-0">Student Profile</h4>
                </div>

                <Link
                    to={links.information}
                    className="btn btn-primary btn-sm px-3"
                >
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit profile
                </Link>
            </div>

            {/* Profile identity */}
            <div className="bg-body border rounded-3 p-3 p-md-4 mb-4">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-3 flex-shrink-0 p-3">
                        {[student.attributes.firstName, student.attributes.lastName]
                            .filter(Boolean)
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("") || <i className="bi bi-person"></i>}
                    </div>

                    <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                            <h4 className="fw-bold mb-0">{student.attributes.fullName}</h4>
                            <span
                                className={`badge rounded-pill fw-medium ${
                                    active
                                        ? "bg-success-subtle text-success"
                                        : "bg-secondary-subtle text-secondary"
                                }`}
                            >
                                {student.attributes.status || "Unknown"}
                            </span>
                        </div>

                        <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small">
                            {student.attributes.gender && <span>{student.attributes.gender}</span>}
                            {student.attributes.gender && student.attributes.dob && <span>·</span>}
                            {student.attributes.dob && (
                                <span>
                                    {formatDate(student.attributes.dob)}
                                    {age !== null && ` (${age} years)`}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row g-3">
                    <div className="col-6 col-md-3">
                        <div className="small text-secondary mb-1">
                            Enrolment date
                        </div>
                        <div className="fw-semibold">
                            {formatDate(student.attributes.enrolmentDate)}
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="small text-secondary mb-1">
                            Enrolment type
                        </div>
                        <div className="fw-semibold">
                            {student.attributes.enrolmentType || "—"}
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="small text-secondary mb-1">
                            Nationality
                        </div>
                        <div className="fw-semibold">
                            {student.attributes.nationality || "—"}
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="small text-secondary mb-1">
                            Religion
                        </div>
                        <div className="fw-semibold">
                            {student.attributes.religion || "—"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile content */}
            <div className="row g-4">

                {/* Main details */}
                <div className="col-lg-8">

                    <div className="bg-body border rounded-3 p-3 p-md-4 mb-4">
                        <Section
                            title="Personal information"
                            subtitle="Basic details and personal identification."
                            action={
                                <SectionLink to={links.information}>
                                    Manage
                                </SectionLink>
                            }
                        >
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <Detail label="First name" value={student.attributes.firstName} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Middle name" value={student.attributes.middleName} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Last name" value={student.attributes.lastName} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Date of birth" value={formatDate(student.attributes.dob)} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Gender" value={student.attributes.gender} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Nationality" value={student.attributes.nationality} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Religion" value={student.attributes.religion} />
                                </div>
                            </div>
                        </Section>

                        <hr className="my-4" />

                        <Section
                            title="Contact details"
                            subtitle="Student's primary contact information."
                            action={
                                <SectionLink to={links.address}>
                                    Manage
                                </SectionLink>
                            }
                        >
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <Detail label="Phone number" value={student.attributes.phone} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Email address" value={student.attributes.email} />
                                </div>
                            </div>
                        </Section>

                        <hr className="my-4" />

                        <Section
                            title="Parent information"
                            subtitle="Primary parent or contact information recorded at enrolment."
                            action={
                                <SectionLink to={links.guardian}>
                                    Manage
                                </SectionLink>
                            }
                        >
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <Detail label="Parent's name" value={student.attributes.parentName} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Relationship" value={student.attributes.parentRelationship} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Phone number" value={student.attributes.parentPhone} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Email address" value={student.attributes.parentEmail} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Occupation" value={student.attributes.parentOccupation} />
                                </div>
                            </div>
                        </Section>

                        <hr className="my-4" />

                        <Section
                            title="Medical overview"
                            subtitle="Important health information available to the school."
                            action={
                                <SectionLink to={links.medical}>
                                    View records
                                </SectionLink>
                            }
                        >
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <Detail label="Blood group" value={student.attributes.bloodGroup} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Allergies" value={student.attributes.allergies} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Medical conditions" value={student.attributes.medicalConditions} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Doctor's name" value={student.attributes.doctorName} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Doctor's phone" value={student.attributes.doctorPhone} />
                                </div>
                            </div>

                            {student.attributes.notes && (
                                <div className="mt-4 p-3 rounded-3 bg-body-tertiary">
                                    <div className="small text-secondary mb-1">
                                        Medical notes
                                    </div>
                                    <p className="mb-0 small">{student.attributes.notes}</p>
                                </div>
                            )}
                        </Section>
                    </div>

                    {/* Previous education */}
                    <div className="bg-body border rounded-3 p-3 p-md-4">
                        <Section
                            title="Previous education"
                            subtitle="Educational background before enrolment."
                        >
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <Detail label="Previous school" value={student.attributes.previousSchool} />
                                </div>
                                <div className="col-sm-6">
                                    <Detail label="Previous class" value={student.attributes.previousClass} />
                                </div>
                            </div>
                        </Section>
                    </div>
                </div>

                {/* Related records */}
                <div className="col-lg-4">
                    <div className="bg-body border rounded-3 p-3 p-md-4 mb-4">
                        <h6 className="fw-semibold mb-1">Student records</h6>
                        <p className="small text-secondary mb-2">
                            Access and manage additional student information.
                        </p>

                        <RecordLink
                            to={links.address}
                            icon="bi-geo-alt"
                            title="Addresses"
                            description="Residential and mailing details"
                        />

                        <RecordLink
                            to={links.guardian}
                            icon="bi-people"
                            title="Parents & guardians"
                            description="Guardian information"
                        />

                        <RecordLink
                            to={links.contacts}
                            icon="bi-telephone"
                            title="Emergency contacts"
                            description="Emergency contact information"
                        />

                        <RecordLink
                            to={links.medical}
                            icon="bi-heart-pulse"
                            title="Medical records"
                            description="Health and medical details"
                        />

                        <RecordLink
                            to={links.documents}
                            icon="bi-folder2"
                            title="Documents"
                            description="Student documents and reviews"
                        />
                    </div>

                    <div className="bg-body border rounded-3 p-3 p-md-4">
                        <h6 className="fw-semibold mb-3">Enrolment details</h6>

                        <div className="mb-3">
                            <Detail
                                label="Enrolment date"
                                value={formatDate(student.attributes.enrolmentDate)}
                            />
                        </div>

                        <div className="mb-3">
                            <Detail
                                label="Enrolment type"
                                value={student.attributes.enrolmentType}
                            />
                        </div>

                        <div>
                            <Detail
                                label="Record created"
                                value={formatDate(student.attributes.created_at)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div>
        <div className="small text-secondary mb-1">{label}</div>
        <div className="fw-medium text-body">{value || "—"}</div>
    </div>
);

const Section = ({ title, subtitle, action, children }) => (
    <section className="mb-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
                <h6 className="fw-semibold mb-1">{title}</h6>
                {subtitle && (
                    <p className="small text-secondary mb-0">{subtitle}</p>
                )}
            </div>
            {action}
        </div>
        {children}
    </section>
);

const SectionLink = ({ to, children }) => (
    <Link
        to={to}
        className="small fw-medium text-decoration-none link-primary text-nowrap"
    >
        {children}
        <i className="bi bi-arrow-up-right ms-1"></i>
    </Link>
);

const RecordLink = ({ to, icon, title, description }) => (
    <Link
        to={to}
        className="d-flex align-items-center gap-3 text-decoration-none text-body py-3 border-bottom"
    >
        <div className="rounded-3 bg-body-tertiary text-secondary p-2">
            <i className={`bi ${icon} fs-5`}></i>
        </div>

        <div className="flex-grow-1 min-w-0">
            <div className="fw-medium">{title}</div>
            <div className="small text-secondary">{description}</div>
        </div>

        <i className="bi bi-chevron-right text-secondary small"></i>
    </Link>
);
