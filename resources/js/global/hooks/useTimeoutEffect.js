import { useEffect } from "react"
import { useSearchCallback } from "./useSearchCallback";

export const useTimeoutEffect = (callback, dependencies) =>{
    const effectCallback = useSearchCallback(()=>{
        callback();
    });

    useEffect(()=>{
        effectCallback();
    }, [...dependencies]);
}