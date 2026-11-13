export const AttendanceBehaviour = () => {
    return (
        <div>
            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-calendar-check text-primary me-2"></i>
                    Attendance Record
                </h3>
                <p className="text-secondary small mb-0">Enter the student's attendance for each term.</p>
            </div>

            <div className="table-responsive mb-5">
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Term</th>
                            <th>Sessions</th>
                            <th>Days Absent</th>
                            <th>Times Late</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Term 1", "Term 2", "Term 3"].map(term => (
                            <tr key={term}>
                                <th>{term}</th>
                                {["sessions", "absent", "late"].map(field => (
                                    <td key={field}>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            aria-label={`${term} ${field}`}
                                            //value={attendance[term][field]}
                                            onChange={event =>{
                                                //updateAttendance(term, field, event.target.value)
                                            }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-person-check text-primary me-2"></i>
                    Student Behaviour & Profile
                </h3>
                <p className="text-secondary small mb-0">Select a rating for each behaviour in every term. Leave fields blank when not assessed.</p>
            </div>

            {["Term 1", "Term 2", "Term 3"].map(term => (
                <div className="border rounded-3 p-3 mb-3" key={term}>
                    <h4 className="h6 fw-bold mb-3">{term}</h4>

                    <div className="row g-3">
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
                            <div className="col-md-6" key={behaviour}>
                                <div>
                                    <label className="form-label fw-semibold">{behaviour}</label>
                                    <select
                                        className="form-select"
                                        //value={profiles[term][behaviour] || ""}
                                        onChange={event =>{
                                            //updateProfile(term, behaviour, event.target.value)
                                        }}
                                    >
                                        <option value="">Not assessed</option>
                                        {[
                                            "Outstanding",
                                            "Very Good",
                                            "Good",
                                            "Satisfactory",
                                            "Needs Improvement",
                                        ].map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};
