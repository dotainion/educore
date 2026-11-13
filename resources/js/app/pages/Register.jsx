import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { routes } from "../routes/Routes";
import { token } from "../utils/Token";
import { Form } from "../widgets/Form";
import { FormInput } from "../widgets/FormInput";
import { FormSubmit } from "../widgets/FormSubmit";
import { FormSelect } from "../widgets/FormSelect";
import { FormError } from "../widgets/FormError";

export const Register = () => {
    const requireToContactAdministratorForRegistration = true;
        
    const params = {
        userId: null,
        status: 'active',
    }

    const onSuccess = (response) =>{
        token.set(response.data.token);
    }

    if(requireToContactAdministratorForRegistration){
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
                <div className="card border-0 shadow-sm rounded-4 w-100" style={{ maxWidth: "520px" }}>
                    <div className="card-body p-4 p-md-5 text-center">

                        {/* EduCore brand */}
                        <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-primary text-white mb-3 shadow-sm"
                            style={{ width: "68px", height: "68px" }}>
                            <svg
                                width="42"
                                height="42"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 12.5C13 10 19 11 24 15V39C19 35 13 34 7 36.5V12.5Z"
                                    fill="white"
                                />
                                <path
                                    d="M41 12.5C35 10 29 11 24 15V39C29 35 35 34 41 36.5V12.5Z"
                                    fill="white"
                                    fillOpacity="0.65"
                                />
                                <path
                                    d="M12 19H19M12 24H19M29 19H36M29 24H36"
                                    stroke="#2563EB"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <h2 className="fw-bold text-dark mb-1">
                            Edu<span className="text-primary">Core</span>
                        </h2>

                        <p className="text-secondary small mb-4">
                            Your school. Connected.
                        </p>

                        {/* Notice icon */}
                        <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-4"
                            style={{ width: "76px", height: "76px" }}>
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="M8 5V3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5V5" />
                                <circle cx="12" cy="11" r="2.5" />
                                <path d="M7.5 16a4.5 4.5 0 0 1 9 0" />
                            </svg>
                        </div>

                        <h3 className="fw-bold text-dark mb-3">
                            Account Registration Is Managed by Your School
                        </h3>

                        <p className="text-secondary mb-4">
                            Welcome to EduCore! To keep your school's information
                            secure, new accounts are created and managed by your
                            school administrator. Self-registration is not available.
                        </p>

                        {/* Instructions */}
                        <div className="bg-light border rounded-3 p-3 p-md-4 text-start mb-4">
                            <div className="d-flex align-items-start gap-3">
                                <div className="text-primary mt-1">
                                    <svg width="22" height="22" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.8" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 11v5M12 7h.01" />
                                    </svg>
                                </div>

                                <div>
                                    <h6 className="fw-bold text-dark mb-1">
                                        Need an account?
                                    </h6>
                                    <p className="text-secondary small mb-0">
                                        Please contact your school administrator
                                        or school office. They can arrange your
                                        account and provide the details you need
                                        to sign in.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <Link
                            to="/login"
                            className="d-flex align-items-center justify-content-center btn btn-primary w-100 py-2 fw-semibold rounded-3 mb-3"
                        >
                            <svg className="me-2" width="18" height="18"
                                viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{ verticalAlign: "text-bottom" }}>
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <path d="M10 17l5-5-5-5M15 12H3" />
                            </svg>
                            Back to Sign In
                        </Link>

                        <p className="text-secondary small mb-0">
                            Already have an account?{" "}
                            <Link to="/login" className="text-decoration-none fw-semibold">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="border-top px-4 py-3 text-center">
                        <p className="text-secondary small mb-0">
                            Secure access for your school community.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container pb-5">
            <div className="row justify-content-center m-0 pt-3">
                <div className="col-12 p-0" style={{maxWidth: '800px'}}>
                    <Form params={params} onSuccess={onSuccess} action="/register" className="card border">
                        <div className="card-body px-0 px-md-3">
                            <div className="text-center">
                                <BiUser className="display-4 m-auto" />
                                <h4 className="mt-2">Register</h4>
                            </div>
                            <FormError />
                            <div className="row m-0">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <FormInput
                                            type="text"
                                            name="firstName"
                                            label="First Name"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FormInput
                                            type="text"
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Do"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FormSelect
                                            name="gender"
                                            label="Gender"
                                        >
                                            <option value="" hidden>Select a gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </FormSelect>
                                    </div>
                                    <div className="mb-3">
                                        <FormInput
                                            type="email"
                                            name="email"
                                            label="Email"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <FormInput
                                            type="text"
                                            name="contact"
                                            label="Contact"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FormInput
                                            type="date"
                                            name="dob"
                                            label="DOB"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormInput
                                            type="password"
                                            name="password"
                                            label="Password"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormInput
                                            type="password"
                                            name="password_confirmation"
                                            label="Conform Password"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-md-row flex-column-reverse justify-content-between gap-3 mt-3">
                                    <span className="d-flex align-items-center flex-wrap gap-2">
                                        <span>Don't have an account?</span>
                                        <Link to={routes.signIn} className="link-primary text-decoration-none fw-bold btn border-0 p-0">Login instead!</Link>
                                    </span>
                                    <FormSubmit className="btn-sm btn-primary px-4">Save</FormSubmit>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};