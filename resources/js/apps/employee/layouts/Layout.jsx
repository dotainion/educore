import { Outlet } from "react-router-dom"
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { BsPeople, BsPerson } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { useAuth } from "../../../global/context/AuthProvider";
import { routes } from "../../../global/routes/Routes";

export const Layout = () =>{
    const { user } = useAuth();

    const navs = [
        {
            title: 'Dashboard',
            route: routes.employee.profile(user.id),
            icon: BsPerson
        },{
            title: 'My Profile',
            route: routes.employee.profile(user.id),
            icon: BsPerson
        },{
            title: 'Attendance',
            route: routes.employee.create,
            icon: GrAdd
        },{
            title: 'Leave / Time Off',
            route: routes.employee.list,
            icon: BsPeople
        },{
            title: 'Tasks / Work',
            route: routes.employee.list,
            icon: BsPeople
        },{
            title: 'Calendar / Schedule',
            route: routes.employee.list,
            icon: BsPeople
        },{
            title: 'Employees',
            route: routes.employee.list,
            icon: BsPeople
        },{
            title: 'Payslips',
            route: routes.employee.list,
            icon: BsPeople
        },
    ];

    return(
        <GlobalLayout navs={navs}>
            <Outlet />
        </GlobalLayout>
    )
}