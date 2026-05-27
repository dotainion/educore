import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { useGlobalLayout } from "../layouts/GlobalLayout";
import { routes } from "../routes/Routes";
import logo from "../assets/logo.png";

export const Sidebar = ({ links }) =>{
    const { toggleMenu } = useGlobalLayout();

    const actions = [
        {
            title: 'Logout',
            icon: BiLogOut,
            onClick: () => routes.logout()
        },
    ];

    const home = () => routes.navigate.to.apps();

    return(
        <motion.div
            className="d-flex flex-column rounded-3 border h-100 bg-white overflow-hidden"
            initial={{ opacity: 0, x: '-100%' }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="d-flex flex-column overflow-auto h-100 user-select-none">
                <ul className="list-group position-sticky top-0 rounded-0 mb-3" style={{zIndex: 1050}}>
                    <li className="list-group-item border-0 fw-bold py-0">
                        <Link className="d-flex align-items-center gap-3 gap-md-2 text-decoration-none">
                            <button onClick={toggleMenu} className="btn border-0 p-0 d-block d-md-none">
                                <BiMenu className="fs-1" />
                            </button>
                            <img onClick={home} className="d-none d-md-block pointer" src={logo} alt="cca suit" style={{width: '30px', height: '30px'}} />
                            <div onClick={home} className="d-flex flex-column">
                                <span className="pointer mt-4">{import.meta.env.VITE_APP_NAME}</span>
                                <span className="badge bg-light text-secondary fw-normal lh-1" style={{fontSize: '13px'}}>
                                    {window.miniAppName}
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="list-group rounded-0 mb-auto">
                    {links.map((nav, key)=>(
                        <ListItem nav={nav} key={`${nav.title}-${key}`} />
                    ))}
                </ul>
                <ul className="list-group position-sticky bottom-0 bg-white pb-3" style={{zIndex: 1050}}>
                    <li className="list-group-item border-0">
                        <hr className="m-0"></hr>
                    </li>
                    {actions.map((action, key)=>(
                        <ListItem nav={action} key={`${action.title}-${key}`} />
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

const ListItem = ({ nav, className, style }) =>{
    const { toggleMenu } = useGlobalLayout();

    const location = useLocation();
    const navigate = useNavigate();

    const to = (nav) =>{
        if(nav.route) navigate(nav.route);
        nav?.onClick?.();
        if(nav.stayAlive) return;
        toggleMenu({force: {hide: true}});
    }

    return(
        <li
            onClick={()=>to(nav)}
            className={`list-group-item list-group-item-action small border-0 d-flex align-items-center gap-3 ${
                location.pathname === nav.route ? 'active' : ''
            } ${className || ''}`}
            style={style}
        >
            {nav?.icon && <nav.icon />}
            <span>{nav.title}</span>
        </li>
    )
}
