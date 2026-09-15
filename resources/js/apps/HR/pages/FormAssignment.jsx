import { useEffect, useState } from "react";
import axios from "axios";

export const FormAssignment = () =>{
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState("");
    const [module, setModule] = useState("");
    const [action, setAction] = useState("create");

    useEffect(() => {
        axios.get("/api/forms").then((res) => {
            setForms(res.data);
        });
    }, []);

    const assign = async () => {
        await axios.post("/api/form-assignments", {
            form_id: selectedForm,
            module,
            action,
        });

        alert("Form assigned successfully");
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <h3>Assign Form to Module</h3>

            {/* Select Form */}
            <select
                onChange={(e) => setSelectedForm(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            >
                <option value="">Select Form</option>
                {forms.map((f) => (
                    <option key={f.id} value={f.id}>
                        {f.title}
                    </option>
                ))}
            </select>

            {/* Module */}
            <input
                placeholder="Module (job, employee, leave)"
                onChange={(e) => setModule(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />

            {/* Action */}
            <select
                onChange={(e) => setAction(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            >
                <option value="create">Create</option>
                <option value="edit">Edit</option>
            </select>

            <button onClick={assign} style={{ width: "100%" }}>
                Assign Form
            </button>
        </div>
    );
}