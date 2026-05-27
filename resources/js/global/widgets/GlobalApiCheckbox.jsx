import { useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"

export const GlobalApiCheckbox = (props) =>{
    return(
        <ApiErrorWrapper {...{...props, onChange: null}}>
            {(attributes)=>(
                <label {...{...attributes, trailing: null, checked: null, type: null}}>
                    {props?.content && (
                        <span>{props.content}</span>
                    )}
                    <input
                        className="form-check-input pointer"
                        type="checkbox"
                        {...{
                            defaultChecked: props.defaultChecked,
                            defaultValue: props.defaultValue,
                            onChange: props.onChange,
                            checked: props.checked,
                        }}
                    />
                    {props?.trailing && (
                        <span>{props.trailing}</span>
                    )}
                </label>
            )}
        </ApiErrorWrapper>
    )
}