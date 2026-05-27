import { motion } from "framer-motion";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";

export const GlobalCardButton = ({onInView, onClick, to, top, children}) =>{
    return(
        <motion.div
            className="col-12 col-sm-6 col-xl-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{minHeight: '200px'}}
            onViewportEnter={()=>onInView?.(true)}
            onViewportLeave={()=>onInView?.(false)}
        >
            <CardButtonSwitch
                to={to}
                onClick={onClick}
                className="card border border-primary border-dashed h-100 pointer"
            >
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center h-100">{top}</div>
                    <div>
                        <GrAdd className="fs-3 text-primary" />
                    </div>
                    <div className="text-center h-100">
                        {children}
                    </div>
                </div>
            </CardButtonSwitch>
        </motion.div>
    )
}

const CardButtonSwitch = ({ onClick, to, className, children }) =>{
    if(to) return (
        <Link to={to} className={className}>
            {children}
        </Link>
    )
    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    )
}