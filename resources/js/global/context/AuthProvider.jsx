import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/Api";
import { Spinner } from "../components/Spinner";

const Context = createContext();

export const useAuth = ()=>useContext(Context);

export const AuthProvider = ({displayChildrenEvenIfNotAuthenticted, children}) =>{
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const values = {
        user,
        authenticated,
        isAdmin,
        loading,
    }

    useEffect(()=>{
        api.auth.session().then((response)=>{
            setUser(response.data.user);
            setAuthenticated(!!response.data.user);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <Context.Provider value={values}>
            {displayChildrenEvenIfNotAuthenticted ? children : (
                <>{loading ? <Spinner show bg="white" /> : authenticated && children}</>
            )}
        </Context.Provider>
    )
}