import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Layout } from "./layouts/Layout";
import { Placeholder } from "../../global/components/Placeholder";
import { ApiProvider } from "../../global/context/ApiProvider";
import { AuthProvider } from "../../global/context/AuthProvider";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider>
            <Route element={<Layout />}>
                <Route path={routes.default} element={<Placeholder />} />
            </Route>
        </RoutesProvider>
    )
}
