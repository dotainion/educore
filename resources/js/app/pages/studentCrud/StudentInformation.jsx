import { useEffect, useState } from "react";
import { api } from "../../service/Api";
import { Form } from "../../widgets/Form";
import { FormInput } from "../../widgets/FormInput";
import { FormSelect } from "../../widgets/FormSelect";
import { useParams } from "react-router-dom";

export const StudentInformation = () =>{
    const [classes, setClasses] = useState([]);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(()=>{
        setLoading(true);
        api.get('/student/find', {
            params: { studentId: params.studentId }
        }).then((response)=>{
            setStudent(response.data.student);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [params.studentId]);

    useEffect(()=>{
        api.get('/class/list').then((response)=>{
            setClasses(response.data.classForms);
        }).catch((error)=>{

        });
    }, []);

    if(loading) return null;

    return(
        <Form
            data={student}
            params={{ studentId: params.studentId === 'new' ? null : params.studentId }}
            action={`/student/${params.studentId === 'new' ? 'create' : 'update'}`}
        >
            <div className="mb-4">
                <h5 className="fw-bold mb-1">Personal Details</h5>
                <p className="text-secondary mb-0">Enter the student's basic information.</p>
            </div>
            <div className="row g-3">
                <FormInput label="First Name" name="firstName" required placeholder="Enter first name" />
                <FormInput label="Middle Name" name="middleName" placeholder="Enter middle name" />
                <FormInput label="Last Name" name="lastName" required placeholder="Enter last name" />
                <FormInput label="Date of Birth" name="dob" type="date" required />
                <FormSelect
                    label="Gender"
                    name="gender"
                    required
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />
                <FormInput label="Nationality" name="nationality" />
                <FormInput label="Religion" name="religion" placeholder="Optional" />
                <FormInput label="Student Phone" name="phone" type="tel" placeholder="Optional" />
                <FormInput label="Student Email" name="email" type="email" placeholder="Optional" />
                <FormInput label="Enrolment Date" name="enrolmentDate" type="date" />
                <FormSelect
                    label="Enrolment Type"
                    name="enrolmentType"
                    options={['New Student', 'Transfer Student', 'Returning Student'].map((a)=>({label: a}))}
                />
                <FormSelect
                    label="Applying for Class"
                    name="classId"
                    required
                    options={classes.map((c)=>({ label: c.attributes.name, value: c.id}))}
                />
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h5 className="fw-bold mb-1">Previous School</h5>
                <p className="text-secondary mb-0">Complete these details if the student attended another school.</p>
            </div>
            <div className="row g-3">
                <FormInput label="Previous School" name="previousSchool" placeholder="School name" />
                <FormInput label="Last Class Attended" name="previousClass" placeholder="e.g. Standard 5" />
            </div>
        </Form>
    )
}
