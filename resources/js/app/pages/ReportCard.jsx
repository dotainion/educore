import React from 'react';
import { ReportCardHeader } from '../components/ReportCardHeader';

const report = {
    schoolName: 'School Name',
    schoolAddress: 'Grenada, West Indies',
    academicYear: '2025-2026',
    currentTerm: 'HILLARY',
    student: {
        firstName: 'Aaliyah',
        lastName: 'Greenidge',
        form: 'F1J',
        numberInForm: 41,
    },
};

const attendance = [
    { label: 'No. of Sessions', values: ['134', '107', ''] },
    { label: 'Sessions Absent', values: ['13', '8', ''] },
    { label: 'Sessions Late', values: ['02', '7', ''] },
];

const profileLeft = [
    { label: 'Attitude to Authority', values: ['A', 'A', ''] },
    { label: 'Responsibility', values: ['B', 'B', ''] },
    { label: 'Co-operation', values: ['A', 'B', ''] },
    { label: 'Attitude to Correction', values: ['A', 'A', ''] },
    { label: 'Leadership', values: ['C', 'B', ''] },
];

const profileRight = [
    { label: 'Deportment', values: ['A', '', ''] },
    { label: 'Sociability', values: ['C', '', ''] },
    { label: 'Initiative', values: ['B', '', ''] },
    { label: 'Conflict Management', values: ['A', '', ''] },
    { label: 'Application', values: ['B', '', ''] },
];

const subjectsLeft = [
    {
        category: 'SOCIAL DEVELOPMENT',
        subjects: [
            { name: 'Religion', marks: ['A', 'A', ''] },
            { name: 'Health & Family Life', marks: ['A', 'A', ''] },
            { name: 'Personal Development', marks: ['', '', ''] },
        ],
    },
    {
        category: 'LANGUAGE',
        subjects: [
            { name: 'Literacy', marks: ['C', 'C', ''] },
            { name: 'English Language', marks: ['79', '84', ''] },
            { name: 'English Literature', marks: ['50', '64', ''] },
            { name: 'French', marks: ['97', '100', ''] },
            { name: 'Spanish', marks: ['93', '100', ''] },
        ],
    },
    {
        category: 'GENERAL STUDIES',
        subjects: [
            { name: 'History', marks: ['68', '62', ''] },
            { name: 'Social Studies', marks: ['49', '75', ''] },
            { name: 'Geography', marks: ['', '', ''] },
            { name: 'Religious Education', marks: ['', '', ''] },
        ],
    },
    {
        category: 'SCIENCE',
        subjects: [
            { name: 'Mathematics', marks: ['80', '73', ''] },
            { name: 'Agriculture Science', marks: ['52', '', ''] },
            { name: 'Integrated Science', marks: ['78', '74', ''] },
            { name: 'Biology', marks: ['', '', ''] },
            { name: 'Human and Social Biology', marks: ['', '', ''] },
            { name: 'Physics', marks: ['', '', ''] },
            { name: 'Chemistry', marks: ['', '', ''] },
            { name: 'Physical Education', marks: ['75', '80', ''] },
        ],
    },
];

const subjectsRight = [
    {
        category: 'BUSINESS',
        subjects: [
            { name: 'Principles of Business', marks: ['', '', ''] },
            { name: 'Principles of Accounts', marks: ['', '', ''] },
            { name: 'Office Administration', marks: ['', '', ''] },
            { name: 'Economics', marks: ['', '', ''] },
            {
                name: 'Electronic Document Preparation & Management',
                marks: ['', '', ''],
            },
        ],
    },
    {
        category: 'TECHNICAL',
        subjects: [
            { name: 'Information Technology', marks: ['63', '', ''] },
            { name: 'Technical Drawing', marks: ['', '', ''] },
            { name: 'Building & Furniture Technology', marks: ['', '', ''] },
            { name: 'Visual Art', marks: ['68', '70', ''] },
            { name: 'Food, Nutrition & Health', marks: ['', '', ''] },
            { name: 'Home Management', marks: ['', '', ''] },
            { name: 'Clothing, Textile & Fashion', marks: ['', '', ''] },
            { name: 'Home Economics', marks: ['54', '97', ''] },
            { name: 'Woodwork', marks: ['', '', ''] },
            { name: 'Theatre Arts', marks: ['', '', ''] },
            { name: 'Music', marks: ['', '', ''] },
            { name: 'Electronics / Electricity', marks: ['', '', ''] },
            { name: 'Industrial Technology', marks: ['', '', ''] },
            { name: 'Electronics **', marks: ['', '', ''] },
        ],
    },
];

