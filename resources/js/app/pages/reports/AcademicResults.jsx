export const AcademicResults = () => {
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

    const updateMark = (subject, term, value) =>{
        
    }

    const getTermMark = (subject, term) => {
        // Implementation for getting term mark
        return null;
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-journal-text text-primary me-2"></i>
                    Academic Results
                </h3>
                <p className="text-secondary small mb-0">Enter marks by subject. The Term 3 final mark is calculated automatically.</p>
            </div>

            <div className="alert alert-info d-flex gap-2 align-items-start">
                <i className="bi bi-info-circle fs-5"></i>
                <div className="small">
                    Term 1 and Term 2 are entered out of 100. Term 3 uses 40%
                    coursework and 60% examination. Leave unavailable marks blank.
                </div>
            </div>

            {SUBJECT_GROUPS.map(group => (
                <div className="border rounded-3 overflow-hidden mb-4" key={group.name}>
                    <div className="bg-primary-subtle px-3 py-2 fw-bold small">
                        {group.name}
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="align-middle">Subject</th>
                                    <th className="text-center">Term 1</th>
                                    <th className="text-center">Term 2</th>
                                    <th className="text-center">Term 3 Coursework</th>
                                    <th className="text-center">Term 3 Exam</th>
                                    <th className="text-center">Term 3 Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {group.subjects.map(subject => {
                                    const subjectMarks = /*marks[subject] ||*/ {};
                                    const term3Total = getTermMark(subject, "Term 3");

                                    return (
                                        <tr key={subject}>
                                            <td className="fw-medium">{subject}</td>

                                            <td>
                                                <MarkInput
                                                    label={`${subject} Term 1`}
                                                    value={subjectMarks.term1}
                                                    onChange={value => updateMark(subject, "term1", value)}
                                                />
                                            </td>

                                            <td>
                                                <MarkInput
                                                    label={`${subject} Term 2`}
                                                    value={subjectMarks.term2}
                                                    onChange={value => updateMark(subject, "term2", value)}
                                                />
                                            </td>

                                            <td>
                                                <MarkInput
                                                    label={`${subject} Term 3 coursework`}
                                                    value={subjectMarks.term3Coursework}
                                                    onChange={value => updateMark(subject, "term3Coursework", value)}
                                                />
                                            </td>

                                            <td>
                                                <MarkInput
                                                    label={`${subject} Term 3 examination`}
                                                    value={subjectMarks.term3Exam}
                                                    onChange={value => updateMark(subject, "term3Exam", value)}
                                                />
                                            </td>

                                            <td className="text-center fw-bold">
                                                {term3Total === null
                                                    ? "—"
                                                    : term3Total.toFixed(1)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    )
};

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

