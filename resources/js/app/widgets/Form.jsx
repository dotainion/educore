import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../service/Api";
import { useToast } from "../providers/ToastProvider";

const Context = createContext();

export const useForm = () => useContext(Context);

export const Form = ({ data: record, params, action, method, className, casts, onSuccess, onChange, children }) => {
    const { toast } = useToast();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setError(null);

        const data = new FormData(e.target);

        if (typeof params === 'object' && params !== null && !Array.isArray(params)) {
            // Populate the FormData with default data
            for (const [key, value] of Object.entries(params)) {
                data.append(key, value);
            }
        }

        if(typeof casts === 'object' && casts !== null && !Array.isArray(casts)){
            for (const [key, type] of Object.entries(casts)) {
                if (!data.has(key)){
                    if(type === 'boolean') data.set(key, '');
                    continue;
                }
                switch (type) {
                    case 'boolean':
                        data.set(key, data.get(key) === 'on' ? '1' : '0');
                        break;
                }
            }
        }

        try {
            setLoading(true);
            onChange?.(e, data, null, 'LOADING');

            let response;
            if(!method) method = "POST";

            if(method.toUpperCase() === "POST"){
                e.target.apiRequest = api.post(action, data);
                response = await e.target.apiRequest;
            }
            if(method.toUpperCase() === "PUT"){
                e.target.apiRequest = api.put(action, data);
                response = await e.target.apiRequest;
            }
            if(method.toUpperCase() === "PATCH"){
                e.target.apiRequest = api.patch(action, data);
                response = await e.target.apiRequest;
            }

            onChange?.(e, response, null, 'LOADING');
            onSuccess?.(response);
        }catch (err) {
            console.log(err?.response?.data?.message || err?.message || 'Something went wrong!')
            toast.error(err?.response?.data?.message || err?.message || 'Something went wrong!')
            onChange?.(e, err, null, 'LOADING');
            setError(err.response.data);
        }finally {
            setLoading(false);
            onChange?.(e, null, null, 'DONE');
        }
    }

    useEffect(() => {
        const form = document.querySelector('form');
        if (!form) return;
        
        const handleInvalid = (e) => {
            setError(prev => ({
                errors: {
                    ...(prev?.errors || {}),
                    [e.target.name]: [e.target.validationMessage]
                }
            }));
            if (e.target === e.target.form.querySelector(':invalid')) {
                e.target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                e.target.focus();
            }
        };

        form.addEventListener('invalid', handleInvalid, true);

        return () => form.removeEventListener('invalid', handleInvalid, true);
    }, []);

    useEffect(() => {
        if(record && !record?.attributes){
            console.error('The data pass to data props in Form must be a response object with "attributes"')
            return;
        }
    }, []);

    return(
        <Context.Provider value={{ error, loading, data: record }}>
            <form onSubmit={submit} className={className}>
                {children}
            </form>
        </Context.Provider>
    )
}