import { Spinner } from "../../../global/components/Spinner"

export const PendingDisplay = ({message}) =>{
    return(
        <div className="position-absolute top-0 start-0 bg-white d-flex align-items-center justify-content-center w-100 h-100" style={{zIndex: 1060}}>
            <div className="text-center">
                <div className="d-flex align-items-center justify-content-center gap-3 h4">
                    Please wait
                    <div className="position-relative">
                        <Spinner show absolute bg="white" />
                    </div>
                </div>
                <p className="text-muted">{message}</p>
            </div>
        </div>
    )
}