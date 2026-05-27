import { useEffect, useState } from "react";
import axios from "axios";

export const FormViewer = ({ formId }) =>{
    const [form, setForm] = useState(null);
    const [values, setValues] = useState({});

    // Load form schema
    useEffect(() => {
        const loadForm = async () => {
            const res = await axios.get(`/api/forms/${formId}`);
            setForm(res.data);
        };

        loadForm();
    }, [formId]);

    // Handle input change
    const handleChange = (name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit form
    const submit = async () => {
        await axios.post(`/api/forms/${formId}/submit`, {
            data: values,
        });

        alert("Form submitted");
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2>{form.title}</h2>

            {form.schema.map((field) => (
                <div key={field.id} style={{ marginBottom: 15 }}>

                    <label style={{ display: "block", marginBottom: 5 }}>
                        {field.label}
                    </label>

                    {/* TEXT */}
                    {field.type === "text" && (
                        <input
                            type="text"
                            onChange={(e) =>
                                handleChange(field.name, e.target.value)
                            }
                            style={{ width: "100%", padding: 8 }}
                        />
                    )}

                    {/* EMAIL */}
                    {field.type === "email" && (
                        <input
                            type="email"
                            onChange={(e) =>
                                handleChange(field.name, e.target.value)
                            }
                            style={{ width: "100%", padding: 8 }}
                        />
                    )}

                    {/* SELECT */}
                    {field.type === "select" && (
                        <select
                            onChange={(e) =>
                                handleChange(field.name, e.target.value)
                            }
                            style={{ width: "100%", padding: 8 }}
                        >
                            <option value="">Select</option>
                            {field.options?.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    )}

                </div>
            ))}

            <button onClick={submit} style={{ padding: 10, width: "100%" }}>
                Submit
            </button>
        </div>
    );
}