
import { useMemo, useState } from "react";

/* =========================================================
   MOCK DATA
========================================================= */

const SCHOOL_INFO = {
    name: "J W Fletcher Catholic Secondary School",
    address: "Tanteen, St. George's, Grenada, West Indies",
    telephone: "(473) 440-2728",
    email: "jwfletchersecondary@gmail.com",
};

const REPORT_TERMS = ["Term 1", "Term 2", "Term 3"];

const MOCK_REPORTS = [
    {
        id: "RPT-2026-001",
        student: {
            id: "ST001",
            name: "Alicia James",
            form: "3A",
            numberInForm: 1,
            academicYear: "2025-2026",
            termPeriod: "MICHAELMAS - TRINITY",
        },
        attendance: {
            "Term 1": { sessions: 65, absent: 2, late: 1 },
            "Term 2": { sessions: 62, absent: 3, late: 0 },
            "Term 3": { sessions: 58, absent: 1, late: 2 },
        },
        marks: {
            "English Language": { term1: 78, term2: 82, term3Coursework: 80, term3Exam: 85 },
            "English Literature": { term1: 72, term2: 76, term3Coursework: 74, term3Exam: 78 },
            Mathematics: { term1: 65, term2: 70, term3Coursework: 72, term3Exam: 68 },
            French: { term1: 81, term2: 79, term3Coursework: 82, term3Exam: 80 },
            "Social Studies": { term1: 74, term2: 77, term3Coursework: 76, term3Exam: 79 },
            History: { term1: 69, term2: 72, term3Coursework: 70, term3Exam: 74 },
            "Integrated Science": { term1: 83, term2: 81, term3Coursework: 85, term3Exam: 82 },
            "Information Technology": { term1: 88, term2: 91, term3Coursework: 90, term3Exam: 94 },
            "Principles of Business": { term1: 76, term2: 79, term3Coursework: 80, term3Exam: 77 },
            Religion: { term1: 85, term2: 87, term3Coursework: 86, term3Exam: 88 },
        },
        profiles: {
            "Term 1": {
                Responsibility: "Very Good",
                "Co-operation": "Outstanding",
                Leadership: "Good",
                Application: "Very Good",
                "Attitude to Authority": "Very Good",
            },
            "Term 2": {
                Responsibility: "Outstanding",
                "Co-operation": "Very Good",
                Leadership: "Very Good",
                Application: "Very Good",
                "Attitude to Authority": "Very Good",
            },
            "Term 3": {
                Responsibility: "Outstanding",
                "Co-operation": "Outstanding",
                Leadership: "Very Good",
                Application: "Outstanding",
                "Attitude to Authority": "Very Good",
            },
        },
        classAverages: {
            "Term 1": 68.5,
            "Term 2": 71.2,
            "Term 3": 73.4,
        },
        comments: {
            "Term 1": "Alicia is a capable student who participates well in class. She should continue to practise problem-solving skills.",
            "Term 2": "Good progress has been made this term. Continued effort and consistent revision are encouraged.",
            "Term 3": "Alicia has demonstrated positive development throughout the year. She should continue working diligently.",
        },
        principalComments: {
            "Term 1": "Continue to build confidence and maintain consistent effort.",
            "Term 2": "A satisfactory term with encouraging progress.",
            "Term 3": "Commendable effort. Continue to aim for excellence.",
        },
        promotion: "Promoted",
        signatures: {
            "Term 1": {
                teacher1: "M. Roberts",
                teacher2: "",
                principal: "J. Charles",
                dean: "A. Thomas",
            },
            "Term 2": {
                teacher1: "M. Roberts",
                teacher2: "",
                principal: "J. Charles",
                dean: "A. Thomas",
            },
            "Term 3": {
                teacher1: "M. Roberts",
                teacher2: "",
                principal: "J. Charles",
                dean: "A. Thomas",
            },
        },
        additionalNotes: "Continue developing independent study habits and maintaining positive classroom participation.",
    },
    {
        id: "RPT-2026-002",
        student: {
            id: "ST002",
            name: "Daniel Charles",
            form: "3A",
            numberInForm: 2,
            academicYear: "2025-2026",
            termPeriod: "MICHAELMAS - TRINITY",
        },
        attendance: {
            "Term 1": { sessions: 65, absent: 5, late: 3 },
            "Term 2": { sessions: 62, absent: 4, late: 2 },
            "Term 3": { sessions: 58, absent: 3, late: 1 },
        },
        marks: {
            "English Language": { term1: 62, term2: 66, term3Coursework: 68, term3Exam: 65 },
            Mathematics: { term1: 54, term2: 59, term3Coursework: 60, term3Exam: 58 },
            "Social Studies": { term1: 67, term2: 65, term3Coursework: 69, term3Exam: 66 },
            "Integrated Science": { term1: 61, term2: 64, term3Coursework: 65, term3Exam: 63 },
            "Information Technology": { term1: 72, term2: 74, term3Coursework: 76, term3Exam: 73 },
            Religion: { term1: 70, term2: 72, term3Coursework: 71, term3Exam: 75 },
        },
        profiles: {
            "Term 1": { Responsibility: "Good", Application: "Satisfactory" },
            "Term 2": { Responsibility: "Good", Application: "Good" },
            "Term 3": { Responsibility: "Very Good", Application: "Good" },
        },
        classAverages: {
            "Term 1": 68.5,
            "Term 2": 71.2,
            "Term 3": 73.4,
        },
        comments: {
            "Term 1": "Daniel has shown potential. More consistent preparation and participation are encouraged.",
            "Term 2": "Some improvement is evident. He should continue to focus on completing assignments.",
            "Term 3": "Daniel has made progress and should maintain a regular study routine.",
        },
        principalComments: {
            "Term 1": "Greater consistency is encouraged.",
            "Term 2": "Continue working towards improved academic performance.",
            "Term 3": "Keep building on the progress made this year.",
        },
        promotion: "Promoted",
        signatures: {
            "Term 1": { teacher1: "M. Roberts", teacher2: "", principal: "J. Charles", dean: "A. Thomas" },
            "Term 2": { teacher1: "M. Roberts", teacher2: "", principal: "J. Charles", dean: "A. Thomas" },
            "Term 3": { teacher1: "M. Roberts", teacher2: "", principal: "J. Charles", dean: "A. Thomas" },
        },
        additionalNotes: "Regular revision and timely completion of assignments are recommended.",
    },
];

