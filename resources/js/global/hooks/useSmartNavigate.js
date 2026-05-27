import { useLocation, useNavigate } from "react-router-dom"

export const useSmartNavigate = (option = {}) =>{
    const navigate = useNavigate();
    const location = useLocation();

    return (path)=>{
        if(!option.referrer) option.referrer = location.pathname;
        if(option.reuseReferrer){
            const param = new URLSearchParams(location.search);
            if(param.has('referrer')) option.referrer = param.get('referrer');
        }
        navigate(`${path}?referrer=${option.referrer}`);
    }
}