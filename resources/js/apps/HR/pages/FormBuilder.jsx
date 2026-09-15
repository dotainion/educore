import { useState } from "react";
import axios from "axios";

export const FormBuilder = () =>{
    const [title, setTitle] = useState("");
    const [fields, setFields] = useState([]);

    // Add field
    const addField = (type) => {
        setFields((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                type,
                name: `field_${prev.length + 1}`,
                label: "New Field",
                required: false,
                options: type === "select" ? ["Option 1"] : [],
            },
        ]);
    };

    // Update field
    const updateField = (id, key, value) => {
        setFields((prev) =>
            prev.map((f) =>
                f.id === id ? { ...f, [key]: value } : f
            )
        );
    };

    // Remove field
    const removeField = (id) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    // Save to backend
    const saveForm = async () => {
        if (!title || fields.length === 0) {
            alert("Title and at least one field required");
            return;
        }

        await axios.post("/api/forms", {
            title,
            schema: fields,
        });

        alert("Form saved successfully");
    };

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>

            {/* Title */}
            <h3>HR Form Builder</h3>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Form title"
                style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 15,
                }}
            />

            {/* Field Buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button onClick={() => addField("text")}>Text</button>
                <button onClick={() => addField("email")}>Email</button>
                <button onClick={() => addField("select")}>Select</button>
            </div>

            {/* Fields */}
            {fields.map((field) => (
                <div
                    key={field.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 6,
                    }}
                >
                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            value={field.label}
                            onChange={(e) =>
                                updateField(field.id, "label", e.target.value)
                            }
                            placeholder="Field label"
                            style={{ flex: 1, padding: 6 }}
                        />

                        <select
                            value={field.type}
                            onChange={(e) =>
                                updateField(field.id, "type", e.target.value)
                            }
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="select">Select</option>
                        </select>

                        <button onClick={() => removeField(field.id)}>
                            X
                        </button>
                    </div>

                    {/* Select options (only if select) */}
                    {field.type === "select" && (
                        <input
                            style={{ marginTop: 8, width: "100%" }}
                            placeholder="Comma separated options"
                            value={field.options.join(",")}
                            onChange={(e) =>
                                updateField(
                                    field.id,
                                    "options",
                                    e.target.value.split(",")
                                )
                            }
                        />
                    )}
                </div>
            ))}

            {/* Save */}
            <button
                onClick={saveForm}
                style={{
                    marginTop: 20,
                    padding: 10,
                    width: "100%",
                    background: "black",
                    color: "white",
                }}
            >
                Save Form
            </button>
        </div>
    );
}