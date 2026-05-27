import React from "react";
import { GlobalNavbarPortal } from "../../../global/components/Navbar";
import { routes } from "../../../global/routes/Routes";

export const Profile = () => {
    const employee = {
        name: "John Doe",
        role: "Software Engineer",
        department: "Engineering",
        status: "Active",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, City, Country",
        dob: "1990-05-12",
        joinedDate: "2022-01-15",
        documents: [
            { id: 1, name: "Resume.pdf" },
            { id: 2, name: "Contract.pdf" },
            { id: 3, name: "Certificate.pdf" },
        ],
    };

    return (
        <div className="container">
            <GlobalNavbarPortal
                title={employee.name}
                subtitle="Edit Profile"
                reserveActions={[
                    { type: 'create', to: routes.employee.create() },
                    { type: 'list', to: routes.employee.list() },
                ]}
            />

            <div className="row m-0">
                {/* Personal Info */}
                <div className="col-md-6 mb-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Personal Information</h5>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Address:</strong> {employee.address}</p>
                            <p><strong>Date of Birth:</strong> {employee.dob}</p>
                        </div>
                    </div>
                </div>

                {/* Job Info */}
                <div className="col-md-6 mb-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Job Information</h5>
                            <p><strong>Role:</strong> {employee.role}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Status:</strong> 
                                <span className={`badge ms-2 ${employee.status === "Active" ? "bg-success" : "bg-warning text-dark"}`}>
                                    {employee.status}
                                </span>
                            </p>
                            <p><strong>Date Joined:</strong> {employee.joinedDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="row m-0">
                <div className="col-12 mb-4">
                    <div className="card border">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Documents</h5>
                            <div className="list-group">
                                {employee.documents.map((doc) => (
                                    <div key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {doc.name}
                                        <button className="btn btn-outline-primary btn-sm">View</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};