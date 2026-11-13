import { InputWrapper } from "./InputWrapper"

export const FormSelect = ({ label, type, name, value, defaultValue, required, options, onChange, className, parentClassName, children }) => {
    return(
        <InputWrapper
            label={label}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            required={required}
            className={`form-control form-select ${className}`}
            parentClassName={parentClassName}
            onChange={onChange}
        >
            {(props) => (
                <select {...props} >
                    {children}
                    {options && options.map((option, key)=>(
                        <option
                            value={option?.value || option.label}
                            key={`form-selct-option-${option?.value || option.label}-${key}`}
                        >
                            {option?.label || option.value}
                        </option>
                    ))}
                </select>
            )}
        </InputWrapper>
    )
}