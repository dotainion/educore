import { AdCreator } from "../components/AdCreator"

export const CreateAd = () =>{
    return(
        <div className="container">
            <h1 className="fw-bold mb-4">
                Create Advertisement
            </h1>

            <AdCreator />
        </div>
    )
}