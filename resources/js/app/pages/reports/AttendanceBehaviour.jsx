export const AttendanceBehaviour = ({ attendance, profiles, updateAttendance, updateProfile }) => (
    <div>
        <SectionHeading
            icon="bi-calendar-check"
            title="Attendance Record"
            description="Enter the student's attendance for each term."
        />

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
                    {TERMS.map(term => (
                        <tr key={term}>
                            <th>{term}</th>
                            {["sessions", "absent", "late"].map(field => (
                                <td key={field}>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        aria-label={`${term} ${field}`}
                                        value={attendance[term][field]}
                                        onChange={event =>
                                            updateAttendance(term, field, event.target.value)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <SectionHeading
            icon="bi-person-check"
            title="Student Behaviour & Profile"
            description="Select a rating for each behaviour in every term. Leave fields blank when not assessed."
        />

        {TERMS.map(term => (
            <div className="border rounded-3 p-3 mb-3" key={term}>
                <h4 className="h6 fw-bold mb-3">{term}</h4>

                <div className="row g-3">
                    {BEHAVIOURS.map(behaviour => (
                        <div className="col-md-6" key={behaviour}>
                            <FormField label={behaviour}>
                                <select
                                    className="form-select"
                                    value={profiles[term][behaviour] || ""}
                                    onChange={event =>
                                        updateProfile(term, behaviour, event.target.value)
                                    }
                                >
                                    <option value="">Not assessed</option>
                                    {PROFILE_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </FormField>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
