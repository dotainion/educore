import { useState } from "react";
import { v4 } from "uuid";

export const UuidGenerator = () =>{
    const [uuid, setUuid] = useState(v4());

    const generate = () =>{
        setUuid(v4());
    }
    
    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
            <div>
                <div className="form-control mb-3">{uuid}</div>
                <div className="d-flex justify-content-end">
                    <button onClick={generate} className="btn btn-sm btn-primary">Generate</button>
                </div>
            </div>
        </div>
    )
}