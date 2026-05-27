import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiTextarea = (props) =>{
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <textarea {...attributes} />
            )}
        </ApiErrorWrapper>
    )
}