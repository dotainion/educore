import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Placeholder } from "../../global/components/Placeholder";
import { routes } from "./routes/Routes";
import { Layout } from "./layouts/Layout";
import { ApiProvider } from "../../global/context/ApiProvider";
import { AuthProvider } from "../../global/context/AuthProvider";

export const App = () =>{
    return (
        <HashRouter>
            <AuthProvider>
                <ApiProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path={routes.default} element={<Placeholder />} />
                        </Route>
                    </Routes>
                </ApiProvider>
            </AuthProvider>
        </HashRouter>
    )
}
