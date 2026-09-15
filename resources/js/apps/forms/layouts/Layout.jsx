import { Outlet } from "react-router-dom"
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { BsPeople, BsPerson } from "react-icons/bs";
import { routes } from "../../../global/routes/Routes";
import { GrAdd, GrInbox, GrList } from "react-icons/gr";

export const Layout = () =>{

    const navs = [
        {
            title: 'Create Form',
            route: routes.form.create,
            icon: GrAdd
        },{
            title: 'List Forms',
            route: routes.form.list,
            icon: GrList
        },{
            title: 'List Instances',
            route: routes.instance.list,
            icon: GrInbox
        },
    ];

    return(
        <GlobalLayout navs={navs}>
            <Outlet />
        </GlobalLayout>
    )
}