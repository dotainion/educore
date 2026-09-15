import { useEffect, useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"
import { label } from "framer-motion/client";

export const GlobalApiRange = (props) =>{
    const [range, setRange] = useState(0);

    const change = (e) =>{
        props.onChange?.(e);
        setRange(e.target.value);
    }

    useEffect(()=>{
        if(!props?.value) return;
        //setRange(props.value || 0);
    }, [props?.value]);

    return(
        <ApiErrorWrapper {...{...props, label: null}}>
            {(attributes)=>(
                <>
                    <div className="d-flex justify-content-between small">
                        {props?.label && (
                            <span>{props.label}</span>
                        )}
                        <span className="text-muted">{range}/100</span>
                    </div>
                    {attributes?.readOnly ? (
                        <div className="progress" style={{height: '8px'}}>
                            <div
                                className="progress-bar bg-primary"
                                style={{width: `${Math.min(range, 100)}%`}}
                            />
                        </div>
                    ):(
                        <input
                            {...{
                                onChange: change,
                                defaultValue: props.defaultValue,
                                value: props.value || 0,
                            }}
                            readOnly
                            type="range"
                            className="form-range"
                            min={0}
                            max={100}
                        />
                    )}
                </>
            )}
        </ApiErrorWrapper>
    )
}