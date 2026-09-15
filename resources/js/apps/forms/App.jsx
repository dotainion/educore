import { Navigate, Route } from "react-router-dom";
import { AuthProvider } from "../../global/context/AuthProvider";
import { ApiProvider } from "../../global/context/ApiProvider";
import { Layout } from "./layouts/Layout";
import { routes } from "../../global/routes/Routes";
import { CreateForm } from "./pages/forms/CreateForm";
import { ViewForm } from "./pages/forms/ViewForm";
import { ListForms } from "./pages/forms/ListForms";
import { CreateFormInstance } from "./pages/instance/CreateFormInstance";
import { ViewFormInstance } from "./pages/instance/ViewFormInstance";
import { ListFormInstance } from "./pages/instance/ListFormInstance";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider>
            <Route element={<Layout />}>
                <Route path={routes.form.create} element={<CreateForm />} />
                <Route path={routes.form.build()} element={<CreateForm />} />
                <Route path={routes.form.view()} element={<ViewForm />} />
                <Route path={routes.form.list} element={<ListForms />} />
                <Route path={routes.instance.create()} element={<CreateFormInstance />} />
                <Route path={routes.instance.view()} element={<ViewFormInstance />} />
                <Route path={routes.instance.list} element={<ListFormInstance />} />
                <Route path={routes.default} element={<Navigate to={routes.form.create} />} />
            </Route>
        </RoutesProvider>
    )
}
