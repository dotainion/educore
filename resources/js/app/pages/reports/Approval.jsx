export const Approval = () => {
    return (
        <div>
            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-pen text-primary me-2"></i>
                    Signatures & Approval
                </h3>
                <p className="text-secondary small mb-0">Record the staff members responsible for each term's report.</p>
            </div>

            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-4" key={term}>
                    <h4 className="h6 fw-bold mb-3">{term}</h4>

                    <div className="row g-3">
                        {[
                            ["teacher1", "Form Teacher's Signature"],
                            ["teacher2", "Second Form Teacher's Signature"],
                            ["principal", "Principal's Signature"],
                            ["dean", "Dean's Signature"],
                        ].map(([field, label]) => (
                            <div className="col-md-6" key={field}>
                                <div>
                                    <label className="form-label fw-semibold">{label}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter staff name or signature reference"
                                        //value={signatures[term][field]}
                                        onChange={event =>{}}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-card-text text-primary me-2"></i>
                    Additional Notes
                </h3>
                <p className="text-secondary small mb-0">Add any other relevant information or instructions.</p>
            </div>

            <div>
                <label className="form-label fw-semibold">General Notes</label>
                <textarea
                    className="form-control mb-4"
                    rows="4"
                    placeholder="Enter additional information..."
                    //value={additionalNotes}
                    //onChange={event => setAdditionalNotes(event.target.value)}
                />
            </div>

            <div className="border rounded-3 p-3">
                <h4 className="h6 fw-bold mb-3">Literacy Grading Scale</h4>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Level</th>
                                <th>Score Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: "Mastery", range: "75–100" },
                                { level: "Competent", range: "50–74" },
                                { level: "Developing Competence", range: "0–49" },
                            ].map(item => (
                                <tr key={item.level}>
                                    <td>{item.level}</td>
                                    <td>{item.range}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};