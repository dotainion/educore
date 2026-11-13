import { useState } from "react";

export const ReportReview = () => {
    const [report, setReport] = useState({
        student: {},
        attendance: {},//createAttendance(),
        profiles: {},//createProfiles(),
        marks: {},
        classAverages: null,//createTermValues(""),
        comments: null,//createTermValues(""),
        principalComments: null,//createTermValues(""),
        signatures: null,//createSignatures(),
        promotion: "N/A",
        additionalNotes: "",
    });
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

    const getTermMark = (subject, term) => {
        return null
    }

    return (
        <div>
            <div className="alert alert-success d-flex gap-2 align-items-start">
                <i className="bi bi-check-circle fs-5"></i>
                <div>
                    <div className="fw-semibold">Report details are ready to review</div>
                    <div className="small">
                        Check the information below before printing. This mock version
                        does not save records to a database.
                    </div>
                </div>
            </div>

            <div className="text-center border rounded-3 p-4 mb-4">
                <h4 className="h4 fw-bold mb-1">Student Report Card</h4>
                <div className="text-secondary">
                    Academic Year {report.student.academicYear}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-person-vcard text-primary me-2"></i>
                    Student Details
                </h3>
            </div>

            <div className="row g-3 mb-4">
                <ReviewValue label="Student Name" value={report.student.name} />
                <ReviewValue label="Student ID" value={report.student.id} />
                <ReviewValue label="Class / Form" value={/*selectedClass?.name || report.student.form*/null} />
                <ReviewValue label="Number in Form" value={report.student.numberInForm} />
                <ReviewValue label="Academic Year" value={report.student.academicYear} />
                <ReviewValue label="Term Period" value={report.student.term} />
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-calendar-check text-primary me-2"></i>
                    Attendance Summary
                </h3>
            </div>

            <div className="table-responsive mb-4">
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Term</th>
                            <th>Sessions</th>
                            <th>Absent</th>
                            <th>Late</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Term 1", "Term 2", "Term 3"].map(term => (
                            <tr key={term}>
                                <th>{term}</th>
                                <td>{/*report.attendance[term].sessions || "—"*/}</td>
                                <td>{/*report.attendance[term].absent || "—"*/}</td>
                                <td>{/*report.attendance[term].late || "—"*/}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-journal-text text-primary me-2"></i>
                    Academic Results
                </h3>
            </div>

            {SUBJECT_GROUPS.map(group => (
                <div className="table-responsive mb-3" key={group.name}>
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th colSpan="4">{group.name}</th>
                            </tr>
                            <tr>
                                <th>Subject</th>
                                <th>Term 1</th>
                                <th>Term 2</th>
                                <th>Term 3 Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.subjects.map(subject => {
                                const values = report.marks[subject] || {};
                                return (
                                    <tr key={subject}>
                                        <td>{subject}</td>
                                        <td>{values.term1 || "—"}</td>
                                        <td>{values.term2 || "—"}</td>
                                        <td>{getTermMark(subject, "Term 3") ?? "—"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-bar-chart-line text-primary me-2"></i>
                    Performance Summary
                </h3>
            </div>

            <div className="row g-3 mb-4">
                {["Term 1", "Term 2", "Term 3"].map(term => (
                    <ReviewValue
                        key={term}
                        label={`${term} Student Average`}
                        //value={averages[term] === "—" ? "—" : `${averages[term]}%`}
                    />
                ))}
                {["Term 1", "Term 2", "Term 3"].map(term => (
                    <ReviewValue
                        key={`${term}-class`}
                        label={`${term} Class Average`}
                        //value={report.classAverages[term] ? `${report.classAverages[term]}%` : "—"}
                    />
                ))}
                <ReviewValue label="Subjects Passed" value={/*report.subjectsPassed*/null} />
                <ReviewValue label="Promotion Status" value={report.promotion} />
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-person-check text-primary me-2"></i>
                    Behaviour & Profile
                </h3>
            </div>

            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-3" key={term}>
                    <h4 className="h6 fw-bold">{term}</h4>
                    <div className="row g-2">
                        {[
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
                        ].map(behaviour => (
                            <ReviewValue
                                key={behaviour}
                                label={behaviour}
                                //value={report.profiles[term][behaviour]}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-chat-square-text text-primary me-2"></i>
                    Comments & Recommendations
                </h3>
            </div>

            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-3" key={term}>
                    <h4 className="h6 fw-bold">{term}</h4>
                    <div className="mb-3">
                        <div className="small text-secondary">Form Teacher's Comments</div>
                        <p className="mb-0 text-break">{/*report.comments[term] || "—"*/}</p>
                    </div>
                    <div>
                        <div className="small text-secondary">Principal's / Dean's Comments</div>
                        <p className="mb-0 text-break">{/*report.principalComments[term] || "—"*/}</p>
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-pen text-primary me-2"></i>
                    Signatures & Approval
                </h3>
            </div>
            
            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-3" key={term}>
                    <h4 className="h6 fw-bold">{term}</h4>
                    <div className="row g-3">
                        {[
                            ["teacher1", "Form Teacher"],
                            ["teacher2", "Second Form Teacher"],
                            ["principal", "Principal"],
                            ["dean", "Dean"],
                        ].map(([field, label]) => (
                            <ReviewValue
                                key={field}
                                label={label}
                                //value={report.signatures[term][field]}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-card-text text-primary me-2"></i>
                    Additional Notes
                </h3>
            </div>
            <div className="border rounded-3 p-3 text-break">
                {/*report.additionalNotes || */"No additional notes."}
            </div>
        </div>
    )
};

const ReviewValue = ({ label, value }) => (
    <div className="col-sm-6 col-lg-4">
        <div className="border rounded-3 p-3 h-100">
            <div className="text-secondary small mb-1">{label}</div>
            <div className="fw-semibold text-break">{value || "—"}</div>
        </div>
    </div>
);
