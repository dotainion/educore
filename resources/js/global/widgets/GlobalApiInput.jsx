import { ApiErrorWrapper } from "../components/ApiErrorWrapper";

export const GlobalApiInput = (props) =>{
    return(
        <ApiErrorWrapper {...props}>
            {(attributes)=>(
                <>
                    {attributes?.readOnly ? (
                        <div>{attributes?.value}</div>
                    ):(
                        <input {...attributes} />
                    )}
                </>
            )}
        </ApiErrorWrapper>
    )
}