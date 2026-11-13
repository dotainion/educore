import { useEffect, useState } from "react";
import { api } from "../../service/Api";
import { StudentsFilter } from "../../components/StudentsFilter";

export const StudentDetails = () => {
    const [student, setStudent] = useState(null);
    const [students, setStudents] = useState([]);

    const updateStudent = (field, value) => {
        setStudent(prevStudent => ({
            ...prevStudent,
            [field]: value,
        }));
    }

    const onStudentSelect = (studentId) => {
        
    };

    useEffect(() => {
        api.get('/students').then((response) => {
            console.log(response.data.students);
            setStudents(response.data.students);
        }).catch((error) => {
            console.error('Error fetching students:', error);
        })
    }, [])

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
                <StudentsFilter />

                <div className="col-sm-6 col-lg-3">
                    <div>
                        <label className="form-label fw-semibold">Form / Class</label>
                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            placeholder="class/form"
                            //value={student.numberInForm}
                            onChange={event => updateStudent("form", event.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div>
                        <label className="form-label fw-semibold">Academic Year</label>
                        <select
                            className="form-select"
                            //value={student.academicYear}
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
                            //value={student.term}
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

            {student && (
                <div className="rounded-3 border bg-light p-3 mt-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "44px", height: "44px" }}>
                            <i className="bi bi-person fs-5"></i>
                        </div>
                        <div>
                            <div className="fw-semibold">{student.attributes.fullName}</div>
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
