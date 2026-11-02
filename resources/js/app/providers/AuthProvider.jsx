import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/Api";
import { AuthLoading } from "../components/AuthLoading";
import { token } from "../utils/Token";

const Context = createContext();

export const useAuth = () => useContext(Context);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const requireSignIn = (data) =>{
        if(!data.token && !data.user){
            throw new Error('You are not signed in.');
        }
        token.set(data.token);
        setUser(data.user);
    }

    const requireSignOut = () =>{
        if(!user || !token.get()){
            throw new Error('You are not signed.');
        }
        token.unset();
        setUser(null);
    }

    const values = {
        user,
        loading,
        requireSignIn,
        requireSignOut,
    }

    useEffect(() => {
        api.get('/session').then((response) => {
            console.log(response.data);
            setUser(response.data.user);
        }).catch(() => {

        }).finally(() => setLoading(false));
    }, []);

    return(
        <Context.Provider value={values}>
            {loading ? <AuthLoading /> : children}
        </Context.Provider>
    )
}