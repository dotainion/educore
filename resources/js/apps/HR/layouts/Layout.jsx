import { Outlet } from "react-router-dom"
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { MdDashboard, MdReport, MdWork } from "react-icons/md";
import { routes } from "../../../global/routes/Routes";
import { IoPeople, IoSettings } from "react-icons/io5";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export const Layout = () =>{
    
    const navs = [
        { title: 'Dashboard', route: routes.hr.dashboard, icon: MdDashboard },
        { title: 'Work Schedules', route: routes.hr.workSchedule.dashboard, icon: FaCalendarAlt },
        { title: 'Employees', route: routes.hr.employees, icon: IoPeople },
        { title: 'Onboarding', route: routes.hr.addEmployeeOption, icon: FaPerson },
        { title: 'Recruitment', route: routes.hr.recruitment.recruite, icon: MdWork },
        { title: 'Leave Requests', route: routes.hr.leaveRequests, icon: FaClock },
        { title: 'Reports', route: routes.hr.reports, icon: MdReport },
        { title: 'Settings', route: routes.hr.settings.company, icon: IoSettings },
    ];

    return(
        <GlobalLayout navs={navs}>
            <div className="py-md-4">
                <Outlet />
            </div>
        </GlobalLayout>
    )
}