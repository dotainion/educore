import { InputWrapper } from "./InputWrapper"

export const FormInput = ({ label, type, name, value, className, onChange }) => {
    return(
        <InputWrapper
            label={label}
            type={type}
            name={name}
            value={value}
            className={className}
            onChange={onChange}
        >
            {(props) => (
                <input {...props} />
            )}
        </InputWrapper>
    )
}