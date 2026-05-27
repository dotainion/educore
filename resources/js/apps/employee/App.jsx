import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Employees } from "./pages/Employees";
import { Create } from "./pages/Create";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "../../global/context/AuthProvider";
import { ApiProvider } from "../../global/context/ApiProvider";
import { Layout } from "./layouts/Layout";
import { routes } from "../../global/routes/Routes";
import { NotFound } from "../../global/pages/NotFound";

export const App = () =>{
    return (
        <HashRouter>
            <AuthProvider>
                <ApiProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path={routes.employee.create} element={<Create />} />
                            <Route path={routes.employee.profile()} element={<Profile />} />
                            <Route path={routes.employee.list} element={<Employees />} />
                            <Route path={routes.default} element={<Navigate to={routes.employee.list} />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ApiProvider>
            </AuthProvider>
        </HashRouter>
    )
}
