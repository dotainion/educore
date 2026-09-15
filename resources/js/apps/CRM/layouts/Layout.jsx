import { Outlet } from "react-router-dom"
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { MdDashboard, MdReport, MdSettings } from "react-icons/md";
import { BsActivity } from "react-icons/bs";
import { IoBusiness } from "react-icons/io5";
import { LuContact } from "react-icons/lu";
import { BiTag } from "react-icons/bi";
import { FaSalesforce } from "react-icons/fa6";
import { GiLeadPipe } from "react-icons/gi";
import { GrAlert } from "react-icons/gr";
import { routes } from "../../../global/routes/Routes";

export const Layout = () =>{

    const navs = [
        { title: 'Dashboard', route: routes.crm.dashboard, icon: MdDashboard },
        { title: 'Leads Report', route: routes.crm.leadsReport, icon: MdReport },
        { title: 'Sales Report', route: routes.crm.salesReport, icon: FaSalesforce },

        { title: 'Activity', route: routes.crm.activity.list, icon: BsActivity },
        { title: 'Company', route: routes.crm.company.list, icon: IoBusiness },
        { title: 'Contact', route: routes.crm.contact.list, icon: LuContact },
        { title: 'Deal', route: routes.crm.deal.list, icon: BiTag },
        { title: 'Lead', route: routes.crm.lead.list, icon: GiLeadPipe },

        { title: 'Settings', route: routes.crm.crmSettings, icon: MdSettings },
        { title: 'Roles', route: routes.crm.roles, icon: GrAlert },
    ];

    return(
        <GlobalLayout navs={navs}>
            <Outlet />
        </GlobalLayout>
    )
}