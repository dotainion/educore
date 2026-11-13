
import { useLocation, useNavigate } from 'react-router-dom';

export const HorizontalWizard = ({steps, routesObjects, children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const continues = (step) => {
        navigate(routesObjects.absolute(step.route));
    }

    const onClick = (step) => {
        const form = document.querySelector('form');
        if(!form) return continues(step);

        form.requestSubmit();
        
        setTimeout(() => {
            if(!form?.apiRequest) return;

            form.apiRequest.then(() => {
                continues(step);
            }).catch((error)=>{
                console.log(error);
            });
        }, 500);
    }

    const STEP_WIDTH = 190;
    const STEP_GAP = 8;
    const STEP_SIZE = STEP_WIDTH + STEP_GAP;

    const activeIndex = steps.findIndex(
        step => location.pathname.endsWith(step.route)
    );

    const visibleIndex = activeIndex >= 0 ? activeIndex : 0;

    const totalWidth = steps.length * STEP_SIZE - STEP_GAP;

    return (
        <div className="border rounded-3 p-3">
            <div className="overflow-hidden position-relative">
                <div
                    className="d-flex gap-2"
                    style={{
                        width: 'max-content',
                        paddingInline: 'calc(50% - 95px)',
                        marginLeft: `-${visibleIndex * STEP_SIZE}px`,
                        transform: `translateX(0)`,
                        transition: 'margin-left 0.4s ease',
                    }}
                >
                    {steps.map((step, index) => {
                        const isActive = activeIndex === index;
                        const isComplete = activeIndex > index;
                        return (
                            <button
                                type="button"
                                className={`btn text-start px-3 py-1 border ${
                                    isActive
                                        ? "border-primary bg-primary-subtle"
                                        : "border-light-subtle bg-white opacity-25 wizard-topbar-hover"
                                }`}
                                style={{ width: `${STEP_WIDTH}px` }}
                                onClick={() => onClick(step)}
                                title={step.description}
                                key={step.title}
                            >
                                <div>
                                    <div className="d-flex align-items-center gap-2 h-100">
                                        <span
                                            className={`rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 ${
                                                isComplete
                                                    ? "bg-success text-white"
                                                    : isActive
                                                        ? "bg-primary text-white"
                                                        : "bg-light text-secondary"
                                            }`}
                                            style={{ width: "36px", height: "36px" }}
                                        >
                                            <i className={`bi ${ isComplete ? "bi-check-lg" : step.icon }`}></i>
                                        </span>
                                        <div className={`small ${ isActive ? "text-primary" : "text-dark"}`}>{step.title}</div>
                                    </div>
                                    <div className="d-none text-secondary text-center mt-1" style={{ fontSize: '11px' }}>{step.description}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
};