const performance = [
    {
        label: 'Student Average',
        values: ['69.6', '78.92', ''],
    },
    {
        label: 'Class Average',
        values: ['58.3', '52.73', ''],
    },
    {
        label: 'Subjects Passed',
        values: ['9', '13', ''],
    },
    {
        label: 'Promoted / Not Promoted',
        values: ['N/A', 'N/A', ''],
    },
];

const comments = [
    {
        term: 'Term 1',
        teacher:
            'Aaliyah is a soft-spoken student who has shown good progress this term. She demonstrates a positive attitude towards learning. Continued encouragement at home will help her maintain this positive momentum and achieve even greater success.',
        principal:
            'Good job Aaliyah, continue to strive to do your best and you will do very well. All the best in the new term.',
        teacherSignature: 'V. Cuffie and I. Noel',
        principalSignature: '',
    },
    {
        term: 'Term 2',
        teacher:
            'Aaliyah is a quiet student who has shown noticeable improvement in her performance. She is encouraged to keep up the good work and continue striving for success. Continue to encourage her at home.',
        principal:
            "A good term's performance from Aaliyah. Strive for a higher average in the new term.",
        teacherSignature: 'V. Cuffie and I. Noel',
        principalSignature: 'D. Sayers',
    },
    {
        term: 'Term 3',
        teacher: '',
        principal: '',
        teacherSignature: '',
        principalSignature: '',
    },
];

function TermHeaders() {
    return (
        <tr className="table-light text-center">
            <th>Term 1</th>
            <th>Term 2</th>
            <th>Term 3</th>
        </tr>
    );
}

