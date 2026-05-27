import React from "react";
import { FaPlus, FaUserFriends, FaArrowRight } from "react-icons/fa";

export const EmptyDisplay = ({ icon: Icon, title, subtitle, render }) => {
    /**
     * for icon only react icon allow
     * NOTE: lucide-react dose not work as expeted
     */
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="bg-light p-3 position-relative">
                <div
                    className="position-absolute top-0 end-0 opacity-10"
                    style={{fontSize: 180, transform: "translate(20px,-30px)"}}
                >
                    {Icon && <Icon />}
                </div>
                <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 mb-4"
                    style={{width: 80, height: 80, backdropFilter: "blur(8px)"}}
                >
                    {Icon && <Icon size={34} />}
                </div>
                <h2 className="fw-bold mb-3">{title}</h2>
                <p className="mb-4" style={{maxWidth: 650, lineHeight: 1.7}}>
                    {subtitle}
                </p>
                {render && render({icon: {plus: FaPlus, arrow: FaArrowRight}})}
            </div>
        </div>
    );
};