import { useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"
import { label } from "framer-motion/client";

export const GlobalApiRange = (props) =>{
    const [range, setRange] = useState(0);

    const change = (e) =>{
        props.onChange?.(e);
        setRange(e.target.value);
    }

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
                    <input
                        {...{
                            onChange: change,
                            defaultValue: props.defaultValue,
                            value: props.value,
                        }}
                        type="range"
                        className="form-range"
                        min={0}
                        max={100}
                    />
                </>
            )}
        </ApiErrorWrapper>
    )
}