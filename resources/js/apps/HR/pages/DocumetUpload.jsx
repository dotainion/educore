import React, { useEffect, useState } from "react";
import { api } from "../../../global/services/Api";
import { DocumentDropzone } from "../components/DocumentDropzone";
import { useParams } from "react-router-dom";

export const DocumentUpload = () => {
    const [employee, setEmployee] = useState(null);

    const params = useParams();
    
    const uploaded = (document) => {
        console.log(document);
    };

    useEffect(()=>{
        if(!params.userId){
            console.error('In DocumentDropzone component, parms: userId was not set in url.');
            return;
        }
        api.employee.find({userId: params.userId}).then((response)=>{
            setEmployee(response.data.user);
        }).catch((error)=>{

        });
    }, []);

    return (
        <div className="container py-3">
            {/* HEADER */}
            <div className="d-flex justify-content-between mb-3 mb-sm-4">
                <div>
                    <h5 className="mb-0">Upload Document</h5>
                    <div className="text-muted small">
                        Add documents to onboarding workflow
                    </div>
                </div>
                <div>
                    {employee && (
                        <div className="d-flex justify-content-end mb-3">
                            <div className="badge bg-light text-dark border p-2">
                                <div className="fw-semibold">{employee.attributes.fullName}</div>
                                <div className="small text-muted">
                                    {employee.attributes.roles.map((role)=>role.attributes.name).join(' • ')}
                                    {employee.attributes.departments.map((dept)=>dept.attributes.name).join(' • ')}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <DocumentDropzone onUploaded={uploaded} />
        </div>
    );
};