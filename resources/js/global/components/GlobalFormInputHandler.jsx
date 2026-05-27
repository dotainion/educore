import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../services/Api";
import { Spinner } from "./Spinner";

const Context = createContext();

export const GlobalFormInputHandlerProvider = ({children}) =>{
    const [loading, setLoading] = useState(false);

    const inputValues = (data, formCallback) =>{
        const form = formCallback();
        Object.keys(data).forEach((key)=>{
            if(typeof data[key] !== 'object') return;
            const id = data[key].id;
            const type = data[key].type;
            const res = data[key].attributes;
            const selector = 'input[name], select[name], textarea[name]';
            const inputs = form.querySelectorAll(selector);
            inputs.forEach((input)=>input.value = res[input.name]);
            const idInput = form.querySelector(`input[name="${type}Id"]`);
            if(!idInput) return console.error('Object id input was not set. Its required to to submit a update.');
            idInput.value = id;
        });
    }

    const toPayload = (form) => {
        let payload = {};
        const formData = new FormData(form);

        formData.entries().forEach(([name, value]) => {
            const input = form.querySelector(`[name="${name}"]`);
            if (input?.type === 'checkbox') value = true;
            payload[name] = value;
        });
        return payload;
    };

    const values = {
        toPayload,
        inputValues,
        loading,
        spinner: {
            on: ()=>setLoading(true),
            off: ()=>setLoading(false),
        }
    }

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export const GlobalFormInputHandler = ({option, apiFetchCallback, submitCallback, children}) =>{
    const { inputValues, loading: isLoading, spinner } = useContext(Context);

    const [loading, setLoading] = useState(true);

    const formRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        spinner.on();
        const payload = toPayload(formRef.current);
        submitCallback?.(payload).then((res)=>{

        }).catch((error)=>{

        }).finally(()=>spinner.off());
    }

    useEffect(()=>{
        apiFetchCallback().then((response)=>{
            inputValues(response.data, ()=>{
                return formRef.current;
            });
        }).catch((error)=>{
        }).finally(()=>setLoading(false));
    }, [apiFetchCallback]);

    return(
        <div className="position-relative">
            <form ref={formRef} onSubmit={submit} className={`opacity-${loading ? '25' : '100'}`}>
                {children}
            </form>
            <Spinner show={isLoading || loading} absolute md bg="white" />
        </div>
    )
}

export const GlobalFormInputManualHandler = ({data, loading, submitCallback, children}) =>{
    const { inputValues, toPayload, loading: isLoading, spinner } = useContext(Context);

    const formRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        spinner.on();
        const payload = toPayload(formRef.current);
        submitCallback?.(payload).then((res)=>{

        }).catch((error)=>{

        }).finally(()=>spinner.off());
    }

    useEffect(()=>{
        if(!data) return;
        inputValues({data}, ()=>{
            return formRef.current;
        });
    }, [data]);

    return(
        <div className="position-relative">
            <form ref={formRef} onSubmit={submit}>
                {children}
            </form>
            <Spinner show={isLoading || loading} absolute md bg="white" />
        </div>
    )
}
