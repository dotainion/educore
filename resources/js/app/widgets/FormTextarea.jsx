import { InputWrapper } from "./InputWrapper"

export const FormTextarea = ({ label, type, name, value, rows, required, className, parentClassName, placeholder, onChange }) => {
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
                <textarea {...{...props, placeholder, rows} } />
            )}
        </InputWrapper>
    )
}