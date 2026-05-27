import { useEffect, useRef, useState } from "react";
import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiSelect = (props) =>{
    const CHILDREN = props.children;
    return(
        <ApiErrorWrapper {...{...props, className: `pointer ${props?.className || ''}`}}>
            {(attributes)=>(
                <Select {...attributes} >
                    {CHILDREN}
                </Select>
            )}
        </ApiErrorWrapper>
    )
}

const Select = (props) =>{
    const [className, setClassName] = useState(null);

    useEffect(()=>{
        if(props.className.includes('is-invalid') && props.className.includes('form-select')){
            setClassName(props.className.replace('form-select', 'form-control'));
            return;
        }
        setClassName(props.className);
    }, [props.className]);

    return(
        <select {...{...props, className}} >
            {props.children}
        </select>
    )
}