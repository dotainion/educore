export const ReportReview = ({
    report,
    selectedClass,
    averages,
    subjectsPassed,
    getTermMark,
}) => (
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

        <SectionHeading icon="bi-person-vcard" title="Student Details" />

        <div className="row g-3 mb-4">
            <ReviewValue label="Student Name" value={report.student.name} />
            <ReviewValue label="Student ID" value={report.student.id} />
            <ReviewValue label="Class / Form" value={selectedClass?.name || report.student.form} />
            <ReviewValue label="Number in Form" value={report.student.numberInForm} />
            <ReviewValue label="Academic Year" value={report.student.academicYear} />
            <ReviewValue label="Term Period" value={report.student.term} />
        </div>

        <SectionHeading icon="bi-calendar-check" title="Attendance Summary" />

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
                    {TERMS.map(term => (
                        <tr key={term}>
                            <th>{term}</th>
                            <td>{report.attendance[term].sessions || "—"}</td>
                            <td>{report.attendance[term].absent || "—"}</td>
                            <td>{report.attendance[term].late || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <SectionHeading icon="bi-journal-text" title="Academic Results" />

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

        <SectionHeading icon="bi-bar-chart-line" title="Performance Summary" />

        <div className="row g-3 mb-4">
            {TERMS.map(term => (
                <ReviewValue
                    key={term}
                    label={`${term} Student Average`}
                    value={averages[term] === "—" ? "—" : `${averages[term]}%`}
                />
            ))}
            {TERMS.map(term => (
                <ReviewValue
                    key={`${term}-class`}
                    label={`${term} Class Average`}
                    value={report.classAverages[term] ? `${report.classAverages[term]}%` : "—"}
                />
            ))}
            <ReviewValue label="Subjects Passed" value={subjectsPassed} />
            <ReviewValue label="Promotion Status" value={report.promotion} />
        </div>

        <SectionHeading icon="bi-person-check" title="Behaviour & Profile" />

        {TERMS.map(term => (
            <div className="border rounded-3 p-3 mb-3" key={term}>
                <h4 className="h6 fw-bold">{term}</h4>
                <div className="row g-2">
                    {BEHAVIOURS.map(behaviour => (
                        <ReviewValue
                            key={behaviour}
                            label={behaviour}
                            value={report.profiles[term][behaviour]}
                        />
                    ))}
                </div>
            </div>
        ))}

        <SectionHeading icon="bi-chat-square-text" title="Comments & Recommendations" />

        {TERMS.map(term => (
            <div className="border rounded-3 p-3 mb-3" key={term}>
                <h4 className="h6 fw-bold">{term}</h4>
                <div className="mb-3">
                    <div className="small text-secondary">Form Teacher's Comments</div>
                    <p className="mb-0 text-break">{report.comments[term] || "—"}</p>
                </div>
                <div>
                    <div className="small text-secondary">Principal's / Dean's Comments</div>
                    <p className="mb-0 text-break">{report.principalComments[term] || "—"}</p>
                </div>
            </div>
        ))}

        <SectionHeading icon="bi-pen" title="Signatures & Approval" />

        {TERMS.map(term => (
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
                            value={report.signatures[term][field]}
                        />
                    ))}
                </div>
            </div>
        ))}

        <SectionHeading icon="bi-card-text" title="Additional Notes" />
        <div className="border rounded-3 p-3 text-break">
            {report.additionalNotes || "No additional notes."}
        </div>
    </div>
);