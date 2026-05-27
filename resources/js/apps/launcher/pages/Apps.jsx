import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import comboChart from '@iconify-icons/flat-color-icons/combo-chart';
import businessman from '@iconify-icons/flat-color-icons/businessman';
import moneyTransfer from '@iconify-icons/flat-color-icons/money-transfer';
import calendar from '@iconify-icons/flat-color-icons/calendar';
import leave from '@iconify-icons/flat-color-icons/leave';
import todoList from '@iconify-icons/flat-color-icons/todo-list';
import workflow from '@iconify-icons/flat-color-icons/workflow';
import template from '@iconify-icons/flat-color-icons/template';
import currencyExchange from '@iconify-icons/flat-color-icons/currency-exchange';
import contacts from '@iconify-icons/flat-color-icons/contacts';
import multipleUsers from '@iconify-icons/flat-color-icons/conference-call';
import customerSupport from '@iconify-icons/flat-color-icons/customer-support';
import { routes } from "../../../global/routes/Routes";
import { useState } from "react";
import { Spinner } from "../../../global/components/Spinner";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { InformationSection } from "../components/InformationSection";

export const Apps = () => {
    const apps = [
        { title: 'Dashboard', icon: comboChart, to: () => routes.navigate.to.dashboard().withHashOnly() },
        { title: 'Employee', icon: businessman, to: () => routes.navigate.to.employee().withHashOnly() },
        { title: 'Payroll', icon: moneyTransfer, to: () => routes.navigate.to.payroll().withHashOnly() },
        { title: 'Attendance', icon: calendar, to: () => routes.navigate.to.attendance().withHashOnly() },
        { title: 'Leave', icon: leave, to: () => routes.navigate.to.leave().withHashOnly() },
        { title: 'Tasks', icon: todoList, to: () => routes.navigate.to.task().withHashOnly() },
        { title: 'Projects', icon: workflow, to: () => routes.navigate.to.project().withHashOnly() },
        { title: 'Invoices', icon: template, to: () => routes.navigate.to.invoice().withHashOnly() },
        { title: 'Expenses', icon: currencyExchange, to: () => routes.navigate.to.expense().withHashOnly() },
        { title: 'CRM', icon: contacts, to: () => routes.navigate.to.crm().withHashOnly() },
        { title: 'HR', icon: multipleUsers, to: () => routes.navigate.to.hr().withHashOnly() },
        { title: 'Support', icon: customerSupport, to: () => routes.navigate.to.support().withHashOnly() },
    ];

    return (
        <div className="container-fluid min-vh-100 py-3 py-md-4 d-flex flex-column">
            <Header />
            <div className="container flex-grow-1">
                <div className="row g-0 m-0">
                    <div className="col-12 col-md-3 d-none p-0">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-9-none p-0">
                        <motion.div
                            className="container-fluid p-0 user-select-none mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08 } },
                            }}
                        >
                            <div className="row g-3">
                                {apps.map((app) => (
                                    <AppCard key={app.title} app={app} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="my-5 py-5">
                <InformationSection />
            </div>
        </div>
    );
};

const AppCard = ({ app }) => {
    const [loading, setLoading] = useState(false);

    const to = () => {
        setLoading(true);
        app.to();
    };

    return (
        <motion.div
            className="col-4 col-sm-3 col-md-3 col-lg-2 text-center"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' }
                },
            }}
        >
            <div onClick={to} className="card action position-relative p-2 h-100 text-center">
                <Icon className="m-auto" icon={app.icon} width="42" height="42" />
                <div className="small mt-2">{app.title}</div>
                <Spinner show={loading} absolute bg="white" />
            </div>
        </motion.div>
    );
};
