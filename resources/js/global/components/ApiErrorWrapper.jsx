import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useApi } from "../context/ApiProvider"
import { useLocation } from "react-router-dom";
import { Spinner } from "./Spinner";

export const ApiErrorWrapper = forwardRef((props, ref) =>{
    const { apiError } = useApi();

    const [error, setError] = useState(null);
    const [stash, setStash] = useState(null);

    const location = useLocation();

    const inputRef = useRef();

    const displayWarning = () =>{
        setError(apiError[location.pathname].errors[props.name]);
    }

    const change = (e) =>{
        if(stash === e.target.value) displayWarning();
        else setError(null);
        props?.onChange?.(e);
    }

    useImperativeHandle(ref, ()=>{
        return {
            ...inputRef.current,
            get value() {
                return inputRef.current?.value;
            },
            set value(v) {
                if (!inputRef.current) return;
                inputRef.current.value = v;
            },
            setValueAndTriggerChange: (value)=>{
                ref.current.value = value;
                change({target: {value}});
            }
        }
    }, [stash]);

    const childProps = () =>{
        let propsCopy = {
            ...props,
            value: props?.value === null ? '' : props?.value,
            onChange: change,
            ref: inputRef,
            className: `${props?.className || ''} ${error ? 'is-invalid' : ''}`,
        };
        delete propsCopy.children;
        delete propsCopy.icon;
        delete propsCopy.parentClassName;
        return propsCopy;
    }

    useEffect(()=>{
        if(typeof props?.name !== 'string'){
            console.error('Input widgets must provide attribute name.');
        }
        if(!apiError?.[location.pathname]?.errors ||
            !apiError?.[location.pathname].errors?.[props.name]){
            setError(null)
            return;
        }
        setStash(inputRef.current.value);
        displayWarning();
    }, [ref, props?.name, apiError]);

    return(
        <div className={props?.parentClassName}>
            {props?.label && (
                <label className={`${props?.readOnly ? '' : 'form-label'} text-muted small`}>{props.label}</label>
            )}
            <div className={`position-relative ${props?.icon ? 'input-group' : ''}`}>
                {props?.icon && (
                    <span className="input-group-text"><props.icon /></span>
                )}
                {props.children(childProps())}
                <Spinner show={props?.loading} absolute bg="white" />
            </div>
            {error && (
                <div className="invalid-feedback d-block small lh-1">{error}</div>
            )}
        </div>
    )
});