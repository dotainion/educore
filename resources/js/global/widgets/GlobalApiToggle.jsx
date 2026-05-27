import { useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"

export const GlobalApiToggle = (props) =>{
    const [switchId] = useState(uuidv4());
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <div {...{...attributes, className: `form-check form-switch pointer ${props?.className || ''}`, trailing: null}}>
                    <input
                        className="form-check-input pointer"
                        type="checkbox"
                        id={switchId}
                        {...{
                            checked: props.checked,
                            defaultChecked: props.defaultChecked,
                            defaultValue: props.defaultValue,
                            onChange: props.onChange
                        }}
                    />
                    {props?.trailing && (
                        <label className="form-check-label pointer" htmlFor={switchId}>
                            {props.trailing}
                        </label>
                    )}
                </div>
            )}
        </ApiErrorWrapper>
    )
}