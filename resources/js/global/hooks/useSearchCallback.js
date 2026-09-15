import { useRef } from "react"

export const useSearchCallback = (callback) =>{
    const timeoutRef = useRef();

    return (...data)=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...data);
        }, 500);
    }
}