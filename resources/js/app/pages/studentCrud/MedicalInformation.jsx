import { useParams } from "react-router-dom"
import { Form } from "../../widgets/Form"
import { FormInput } from "../../widgets/FormInput"
import { FormSelect } from "../../widgets/FormSelect"
import { FormTextarea } from "../../widgets/FormTextarea"

export const MedicalInformation = () =>{
    
    const params = useParams();
    
    return(
        <Form
            params={{ studentId: params.studentId }}
            action={`/student/${params.studentId === 'new' ? 'create' : 'update'}`}
        >
            <div className="mb-4">
                <h5 className="fw-bold mb-1">Medical Information</h5>
                <p className="text-secondary mb-0">These details help the school respond appropriately to the student's needs.</p>
            </div>
            <div className="alert alert-info border-0 d-flex gap-2">
                <i className="bi bi-info-circle-fill mt-1"></i>
                <div className="small">
                    Provide relevant information and follow your school's
                    policy for securely storing sensitive student records.
                </div>
            </div>
            <div className="row g-3">
                <FormSelect
                    label="Blood Group"
                    name="bloodGroup"
                    options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((a)=>({label: a}))}
                />
                <FormInput label="Known Allergies" name="allergies" placeholder="Enter allergies, or None" />
                <FormTextarea
                    label="Medical Conditions / Special Requirements"
                    name="conditions"
                    rows="3"
                    parentClassName="col-12"
                    placeholder="Relevant conditions, medication needs, or learning accommodations"
                />
                <FormInput label="Doctor / Clinic Name" name="doctorName" placeholder="Optional" />
                <FormInput label="Doctor / Clinic Phone" name="doctorPhone" type="tel" placeholder="Optional" />
                <FormTextarea
                    label="Additional Notes"
                    name="notes"
                    rows="3"
                    parentClassName="col-12"
                    placeholder="Any other information the school should know"
                />
            </div>
        </Form>
    )
}
