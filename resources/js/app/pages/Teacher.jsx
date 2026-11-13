
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../service/Api';
import { routes } from '../routes/Routes';

export const Teacher = () => {
    const [teacherRecord, setTeacherRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { teacherId } = useParams();

    // The API model is { id, attributes: {...} }.
    const teacher = teacherRecord?.attributes;

    const fullName = useMemo(() => {
        if (!teacher) return '';

        return [teacher.firstName, teacher.lastName]
            .filter(Boolean)
            .join(' ');
    }, [teacher]);

    const initials = useMemo(() => {
        if (!fullName) return 'T';

        return fullName
            .split(' ')
            .filter(Boolean)
            .map((part) => part.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }, [fullName]);

    const formatDate = (value) => {
        if (!value) return 'Not provided';

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return 'Not provided';

        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const calculateAge = (value) => {
        if (!value) return null;

        const birthDate = new Date(value);

        if (Number.isNaN(birthDate.getTime())) return null;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        const hasHadBirthday =
            today.getMonth() > birthDate.getMonth() ||
            (
                today.getMonth() === birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate()
            );

        if (!hasHadBirthday) age--;

        return age >= 0 ? age : null;
    };

    // Related API models are also wrapped as { id, attributes }.
    const getRelatedName = (record, fields) => {
        if (typeof record === 'string') return record;
        if (!record?.attributes) return '';

        for (const field of fields) {
            if (record.attributes[field]) {
                return record.attributes[field];
            }
        }

        return '';
    };

    const subjects = Array.isArray(teacher?.subjects)
        ? teacher.subjects
        : [];

    const classes = Array.isArray(teacher?.classes)
        ? teacher.classes
        : [];

    const sections = [
        {
            title: 'Teacher Information',
            description: 'Personal and contact details',
            icon: 'bi-person-vcard',
            route: routes.editTeacher.information(teacherRecord?.id)
        },
        {
            title: 'Teacher Address',
            description: 'Residential address details',
            icon: 'bi-geo-alt',
            route: routes.editTeacher.employment(teacherRecord?.id)
        },
        {
            title: 'Assign Classes',
            description: 'Manage assigned classes',
            icon: 'bi-easel2',
            route: routes.editTeacher.assignClasses(teacherRecord?.id)
        },
        {
            title: 'Assign Subjects',
            description: 'Manage teaching subjects',
            icon: 'bi-journal-bookmark',
            route: routes.editTeacher.assignSubjects(teacherRecord?.id)
        },
        {
            title: 'Documents',
            description: 'Teacher-related documents',
            icon: 'bi-folder2-open',
            route: routes.editTeacher.documents(teacherRecord?.id)
        },
        {
            title: 'Additional Information',
            description: 'Other teacher details',
            icon: 'bi-card-text',
            route: routes.editTeacher.additionalInformation(teacherRecord?.id)
        }
    ];

    useEffect(() => {
        if(!teacherId) return;

        setLoading(true);
        setError('');
        
        api.get('/user/find', {
            params: { userId: teacherId }
        }).then((response)=>{
            setTeacherRecord(response.data.user);
        }).catch((err)=>{
            setError(err.response?.data?.message || 'Unable to load teacher information.');
        }).finally(()=>setLoading(false));
    }, [teacherId]);

    const getStatusClass = (status) => {
        switch (String(status || '').toLowerCase()) {
            case 'active':
                return 'text-bg-success';
            case 'inactive':
                return 'text-bg-secondary';
            default:
                return 'text-bg-light text-body-secondary';
        }
    };

    const InfoItem = ({ label, value }) => (
        <div className="col-sm-6">
            <div className="mb-3">
                <div className="small text-body-secondary mb-1">
                    {label}
                </div>
                <div className="fw-medium text-break">
                    {value || 'Not provided'}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="container-fluid py-5">
                <div className="d-flex justify-content-center align-items-center gap-2 text-body-secondary">
                    <span className="spinner-border spinner-border-sm" role="status" />
                    Loading teacher information...
                </div>
            </div>
        );
    }

    if (error || !teacherRecord?.attributes) {
        return (
            <div className="container-fluid py-4">
                <div className="alert alert-danger mb-0" role="alert">
                    <i className="bi bi-exclamation-circle me-2" />
                    {error || 'Teacher information could not be found.'}
                </div>
            </div>
        );
    }

    const age = calculateAge(teacher.dateOfBirth);

    return (
        <div className="container-fluid ">

            {/* Page heading */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <div className="small text-body-secondary mb-2">
                        Teachers / Teacher Profile
                    </div>

                    <h3 className="fw-semibold mb-1">
                        Teacher Profile
                    </h3>

                    <p className="text-body-secondary mb-0">
                        View teacher information, employment details and teaching assignments.
                    </p>
                </div>

                <Link
                    to={routes.editTeacher.information(teacherRecord.id)}
                    className="btn btn-primary"
                >
                    <i className="bi bi-pencil-square me-2" />
                    Edit Teacher
                </Link>
            </div>

            {/* Teacher identity */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div
                            className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-semibold flex-shrink-0"
                            style={{ width: '76px', height: '76px', fontSize: '1.4rem' }}
                        >
                            {initials}
                        </div>

                        <div className="flex-grow-1">
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                                <h4 className="fw-semibold mb-0">
                                    {fullName || 'Unnamed Teacher'}
                                </h4>

                                <span className={`badge rounded-pill ${getStatusClass(teacher.status)}`}>
                                    {teacher.status || 'Status unavailable'}
                                </span>
                            </div>

                            <div className="text-body-secondary small">
                                Teacher ID: {teacher.teacherId || 'Not provided'}
                            </div>

                            <div className="d-flex flex-wrap gap-3 mt-3 small">
                                <span>
                                    <i className="bi bi-briefcase me-2 text-body-secondary" />
                                    {teacher.employmentType || 'Employment type not provided'}
                                </span>

                                <span>
                                    <i className="bi bi-calendar-event me-2 text-body-secondary" />
                                    Hired {formatDate(teacher.hireDate)}
                                </span>

                                {age !== null && (
                                    <span>
                                        <i className="bi bi-person me-2 text-body-secondary" />
                                        {age} years old
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="small text-body-secondary mb-1">
                                Email address
                            </div>
                            <div className="fw-medium text-break">
                                {teacher.email || 'Not provided'}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="small text-body-secondary mb-1">
                                Phone number
                            </div>
                            <div className="fw-medium">
                                {teacher.phone || 'Not provided'}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="small text-body-secondary mb-1">
                                Specialization
                            </div>
                            <div className="fw-medium">
                                {teacher.specialization || 'Not provided'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">

                {/* Main information */}
                <div className="col-lg-8">

                    {/* Personal information */}
                    <section className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <i className="bi bi-person-vcard text-primary fs-5" />
                                <h5 className="fw-semibold mb-0">
                                    Personal Information
                                </h5>
                            </div>

                            <div className="row">
                                <InfoItem label="First name" value={teacher.firstName} />
                                <InfoItem label="Last name" value={teacher.lastName} />
                                <InfoItem label="Gender" value={teacher.gender} />
                                <InfoItem label="Date of birth" value={formatDate(teacher.dateOfBirth)} />
                                <InfoItem label="Email address" value={teacher.email} />
                                <InfoItem label="Phone number" value={teacher.phone} />
                                <InfoItem label="Address" value={teacher.address} />
                            </div>
                        </div>
                    </section>

                    {/* Employment information */}
                    <section className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <i className="bi bi-briefcase text-primary fs-5" />
                                <h5 className="fw-semibold mb-0">
                                    Employment Information
                                </h5>
                            </div>

                            <div className="row">
                                <InfoItem label="Teacher ID" value={teacher.teacherId} />
                                <InfoItem label="Employment type" value={teacher.employmentType} />
                                <InfoItem label="Hire date" value={formatDate(teacher.hireDate)} />
                                <InfoItem label="Employment status" value={teacher.status} />
                            </div>
                        </div>
                    </section>

                    {/* Qualifications */}
                    <section className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <i className="bi bi-mortarboard text-primary fs-5" />
                                <h5 className="fw-semibold mb-0">
                                    Qualifications & Specialization
                                </h5>
                            </div>

                            <div className="row">
                                <InfoItem label="Qualification" value={teacher.qualification} />
                                <InfoItem label="Specialization" value={teacher.specialization} />
                            </div>
                        </div>
                    </section>

                    {/* Teaching assignments */}
                    <section className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-journal-bookmark text-primary fs-5" />
                                    <h5 className="fw-semibold mb-0">
                                        Teaching Assignments
                                    </h5>
                                </div>

                                <span className="small text-body-secondary">
                                    {subjects.length} subjects · {classes.length} classes
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="small fw-semibold text-body-secondary mb-2">
                                    Assigned Subjects
                                </div>

                                {subjects.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-2">
                                        {subjects.map((subject) => (
                                            <span
                                                key={subject.id}
                                                className="badge rounded-pill text-bg-light border text-body px-3 py-2"
                                            >
                                                {getRelatedName(subject, [
                                                    'name',
                                                    'subjectName',
                                                    'title'
                                                ]) || 'Unnamed subject'}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-body-secondary small mb-0">
                                        No subjects assigned.
                                    </p>
                                )}
                            </div>

                            <hr />

                            <div>
                                <div className="small fw-semibold text-body-secondary mb-2">
                                    Assigned Classes
                                </div>

                                {classes.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-2">
                                        {classes.map((classRecord) => (
                                            <span
                                                key={classRecord.id}
                                                className="badge rounded-pill text-bg-light border text-body px-3 py-2"
                                            >
                                                {getRelatedName(classRecord, [
                                                    'name',
                                                    'className',
                                                    'formName'
                                                ]) || 'Unnamed class'}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-body-secondary small mb-0">
                                        No classes assigned.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Additional information */}
                    {teacher.notes && (
                        <section className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <i className="bi bi-card-text text-primary fs-5" />
                                    <h5 className="fw-semibold mb-0">
                                        Additional Information
                                    </h5>
                                </div>

                                <p className="text-body-secondary mb-0 text-break">
                                    {teacher.notes}
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Profile navigation */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-3">
                            <h6 className="fw-semibold mb-1">
                                Teacher Records
                            </h6>

                            <p className="small text-body-secondary mb-3">
                                View and manage other parts of this teacher's record.
                            </p>

                            <div className="list-group list-group-flush">
                                {sections.map((section) => (
                                    <Link
                                        key={section.title}
                                        to={section.route}
                                        className="list-group-item list-group-item-action px-2 py-3"
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-3 bg-body-tertiary d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: '40px', height: '40px' }}
                                            >
                                                <i className={`bi ${section.icon} text-primary fs-5`} />
                                            </div>

                                            <div className="flex-grow-1">
                                                <div className="fw-medium">
                                                    {section.title}
                                                </div>
                                                <div className="small text-body-secondary">
                                                    {section.description}
                                                </div>
                                            </div>

                                            <i className="bi bi-chevron-right small text-body-tertiary" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
