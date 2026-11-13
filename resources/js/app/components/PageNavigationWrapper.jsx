import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PageNavigationWrapper = ({ routesObjects, firstPath }) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const formRef = useRef();

    const steps = Object.entries(routesObjects)
        .filter(([key, value]) => !['base', 'absolute'].includes(key) && typeof value === 'string')
        .map(([key, value]) => value);

    const currentStep = location.pathname.replace(`${routesObjects.base.replace('*', '')}`, '');

    const currentIndex = steps.indexOf(currentStep);

    const continues = (response) => {
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            navigate(routesObjects.absolute(steps[currentIndex + 1]));
        }
    };

    const previous = () => {
        if (currentIndex > 0) {
            navigate(routesObjects.absolute(steps[currentIndex - 1]));
        }
    };

    const onClick = () => {
        const form = document.querySelector('form');
        if(!form) return;

        form.requestSubmit();
        
        setTimeout(() => {
            if(!form?.apiRequest) return;

            form.apiRequest.then(continues).catch((error)=>{
                console.log(error);
            });
        }, 500);
    }

    useEffect(()=>{
        formRef.current = document.querySelector('form');
        if(!formRef.current) return;
        formRef.current.addEventListener('submit', ()=>{

        });
    }, []);

    return (
        <div className="d-flex justify-content-end gap-2">
            {!location.pathname.endsWith(firstPath) && (
                <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={previous}
                >
                    <i className="bi bi-arrow-left ms-2"></i>
                    Previouse
                </button>
            )}
            <button
                type="button"
                className="btn btn-primary px-4"
                onClick={onClick}
            >
                Continue
                <i className="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    );
};
