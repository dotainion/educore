import React from "react";
import { ApplicantStatusButton } from "../ApplicantStatusButton";
import { ApplicantShortlistButton } from "./ApplicantShortlistButton";

export const Applied = ({ item, fullscreen, onUpdate }) => {

    if (item.attributes.status !== 'applied') {
        return null;
    }

    return (
        <div className="mb-3">
            <div className="fw-semibold mb-3">Actions</div>
            <div className="d-grid gap-2">
                <ApplicantStatusButton
                    className="btn btn-sm btn-primary px-3"
                    payload={{status: 'screening', applicantId: item.id}}
                >
                    Screening
                </ApplicantStatusButton>
                <ApplicantShortlistButton
                    className="btn btn-sm btn-success px-3"
                    applicantId={item.id}
                >
                    Shortlist
                </ApplicantShortlistButton>
                <ApplicantStatusButton
                    className="btn btn-sm btn-danger px-3"
                    payload={{status: 'rejected', applicantId: item.id}}
                >
                    Reject
                </ApplicantStatusButton>
            </div>
        </div>
    );
};