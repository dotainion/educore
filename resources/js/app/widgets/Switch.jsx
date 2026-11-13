import { useEffect, useState } from "react"
import { v4 } from "uuid";
import { InputWrapper } from "./InputWrapper";

export const Switch = ({ label, onLabel, offLabel, name, required, onChange, trailing, trailingchecked: defaultChecked, className, description }) =>{
    const [id, setId] = useState(null);
    const [checked, setChecked] = useState(!!defaultChecked);

    const change = (e) =>{
        setChecked(e.target.checked);
        onChange?.(e);
    }

    useEffect(() => setId(v4()), []);

    return(
        <InputWrapper
            label={label}
            name={name}
            required={required}
            onChange={change}
        >
            {(props) => (
                <div className={className}>
                    <div className="form-check form-switch">
                        <input
                            ref={props.ref}
                            onChange={props.onChange}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            name={props.name}
                            required={props.required}
                            id={id}
                            checked={checked}
                        />
                        <label className="form-check-label" htmlFor={id}>
                            {trailing 
                                ? trailing 
                                : checked 
                                    ? onLabel 
                                        ? onLabel 
                                        : 'Active' 
                                    : offLabel 
                                        ? offLabel 
                                        : 'Inactive'
                            }
                        </label>
                    </div>
                    {description && (
                        <div className="d-flex gap-2 py-2 border-bottom">
                            <i className="bi bi-info-circle me-1"></i>
                            <div className="small text-muted">
                                {description}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </InputWrapper>
    )
}