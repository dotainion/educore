
import { useMemo, useState } from "react";
import { StudentDetails } from "./StudentDetails";
import { AttendanceBehaviour } from "./AttendanceBehaviour";
import { AcademicResults } from "./AcademicResults";
import { PerformanceComments } from "./PerformanceComments";
import { Approval } from "./Approval";
import { ReportReview } from "./ReportReview";
import { WizardSidebar } from "./WizardSidebar";
import { Route, Routes } from "react-router-dom";

const ACADEMIC_YEARS = ["2025-2026", "2026-2027", "2027-2028"];

const TERMS = ["Term 1", "Term 2", "Term 3"];

const TERM_PERIODS = [
    "Michaelmas - Trinity",
    "Hilary",
    "Trinity",
];

const MOCK_CLASSES = [
    { id: "1A", name: "Form 1A" },
    { id: "1B", name: "Form 1B" },
    { id: "2A", name: "Form 2A" },
    { id: "2B", name: "Form 2B" },
    { id: "3A", name: "Form 3A" },
    { id: "3B", name: "Form 3B" },
    { id: "4A", name: "Form 4A" },
    { id: "5A", name: "Form 5A" },
];

const MOCK_STUDENTS = [
    { id: "ST001", name: "Alicia James", classId: "3A", numberInForm: 1 },
    { id: "ST002", name: "Daniel Charles", classId: "3A", numberInForm: 2 },
    { id: "ST003", name: "Mia Roberts", classId: "3A", numberInForm: 3 },
    { id: "ST004", name: "Jordan Francis", classId: "3B", numberInForm: 1 },
    { id: "ST005", name: "Kayla Thomas", classId: "2A", numberInForm: 1 },
];

