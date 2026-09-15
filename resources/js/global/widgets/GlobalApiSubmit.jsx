import { Spinner } from "../components/Spinner"
import { useApi } from "../context/ApiProvider"

export const GlobalApiSubmit = (props) =>{
    const { loading } = useApi();

    const spinnerAssosiateColors = {
        'btn-primary': 'white',
        'btn-secondary': 'white',
        'btn-dark': 'white',
        'btn-info': 'dark',
        'btn-success': 'white',
        'btn-light': 'primary',
        'btn-white': 'primary',
    }

    const spinnerColor = () =>{
        if(!props?.className) return 'dark';
        for(let color of Object.keys(spinnerAssosiateColors)){
            if(props.className.includes(color)){
                return spinnerAssosiateColors[color];
            }
        }
        return 'dark';
    }

    return(
        <button {...{
            ...props,
            className: `position-relative overflow-hidden ${props?.className || ''}`,
            disabled: loading || props?.disabled,
            type: 'submit'
        }}>
            {props?.children}
            <Spinner
                show={loading}
                absolute
                color={spinnerColor()}
            />
        </button>
    )
}