function AttendanceTable() {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle mb-0">
                <thead>
                    <TermHeaders />
                </thead>
                <tbody>
                    {attendance.map((item) => (
                        <tr key={item.label}>
                            <th className="bg-light">{item.label}</th>
                            {item.values.map((value, index) => (
                                <td className="text-center" key={index}>
                                    {value || '\u00A0'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProfileTable({ items }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle mb-0">
                <thead>
                    <tr className="table-light">
                        <th>Profile</th>
                        <th className="text-center">T1</th>
                        <th className="text-center">T2</th>
                        <th className="text-center">T3</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.label}>
                            <td>{item.label}</td>
                            {item.values.map((value, index) => (
                                <td className="text-center" key={index}>
                                    {value || '\u00A0'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SubjectTable({ groups }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle mb-0">
                <thead>
                    <tr className="table-light text-center">
                        <th>Subject</th>
                        <th>T1</th>
                        <th>T2</th>
                        <th>T3</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <React.Fragment key={group.category}>
                            <tr className="table-secondary">
                                <th colSpan="4">{group.category}</th>
                            </tr>
                            {group.subjects.map((subject) => (
                                <tr key={subject.name}>
                                    <td>{subject.name}</td>
                                    {subject.marks.map((mark, index) => (
                                        <td
                                            className="text-center"
                                            key={index}
                                        >
                                            {mark || '\u00A0'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PerformanceTable() {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle mb-0">
                <thead>
                    <TermHeaders />
                </thead>
                <tbody>
                    {performance.map((item) => (
                        <tr key={item.label}>
                            <th className="bg-light">{item.label}</th>
                            {item.values.map((value, index) => (
                                <td className="text-center" key={index}>
                                    {value || '\u00A0'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const ReportCard = () => {
    const { student } = report;

    return (
        <div className="container-fluid py-4">
            {/* Screen-only page header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Student Report Card</h2>
                    <p className="text-muted mb-0">
                        Academic performance, attendance and student profile.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.print()}
                >
                    <i className="bi bi-printer me-2"></i>
                    Print Report Card
                </button>
            </div>

            <ReportCardHeader />

            {/* Report Card */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-3 p-md-4">
                    {/* School Header */}
                    <div className="text-center border-bottom pb-3 mb-4">
                        <h3 className="fw-bold text-uppercase mb-1">
                            {report.schoolName}
                        </h3>
                        <p className="text-muted mb-2">
                            {report.schoolAddress}
                        </p>
                        <h5 className="fw-bold text-uppercase mb-0">
                            Student Progress Report
                        </h5>
                    </div>

                    {/* Academic Details */}
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block">
                                    Academic Year
                                </small>
                                <strong>{report.academicYear}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block">
                                    Current Term
                                </small>
                                <strong>{report.currentTerm}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block">
                                    Student Name
                                </small>
                                <strong>
                                    {student.firstName} {student.lastName}
                                </strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-3">
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block">
                                    Form
                                </small>
                                <strong>{student.form}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-3">
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block">
                                    No. in Form
                                </small>
                                <strong>{student.numberInForm}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Attendance */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-calendar-check me-2"></i>
                            Attendance Record
                        </h6>
                        <AttendanceTable />
                    </section>

                    {/* Student Profile */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-person-check me-2"></i>
                            Student Profile
                        </h6>

                        <div className="row g-3">
                            <div className="col-12 col-xl-6">
                                <ProfileTable items={profileLeft} />
                            </div>
                            <div className="col-12 col-xl-6">
                                <ProfileTable items={profileRight} />
                            </div>
                        </div>
                    </section>

                    {/* Subject Results */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-journal-bookmark me-2"></i>
                            Subjects and Results
                        </h6>

                        <div className="alert alert-light border small mb-3">
                            <strong>Term columns:</strong> T1 = Term 1, T2 =
                            Term 2, T3 = Term 3. Empty cells indicate that
                            results have not been entered.
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-xl-6">
                                <SubjectTable groups={subjectsLeft} />
                            </div>
                            <div className="col-12 col-xl-6">
                                <SubjectTable groups={subjectsRight} />
                            </div>
                        </div>
                    </section>

                    {/* Overall Performance */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-bar-chart-line me-2"></i>
                            Overall Performance
                        </h6>
                        <PerformanceTable />
                    </section>

                    {/* Comments */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-chat-left-text me-2"></i>
                            Comments and Recommendations
                        </h6>

                        {comments.map((item) => (
                            <div
                                key={item.term}
                                className="border rounded mb-3 overflow-hidden"
                            >
                                <div className="bg-light border-bottom px-3 py-2 fw-bold">
                                    {item.term}
                                </div>

                                <div className="row g-0">
                                    <div className="col-12 col-lg-6 p-3 border-bottom border-lg-end">
                                        <div className="fw-semibold mb-2">
                                            Form Teacher's Comments
                                        </div>
                                        <p className="small mb-0">
                                            {item.teacher || 'No comment entered.'}
                                        </p>
                                    </div>

                                    <div className="col-12 col-lg-6 p-3">
                                        <div className="fw-semibold mb-2">
                                            Principal's / Dean's Comments
                                        </div>
                                        <p className="small mb-0">
                                            {item.principal || 'No comment entered.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="row g-0 border-top">
                                    <div className="col-12 col-lg-6 p-3 border-bottom">
                                        <small className="text-muted d-block mb-1">
                                            Form Teacher's Signature
                                        </small>
                                        <div className="fw-semibold">
                                            {item.teacherSignature || '________________________'}
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6 p-3">
                                        <small className="text-muted d-block mb-1">
                                            Principal's / Dean's Signature
                                        </small>
                                        <div className="fw-semibold">
                                            {item.principalSignature || '________________________'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* School Dates */}
                    <section className="mb-4">
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            <i className="bi bi-calendar-event me-2"></i>
                            School Reopening and Closing Dates
                        </h6>

                        <div className="table-responsive">
                            <table className="table table-bordered table-sm align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Term</th>
                                        <th>School Opens</th>
                                        <th>School Closes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hilary Term (Term 2)</td>
                                        <td>January 5, 2026</td>
                                        <td>March 27, 2026</td>
                                    </tr>
                                    <tr>
                                        <td>Trinity Term (Term 3)</td>
                                        <td>April 13, 2026</td>
                                        <td>July 3, 2026</td>
                                    </tr>
                                    <tr>
                                        <td>Next Academic Year</td>
                                        <td>August 31, 2026</td>
                                        <td>To be announced</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Additional Notes */}
                    <section>
                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3">
                            Additional Notes
                        </h6>

                        <div className="border rounded p-3">
                            <p className="fw-semibold mb-2">
                                1. Literacy grading scale
                            </p>

                            <div className="table-responsive mb-3">
                                <table className="table table-bordered table-sm mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Level</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mastery</td>
                                            <td>75–100</td>
                                        </tr>
                                        <tr>
                                            <td>Competent</td>
                                            <td>50–74</td>
                                        </tr>
                                        <tr>
                                            <td>Developing Competence</td>
                                            <td>0–49</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="fw-semibold mb-1">
                                2. Academic Grades and Profile Grades
                            </p>
                            <p className="text-muted small mb-0">
                                Add the school's official grading definitions
                                and assessment criteria here.
                            </p>
                        </div>
                    </section>

                    <div className="text-center text-muted small mt-4 pt-3 border-top">
                        End of Student Progress Report
                    </div>
                </div>
            </div>
        </div>
    );
}
