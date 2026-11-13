import { FormInput } from "../widgets/FormInput"
import { FormSelect } from "../widgets/FormSelect"
import { FormTextarea } from "../widgets/FormTextarea"
import { Switch } from "../widgets/Switch"

export const Contact = () =>{
    return(
        <div className="row g-3">
            <div className="col-md-2">
                <FormSelect
                    label="Title"
                    name="title"
                    required
                    defaultValue="Mr"
                    options={[
                        { value: "Mr", label: "Mr." },
                        { value: "Mrs", label: "Mrs." },
                        { value: "Ms", label: "Ms." },
                        { value: "Miss", label: "Miss" },
                        { value: "Dr", label: "Dr." },
                        { value: "Prof", label: "Prof." },
                        { value: "Rev", label: "Rev." },
                        { value: "Sir", label: "Sir" },
                        { value: "Dame", label: "Dame" },
                        { value: "Hon", label: "Hon." },
                        { value: "Fr", label: "Fr." },
                        { value: "Sr", label: "Sr." },
                        { value: "Bro", label: "Bro." },
                    ]}
                />
            </div>

            <div className="col-md-5">
                <FormInput
                    label="Full Name"
                    name="name"
                    placeholder="Enter full name"
                    required
                />
            </div>

            <div className="col-md-5">
                <FormSelect
                    label="Contact Type"
                    name="type"
                    required
                    defaultValue="Personal"
                    options={[
                        { value: "Personal", label: "Personal" },
                        { value: "Home", label: "Home" },
                        { value: "Work", label: "Work" },
                        { value: "Mobile", label: "Mobile" },
                        { value: "Emergency", label: "Emergency" },
                        { value: "Business", label: "Business" },
                        { value: "Other", label: "Other" },
                    ]}
                />
            </div>

            <div className="col-md-6">
                <FormInput
                    label="Relationship"
                    name="relationship"
                    placeholder="e.g. Mother, Father, Guardian"
                    required
                />
            </div>

            <div className="col-md-6">
                <FormInput
                    label="Company"
                    name="company"
                    placeholder="Enter company name"
                    required
                />
            </div>

            <div className="col-md-6">
                <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                />
            </div>

            <div className="col-md-6">
                <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                />
            </div>

            <div className="col-12">
                <FormTextarea
                    label="Notes"
                    name="note"
                    placeholder="Additional information about this contact..."
                />
            </div>

            <div className="col-md-6">
                <Switch
                    name="primary"
                    onLabel="Primary Contact"
                    offLabel="Primary Contact"
                    description="Identifies this as the student's main contact."
                />
            </div>

            <div className="col-md-6">
                <Switch
                    name="vip"
                    onLabel="VIP Contact"
                    offLabel="VIP Contact"
                    description="Marks this contact for priority attention."
                />
            </div>
        </div>
    )
}