const SUBJECT_GROUPS = [
    {
        name: "SOCIAL DEVELOPMENT",
        subjects: ["Religion", "Health & Family Life", "Personal Development"],
    },
    {
        name: "LANGUAGE",
        subjects: ["Literacy", "English Language", "English Literature", "French", "Spanish"],
    },
    {
        name: "GENERAL STUDIES",
        subjects: ["History", "Social Studies", "Geography", "Religious Education"],
    },
    {
        name: "SCIENCE",
        subjects: [
            "Mathematics",
            "Agriculture Science",
            "Integrated Science",
            "Biology",
            "Human and Social Biology",
            "Physics",
            "Chemistry",
            "Physical Education",
        ],
    },
    {
        name: "BUSINESS",
        subjects: [
            "Principles of Business",
            "Principles of Accounts",
            "Office Administration",
            "Economics",
            "Electronic Document Preparation & Management",
        ],
    },
    {
        name: "TECHNICAL",
        subjects: [
            "Information Technology",
            "Technical Drawing",
            "Building & Furniture Technology",
            "Visual Art",
            "Food, Nutrition & Health",
            "Home Management",
            "Clothing, Textile & Fashion",
            "Home Economics",
            "Woodwork",
            "Theatre Arts",
            "Music",
            "Electronics / Electricity",
            "Industrial Technology",
            "Electronics",
        ],
    },
];

const BEHAVIOURS = [
    "Attitude to Authority",
    "Responsibility",
    "Co-operation",
    "Attitude to Correction",
    "Leadership",
    "Deportment",
    "Sociability",
    "Initiative",
    "Conflict Management",
    "Application",
];

