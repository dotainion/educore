import { createContext, useContext, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider";
import { routes } from "../routes/Routes";

const Context = createContext();

export const useGlobalLayout = () => useContext(Context);

export const GlobalLayout = ({ navs, children }) =>{
    const { authenticated } = useAuth();

    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [actions, setActions] = useState([]);
    const [reserveActions, setReserveActions] = useState([]);
    const [hide, setHide] = useState(true);
    const [ellipsisMenu, setEllipsisMenu] = useState(null);

    const toggleMenu = (option={force: {hide: null}}) =>{
        if(typeof option?.force?.hide === 'boolean') setHide(option.force.hide);
        else setHide(!hide);
    }

    const values = {
        hide,
        setTitle,
        setSubtitle,
        setActions,
        setReserveActions,
        toggleMenu,
        setEllipsisMenu
    }

    if(!authenticated){
        routes.navigate.to.account().withPath('login');
        return null;
    }
    
    return(
        <Context.Provider value={values}>
            <div className="d-flex">
                <div
                    className={`position-fixed-md top-0 start-0 d-flex flex-column vh-100 p-2 ${
                        hide ? 'hide-md' : ''
                    }`}
                    style={{
                        minWidth: '240px',
                        maxWidth: '240px',
                        zIndex: 1060
                    }}
                >
                    <Sidebar links={navs} />
                </div>
                <motion.div
                    onClick={toggleMenu}
                    className={`d-block d-md-none position-fixed-md top-0 start-0 w-100 vh-100 bg-secondary bg-opacity-10 ${
                        hide ? 'hide-md' : ''
                    }`}
                    initial={{ opacity: 0, x: '-100%' }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0 }}
                    style={{zIndex: 1055}}
                ></motion.div>
                <div className="vh-100 overflow-auto flex-fill">
                    <Navbar
                        title={title}
                        subtitle={subtitle}
                        reserveActions={reserveActions}
                        actions={actions}
                        ellipsisMenu={ellipsisMenu}
                    />
                    {children}
                </div>
            </div>
        </Context.Provider>
    )
}