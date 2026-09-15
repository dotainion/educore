import { GlobalApiCheckbox } from "../../global/widgets/GlobalApiCheckbox"
import { GlobalApiInput } from "../../global/widgets/GlobalApiInput"
import { GlobalApiRange } from "../../global/widgets/GlobalApiRange"
import { GlobalApiSelect } from "../../global/widgets/GlobalApiSelect"
import { GlobalApiTextarea } from "../../global/widgets/GlobalApiTextarea"
import { GlobalApiToggle } from "../../global/widgets/GlobalApiToggle"

export const UI = () =>{
    return(
        <div className="p-5">
            <GlobalApiCheckbox readOnly trailing="Fishing in the sea side..." />
            <GlobalApiCheckbox readOnly checked trailing="Fishing in the sea side..." />
        </div>
    )
}