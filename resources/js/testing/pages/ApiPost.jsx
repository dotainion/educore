import { useRef, useState } from "react"
import { GrAdd, GrSend, GrSubtract } from "react-icons/gr";
import { api } from "../../global/services/Api";

export const ApiPost = () =>{
    const [params, setParams] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const methodRef = useRef();
    const pathRef = useRef();

    const sendApi = () =>{
        const method = methodRef.current.value;
        const path = pathRef.current.value;

        let payload = {};
        params.forEach(({attr, value})=>{
            payload[attr] = value;
        });

        setErrors(null);
        setLoading(true);
        api[method](path, payload).then((response)=>{

        }).catch((error)=>{
            console.log(error.response.data);
            setErrors(error.response.data);
        }).finally(()=>setLoading(false));
    }

    const addPayload = () =>{
        setParams((prevs)=>[...prevs, {attr: '', value: ''}]);
    }

    const removePayload = (index) =>{
        setParams((prevs)=>prevs.filter((_, i)=>i !== index));
    }

    const updatePayload = (index, key, value) =>{
        setParams((prevs)=>prevs.map((param, i)=>{
            if(index === i) return {...param, [key]: value};
            return param;
        }));
    }

    return(
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border">
                        <div className="card-body">
                            <h5 className="mb-3">Api Post</h5>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <label className="form-label">Type:</label>
                                <select ref={methodRef} className="form-control form-select w-auto" defaultValue="post">
                                    <option value="post">Post</option>
                                    <option value="get">Get</option>
                                    <option value="put">Put</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Path</label>
                                <input ref={pathRef} className="form-control" placeholder="/api/testing" />
                            </div>
                            <label className="form-label">Params</label>
                            <table className="table mb-4">
                                <thead>
                                    <tr>
                                        <td>Attribute</td>
                                        <td>Value</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {params.map((param, key)=>(
                                        <tr key={key}>
                                            <td className="ps-0">
                                                <input
                                                    onChange={(e)=>updatePayload(key, 'attr', e.target.value)}
                                                    className="form-control border-0 shadow-none"
                                                    placeholder="Enter a attribute name"
                                                    value={param.attr}
                                                />
                                            </td>
                                            <td className="pe-0">
                                                <input
                                                    onChange={(e)=>updatePayload(key, 'value', e.target.value)}
                                                    className="form-control border-0 shadow-none"
                                                    placeholder="Enter a attribute value"
                                                    value={param.value}
                                                />
                                            </td>
                                            <td className="pe-0">
                                                <button onClick={()=>removePayload(key)} className="btn btn-primary mt-1">
                                                    <GrSubtract />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mb-3">
                                <button onClick={addPayload} className="d-flex gap-2 align-items-center btn btn-sm btn-primary">
                                    <GrAdd />
                                    <span>New</span>
                                </button>
                                <button onClick={sendApi} className="position-relative d-flex gap-2 align-items-center btn btn-sm btn-primary">
                                    <GrSend />
                                    <span>Send</span>
                                    {loading && (
                                        <div className="position-absolute top-50 start-50 translate-middle">
                                            <div className="spinner-border spinner-border-sm text-white" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                            {errors && (
                                <>
                                    <hr></hr>
                                    <div className="bg-light p-3 rounded-3">
                                        {errors?.exception && (
                                            <div className="mb-3">
                                                <strong>Exception</strong>
                                                <div>{errors.exception}</div>
                                            </div>
                                        )}
                                        {errors?.file && (
                                            <div className="mb-3">
                                                <strong>File</strong>
                                                <div>{errors.file}</div>
                                            </div>
                                        )}
                                        {errors?.line && (
                                            <div className="mb-3">
                                                <strong>Line</strong>
                                                <div>{errors.line}</div>
                                            </div>
                                        )}
                                        {errors?.message && (
                                            <div className="mb-3">
                                                <strong>Message</strong>
                                                <div>{errors.message}</div>
                                            </div>
                                        )}
                                        {errors?.trace && (
                                            <div className="mb-3">
                                                <strong>Traces</strong>
                                                {errors.trace.map((trace, key)=>(
                                                    <div className="border p-2 mb-2 rounded-2" key={`trace-${key}`}>
                                                        <span className="fw-semibold small">Class</span>
                                                        <div className="small mb-2">{trace.class}</div>
                                                        <span className="fw-semibold small">File</span>
                                                        <div className="small mb-2">{trace.file}</div>
                                                        <span className="fw-semibold small">Function</span>
                                                        <div className="small mb-2">{trace.function}</div>
                                                        <span className="fw-semibold small">Line</span>
                                                        <div className="small mb-2">{trace.line}</div>
                                                        <span className="fw-semibold small">Type</span>
                                                        <div className="small mb-2">{trace.type}</div>
                                                    </div>
                                                ))}
                                                <div>{errors.message}</div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}