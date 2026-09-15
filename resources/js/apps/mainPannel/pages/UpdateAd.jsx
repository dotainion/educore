import { useEffect, useState } from "react"
import { AdCreator } from "../components/AdCreator"
import { api } from "../../../global/services/Api"
import { useNavigate, useParams } from "react-router-dom"
import { Spinner } from "../../../global/components/Spinner"
import { routes } from "../../../global/routes/Routes"

export const UpdateAd = () =>{
    const [ad, setAd] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.ads.find({adId: params.adId}).then((response)=>{
            setAd(response.data.ad);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="container">
            
            <div className="d-flex justify-content-between mb-4">
                <h1 className="fw-bold mb-0">
                    Update Advertisement
                </h1>
                <div>
                    <button onClick={()=>navigate(routes.pannel.previewAd(params.adId))} className="btn btn-sm btn-light border">
                        Preview
                    </button>
                </div>
            </div>

            {loading ? <Spinner show bg="white" /> : (
                <AdCreator ad={ad} />
            )}
        </div>
    )
}