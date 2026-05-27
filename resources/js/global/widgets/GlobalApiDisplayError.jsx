import { useLocation } from "react-router-dom";
import { useApi } from "../context/ApiProvider";

export const GlobalApiDisplayError = () =>{
    const { apiError } = useApi();

    const location = useLocation();

    if(
        apiError?.[location.pathname]?.status !== 'error' ||
        !apiError?.[location.pathname]?.message
    ) return null;

    return(
        <div className="text-danger text-center">
            {apiError[location.pathname].message}
        </div>
    )
}