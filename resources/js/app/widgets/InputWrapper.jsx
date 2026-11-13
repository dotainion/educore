import { useEffect, useRef, useState } from "react";
import { useForm } from "./Form";

export const InputWrapper = ({ label, type, name, value, defaultValue, required, onChange, className, parentClassName, children }) => {
    const { error, loading, data } = useForm();

    const [message, setMessage] = useState('');
    const [stash, setStash] = useState('');

    const inputRef = useRef();
    const timeoutRef = useRef();

    const change = (e) => {
        if(stash === inputRef.current.value){
            setMessage(error?.errors?.[name]?.[0] || null);
        }else{
            setMessage(null);
        }
        onChange?.(e);
    }

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        if(!data || !name) return;
        timeoutRef.current = setTimeout(() => {
            const elType = inputRef.current.type === 'checkbox' ? 'checked' : 'value';
            inputRef.current.value = data.attributes[name] || '';
            change({target: {[elType]: data.attributes[name] || ''}});
        }, 50);
    }, [data, name]);
    
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
        <div className={parentClassName}>
            <label className="form-label">
                {label}
                {required && <span className="text-danger">*</span>}
            </label>
            {children({
                ref: inputRef,
                type: type,
                name: name,
                value: value,
                defaultValue: defaultValue,
                required: required,
                className: `${className || ''} ${message ? 'is-invalid' : ''}`,
                onChange: change
            })}
            {message && (
                <span className="invalid-feedback">{message}</span>
            )}
        </div>
    )
}