import { InputWrapper } from "./InputWrapper"

export const FormSelect = ({ label, type, name, value, onChange, className, children }) => {
    return(
        <InputWrapper
            label={label}
            type={type}
            name={name}
            value={value}
            className={className}
            onChange={onChange}
        >
            {({ props }) => (
                <select {...props} >
                    {children}
                </select>
            )}
        </InputWrapper>
    )
}