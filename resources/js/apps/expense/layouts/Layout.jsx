import { Outlet } from "react-router-dom"
import { routes } from "../routes/Routes";
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";

export const Layout = () =>{

    const navs = [];

    return(
        <GlobalLayout navs={navs}>
            <Outlet />
        </GlobalLayout>
    )
}