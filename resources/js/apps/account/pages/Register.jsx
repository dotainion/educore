import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { useRef } from "react";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { GlobalApiDisplayError } from "../../../global/widgets/GlobalApiDisplayError";
import { api } from "../../../global/services/Api";
import { routes } from "../../../global/routes/Routes";
import { token } from "../../../global/utils/Token";

export const Register = () => {
    const navigate = useNavigate();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const contactRef = useRef();
    const dobRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const register = (e) =>{
        e.preventDefault();
        
        const params = {
            userId: null,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            gender: genderRef.current.value,
            contact: contactRef.current.value,
            dob: dobRef.current.value,
            status: 'active',
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }

        api.account.register(params).then((response)=>{
            token.set(response.data.token);
            routes.navigate.to.apps();
        }).catch((error)=>{

        });
    }

    return (
        <div className="container pb-5">
            <div className="row justify-content-center m-0">
                <div className="col-12 p-0" style={{maxWidth: '800px'}}>
                    <form onSubmit={register} className="card border">
                        <div className="card-body px-0 px-md-3">
                            <div className="text-center">
                                <BiUser className="display-4 m-auto" />
                                <h4 className="mt-2">Register</h4>
                            </div>
                            <GlobalApiDisplayError />
                            <div className="row m-0">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <GlobalApiInput
                                            ref={firstNameRef}
                                            className="form-control"
                                            type="text"
                                            name="firstName"
                                            label="First Name"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <GlobalApiInput
                                            ref={lastNameRef}
                                            className="form-control"
                                            type="text"
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Do"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <GlobalApiSelect
                                            ref={genderRef}
                                            className="form-control form-select"
                                            name="gender"
                                            label="Gender"
                                        >
                                            <option value="" hidden>Select a gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </GlobalApiSelect>
                                    </div>
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
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <GlobalApiInput
                                            ref={contactRef}
                                            className="form-control"
                                            type="text"
                                            name="contact"
                                            label="Contact"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <GlobalApiInput
                                            ref={dobRef}
                                            className="form-control"
                                            type="date"
                                            name="dob"
                                            label="DOB"
                                        />
                                    </div>
                                    <div className="mb-4">
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
                                        <GlobalApiInput
                                            ref={confirmPasswordRef}
                                            className="form-control"
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
                                        <Link to={routes.account.signIn} className="link-primary text-decoration-none fw-bold btn border-0 p-0">Login instead!</Link>
                                    </span>
                                    <GlobalApiSubmit className="btn btn-sm btn-primary px-4">Save</GlobalApiSubmit>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};