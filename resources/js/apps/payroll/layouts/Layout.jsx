import { Outlet } from "react-router-dom"
import { routes } from "../routes/Routes";
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { MdDashboard, MdPayments } from "react-icons/md";
import { BiCalendarStar } from "react-icons/bi";
import { TbTax } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useEffect } from "react";

export const Layout = () =>{

    const navs = [
        { title: 'Dashboard', route: null, icon: MdDashboard },
        { title: 'Pay Run', route: null, icon: MdPayments },
        { title: 'Leave & Attendance', route: null, icon: BiCalendarStar },
        { title: 'Taxes', route: null, icon: TbTax },
        { title: 'Loans', route: null, icon: FaMoneyBillTransfer },
        { title: 'Reports', route: null, icon: FaChartBar },
        { title: 'Settings', route: null, icon: IoSettings },
    ];

    return(
        <GlobalLayout navs={navs}>
            <Outlet />
        </GlobalLayout>
    )
}