import React, { useEffect, useState } from "react";
import { api } from "../../../global/services/Api";
import { Spinner } from "../../../global/components/Spinner";
import { routes } from "../../../global/routes/Routes";
import { useNavigate } from "react-router-dom";

export const ListAds = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const remove = (adId) =>{
        setAds((prevs)=>prevs.filter((a)=>a.id !== adId));
    }

    // Check expiration
    const isExpired = (expiresAt) => {
        return new Date(expiresAt).getTime() < Date.now();
    };

    useEffect(() => {
        api.ads.list().then((response)=>{
            setAds(response.data.ads);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container py-10 space-y-6">
            <h1 className="text-3xl font-bold text-cca-purple">
                All Advertisements
            </h1>

            {loading ? <Spinner show bg="white" /> : (
                <>
                    {ads.length === 0 ? (
                        <p className="text-gray-500">No ads created yet.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {ads.map((ad) => (
                                <div className="card border shadow-sm" key={ad.id}>
                                    <div className="card-body">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-bold">{ad.attributes.title}</h2>
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                    isExpired(ad.attributes.expiresAt)
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-green-100 text-green-600"
                                                }`}
                                            >
                                                {isExpired(ad.attributes.expiresAt) ? "Expired" : "Active"}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div
                                            className="prose max-w-none text-sm"
                                            dangerouslySetInnerHTML={{ __html: ad.attributes.content }}
                                        />

                                        {/* Images */}
                                        {ad.attributes.images?.length > 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {ad.attributes.images.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img.attributes.url}
                                                        alt="ad"
                                                        className="w-20 h-20 object-cover rounded border"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex justify-between items-center pt-3 border-t">
                                            <p className="text-xs text-gray-500">
                                                Expires: {new Date(ad.attributes.expiresAt).toLocaleString()}
                                            </p>
                                            <div className="d-flex gap-3">
                                                <button
                                                    onClick={()=>navigate(routes.pannel.updateAd(ad.id))}
                                                    className="text-blue-500 text-sm font-medium hover:underline position-relative"
                                                >
                                                    Edit
                                                </button>
                                                <Delete ad={ad} onChange={(ad)=>remove(ad.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const Delete = ({ ad, onChange }) =>{
    const [loading, setLoading] = useState(false);

    const remove = () => {
        setLoading(true);
        api.ads.delete({adId: ad.id}).then((response)=>{
            onChange(response.data.ad);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    };

    return(
        <button
            onClick={remove}
            className="text-red-500 text-sm font-medium hover:underline position-relative"
        >
            Delete
            <Spinner show={loading} absolute />
        </button>
    )
}
