export const PerformanceComments = () => {
    return (
        <div>
            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-bar-chart-line text-primary me-2"></i>
                    Performance Summary
                </h3>
                <p className="text-secondary small mb-0">Review the calculated student averages and enter the class averages.</p>
            </div>

            <div className="row g-3 mb-4">
                {["Term 1", "Term 2", "Term 3"].map(term => (
                    <div className="col-md-4" key={term}>
                        <div className="border rounded-3 p-3 h-100">
                            <div className="small text-secondary mb-2">
                                {term} Student Average
                            </div>
                            <div className="h2 fw-bold text-primary mb-1">
                                {/*averages[term]*/}
                                {/*averages[term] !== "—" && (
                                    <span className="fs-6 ms-1">%</span>
                                )*/}
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
                            {["Term 1", "Term 2", "Term 3"].map(term => (
                                <th key={term} className="text-center">{term}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Student Average</th>
                            {["Term 1", "Term 2", "Term 3"].map(term => (
                                <td key={term} className="text-center fw-bold">
                                    {/*averages[term]*/}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>Class Average</th>
                            {["Term 1", "Term 2", "Term 3"].map(term => (
                                <td key={term}>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.1"
                                        className="form-control text-center"
                                        //value={report.classAverages[term]}
                                        onChange={event =>{
                                            //updateTermValue("classAverages", term, event.target.value)
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="row g-3 mb-5">
                <div className="col-md-6">
                    <div>
                        <label className="form-label fw-semibold">Subjects Passed</label>
                        <input
                            type="text"
                            className="form-control"
                            //value={`${subjectsPassed}/${subjectsPassed + countIncompleteTerm3(report.marks)}`}
                            readOnly
                        />
                        <div className="form-text">A Term 3 final mark of 50 or higher counts as a pass.</div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div>
                        <label className="form-label fw-semibold">Promotion Status</label>
                        <select
                            className="form-select"
                            //value={report.promotion}
                            onChange={event =>{
                                //updateTermValue("promotion", "", event.target.value)
                            }}
                        >
                            {[
                                "N/A",
                                "Promoted",
                                "Not Promoted",
                            ].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-chat-square-text text-primary me-2"></i>
                    Comments & Recommendations
                </h3>
                <p className="text-secondary small mb-0">Enter the form teacher's and principal's or dean's comments for each term.</p>
            </div>

            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-3" key={term}>
                    <h4 className="h6 fw-bold mb-3">{term}</h4>

                    <div className="row g-3">
                        <div className="col-lg-6">
                            <div>
                                <label className="form-label fw-semibold">Form Teacher's Comments</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder={`Enter form teacher's comments for ${term.toLowerCase()}...`}
                                    //value={report.comments[term]}
                                    onChange={event =>{
                                        //updateTermValue("comments", term, event.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div>
                                <label className="form-label fw-semibold">Principal's / Dean's Comments</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder={`Enter principal's or dean's comments for ${term.toLowerCase()}...`}
                                    //value={report.principalComments[term]}
                                    onChange={event =>{
                                        //updateTermValue("principalComments", term, event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

