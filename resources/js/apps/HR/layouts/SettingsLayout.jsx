import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { FaCaretRight } from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import { FcDepartment, FcRules } from "react-icons/fc";
import { BiNotification } from "react-icons/bi";
import { GrFlows, GrIntegration } from "react-icons/gr";
import { routes } from "../../../global/routes/Routes";
import { MobileTransformable, MobileTransformableProvider } from "../../../global/components/MobileTransformable";
import { useRef } from "react";

export const SettingsLayout = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const mobileTransformableRef = useRef();

    const groups = [
        {
            title: 'Settings',
            description: 'Manage candidates through your hiring pipeline',
            navs: [
                {
                    title: 'Pipeline',
                    icon: GrFlows,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.pipeline
                },{
                    title: 'Company',
                    icon: MdBusiness,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.company
                },{
                    title: 'HR Rules',
                    icon: FcRules,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.rules
                },{
                    title: 'Notifications',
                    icon: BiNotification,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.notifications
                },{
                    title: 'Integrations',
                    icon: GrIntegration,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.integrations
                },{
                    title: 'Departments',
                    icon: FcDepartment,
                    description: 'Hello world this is a test for me',
                    route: routes.hr.settings.departments
                },
            ]
        },
    ];

    const open = (nav) =>{
        navigate(nav.route);
        mobileTransformableRef.current.open();
    }

    return(
        <div>
            <div className="row m-0">
                <div className="col-12 col-sm-5 p-2">
                    {groups.map((group, key)=>(
                        <ul className="list-group user-select-none mb-3" key={`stts-nav-${key}`}>
                            {group.title && group.description && (
                                <li className="list-group-item small py-3">
                                    <div className="fw-semibold">{group.title}</div>
                                    <div className="small text-muted">{group.description}</div>
                                </li>
                            )}
                            {group.navs.map((nav)=>(
                                <li
                                    onClick={()=>open(nav)}
                                    className={`list-group-item list-group-item-action small d-flex align-items-center justify-content-between gap-3 ${
                                        location.pathname === nav.route ? 'active' : ''
                                    }`}
                                    key={nav.title}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <nav.icon />
                                        <div>
                                            {nav.title}
                                            <div className={`small text-${
                                                location.pathname === nav.route ? 'white' : 'muted'
                                            }`}>{nav.description}</div>
                                        </div>
                                    </div>
                                    <FaCaretRight />
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="col-12 col-sm-7 p-2">
                    <MobileTransformableProvider
                        ref={mobileTransformableRef}
                    >
                        <MobileTransformable
                            className="card border shadow-sm position-sticky rounded-2 p-3"
                            style={{top: '60px'}}
                        >
                            <Outlet />
                        </MobileTransformable>
                    </MobileTransformableProvider>
                </div>
            </div>
        </div>
    )
}