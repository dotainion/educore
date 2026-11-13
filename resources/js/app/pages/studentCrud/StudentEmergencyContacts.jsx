
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../service/Api";
import { Form } from "../../widgets/Form";
import { Contact } from "../../components/Contact";

const emptyContact = {
    title: "",
    name: "",
    type: "Emergency",
    relationship: "",
    company: "",
    phone: "",
    email: "",
    note: "",
    primary: false,
    vip: false,
};

export const StudentEmergencyContacts = () => {

    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const addContact = () => {
        setSelected({
            ...emptyContact,
            isNew: true,
        });
    };

    const selectContact = (contact) => {
        setSelected(contact);
    };

    const removeContact = (contact) => {
        if (!contact.contactId) return;
        if (!window.confirm(`Delete ${contact.name}?`)) return;

        api.delete("/contact/delete", {
            params: { contactId: contact.contactId },
        }).then(() => {
            const remaining = contacts.filter((item) => {
                return item.contactId !== contact.contactId;
            });

            setContacts(remaining);
            setSelected(remaining[0] || null);
        }).catch((error)=>{

        });
    };

    useEffect(() => {
        api.get("/contact/list", {
            params: { studentId: params.studentId },
        }).then((response) => {
            setContacts(response.data.contacts);
            setSelected((current) => {
                if (!current) return response.data.contacts[0] || null;
                const found = response.data.contacts.find((item) => {
                    return item.contactId === current.contactId;
                });
                return found || response.data.contacts[0] || null;
            });
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h5 className="fw-bold mb-1">Emergency Contacts</h5>
                    <p className="text-secondary mb-0">
                        Who should the school contact if the parent or guardian cannot be reached?
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addContact}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Contact
                </button>
            </div>

            {/* Contact selector */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {contacts.map((contact) => {
                    const active = selected?.contactId === contact.contactId;

                    return (
                        <button
                            type="button"
                            key={contact.contactId}
                            onClick={() => selectContact(contact)}
                            className={`btn text-start border rounded-3 p-3 ${
                                active
                                    ? "border-primary bg-primary-subtle"
                                    : "bg-body"
                            }`}
                            style={{ minWidth: "190px" }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center ${
                                        active
                                            ? "bg-primary text-white"
                                            : "bg-body-secondary"
                                    }`}
                                    style={{ width: 38, height: 38 }}
                                >
                                    <i className="bi bi-person fs-5"></i>
                                </div>

                                <div className="overflow-hidden">
                                    <div className="fw-semibold text-truncate">
                                        {contact.title} {contact.name}
                                    </div>
                                    <small className="text-secondary">
                                        {contact.relationship || contact.type}
                                    </small>
                                </div>
                            </div>

                            {(contact.primary || contact.vip) && (
                                <div className="d-flex gap-1 mt-2">
                                    {contact.primary && (
                                        <span className="badge text-bg-success">
                                            Primary
                                        </span>
                                    )}
                                    {contact.vip && (
                                        <span className="badge text-bg-warning">
                                            VIP
                                        </span>
                                    )}
                                </div>
                            )}
                        </button>
                    );
                })}

                {loading && (
                    <div className="d-flex align-items-center text-secondary small">
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading contacts...
                    </div>
                )}

                {!loading && contacts.length === 0 && !selected && (
                    <p className="text-secondary small mb-0">
                        No contacts have been added yet.
                    </p>
                )}
            </div>

            {/* Selected contact form */}
            {selected && (
                <div className="bg-white border rounded-3 p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                        <div>
                            <h6 className="fw-bold mb-1">
                                {selected?.isNew
                                    ? "New Contact"
                                    : `${selected.title || ""} ${selected.name || "Contact Details"}`}
                            </h6>
                            <small className="text-secondary">
                                {selected.isNew
                                    ? "Enter the contact's information below."
                                    : "Manage this contact's information."}
                            </small>
                        </div>

                        {!selected?.isNew && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeContact(selected)}
                            >
                                <i className="bi bi-trash3 me-1"></i>
                                Remove
                            </button>
                        )}
                    </div>

                    <Form
                        casts={{ primary: 'boolean', vip: 'boolean' }}
                        data={{attributes: selected}}
                        params={{
                            userId: params.studentId,
                            ...(selected.contactId && {
                                contactId: selected.contactId,
                            }),
                        }}
                        action={selected?.isNew ? '/contact/create' : '/contact/update'}
                        key={selected.contactId || "new-contact"}
                    >
                        <Contact />
                    </Form>
                </div>
            )}
        </div>
    );
};
