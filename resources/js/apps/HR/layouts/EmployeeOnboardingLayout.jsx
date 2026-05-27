import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEllipsisV, FaChevronLeft, FaChevronRight, FaLayerGroup, FaTimes } from "react-icons/fa";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { useAuth } from "../../../global/context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../../global/components/Spinner";
import { api } from "../../../global/services/Api";
import { useSmartNavigate } from "../../../global/hooks/useSmartNavigate";

const Context = createContext();

export const useEmployeeOnboardingLayout = () => useContext(Context);

export const EmployeeOnboardingLayout = () => {
    const { authenticated } = useAuth();

    const [navOpen, setNavOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useSmartNavigate({reuseReferrer: true});
    const location = useLocation();
    const params = useParams();

    const listenerRef = useRef([]);

    const steps = useMemo(()=>[
        { title: 'Employee Profile', route: routes.hr.onboarding.employee.employeeProfile },
        { title: 'Employment Information', route: routes.hr.onboarding.employee.employmentInformation },
        { title: 'Schedule Workforce Settings', route: routes.hr.onboarding.employee.scheduleWorkforceSettings },
        { title: 'Compensation Payroll', route: routes.hr.onboarding.employee.compensationPayroll },
        { title: 'Emergency Contacts', route: routes.hr.onboarding.employee.emergencyContacts },
        { title: 'Address Information', route: routes.hr.onboarding.employee.addressInformation },
        { title: 'System Access Permissions', route: routes.hr.onboarding.employee.systemAccessPermissions },
        { title: 'Documents Compliance', route: routes.hr.onboarding.employee.documentsCompliance },
        { title: 'Organization Assignment', route: routes.hr.onboarding.employee.organizationAssignment },
    ], [params.userId]);

    const goTo = (step) => {
        setNavOpen(false);
        navigate(step.route(params.userId));
    }

    const pug = (path) =>{
        Object.values(params).forEach((value)=>path = path.replace(`/${value}`, ''));
        ['userId', 'applicantId'].forEach((value)=>path = path.replace(`/:${value}`, ''));
        return path;
    }

    const current = steps.find((step)=>pug(step.route()) === pug(location.pathname));
    const currentStepIndex = steps.indexOf(current);
    const prev = steps[currentStepIndex -1] || null;
    const next = steps[currentStepIndex +1] || null;

    const progress = useMemo(() => {
        return ((currentStepIndex + 1) / steps.length) * 100;
    }, [currentStepIndex]);

    const triggerEvent = (cmd) =>{
        let autoNavigate = true;
        listenerRef.current.forEach((lsnr)=>{
            if(lsnr.cmd.toLowerCase() === cmd.toLowerCase()){
                lsnr.trigger({
                    off: () => autoNavigate = false,
                    on: () => autoNavigate = true,
                });
            }
        });
        return autoNavigate;
    }

    const onPrev = () =>{
        const valid = triggerEvent('PREV');
        if(valid) navigate(prev.route(params.userId));
    }

    const onNext = () =>{
        const valid = triggerEvent('NEXT');
        if(valid) navigate(next.route(params.userId));
    }

    const onComplete = () =>{
        triggerEvent('COMPLETE');
    }

    const listener = (cmd, fx) =>{
        const identifier = location.pathname;
        const found = listenerRef.current.find((lsnr)=>{
            return lsnr.id === identifier && cmd === lsnr.cmd;
        });
        if(found){
            listenerRef.current = listenerRef.current.map((lsnr)=>{
                if(lsnr.id === identifier){
                    return {...lsnr, trigger: fx};
                }
                return lsnr;
            });
        }else{
            listenerRef.current.push({
                cmd,
                id: identifier,
                trigger: fx,
            });
        }
        
        return ()=>{
            listenerRef.current = listenerRef.current.filter((lsnr)=>{
                return lsnr.id === identifier;
            });
        };
    };

    const values = {
        listener,
        setLoading,
        to: {
            prev: (id, arg)=>prev && navigate(prev.route(id), arg),
            next: (id, arg)=>next && navigate(next.route(id), arg),
        }
    }

    if(!authenticated){
        routes.navigate.to.account().withPath('login');
        return null;
    }

    return (
        <div className="d-flex flex-column bg-white position-relative" style={{minHeight: '90vh'}}>
            <div className="position-sticky top-0 bg-white px-3 d-flex justify-content-between align-items-center py-3" style={{zIndex: 1050}}>
                <div className="small text-muted d-flex align-items-center gap-2">
                    <FaLayerGroup />
                    Onboarding Flow
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="progress" style={{ width: 120, height: 5 }}>
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <button onClick={() => setNavOpen(true)} className="btn btn-sm border-0">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>

            <div className="py-3">
                <Context.Provider value={values}>
                    <Outlet />
                </Context.Provider>
            </div>
            
            <div className="position-sticky bottom-0 d-flex justify-content-center pb-4" style={{zIndex: 1050}}>
                <div>
                    <div className="small text-muted text-center">{current.title}</div> 
                    <div className="btn-group rounded-pill overflow-hidden">
                        <button
                            onClick={onPrev}
                            className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center gap-2 px-3"
                            style={{minWidth: '124px'}}
                            disabled={loading || !prev}
                        >
                            <FaChevronLeft />
                            Prev
                        </button>
                        {!!next ? (
                            <button
                                onClick={onNext}
                                className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-2 position-relative px-3"
                                style={{minWidth: '124px'}}
                                disabled={loading || !next}
                            >
                                Next
                                <FaChevronRight />
                                <Spinner show={loading} absolute bg="white" color="white" />
                            </button>
                        ):(
                            <button
                                onClick={onComplete}
                                className="btn btn-sm btn-success d-flex align-items-center justify-content-center gap-2 position-relative px-3"
                                style={{minWidth: '124px'}}
                                disabled={loading || !!next}
                            >
                                Complete
                                <FaChevronRight />
                                <Spinner show={loading} absolute bg="white" color="white" />
                            </button>
                        )}                    
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {navOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            onClick={() => setNavOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="position-fixed top-0 start-0 w-100 h-100 bg-secondary bg-opacity-10"
                            style={{ zIndex: 2000 }}
                        />

                        {/* DRAWER */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg border-start"
                            style={{ width: 360, zIndex: 2001 }}
                        >
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <strong>Navigation</strong>
                                <button
                                    onClick={() => setNavOpen(false)}
                                    className="btn btn-sm btn-outline-secondary border-0"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* STEP LIST */}
                            <ul className="list-group rounded-0">
                                {steps.map((step, i) => (
                                    <li
                                        onClick={() => goTo(step)}
                                        className={`list-group-item list-group-item-action border-0 small ${
                                            pug(location.pathname) === pug(step.route()) ? 'active' : ''
                                        }`}
                                        key={step.title}
                                    >
                                        {step.title}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};