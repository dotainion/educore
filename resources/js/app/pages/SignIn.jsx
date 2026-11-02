import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../widgets/FormInput";
import { FormSubmit } from "../widgets/FormSubmit";
import { Form } from "../widgets/Form";
import { routes } from "../routes/Routes";
import { FormError } from "../widgets/FormError";
import { useAuth } from "../providers/AuthProvider";

export const SignIn = () => {
    const { requireSignIn } = useAuth();

    const navigate = useNavigate();

    const onSuccess = (response) =>{
        requireSignIn(response.data);
        setTimeout(() => {
            navigate(routes.dashboard);
        }, 0);
    }

    return (
        <div className="row justify-content-center m-0 pt-3">
            <div className="col-12" style={{maxWidth: '500px'}}>
                <Form onSuccess={onSuccess} action="/login" className="card border">
                    <div className="card-body">
                        <div className="text-center">
                            <BiUser className="display-4 m-auto" />
                            <h4 className="mt-2">Sign In</h4>
                        </div>
                        <FormError />
                        <div className="mb-3">
                            <FormInput
                                className="form-control"
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <FormInput
                                className="form-control"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder=""
                            />
                        </div>
                        <div className="mb-4">
                            <Link
                                to={routes.recovery}
                                className="link-danger text-decoration-none btn border-0 p-0"
                            >Forgot Password?</Link>
                        </div>
                        <FormSubmit className="btn btn-primary w-100 mb-4">Log in</FormSubmit>
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                            <span>Don't have an account?</span>
                            <Link
                                to={routes.signUp}
                                className="link-primary text-decoration-none fw-bold btn border-0 p-0"
                            >Sign up now!</Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};