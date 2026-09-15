import { useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { motion } from "framer-motion";

export const GlobalSearch = ({className, parentClassName, placeholder, useMinimize, onAnimate, onChange, name}) =>{
    const [collapse, setCollapse] = useState(false);

    const animate = useMinimize ? {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.4 },
        viewport: { once: true }
    } : {};

    useEffect(()=>{
        onAnimate?.(collapse);
    }, [collapse]);

    if(useMinimize && !collapse) return(
        <button onClick={()=>setCollapse(true)} className="btn border-0 p-0">
            <BiSearch className="text-secondary fs-5" />
        </button>
    )

    if(useMinimize && collapse) return(
        <Search
            onBlur={()=>setCollapse(false)}
            onChange={onChange}
            className={className}
            parentClassName={parentClassName}
            animate={animate}
            useMinimize={useMinimize}
            collapse={collapse}
            placeholder={placeholder}
            name={name}
        />
    )
    if(!useMinimize) return(
        <Search
            onBlur={()=>setCollapse(false)}
            onChange={onChange}
            className={className}
            parentClassName={parentClassName}
            animate={animate}
            useMinimize={useMinimize}
            collapse={collapse}
            placeholder={placeholder}
            name={name}
        />
    )

    return null;
}

const Search = ({animate, useMinimize, collapse, onBlur, onChange, placeholder, className, parentClassName, name}) =>{

    const searchRef = useRef();
    const blurTimeoutRef = useRef();

    useEffect(()=>{
        if(useMinimize && collapse) {
            searchRef.current.focus?.();
        }
    }, [collapse]);

    return(
        <div className="position-relative w-100">
            <motion.div
                onClick={()=>{
                    clearTimeout(blurTimeoutRef.current);
                    searchRef.current.focus?.();
                }}
                className={`d-flex align-items-center border rounded-2 pe-2 overflow-hidden ${parentClassName || ''}`}
                { ...animate }
            >
                <input
                    ref={searchRef}
                    onBlur={()=>{
                        blurTimeoutRef.current = setTimeout(() => {
                            onBlur();
                        }, 500);
                    }}
                    onChange={onChange}
                    className={`form-control border-0 shadow-none ${className || ''}`}
                    placeholder={placeholder || 'Search...'}
                    name={name}
                />
                <BiSearch className="text-secondary fs-5" />
            </motion.div>
        </div>
    )
}