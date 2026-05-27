import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiInput = (props) =>{
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <input {...attributes} />
            )}
        </ApiErrorWrapper>
    )
}