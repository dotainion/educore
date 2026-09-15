import { Children, useEffect, useRef, useState } from "react";
import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiSelect = (props) =>{
    const CHILDREN = props.children;
    return(
        <ApiErrorWrapper {...{...props, className: `${props?.readOnly ? '' : 'pointer'} ${props?.className || ''}`}}>
            {(attributes)=>(
                <>
                    {attributes?.readOnly ? (
                        <ReadOnlyDisplay {...attributes}>
                            {CHILDREN}
                        </ReadOnlyDisplay>
                    ):(
                        <Select {...attributes} >
                            {CHILDREN}
                        </Select>
                    )}
                </>
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

const ReadOnlyDisplay = (props) =>{
    const [value, setValue] = useState('');

    useEffect(()=>{
        let firstValue = '';
        let selectedValue = '';
        
        Children.forEach(props.children, (child, i)=>{
            if(!firstValue && !child.props.hidden) firstValue = child.props.children;
            if(props.value === child.props.value) selectedValue = child.props.children;
        });

        if(selectedValue) setValue(selectedValue);
        else if(firstValue) setValue(firstValue);
    }, [props]);

    return(
        <div>{value}</div>
    )
}