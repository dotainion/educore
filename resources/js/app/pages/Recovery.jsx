import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { routes } from "../routes/Routes";
import { FormInput } from "../widgets/FormInput";
import { FormSubmit } from "../widgets/FormSubmit";
import { FormError } from "../widgets/FormError";
import { Form } from "../widgets/Form";

export const Recovery = () => {
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const recover = (e) =>{
        setSent(response.data.message);
    }

    const onChange = (e, response, error, status) => {
        setLoading(status === 'LOADING');
    }

    return (
        <div className="row justify-content-center m-0 pt-3">
            <div className="col-12" style={{maxWidth: '500px'}}>
                <Form onChange={onChange} onSuccess={recover} action="/password/recovery" className="card border">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <BiUser className="display-4 m-auto" />
                            <h4 className="mt-2">Recover Passwrod</h4>
                        </div>
                        <FormError />
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
                                <FormInput
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
                        <FormSubmit className="btn btn-primary w-100">{sent ? 'Resend' : 'Send'}</FormSubmit>
                        <div className="mt-3">
                            <a onClick={()=>navigate(routes.signIn)} className="link-primary text-decoration-none btn border-0 p-0">Login instead</a>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};