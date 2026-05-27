import React, { createContext, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { DepartmentSelect } from "../components/DepartmentSelect";
import { api } from "../../../global/services/Api";
import { v4 as uuidv4 } from "uuid";
import { GlobalApiSubmit } from "../../../global/widgets/GlobalApiSubmit";
import { ManagerSelect } from "../components/ManagerSelect";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { Employment } from "../components/Employment";
import { Profile } from "../components/Profile";
import { AddressesAndModification } from "../components/AddressesAndModification";
import { Plus } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const AddEmployee = () => {

    const navigate = useNavigate();

    const route = (path) =>{
        return `${routes.hr.addEmployee.replace('*', '')}${path}`
    }

    const to = (path) =>{
        navigate(route(path));
    }

    return (
        <div className="container d-flex flex-column vh-100" style={{ maxWidth: 820 }}>
            <div className="border-bottom px-3 py-3">
                <div className="fw-semibold">Employee Onboarding</div>
                <div className="text-muted small">
                    Full onboarding setup for HR system
                </div>
            </div>
            <Routes>
                <Route path="profile" element={<OnboardingProfile to={to} />} />
                <Route path="profile/:userId" element={<OnboardingProfile to={to} />} />
                <Route path="employment/:userId" element={<OnboardingEmployment to={to} />} />
                <Route path="address/:userId" element={<OnboardingAddress to={to} />} />
                <Route path="*" element={<Navigate to={route('profile')} />} />
            </Routes>
        </div>
    );
};

const OnboardingProfile = ({ to }) =>{
    const params = useParams();
    const ref = useRef();
    return(
        <NavWrapper nextRef={ref}>
            <Profile ref={ref} onSaved={(user)=>to(`employment/${user.id}`)} />
        </NavWrapper>
    )
}

const OnboardingEmployment = ({ to }) =>{
    const params = useParams();
    const ref = useRef();
    return(
        <NavWrapper prev={()=>to(`profile/${params.userId}`)} nextRef={ref}>
            <Employment ref={ref} onSaved={()=>to(`address/${params.userId}`)} />
        </NavWrapper>
    )
}

const OnboardingAddress = ({ to }) =>{
    const navigate = useNavigate();
    const params = useParams();

    const ref = useRef();
    const addrRef = useRef();

    useImperativeHandle(ref, ()=>({
        save: ()=>navigate(routes.hr.viewEmployee(params.userId))
    }), []);

    return(
        <NavWrapper prev={()=>to(`employment/${params.userId}`)} nextRef={ref} nextTitle="Complete">
            <div className="d-flex justify-content-between my-3">
                <div className="fw-semibold">Addresses</div>
                <button
                    onClick={()=>addrRef.current.open()}
                    className="btn btn-sm btn-light d-flex align-items-center gap-2"
                >
                    <Plus />
                    Create
                </button>
            </div>
            <AddressesAndModification ref={addrRef}  />
        </NavWrapper>
    )
}

const NavWrapper = ({prev, nextRef, nextTitle, children}) =>{
    return(
        <>
            {children}
            <div className="position-sticky d-flex justify-content-center bottom-0 py-4 mt-auto" style={{zIndex: 1050}}>
                <div className="btn-group rounded-pill overflow-hidden">
                    <button
                        onClick={prev}
                        className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center gap-2 px-3"
                        style={{minWidth: '124px'}}
                        disabled={!prev}
                    >
                        <FaChevronLeft />
                        Previous
                    </button>
                    <button
                        onClick={()=>nextRef.current.save()}
                        className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-2 px-4"
                        style={{minWidth: '124px'}}
                    >
                        {nextTitle || 'Next'}
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </>
        
    )
}
