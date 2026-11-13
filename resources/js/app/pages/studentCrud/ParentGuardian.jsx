import { useEffect, useState } from "react"
import { FormSelect } from "../../widgets/FormSelect";
import { FormInput } from "../../widgets/FormInput";
import { Form } from "../../widgets/Form";
import { useParams } from "react-router-dom";
import { api } from "../../service/Api";

export const ParentGuardian = () =>{
    const [guardian, setGuardian] = useState(null);
    
    const params = useParams();

    useEffect(()=>{
        api.get('/student/guardian/find', {
            params: { studentId: params.studentId }
        }).then((response)=>{
            setGuardian(response.data.guardian);
        }).catch((error)=>{

        });
    }, []);
    
    return(
        <Form
            data={guardian}
            params={{ studentId: params.studentId }}
            action={`/student/${params.studentId === 'new' ? 'create' : 'update'}`}
        >
            <div className="mb-4">
                <h5 className="fw-bold mb-1">Parent / Guardian Details</h5>
                <p className="text-secondary mb-0">Provide the main contact responsible for the student.</p>
            </div>
            <div className="row g-3">
                <FormInput label="Full Name" name="parentName" required placeholder="Parent or guardian's name" />
                <FormSelect
                    label="Relationship to Student"
                    name="parentRelationship"
                    required
                    options={['Mother', 'Father', 'Guardian', 'Grandparent', 'Other'].map((a)=>({label: a}))}
                />
                <FormInput label="Phone Number" name="parentPhone" type="tel" required placeholder="e.g. +1 473 ..." />
                <FormInput label="Email Address" name="parentEmail" type="email" placeholder="name@example.com" />
                <FormInput label="Occupation" name="parentOccupation" placeholder="Optional" />
            </div>
        </Form>
    )
}
