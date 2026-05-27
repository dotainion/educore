import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { useState } from "react";
import { GlobalApiDisplayError } from "../../../global/widgets/GlobalApiDisplayError";
import { useApi } from "../../../global/context/ApiProvider";
import { routes } from "../../../global/routes/Routes";

export const Recovery = () => {
    const { loading, api } = useApi();

    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const recover = (e) =>{
        e.preventDefault();

        api.account.recovery({email}).then((response)=>{
            setSent(response.data.message);
        }).catch((error)=>{
            
        });
    }

    return (
        <div className="row justify-content-center m-0">
            <div className="col-12" style={{maxWidth: '500px'}}>
                <form onSubmit={recover} className="card border">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <BiUser className="display-4 m-auto" />
                            <h4 className="mt-2">Recover Passwrod</h4>
                        </div>
                        <GlobalApiDisplayError />
                        <div className={`small text-center bg-light p-2 rounded-3 mb-${sent ? '4' : '2'}`}>
                            {loading ? (
                                <span>Please wait...</span>
                            ) : (
                                <>
                                    {sent ? (
                                        <>    
                                            <h6 className="text-center">Email Sent</h6>
                                            <span className="text-primary">{sent}</span>
                                        </>
                                    ) : (
                                        <span>Enter the email address you added to your account and a email with information to reset your account will be send to you.</span>
                                    )}
                                </>
                            )}
                        </div>
                        {!sent && (
                            <div className="mb-4">
                                <GlobalApiInput
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder="you@example.com"
                                />
                            </div>
                        )}
                        <GlobalApiSubmit className="btn btn-primary w-100">{sent ? 'Resend' : 'Send'}</GlobalApiSubmit>
                        <div className="mt-3">
                            <a onClick={()=>navigate(routes.account.signIn)} className="link-primary text-decoration-none btn border-0 p-0">Login instead</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};