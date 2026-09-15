import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { GlobalApiDisplayError } from "../../../global/widgets/GlobalApiDisplayError";
import { token } from "../../../global/utils/Token";
import { api } from "../../../global/services/Api";
import { routes } from "../../../global/routes/Routes";

export const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const login = (e) =>{
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        
        api.account.signIn(data).then((response)=>{
            token.set(response.data.token);
            routes.navigate.to.apps();
        }).catch((error)=>{
            
        });
    }

    return (
        <div className="row justify-content-center m-0">
            <div className="col-12" style={{maxWidth: '500px'}}>
                <form onSubmit={login} className="card border">
                    <div className="card-body">
                        <div className="text-center">
                            <BiUser className="display-4 m-auto" />
                            <h4 className="mt-2">Sign In</h4>
                        </div>
                        <GlobalApiDisplayError />
                        <div className="mb-3">
                            <GlobalApiInput
                                ref={emailRef}
                                className="form-control"
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <GlobalApiInput
                                ref={passwordRef}
                                className="form-control"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder=""
                            />
                        </div>
                        <div className="mb-4">
                            <Link
                                to={routes.account.recovery}
                                className="link-danger text-decoration-none btn border-0 p-0"
                            >Forgot Password?</Link>
                        </div>
                        <GlobalApiSubmit className="btn btn-primary w-100 mb-4">Log in</GlobalApiSubmit>
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                            <span>Don't have an account?</span>
                            <Link
                                to={routes.account.signUp}
                                className="link-primary text-decoration-none fw-bold btn border-0 p-0"
                            >Sign up now!</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};