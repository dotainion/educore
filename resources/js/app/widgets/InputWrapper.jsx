import { useEffect, useRef, useState } from "react";
import { useForm } from "./Form";

export const InputWrapper = ({ label, type, name, value, onChange, className, children }) => {
    const { error, loading } = useForm();

    const [message, setMessage] = useState('');
    const [stash, setStash] = useState('');

    const inputRef = useRef();

    const change = (e) => {
        if(stash === inputRef.current.value){
            setMessage(error.errors[name]?.[0] || null);
        }else{
            setMessage(null);
        }

        onChange?.(e);
    }
    
    useEffect(() => {
        if(value && stash !== value) {
            inputRef.current.value = value;
        }
        setStash(null);
    }, [value, loading]);

    useEffect(() => {
        if(!name) return;
        if(!error?.errors?.[name]){
            setMessage(null);
        }else if(error?.errors?.[name]){
            setStash(inputRef.current.value);
            setMessage(error.errors[name][0]);
        }
    }, [error, name]);

    return(
        <div>
            <label className="form-label">{label}</label>
            {children({
                ref: inputRef,
                type: type,
                name: name,
                value: value,
                className: `${className || ''} ${message ? 'is-invalid' : ''}`,
                onChange: change
            })}
            {message && (
                <span className="invalid-feedback">{message}</span>
            )}
        </div>
    )
}