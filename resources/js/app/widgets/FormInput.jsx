import { InputWrapper } from "./InputWrapper"

export const FormInput = ({ label, type, name, value, required, className, parentClassName, placeholder, onChange }) => {
    return(
        <InputWrapper
            label={label}
            type={type}
            name={name}
            value={value}
            required={required}
            className={`form-control ${className}`}
            parentClassName={parentClassName}
            onChange={onChange}
        >
            {(props) => (
                <input {...{...props, placeholder} } />
            )}
        </InputWrapper>
    )
}