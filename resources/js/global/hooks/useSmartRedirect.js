import { useLocation, useNavigate } from "react-router-dom";

export const useSmartRedirect = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    return ()=>{
        const param = new URLSearchParams(location.search);
        if(!param.has('referrer')) return;
        navigate(param.get('referrer'));
    }
}