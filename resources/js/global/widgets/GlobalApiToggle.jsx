import { useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"

export const GlobalApiToggle = (props) =>{
    const [switchId] = useState(uuidv4());
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <div {...{...attributes, className: `${props?.readOnly ? 'd-flex gap-2 text-break' : 'form-check form-switch pointer'} ${props?.className || ''}`, trailing: null}}>
                    {props?.readOnly ? (
                        <div className="d-inline-block text-nowrap">
                            <div className="border border-primary rounded-3 px-2 text-primary small">
                                {props?.checked ? 'On' : 'Off'}
                            </div>
                        </div>
                    ):(
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
                    )}
                    {props?.trailing && (
                        <label className={`form-check-label ${props?.readOnly ? 'text-muted' : 'pointer'}`} htmlFor={switchId}>
                            {props.trailing}
                        </label>
                    )}
                </div>
            )}
        </ApiErrorWrapper>
    )
}