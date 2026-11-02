import { useState } from "react";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [students, setStudents] = useState([]);

    const updateStudent = (field, value) => {
        setStudent(prevStudent => ({
            ...prevStudent,
            [field]: value,
        }));
    }

    const onStudentSelect = (studentId) => {
        
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="h5 fw-bold mb-1">
                    <i className="bi bi-person-vcard text-primary me-2"></i>
                    Student Information
                </h3>
                <p className="text-secondary small mb-0">Choose a student from the mock register or enter the details manually.</p>
            </div>

            <div className="alert alert-light border d-flex gap-2 align-items-start">
                <i className="bi bi-info-circle text-primary fs-5"></i>
                <div className="small">
                    The student register below is sample data. It can be replaced
                    with your students API later.
                </div>
            </div>

            <div className="row g-3">
                <div className="col-12">
                    <div>
                        <label className="form-label fw-semibold">Select Student</label>
                        <select
                            className="form-select"
                            value={student.id}
                            onChange={event => onStudentSelect(event.target.value)}
                        >
                            <option value="">Choose a student...</option>
                            {students.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name} — {item.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div>
                        <label className="form-label fw-semibold">Student Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter student's full name"
                            value={student.name}
                            onChange={event => updateStudent("name", event.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div>
                        <label className="form-label fw-semibold">Form / Class</label>
                        <select
                            className="form-select"
                            value={student.form}
                            onChange={event => updateStudent("form", event.target.value)}
                            required
                        >
                            <option value="">Select class...</option>
                            {[].map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div>
                        <label className="form-label fw-semibold">Number in Form</label>
                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            placeholder="e.g. 12"
                            value={student.numberInForm}
                            onChange={event => updateStudent("numberInForm", event.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div>
                        <label className="form-label fw-semibold">Academic Year</label>
                        <select
                            className="form-select"
                            value={student.academicYear}
                            onChange={event => updateStudent("academicYear", event.target.value)}
                        >
                            {[].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div>
                        <label className="form-label fw-semibold">School Term Period</label>
                        <select
                            className="form-select"
                            value={student.term}
                            onChange={event => updateStudent("term", event.target.value)}
                        >
                            {[].map(term => (
                                <option key={term} value={term.toUpperCase()}>
                                    {term}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {null && (
                <div className="rounded-3 border bg-light p-3 mt-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "44px", height: "44px" }}>
                            <i className="bi bi-person fs-5"></i>
                        </div>
                        <div>
                            <div className="fw-semibold">selectedStudent.name</div>
                            <div className="small text-secondary">
                                Student ID: 
                            </div>
                        </div>
                        <span className="badge text-bg-primary ms-auto">
                            selectedStudent.classId
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
