import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalLayout } from "../layouts/GlobalLayout";
import { BiArrowBack, BiEdit, BiMenu } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEllipsisV, FaSave } from "react-icons/fa";
import { BsList } from "react-icons/bs";

export const Navbar = ({ title, subtitle, reserveActions, actions, ellipsisMenu }) =>{
    const { toggleMenu, hide } = useGlobalLayout();

    const isEmpty = (
        !title &&
        !subtitle &&
        !reserveActions.length &&
        !actions.length &&
        !ellipsisMenu
    );

    const reservesOptions = {
        create: { title: 'Create', icon: GrAdd },
        edit: { title: 'Edit', icon: BiEdit },
        save: { title: 'Save', icon: FaSave },
        delete: { title: 'Delete', icon: MdDelete },
        cancel: { title: 'Cancel', icon: BiArrowBack },
        list: { title: 'List', icon: BsList },
    };

    const reserves = reserveActions.map((reserve)=>({
        ...reservesOptions[reserve.type],
        ...reserve
    }));

    return(
        <motion.nav
            className={`bg-white position-sticky top-0 ${isEmpty ? 'p-3 p-md-0 pb-2 pb-md-0' : 'p-3 pb-2'} d-flex flex-wrap justify-content-between gap-3`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            style={{zIndex: 1050}}
        >
            <div className="d-flex gap-3">
                <div>
                    <h5 className="mb-0">{title}</h5>
                    {subtitle && (
                        <small className="lh-1">{subtitle}</small>
                    )}
                </div>
            </div>
            <div>
                <div className="d-flex flex-wrap gap-2">
                    {actions.map((action, key)=>(
                        <Navbutton action={action} key={`${action.title}-${key}`} />
                    ))}
                    {reserves.map((reserve, key)=>(
                        <Navbutton action={reserve} key={`${reserve.title}-${key}`} />
                    ))}
                    {ellipsisMenu && (
                        <div className="dropdown">
                            <button
                                onClick={ellipsisMenu?.onClick}
                                className={`btn btn-sm border-0 ${ellipsisMenu?.className || ''}`}
                                data-bs-toggle="dropdown"
                            >
                                <FaEllipsisV />
                            </button>
                            <ul className="dropdown-menu" hidden={!ellipsisMenu?.list?.length}>
                                {
                                    ellipsisMenu?.list?.length ?
                                    ellipsisMenu?.list?.map?.((menu, key)=>(
                                        <li
                                            onClick={menu.onClick}
                                            className="dropdown-item"
                                            key={`ellipsis-menu-${key}`}
                                        >{menu.title}</li>
                                    )):
                                    <li className="dropdown-item">No item</li>
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className={`d-block d-md-none ${hide ? '' : 'invisible'}`}>
                <button onClick={toggleMenu} className="btn border-0 p-0">
                    <BiMenu className="fs-1" />
                </button>
            </div>
        </motion.nav>
    )
}

const Navbutton = ({ action }) =>{
    if(action?.hidden) return null;

    const BtnLink = ({to, onClick, className, children}) =>{
        if(to) return <Link to={to} className={className}>{children}</Link>
        return <button onClick={onClick} className={className}>{children}</button>
    }

    const className = 'd-flex align-items-center gap-1 btn btn-sm btn-outline-primary rounded-pill px-3';
    const props = action?.to ? { to: action.to } : { onClick: action.onClick };

    return (
        <BtnLink { ...{ ...props, className } }>
            {action?.icon && <action.icon />}
            <span>{action.title}</span>
        </BtnLink>
    )
}

export const GlobalNavbarPortal = ({ title, subtitle, off, reserveActions, actions, ellipsisMenu }) =>{
    const { setTitle, setSubtitle, setActions, setReserveActions, setEllipsisMenu } = useGlobalLayout();

    const validate = (options = [], rules = []) =>{
        try{
            options.forEach((option)=>{
                Object.keys(option).forEach((key)=>{
                    const rule = rules[key] || null;
                    if(!rule) throw new Error(`Invalid attribute passed to NavbarPortal: key: ${key}`);
                    const value = option[key];

                    if(rule && rule.startsWith('includes:')){
                        if(!typeof value === 'string' && !rule.includes(value)){
                            throw new Error(`Invalid content passed to NavbarPortal: key: ${key}, value: ${value}`);
                        }
                        return;
                    }

                    const dataType = () =>{
                        if(typeof value === 'object'){
                            if(value === null) return 'null';
                            else if(Array.isArray(value)) return 'array';
                        }
                        return typeof value;
                    }
                    if(!rule.split('|').includes(dataType())){
                        throw new Error(`Invalid data type passed to NavbarPortal: key: ${key}, value: ${value}`);
                    }
                }); 
            });
        }catch(error){
            console.error(error.message);
        }
    }

    useEffect(()=>{
        validate(actions, {
            title: 'string',
            hidden: 'boolean',
            to: 'string|null',
            onClick: 'function|null',
            icon: 'function'
        });
        validate(reserveActions, {
            type: 'includes:create|delete|edit|list',
            onClick: 'function|null',
            to: 'string|null'
        });

        setTitle(title);
        setSubtitle(subtitle);
        setActions(actions || []);
        setReserveActions(reserveActions || []);
        setEllipsisMenu(ellipsisMenu);
        
        return () =>{
            setTitle(null);
            setSubtitle(null);
            setActions([]);
            setReserveActions([]);
            setEllipsisMenu(null);
        }
    }, [title, subtitle, reserveActions, actions, ellipsisMenu]);

    return null;
}

export const GlobalNavbarControllerPortal = ({ children }) =>{

}