const LITERACY_SCALE = [
    { level: "Mastery", range: "75–100" },
    { level: "Competent", range: "50–74" },
    { level: "Developing Competence", range: "0–49" },
];

/* =========================================================
   MAIN VIEW PAGE
========================================================= */

export const ViewProgressReport = () => {
    const [selectedReportId, setSelectedReportId] = useState(
        MOCK_REPORTS[0]?.id || ""
    );

    const [selectedTerm, setSelectedTerm] = useState("Term 3");

    const report = useMemo(
        () => MOCK_REPORTS.find(item => item.id === selectedReportId),
        [selectedReportId]
    );

    const getTermMark = (subject, term) => {
        const values = report?.marks?.[subject];

        if (!values) return null;

        if (term === "Term 1") {
            return values.term1 ?? null;
        }

        if (term === "Term 2") {
            return values.term2 ?? null;
        }

        if (values.term3Coursework == null || values.term3Exam == null) {
            return null;
        }

        return Math.round(
            values.term3Coursework * 0.4 + values.term3Exam * 0.6
        );
    };

    const termAverages = useMemo(() => {
        if (!report) return {};

        return Object.fromEntries(
            REPORT_TERMS.map(term => {
                const values = SUBJECT_GROUPS
                    .flatMap(group => group.subjects)
                    .map(subject => getTermMark(subject, term))
                    .filter(mark => mark !== null && mark !== undefined);

                const average = values.length
                    ? (
                        values.reduce((total, mark) => total + mark, 0) /
                        values.length
                    ).toFixed(1)
                    : "—";

                return [term, average];
            })
        );
    }, [report]);

    const subjectsPassed = SUBJECT_GROUPS
        .flatMap(group => group.subjects)
        .map(subject => getTermMark(subject, "Term 3"))
        .filter(mark => mark !== null && mark !== undefined && mark >= 50)
        .length;

    const subjectsWithTerm3Marks = SUBJECT_GROUPS
        .flatMap(group => group.subjects)
        .filter(subject => getTermMark(subject, "Term 3") !== null).length;

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container-fluid px-0">
                <ReportViewerHeader />

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 align-items-end">
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">
                                    Select Student Report
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedReportId}
                                    onChange={event =>
                                        setSelectedReportId(event.target.value)
                                    }
                                >
                                    {MOCK_REPORTS.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.student.name} — Form {item.student.form} — {item.student.academicYear}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                                <label className="form-label fw-semibold">
                                    View Term
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedTerm}
                                    onChange={event => setSelectedTerm(event.target.value)}
                                >
                                    {REPORT_TERMS.map(term => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-sm-6 col-lg-3 d-grid">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => window.print()}
                                    disabled={!report}
                                >
                                    <i className="bi bi-printer me-2"></i>
                                    Print Report
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mt-3">
                            <span className="badge text-bg-light border">
                                <i className="bi bi-eye me-1"></i>
                                Read-only view
                            </span>
                            <span className="badge text-bg-light border">
                                Report ID: {report?.id || "—"}
                            </span>
                            <span className="badge text-bg-light border">
                                Showing: {selectedTerm}
                            </span>
                        </div>
                    </div>
                </div>

                {!report ? (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center py-5">
                            <i className="bi bi-file-earmark-x display-5 text-secondary"></i>
                            <h2 className="h5 fw-bold mt-3">No report selected</h2>
                            <p className="text-secondary mb-0">
                                Select a student report to view its details.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                            <ReportIdentity report={report} />

                            <ReportStudentDetails report={report} />

                            <ReportAttendance
                                attendance={report.attendance}
                                selectedTerm={selectedTerm}
                            />

                            <ReportAcademicResults
                                report={report}
                                selectedTerm={selectedTerm}
                                getTermMark={getTermMark}
                            />

                            <ReportPerformance
                                report={report}
                                termAverages={termAverages}
                                selectedTerm={selectedTerm}
                                subjectsPassed={subjectsPassed}
                                subjectsWithTerm3Marks={subjectsWithTerm3Marks}
                            />

                            <ReportBehaviour
                                profiles={report.profiles}
                                selectedTerm={selectedTerm}
                            />

                            <ReportComments
                                report={report}
                                selectedTerm={selectedTerm}
                            />

                            <ReportSignatures
                                signatures={report.signatures}
                                selectedTerm={selectedTerm}
                            />

                            <ReportAdditionalNotes report={report} />

                            <ReportViewerFooter report={report} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* =========================================================
   REPORT HEADER & IDENTITY
========================================================= */

const ReportViewerHeader = () => (
    <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                    <span className="badge text-bg-primary mb-2">
                        ACADEMIC RECORDS
                    </span>
                    <h1 className="h3 fw-bold mb-2">Progress Report Viewer</h1>
                    <p className="text-secondary mb-0">
                        View student performance, attendance and academic progress.
                    </p>
                </div>

                <div className="d-flex align-items-center gap-2 text-secondary small">
                    <i className="bi bi-shield-lock fs-5"></i>
                    <span>Viewing only — editing is disabled</span>
                </div>
            </div>
        </div>
    </div>
);

const ReportIdentity = ({ report }) => (
    <div className="text-center border rounded-3 p-3 p-md-4 mb-4">
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary mb-3" style={{ width: "56px", height: "56px" }}>
            <i className="bi bi-mortarboard fs-3"></i>
        </div>

        <h2 className="h4 fw-bold mb-1">{SCHOOL_INFO.name}</h2>
        <p className="text-secondary small mb-1">{SCHOOL_INFO.address}</p>
        <p className="text-secondary small mb-3">
            {SCHOOL_INFO.telephone} · {SCHOOL_INFO.email}
        </p>

        <hr />

        <h3 className="h5 fw-bold mb-1">Student Progress Report</h3>
        <p className="text-secondary mb-0">
            Academic Year {report.student.academicYear}
        </p>
    </div>
);

/* =========================================================
   STUDENT DETAILS
========================================================= */

const ReportStudentDetails = ({ report }) => (
    <ReportSection
        icon="bi-person-vcard"
        title="Student Information"
        description="Student identification and reporting details."
    >
        <div className="row g-3">
            <ReportValue label="Student Name" value={report.student.name} />
            <ReportValue label="Student ID" value={report.student.id} />
            <ReportValue label="Form / Class" value={report.student.form} />
            <ReportValue label="Number in Form" value={report.student.numberInForm} />
            <ReportValue label="Academic Year" value={report.student.academicYear} />
            <ReportValue label="School Term Period" value={report.student.termPeriod} />
        </div>
    </ReportSection>
);

/* =========================================================
   ATTENDANCE
========================================================= */

const ReportAttendance = ({ attendance, selectedTerm }) => {
    const data = attendance[selectedTerm] || {};

    return (
        <ReportSection
            icon="bi-calendar-check"
            title="Attendance Record"
            description={`Attendance details for ${selectedTerm}.`}
        >
            <div className="row g-3">
                <ReportMetric
                    icon="bi-calendar3"
                    label="Sessions"
                    value={data.sessions ?? "—"}
                />
                <ReportMetric
                    icon="bi-calendar-x"
                    label="Days Absent"
                    value={data.absent ?? "—"}
                />
                <ReportMetric
                    icon="bi-clock-history"
                    label="Times Late"
                    value={data.late ?? "—"}
                />
            </div>
        </ReportSection>
    );
};

/* =========================================================
   ACADEMIC RESULTS
========================================================= */

const ReportAcademicResults = ({
    report,
    selectedTerm,
    getTermMark,
}) => (
    <ReportSection
        icon="bi-journal-text"
        title="Academic Results"
        description={`Subject marks for ${selectedTerm}. Term 3 total uses 40% coursework and 60% examination.`}
    >
        {SUBJECT_GROUPS.map(group => (
            <div className="border rounded-3 overflow-hidden mb-3" key={group.name}>
                <div className="bg-primary-subtle px-3 py-2 fw-bold small">
                    {group.name}
                </div>

                <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Subject</th>
                                {selectedTerm === "Term 3" ? (
                                    <>
                                        <th className="text-center">Coursework</th>
                                        <th className="text-center">Examination</th>
                                        <th className="text-center">Final Mark</th>
                                    </>
                                ) : (
                                    <th className="text-center">Mark / 100</th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {group.subjects.map(subject => {
                                const marks = report.marks[subject] || {};
                                const finalMark = getTermMark(subject, selectedTerm);

                                return (
                                    <tr key={subject}>
                                        <td className="fw-medium">{subject}</td>

                                        {selectedTerm === "Term 3" ? (
                                            <>
                                                <td className="text-center">
                                                    {marks.term3Coursework ?? "—"}
                                                </td>
                                                <td className="text-center">
                                                    {marks.term3Exam ?? "—"}
                                                </td>
                                                <td className="text-center">
                                                    <ReportMark value={finalMark} />
                                                </td>
                                            </>
                                        ) : (
                                            <td className="text-center">
                                                <ReportMark
                                                    value={selectedTerm === "Term 1"
                                                        ? marks.term1
                                                        : marks.term2}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
    </ReportSection>
);

const ReportMark = ({ value }) => {
    if (value === null || value === undefined || value === "") {
        return <span className="text-secondary">—</span>;
    }

    let badgeClass = "text-bg-danger";

    if (Number(value) >= 75) {
        badgeClass = "text-bg-success";
    } else if (Number(value) >= 50) {
        badgeClass = "text-bg-primary";
    }

    return (
        <span className={`badge ${badgeClass}`}>
            {Number(value).toFixed(1).replace(".0", "")}
        </span>
    );
};

/* =========================================================
   PERFORMANCE SUMMARY
========================================================= */

const ReportPerformance = ({
    report,
    termAverages,
    selectedTerm,
    subjectsPassed,
    subjectsWithTerm3Marks,
}) => (
    <ReportSection
        icon="bi-bar-chart-line"
        title="Performance Summary"
        description="Academic averages and promotion status."
    >
        <div className="row g-3 mb-4">
            {REPORT_TERMS.map(term => (
                <div className="col-md-4" key={term}>
                    <div className={`border rounded-3 p-3 h-100 ${term === selectedTerm ? "border-primary bg-primary-subtle" : ""}`}>
                        <div className="small text-secondary mb-2">
                            {term} Student Average
                        </div>
                        <div className="h2 fw-bold mb-1">
                            {termAverages[term] ?? "—"}
                            {termAverages[term] !== "—" && (
                                <span className="fs-6 ms-1">%</span>
                            )}
                        </div>
                        <div className="small text-secondary">
                            Based on subjects with available marks
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th>Performance Measure</th>
                        {REPORT_TERMS.map(term => (
                            <th key={term} className="text-center">{term}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Student Average</th>
                        {REPORT_TERMS.map(term => (
                            <td className="text-center fw-semibold" key={term}>
                                {termAverages[term] ?? "—"}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Class Average</th>
                        {REPORT_TERMS.map(term => (
                            <td className="text-center" key={term}>
                                {report.classAverages[term] ?? "—"}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="row g-3">
            <ReportValue
                label="Subjects Passed"
                value={`${subjectsPassed}/${subjectsWithTerm3Marks}`}
            />
            <ReportValue
                label="Promotion Status"
                value={report.promotion}
            />
        </div>
    </ReportSection>
);

/* =========================================================
   BEHAVIOUR & PROFILE
========================================================= */

const ReportBehaviour = ({ profiles, selectedTerm }) => {
    const termProfile = profiles[selectedTerm] || {};

    return (
        <ReportSection
            icon="bi-person-check"
            title="Behaviour & Student Profile"
            description={`Behaviour ratings for ${selectedTerm}.`}
        >
            <div className="row g-3">
                {BEHAVIOURS.map(behaviour => (
                    <ReportValue
                        key={behaviour}
                        label={behaviour}
                        value={termProfile[behaviour] || "Not assessed"}
                    />
                ))}
            </div>
        </ReportSection>
    );
};

/* =========================================================
   COMMENTS
========================================================= */

const ReportComments = ({ report, selectedTerm }) => (
    <ReportSection
        icon="bi-chat-square-text"
        title="Comments & Recommendations"
        description={`Teacher and school leadership comments for ${selectedTerm}.`}
    >
        <div className="row g-3">
            <div className="col-lg-6">
                <ReportTextCard
                    title="Form Teacher's Comments"
                    text={report.comments[selectedTerm]}
                    icon="bi-person-lines-fill"
                />
            </div>
            <div className="col-lg-6">
                <ReportTextCard
                    title="Principal's / Dean's Comments"
                    text={report.principalComments[selectedTerm]}
                    icon="bi-chat-left-text"
                />
            </div>
        </div>
    </ReportSection>
);

/* =========================================================
   SIGNATURES
========================================================= */

const ReportSignatures = ({ signatures, selectedTerm }) => {
    const values = signatures[selectedTerm] || {};

    const signatureFields = [
        ["teacher1", "Form Teacher"],
        ["teacher2", "Second Form Teacher"],
        ["principal", "Principal"],
        ["dean", "Dean"],
    ];

    return (
        <ReportSection
            icon="bi-pen"
            title="Signatures & Approval"
            description={`Recorded staff details for ${selectedTerm}.`}
        >
            <div className="row g-3">
                {signatureFields.map(([field, label]) => (
                    <div className="col-md-6" key={field}>
                        <div className="border rounded-3 p-3 h-100">
                            <div className="small text-secondary mb-3">{label}</div>
                            <div className="fw-semibold border-bottom pb-2">
                                {values[field] || "—"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ReportSection>
    );
};

/* =========================================================
   ADDITIONAL NOTES & FOOTER
========================================================= */

const ReportAdditionalNotes = ({ report }) => (
    <>
        <ReportSection
            icon="bi-card-text"
            title="Additional Notes"
            description="Other relevant information recorded on the report."
        >
            <div className="border rounded-3 p-3 text-break">
                {report.additionalNotes || "No additional notes."}
            </div>
        </ReportSection>

        <ReportSection icon="bi-bookmark-check" title="Literacy Grading Scale">
            <div className="table-responsive">
                <table className="table table-bordered align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Level</th>
                            <th>Score Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LITERACY_SCALE.map(item => (
                            <tr key={item.level}>
                                <td>{item.level}</td>
                                <td>{item.range}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ReportSection>
    </>
);

const ReportViewerFooter = ({ report }) => (
    <div className="border-top pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between gap-2">
        <div className="small text-secondary">
            <div className="fw-semibold">{SCHOOL_INFO.name}</div>
            Academic Year {report.student.academicYear}
        </div>
        <div className="small text-secondary">
            Report reference: {report.id}
        </div>
    </div>
);

/* =========================================================
   REUSABLE DISPLAY COMPONENTS
========================================================= */

const ReportSection = ({ icon, title, description, children }) => (
    <section className="mb-5">
        <div className="mb-3">
            <h3 className="h5 fw-bold mb-1">
                <i className={`bi ${icon} text-primary me-2`}></i>
                {title}
            </h3>
            {description && (
                <p className="text-secondary small mb-0">{description}</p>
            )}
        </div>
        {children}
    </section>
);

const ReportValue = ({ label, value }) => (
    <div className="col-sm-6 col-lg-4">
        <div className="border rounded-3 p-3 h-100">
            <div className="text-secondary small mb-1">{label}</div>
            <div className="fw-semibold text-break">{value || "—"}</div>
        </div>
    </div>
);

const ReportMetric = ({ icon, label, value }) => (
    <div className="col-md-4">
        <div className="border rounded-3 p-3 h-100">
            <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
                <i className={`bi ${icon}`}></i>
                {label}
            </div>
            <div className="h3 fw-bold mb-0">{value}</div>
        </div>
    </div>
);

const ReportTextCard = ({ title, text, icon }) => (
    <div className="border rounded-3 p-3 h-100">
        <div className="fw-semibold mb-3">
            <i className={`bi ${icon} text-primary me-2`}></i>
            {title}
        </div>
        <p className="mb-0 text-break">{text || "No comments recorded."}</p>
    </div>
);
