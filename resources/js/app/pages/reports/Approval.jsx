export const Approval = ({
    signatures,
    updateSignature,
    additionalNotes,
    setAdditionalNotes,
}) => (
    <div>
        <SectionHeading
            icon="bi-pen"
            title="Signatures & Approval"
            description="Record the staff members responsible for each term's report."
        />

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
                            <FormField label={label}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter staff name or signature reference"
                                    value={signatures[term][field]}
                                    onChange={event =>
                                        updateSignature(term, field, event.target.value)
                                    }
                                />
                            </FormField>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        <SectionHeading
            icon="bi-card-text"
            title="Additional Notes"
            description="Add any other relevant information or instructions."
        />

        <FormField label="General Notes">
            <textarea
                className="form-control mb-4"
                rows="4"
                placeholder="Enter additional information..."
                value={additionalNotes}
                onChange={event => setAdditionalNotes(event.target.value)}
            />
        </FormField>

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
);