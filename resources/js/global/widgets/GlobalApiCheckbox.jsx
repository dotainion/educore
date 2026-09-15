import { useState } from "react"
import { ApiErrorWrapper } from "../components/ApiErrorWrapper"
import { v4 as uuidv4 } from "uuid"
import { Check, X } from "lucide-react"

export const GlobalApiCheckbox = (props) =>{
    return(
        <ApiErrorWrapper {...{...props, onChange: null}}>
            {(attributes)=>(
                <label
                    {...{
                        ...attributes, className: `${attributes?.className || ''} ${attributes?.readOnly ? 'd-flex gap-2 text-break' : ''}`,
                        trailing: null,
                        checked: null,
                        type: null
                    }}
                >
                    {props?.content && (
                        <span>{props.content}</span>
                    )}
                    {attributes?.readOnly ? (
                        <div className="d-inline-block text-nowrap">
                            <div
                                className={`border border-${
                                    attributes?.checked ? 'primary' : 'secondary'
                                } rounded-3 text-${
                                    attributes?.checked ? 'primary' : 'secondary'
                                }`}
                            >
                                {attributes?.checked ? <Check /> : <X />}
                            </div>
                        </div>
                    ):(
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
                    )}
                    {props?.trailing && (
                        <span>{props.trailing}</span>
                    )}
                </label>
            )}
        </ApiErrorWrapper>
    )
}