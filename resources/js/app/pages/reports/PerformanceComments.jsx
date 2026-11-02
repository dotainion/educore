export const PerformanceComments = ({
    report,
    averages,
    subjectsPassed,
    updateTermValue,
}) => (
    <div>
        <SectionHeading
            icon="bi-bar-chart-line"
            title="Performance Summary"
            description="Review the calculated student averages and enter the class averages."
        />

        <div className="row g-3 mb-4">
            {TERMS.map(term => (
                <div className="col-md-4" key={term}>
                    <div className="border rounded-3 p-3 h-100">
                        <div className="small text-secondary mb-2">
                            {term} Student Average
                        </div>
                        <div className="h2 fw-bold text-primary mb-1">
                            {averages[term]}
                            {averages[term] !== "—" && (
                                <span className="fs-6 ms-1">%</span>
                            )}
                        </div>
                        <div className="small text-secondary">
                            Calculated from entered marks
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Performance Measure</th>
                        {TERMS.map(term => (
                            <th key={term} className="text-center">{term}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Student Average</th>
                        {TERMS.map(term => (
                            <td key={term} className="text-center fw-bold">
                                {averages[term]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Class Average</th>
                        {TERMS.map(term => (
                            <td key={term}>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    className="form-control text-center"
                                    value={report.classAverages[term]}
                                    onChange={event =>
                                        updateTermValue("classAverages", term, event.target.value)
                                    }
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="row g-3 mb-5">
            <div className="col-md-6">
                <FormField
                    label="Subjects Passed"
                    hint="A Term 3 final mark of 50 or higher counts as a pass."
                >
                    <input
                        type="text"
                        className="form-control"
                        value={`${subjectsPassed}/${subjectsPassed + countIncompleteTerm3(report.marks)}`}
                        readOnly
                    />
                </FormField>
            </div>

            <div className="col-md-6">
                <FormField label="Promotion Status">
                    <select
                        className="form-select"
                        value={report.promotion}
                        onChange={event =>
                            updateTermValue("promotion", "", event.target.value)
                        }
                    >
                        {PROMOTION_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </FormField>
            </div>
        </div>

        <SectionHeading
            icon="bi-chat-square-text"
            title="Comments & Recommendations"
            description="Enter the form teacher's and principal's or dean's comments for each term."
        />

        {TERMS.map(term => (
            <div className="border rounded-3 p-3 mb-3" key={term}>
                <h4 className="h6 fw-bold mb-3">{term}</h4>

                <div className="row g-3">
                    <div className="col-lg-6">
                        <FormField label="Form Teacher's Comments">
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder={`Enter form teacher's comments for ${term.toLowerCase()}...`}
                                value={report.comments[term]}
                                onChange={event =>
                                    updateTermValue("comments", term, event.target.value)
                                }
                            />
                        </FormField>
                    </div>

                    <div className="col-lg-6">
                        <FormField label="Principal's / Dean's Comments">
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder={`Enter principal's or dean's comments for ${term.toLowerCase()}...`}
                                value={report.principalComments[term]}
                                onChange={event =>
                                    updateTermValue("principalComments", term, event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

