import React, { useState } from "react";
import { GlobalNavbarPortal } from "../../../global/components/Navbar";
import { routes } from "../../../global/routes/Routes";

export const Create = () => {
    const [employee, setEmployee] = useState({
        name: '',
        role: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        status: 'Active',
    });

    const change = (e) => {
        setEmployee((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        // Here you can send employee data to backend
        console.log('Submitted employee:', employee);
    };

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Add / Edit Employee"
                reserveActions={[{ type: 'list', to: routes.employee.list() }]}
            />

            <form onSubmit={submit}>
                <div className="row m-0 mb-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={employee.name}
                            onChange={change}
                            placeholder="Enter full name"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Role</label>
                        <input
                            type="text"
                            className="form-control"
                            name="role"
                            value={employee.role}
                            onChange={change}
                            placeholder="Enter role"
                            required
                        />
                    </div>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Department</label>
                        <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={employee.department}
                            onChange={change}
                            placeholder="Enter department"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={employee.status}
                            onChange={change}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={employee.email}
                            onChange={change}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={employee.phone}
                            onChange={change}
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={employee.address}
                            onChange={change}
                            placeholder="Enter address"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={employee.dob}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
};