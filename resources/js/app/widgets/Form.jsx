import { createContext, useContext, useState } from "react";
import { api } from "../service/Api";

const Context = createContext();

export const useForm = () => useContext(Context);

export const Form = ({ data: defaultData, action, method, className, onSuccess, onChange, children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setError(null);

        const data = new FormData(e.target);

        if (typeof variable === 'object' && variable !== null && !Array.isArray(variable)) {
            // Populate the FormData with default data
            for (const [key, value] of Object.entries(defaultData)) {
                data.append(key, value);
            }
        }

        try {
            setLoading(true);
            onChange?.(e, data, null, 'LOADING');

            let response;
            if(!method) method = "POST";

            if(method.toUpperCase() === "POST"){
                response = await api.post(action, data);
            }
            if(method.toUpperCase() === "PUT"){
                response = await api.put(action, data);
            }
            if(method.toUpperCase() === "PATCH"){
                response = await api.patch(action, data);
            }

            onChange?.(e, response, null, 'LOADING');
            onSuccess?.(response);
        }catch (error) {
            onChange?.(e, error, null, 'LOADING');
            setError(error.response.data);
        }finally {
            setLoading(false);
            onChange?.(e, null, null, 'DONE');
        }
    }

    return(
        <Context.Provider value={{ error, loading }}>
            <form onSubmit={submit} className={className}>
                {children}
            </form>
        </Context.Provider>
    )
}