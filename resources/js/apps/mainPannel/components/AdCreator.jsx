import React, { useEffect, useRef, useState } from "react";
import { Api, api } from "../../../global/services/Api";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { useApi } from "../../../global/context/ApiProvider";
import { Editor } from "./Editor";
import { routes } from "../../../global/routes/Routes";
import { useNavigate } from "react-router-dom";
import { contentTypes } from "../../../global/services/ContentTypes";
import { Ads } from "../api/Ads";
import { Spinner } from "../../../global/components/Spinner";

export const AdCreator = ({ad}) => {
    const { throwApiError, hasError, flushErrors } = useApi();

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [poster, setPoster] = useState(null);

    const [ctaText, setCtaText] = useState('Learn More');
    const [ctaUrl, setCtaUrl] = useState('');

    const [adType, setAdType] = useState('banner');
    const [status, setStatus] = useState('active');

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const editorRef = useRef();

    const createUrl = (img) =>{
        if(typeof img === 'string') return img;
        return URL.createObjectURL(img);
    }

    const validate = () =>{
        flushErrors();
        if (!title) throwApiError('Title is required.', 'title');
        if (!company) throwApiError('Company is required.', 'company');
        if (!content) throwApiError('Content is required.', 'content');
        //if (!ctaText) throwApiError('Cta Text is required.', 'ctaText');
        //if (!ctaUrl) throwApiError('Cta Url is required.', 'ctaUrl');
        if (!adType) throwApiError('Ad Type is required.', 'adType');
        if (!status) throwApiError('Status is required.', 'status');
        if (!expiresAt) throwApiError('Expire date and time is required.', 'expiresAt');
        if (!poster) throwApiError('A poster is required.', 'poster');
        return !hasError();
    }

    const submit = () => {
        if (!validate()) return;
        setLoading(true);

        const data = new FormData();
        data.set('title', title);
        data.set('company', company);
        data.set('content', content);
        data.set('ctaText', ctaText);
        data.set('ctaUrl', ctaUrl);
        data.set('adType', adType);
        data.set('status', status);
        data.set('expiresAt', expiresAt);
        data.set('poster', poster);
        if(ad?.id) data.set('adId', ad.id);

        const runApi = () =>{
            (
                ad?.id 
                ? api.ads.update(data) 
                : api.ads.create(data)
            ).then((response)=>{
                navigate(routes.pannel.updateAd(response.data.ad.id));
            }).catch((error)=>{
                console.log(error);
            }).finally(()=>setLoading(false));
        }

        if(ad?.id) runApi();
        else api.onOnetimeMultipartContentType(runApi);
    };

    useEffect(()=>{
        if(!ad) return;
        setTitle(ad.attributes.title);
        setCompany(ad.attributes.company);
        setExpiresAt(ad.attributes.expiresAt);

        setCtaText(ad.attributes.ctaText);
        setCtaUrl(ad.attributes.ctaUrl);

        setAdType(ad.attributes.adType);
        setStatus(ad.attributes.status);

        setContent(ad.attributes.content);
        editorRef.current.setContent(ad.attributes.content);

        setPoster(ad.attributes.url);
    }, [ad]);

    return (
        <div className="">
            <div className="row g-3">
                <div className="col-md-6">
                    <GlobalApiInput
                        name="title"
                        label="Ad Title *"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <GlobalApiInput
                        name="company"
                        label="Company *"
                        className="form-control"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <GlobalApiSelect
                        name="adType"
                        label="Ad Type"
                        className="form-select"
                        value={adType}
                        onChange={(e) => setAdType(e.target.value)}
                    >
                        <option value="banner">Banner</option>
                        <option value="card">Card</option>
                        <option value="featured">Featured</option>
                    </GlobalApiSelect>
                </div>
                <div className="col-md-6">
                    <GlobalApiSelect
                        name="status"
                        label="Status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="inactive">Inactive</option>
                    </GlobalApiSelect>
                </div>
            </div>

            {/* CTA */}
            <div className="row g-3 mt-2">
                <div className="col-md-6">
                    <GlobalApiInput
                        name="ctaText"
                        label="CTA Text"
                        className="form-control"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <GlobalApiInput
                        name="ctaUrl"
                        label="CTA URL"
                        className="form-control"
                        value={ctaUrl}
                        onChange={(e) => setCtaUrl(e.target.value)}
                    />
                </div>
            </div>

            {/* TIPTAP EDITOR */}
            <div className="border rounded p-3 bg-white mt-3">
                <label className="form-label fw-bold">
                    Ad Content
                </label>
                <Editor
                    ref={editorRef}
                    name="content"
                    onChange={setContent}
                />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mt-3">
                <GlobalApiInput
                    label="Poster"
                    name="poster"
                    type="file"
                    multiple
                    className="form-control"
                    onChange={(e)=>setPoster(e.target.files[0])}
                />

                <div className="d-flex gap-2 flex-wrap mt-3">
                    {poster && (
                        <div className="position-relative">
                            <img
                                src={createUrl(poster)}
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                }}
                            />
                            <button
                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                onClick={() => setPoster(null)}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* EXPIRY */}
            <div className="mt-3">
                <GlobalApiInput
                    label="Expiration Date"
                    name="expiresAt"
                    type="datetime-local"
                    className="form-control"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                />
            </div>

            {/* SUBMIT */}
            <button onClick={submit} className="btn btn-warning btn-lg w-100 mt-4 position-relative">
                Save Advertisement
                <Spinner show={loading} absolute />
            </button>

            {/* PREVIEW */}
            <div className="mt-5">
                <h3 className="fw-bold">Preview Ads</h3>
                {ads.map((ad) => (
                    <div className="border rounded p-3 mt-3 bg-white" key={ad.id}>
                        <h4>{ad.attributes.title}</h4>
                        <small className="text-muted">
                            {ad.attributes.company} • {ad.attributes.adType}
                        </small>
                        <div
                            className="mt-2"
                            dangerouslySetInnerHTML={{
                                __html: ad.attributes.content,
                            }}
                        />
                        <div className="d-flex gap-2 mt-2 flex-wrap">
                            {ad.attributes.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.attributes.url}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        objectFit: 'cover',
                                        borderRadius: 6,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};