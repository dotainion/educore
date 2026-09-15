import { Navigate, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Recovery } from "./pages/Recovery";
import { ApiProvider } from "../../global/context/ApiProvider";
import { Layout } from "./layout/Layout";
import { AuthProvider } from "../../global/context/AuthProvider";
import { SignOut } from "./pages/SignOut";
import { routes } from "../../global/routes/Routes";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider displayChildrenEvenIfNotAuthenticted catchAllOff>
            <Route element={<Layout />}>
                <Route path={routes.account.signUp} element={<Register />} />
                <Route path={routes.account.signIn} element={<SignIn />} />
                <Route path={routes.account.recovery} element={<Recovery />} />
                <Route path={routes.account.signOut} element={<SignOut />} />
            </Route>
            <Route path={routes.default} element={<Navigate to={routes.account.signIn} />} />
            <Route path={'*'} element={<Navigate to={routes.account.signIn} />} />
        </RoutesProvider>
    )
}
