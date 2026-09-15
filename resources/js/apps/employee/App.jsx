import { Navigate, Route } from "react-router-dom";
import { Employees } from "./pages/Employees";
import { Create } from "./pages/Create";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "../../global/context/AuthProvider";
import { ApiProvider } from "../../global/context/ApiProvider";
import { Layout } from "./layouts/Layout";
import { routes } from "../../global/routes/Routes";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider>
            <Route element={<Layout />}>
                <Route path={routes.employee.create} element={<Create />} />
                <Route path={routes.employee.profile()} element={<Profile />} />
                <Route path={routes.employee.list} element={<Employees />} />
                <Route path={routes.default} element={<Navigate to={routes.employee.list} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </RoutesProvider>
    )
}
