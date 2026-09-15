import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../global/context/AuthProvider";
import { routes } from "../../../global/routes/Routes";

export const RecruitmentLayout = () => {
    const { authenticated } = useAuth();

    if(!authenticated){
        routes.navigate.to.account().withPath('login');
        return null;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
