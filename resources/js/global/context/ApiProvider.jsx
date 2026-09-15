import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { api } from "../services/Api";
import { ApiQueryProvider } from "./ApiQueryProvider";
import { ToastProvider } from "./ToastProvider";

const Context = createContext();

export const useApi = () => useContext(Context);

export const ApiProvider = ({children}) =>{
    const [apiError, setApiError] = useState({});
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const apiErrorRef = useRef({});
    const pathnameRef = useRef();

    const throwApiError = (msg, name) =>{
        const prevErrors = hasError()
            ? apiErrorRef.current[pathnameRef.current].errors
            : {};

        const data = name 
            ? { errors: { [name]: msg, ...prevErrors } } 
            : { status: 'error', message: msg };

        apiErrorRef.current = {
            ...apiErrorRef.current,
            [pathnameRef.current]: data
        }
        setApiError(apiErrorRef.current);
        return data;
    }

    const flushErrors = (name) =>{
        if(name && typeof name === 'string'){
            if(!apiErrorRef.current?.[pathnameRef.current]?.errors) return;
            delete apiErrorRef.current[pathnameRef.current].errors[name];
            setApiError(apiErrorRef.current);
            return;
        }
        apiErrorRef.current = {
            ...apiErrorRef.current,
            [pathnameRef.current]: null
        }
        setApiError(apiErrorRef.current);
    }

    const hasError = () =>{
        return !!apiErrorRef.current?.[pathnameRef.current];
    }

    useEffect(()=>{
        pathnameRef.current = location.pathname;
    }, [location]);

    useEffect(()=>{
        const successSubscriber = api.subscription.subscribe.to.loading(()=>{
            setLoading(true);
            flushErrors();
        });

        const errorSubscriber = api.subscription.subscribe.to.error((error)=>{
            apiErrorRef.current = {
                ...apiErrorRef.current,
                [pathnameRef.current]: error.response.data
            }
            setApiError(apiErrorRef.current);
        });

        const finallySubscriber = api.subscription.subscribe.to.finally(()=>{
            setLoading(false);
        });

        return () => {
            api.subscription.unsubscribe.from.success(successSubscriber);
            api.subscription.unsubscribe.from.error(errorSubscriber);
            api.subscription.unsubscribe.from.finally(finallySubscriber);
        }
    }, []);

    const values = {
        api,
        apiError,
        loading,
        throwApiError,
        hasError,
        flushErrors,
    }

    return(
        <Context.Provider value={values}>
            <ApiQueryProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ApiQueryProvider>
        </Context.Provider>
    )
}