const SUBJECT_GROUPS = [
    {
        name: "SOCIAL DEVELOPMENT",
        subjects: [
            "Religion",
            "Health & Family Life",
            "Personal Development",
        ],
    },
    {
        name: "LANGUAGE",
        subjects: [
            "Literacy",
            "English Language",
            "English Literature",
            "French",
            "Spanish",
        ],
    },
    {
        name: "GENERAL STUDIES",
        subjects: [
            "History",
            "Social Studies",
            "Geography",
            "Religious Education",
        ],
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

const PROFILE_OPTIONS = [
    "Outstanding",
    "Very Good",
    "Good",
    "Satisfactory",
    "Needs Improvement",
];

const PROMOTION_OPTIONS = [
    "N/A",
    "Promoted",
    "Not Promoted",
];

const LITERACY_SCALE = [
    { level: "Mastery", range: "75–100" },
    { level: "Competent", range: "50–74" },
    { level: "Developing Competence", range: "0–49" },
];

const WIZARD_STEPS = [];//nolonger needed as the sidebar is now a seperte component and the steps are now defined in the sidebar component.

const createTermValues = (value = "") =>
    Object.fromEntries(TERMS.map(term => [term, value]));

const createAttendance = () =>
    Object.fromEntries(
        TERMS.map(term => [
            term,
            { sessions: "", absent: "", late: "" },
        ])
    );

const createSignatures = () =>
    Object.fromEntries(
        TERMS.map(term => [
            term,
            {
                teacher1: "",
                teacher2: "",
                principal: "",
                dean: "",
            },
        ])
    );

const createProfiles = () =>
    Object.fromEntries(TERMS.map(term => [term, {}]));

const INITIAL_STUDENT = {
    id: "",
    name: "",
    form: "",
    numberInForm: "",
    academicYear: "2026-2027",
    term: "MICHAELMAS - TRINITY",
};

const INITIAL_STATE = () => ({
    student: { ...INITIAL_STUDENT },
    attendance: createAttendance(),
    profiles: createProfiles(),
    marks: {},
    classAverages: createTermValues(""),
    comments: createTermValues(""),
    principalComments: createTermValues(""),
    signatures: createSignatures(),
    promotion: "N/A",
    additionalNotes: "",
});

/* =========================================================
   MAIN PAGE
========================================================= */

export const ProgressReport = () => {
    const [report, setReport] = useState(INITIAL_STATE);
    const [currentStep, setCurrentStep] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [notice, setNotice] = useState("");

    const selectedStudent = MOCK_STUDENTS.find(
        student => student.id === report.student.id
    );

    const selectedClass = MOCK_CLASSES.find(
        schoolClass => schoolClass.id === report.student.form
    );

    const updateStudent = (field, value) => {
        setReport(previous => ({
            ...previous,
            student: {
                ...previous.student,
                [field]: value,
            },
        }));
    };

    const updateAttendance = (term, field, value) => {
        setReport(previous => ({
            ...previous,
            attendance: {
                ...previous.attendance,
                [term]: {
                    ...previous.attendance[term],
                    [field]: value,
                },
            },
        }));
    };

    const updateProfile = (term, behaviour, value) => {
        setReport(previous => ({
            ...previous,
            profiles: {
                ...previous.profiles,
                [term]: {
                    ...previous.profiles[term],
                    [behaviour]: value,
                },
            },
        }));
    };

    const updateMark = (subject, field, value) => {
        setReport(previous => ({
            ...previous,
            marks: {
                ...previous.marks,
                [subject]: {
                    ...(previous.marks[subject] || {}),
                    [field]: value,
                },
            },
        }));
    };

    const updateTermValue = (field, term, value) => {
        setReport(previous => ({
            ...previous,
            [field]: {
                ...previous[field],
                [term]: value,
            },
        }));
    };

    const updateSignature = (term, field, value) => {
        setReport(previous => ({
            ...previous,
            signatures: {
                ...previous.signatures,
                [term]: {
                    ...previous.signatures[term],
                    [field]: value,
                },
            },
        }));
    };

    const getNumber = value => {
        if (value === "" || value === undefined || value === null) {
            return null;
        }

        const number = Number(value);
        return Number.isFinite(number) ? number : null;
    };

    const getTermMark = (subject, term) => {
        const subjectMarks = report.marks[subject];

        if (!subjectMarks) return null;

        if (term === "Term 1") {
            return getNumber(subjectMarks.term1);
        }

        if (term === "Term 2") {
            return getNumber(subjectMarks.term2);
        }

        const coursework = getNumber(subjectMarks.term3Coursework);
        const exam = getNumber(subjectMarks.term3Exam);

        if (coursework === null || exam === null) return null;

        return Math.round(coursework * 0.4 + exam * 0.6);
    };

    const averages = useMemo(() => {
        return Object.fromEntries(
            TERMS.map(term => {
                const marks = SUBJECT_GROUPS
                    .flatMap(group => group.subjects)
                    .map(subject => {
                        const subjectMarks = report.marks[subject];

                        if (!subjectMarks) return null;

                        if (term === "Term 1") {
                            return getNumber(subjectMarks.term1);
                        }

                        if (term === "Term 2") {
                            return getNumber(subjectMarks.term2);
                        }

                        const coursework = getNumber(
                            subjectMarks.term3Coursework
                        );
                        const exam = getNumber(subjectMarks.term3Exam);

                        if (coursework === null || exam === null) {
                            return null;
                        }

                        return Math.round(coursework * 0.4 + exam * 0.6);
                    })
                    .filter(mark => mark !== null);

                const average = marks.length
                    ? (
                        marks.reduce((total, mark) => total + mark, 0) /
                        marks.length
                    ).toFixed(1)
                    : "—";

                return [term, average];
            })
        );
    }, [report.marks]);

    const term3Marks = SUBJECT_GROUPS
        .flatMap(group => group.subjects)
        .map(subject => getTermMark(subject, "Term 3"))
        .filter(mark => mark !== null);

    const subjectsPassed = term3Marks.filter(mark => mark >= 50).length;

    const validateStep = () => {
        if (currentStep === 0) {
            if (!report.student.name.trim()) {
                setNotice("Please select a student or enter the student's name.");
                return false;
            }

            if (!report.student.form) {
                setNotice("Please select a class or form.");
                return false;
            }

            if (!report.student.academicYear) {
                setNotice("Please select an academic year.");
                return false;
            }
        }

        setNotice("");
        return true;
    };

    const goNext = () => {
        if (!validateStep()) return;

        if (currentStep < WIZARD_STEPS.length - 1) {
            setCurrentStep(previous => previous + 1);
            setNotice("");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setShowReview(true);
            setNotice("");
        }
    };

    const goBack = () => {
        if (showReview) {
            setShowReview(false);
            return;
        }

        setCurrentStep(previous => Math.max(0, previous - 1));
        setNotice("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const goToStep = index => {
        if (index <= currentStep) {
            setCurrentStep(index);
            setShowReview(false);
            setNotice("");
        }
    };

    const clearForm = () => {
        if (!window.confirm("Clear all report information and start again?")) {
            return;
        }

        setReport(INITIAL_STATE());
        setCurrentStep(0);
        setShowReview(false);
        setNotice("");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container-fluid px-0">
                <div className="row g-4">
                    <WizardSidebar
                        currentStep={currentStep}
                        showReview={showReview}
                        onSelectStep={goToStep}
                    />

                    <Routes>
                        <Route path="student/details" element={<StudentDetails />} />
                        {/*<Route path="attendance/behaviour" element={<AttendanceBehaviour />} />
                        <Route path="academic/results" element={<AcademicResults />} />
                        <Route path="performance/comments" element={<PerformanceComments />} />
                        <Route path="approval/review" element={<ApprovalReview />} />
                        <Route path="final/review" element={<FinalReview />} />*/}
                    </Routes>
                    {/*

                    <div className="">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                                    <div>
                                        <div className="text-primary small fw-semibold mb-2">
                                            {showReview
                                                ? "FINAL REVIEW"
                                                : `STEP ${currentStep + 1} OF ${WIZARD_STEPS.length}`}
                                        </div>

                                        <h2 className="h4 fw-bold mb-1">
                                            {showReview
                                                ? "Review Report"
                                                : WIZARD_STEPS[currentStep].title}
                                        </h2>

                                        <p className="text-secondary small mb-0">
                                            {showReview
                                                ? "Review the report details before printing."
                                                : WIZARD_STEPS[currentStep].description}
                                        </p>
                                    </div>

                                    <span className="badge rounded-pill text-bg-light border px-3 py-2">
                                        <i className="bi bi-file-earmark-text me-2"></i>
                                        Student Report
                                    </span>
                                </div>

                                {notice && (
                                    <div className="alert alert-warning d-flex align-items-center gap-2" role="alert">
                                        <i className="bi bi-exclamation-circle"></i>
                                        <span>{notice}</span>
                                    </div>
                                )}

                                {showReview ? (
                                    <ReportReview
                                        report={report}
                                        selectedClass={selectedClass}
                                        averages={averages}
                                        subjectsPassed={subjectsPassed}
                                        getTermMark={getTermMark}
                                    />
                                ) : (
                                    <>
                                        {currentStep === 0 && (
                                            <StudentDetails
                                                student={report.student}
                                                updateStudent={updateStudent}
                                                selectedStudent={selectedStudent}
                                            />
                                        )}

                                        {currentStep === 1 && (
                                            <AttendanceBehaviour
                                                attendance={report.attendance}
                                                profiles={report.profiles}
                                                updateAttendance={updateAttendance}
                                                updateProfile={updateProfile}
                                            />
                                        )}

                                        {currentStep === 2 && (
                                            <AcademicResults
                                                marks={report.marks}
                                                updateMark={updateMark}
                                                getTermMark={getTermMark}
                                            />
                                        )}

                                        {currentStep === 3 && (
                                            <PerformanceComments
                                                report={report}
                                                averages={averages}
                                                subjectsPassed={subjectsPassed}
                                                updateTermValue={updateTermValue}
                                            />
                                        )}

                                        {currentStep === 4 && (
                                            <Approval
                                                signatures={report.signatures}
                                                updateSignature={updateSignature}
                                                additionalNotes={report.additionalNotes}
                                                setAdditionalNotes={value =>
                                                    setReport(previous => ({
                                                        ...previous,
                                                        additionalNotes: value,
                                                    }))
                                                }
                                            />
                                        )}
                                    </>
                                )}

                                <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 border-top pt-4 mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={showReview || currentStep > 0 ? goBack : clearForm}
                                    >
                                        <i className={`bi ${showReview || currentStep > 0 ? "bi-arrow-left" : "bi-arrow-counterclockwise"} me-2`}></i>
                                        {showReview
                                            ? "Back to Form"
                                            : currentStep > 0
                                                ? "Previous"
                                                : "Clear Form"}
                                    </button>

                                    <div className="d-flex flex-column flex-sm-row gap-2">
                                        {showReview ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary px-4"
                                                onClick={handlePrint}
                                            >
                                                <i className="bi bi-printer me-2"></i>
                                                Print Report
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-primary px-4"
                                                onClick={goNext}
                                            >
                                                {currentStep === WIZARD_STEPS.length - 1
                                                    ? "Review Report"
                                                    : "Continue"}
                                                <i className="bi bi-arrow-right ms-2"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap justify-content-between gap-2 mt-3 px-1">
                            <span className="small text-secondary">
                                <i className="bi bi-info-circle me-1"></i>
                                Your entries remain available while moving between sections.
                            </span>
                            <span className="small text-secondary">
                                {showReview ? "Review stage" : `Section ${currentStep + 1} of ${WIZARD_STEPS.length}`}
                            </span>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
};

const SectionHeading = ({ icon, title, description }) => (
    <div className="mb-4">
        <h3 className="h5 fw-bold mb-1">
            <i className={`bi ${icon} text-primary me-2`}></i>
            {title}
        </h3>
        {description && (
            <p className="text-secondary small mb-0">{description}</p>
        )}
    </div>
);

const FormField = ({ label, hint, children }) => (
    <div>
        <label className="form-label fw-semibold">{label}</label>
        {children}
        {hint && <div className="form-text">{hint}</div>}
    </div>
);

const MarkInput = ({ value, onChange, label }) => (
    <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        className="form-control text-center"
        aria-label={label}
        value={value ?? ""}
        onChange={event => {
            const nextValue = event.target.value;

            if (nextValue === "") {
                onChange("");
                return;
            }

            const number = Number(nextValue);

            if (number >= 0 && number <= 100) {
                onChange(nextValue);
            }
        }}
    />
);

const countIncompleteTerm3 = marks =>
    SUBJECT_GROUPS
        .flatMap(group => group.subjects)
        .filter(subject => {
            const values = marks[subject] || {};
            return values.term3Coursework !== "" &&
                values.term3Coursework !== undefined &&
                (values.term3Exam === "" || values.term3Exam === undefined);
        }).length;

const ReviewValue = ({ label, value }) => (
    <div className="col-sm-6 col-lg-4">
        <div className="border rounded-3 p-3 h-100">
            <div className="text-secondary small mb-1">{label}</div>
            <div className="fw-semibold text-break">{value || "—"}</div>
        </div>
    </div>
);
