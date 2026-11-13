
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../service/Api";
import { Form } from "../../widgets/Form";
import { Address } from "../../components/Address";

const emptyAddress = {
    street: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    type: "",
    status: "",
    sameAsMailing: false,
};

export const StudentAddress = () => {

    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const addAddress = () => {
        setSelected({
            ...emptyAddress,
            isNew: true,
        });
    };

    const selectAddress = (address) => {
        setSelected(address);
    };

    const removeAddress = (address) => {
        if (!address.addressId) return;
        if (!window.confirm("Delete this address?")) return;

        api.delete("/address/delete", {
            params: { addressId: address.addressId },
        }).then(() => {
            const remaining = addresses.filter((item) => {
                return item.addressId !== address.addressId;
            });

            setAddresses(remaining);
            setSelected(remaining[0] || null);
        }).catch((error) => {

        });
    };

    useEffect(() => {
        api.get("/address/list", {
            params: { studentId: params.studentId },
        }).then((response) => {
            setAddresses(response.data.addresses);
            setSelected((current) => {
                if (!current) return response.data.addresses[0] || null;

                const found = response.data.addresses.find((item) => {
                    return item.addressId === current.addressId;
                });

                return found || response.data.addresses[0] || null;
            });
        }).catch((error) => {

        }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h5 className="fw-bold mb-1">Addresses</h5>
                    <p className="text-secondary mb-0">
                        Manage the student's residential and mailing addresses.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addAddress}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Address
                </button>
            </div>

            {/* Address selector */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {addresses.map((address) => {
                    const active = selected?.addressId === address.addressId;

                    return (
                        <button
                            type="button"
                            key={address.addressId}
                            onClick={() => selectAddress(address)}
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
                                    <i className="bi bi-geo-alt fs-5"></i>
                                </div>

                                <div className="overflow-hidden">
                                    <div className="fw-semibold text-truncate">
                                        {address.type || "Address"}
                                    </div>
                                    <small className="text-secondary text-truncate d-block">
                                        {[address.street, address.city].filter(Boolean).join(", ")}
                                    </small>
                                </div>
                            </div>

                            {address.sameAsMailing && (
                                <div className="mt-2">
                                    <span className="badge text-bg-success">
                                        Same as Mailing
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}

                {loading && (
                    <div className="d-flex align-items-center text-secondary small">
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading addresses...
                    </div>
                )}

                {!loading && addresses.length === 0 && !selected && (
                    <p className="text-secondary small mb-0">
                        No addresses have been added yet.
                    </p>
                )}
            </div>

            {/* Selected address form */}
            {selected && (
                <div className="bg-white border rounded-3 p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                        <div>
                            <h6 className="fw-bold mb-1">
                                {selected?.isNew
                                    ? "New Address"
                                    : selected.type || "Address Details"}
                            </h6>
                            <small className="text-secondary">
                                {selected.isNew
                                    ? "Enter the address information below."
                                    : "Manage this address's information."}
                            </small>
                        </div>

                        {!selected?.isNew && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeAddress(selected)}
                            >
                                <i className="bi bi-trash3 me-1"></i>
                                Remove
                            </button>
                        )}
                    </div>

                    <Form
                        casts={{ sameAsMailing: 'boolean' }}
                        data={{ attributes: selected }}
                        params={{
                            userId: params.studentId,
                            ...(selected.addressId && {
                                addressId: selected.addressId,
                            }),
                        }}
                        action={selected?.isNew ? '/address/create' : '/address/update'}
                        key={selected.addressId || "new-address"}
                    >
                        <Address />
                    </Form>
                </div>
            )}
        </div>
    );
};
