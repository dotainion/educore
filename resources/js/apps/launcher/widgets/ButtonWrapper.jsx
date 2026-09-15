import { useState } from "react";
import { Spinner } from "../../../global/components/Spinner";

export const ButtonWrapper = ({onClick, className, outline, children}) =>{
    const [loading, setLoading] = useState(false);
    
    const to = () =>{
        setLoading(true);
        onClick();
    }
    return(
        <button onClick={to} className={`position-relative btn btn-sm btn-${outline ? 'outline-' : ''}primary ${className || ''}`}>
            {children}
            <Spinner show={loading} absolute />
        </button>
    );
}