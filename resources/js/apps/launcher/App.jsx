import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Apps } from "./pages/Apps";
import { routes } from "../../global/routes/Routes";
import { AuthProvider } from "../../global/context/AuthProvider";
import { api } from "../../global/services/Api";
import { useLayoutEffect } from "react";

export const App = () =>{

    useLayoutEffect(()=>{
        api.autoRedirect.off();
    }, []);

    return (
        <HashRouter>
            <AuthProvider displayChildrenEvenIfNotAuthenticted>
                <Routes>
                    <Route path={routes.launcher.apps} element={<Apps />} />
                    <Route path={routes.default} element={<Navigate to={routes.launcher.apps} />} />
                </Routes>
            </AuthProvider>
        </HashRouter>
    )
}
