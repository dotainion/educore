import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiTextarea = (props) =>{
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <>
                    {attributes?.readOnly ? (
                        <div>{attributes?.value}</div>
                    ):(
                        <textarea {...attributes} />
                    )}
                </>
            )}
        </ApiErrorWrapper>
    )
}