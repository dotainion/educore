
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../routes/Routes';

export const WizardSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const WIZARD_STEPS = [
        {
            route: 'student/details',
            title: "Student Details",
            description: "Student, class and reporting period",
            icon: "bi-person-vcard",
        },
        {
            route: 'attendance/behaviour',
            title: "Attendance & Behaviour",
            description: "Attendance records and student profile",
            icon: "bi-calendar-check",
        },
        {
            route: 'academic/results',
            title: "Academic Results",
            description: "Subject marks and term results",
            icon: "bi-journal-text",
        },
        {
            route: 'performance/comments',
            title: "Performance & Comments",
            description: "Averages, recommendations and notes",
            icon: "bi-chat-square-text",
        },
        {
            route: 'approval/review',
            title: "Approval & Review",
            description: "Signatures and final report review",
            icon: "bi-clipboard-check",
        },
        {
            route: 'final/review',
            title: "Final Review",
            description: "Check before printing",
            icon: "bi-eye",
        }
    ];

    const STEP_WIDTH = 190;
    const STEP_GAP = 8;
    const STEP_SIZE = STEP_WIDTH + STEP_GAP;

    const activeIndex = WIZARD_STEPS.findIndex(
        step => location.pathname.endsWith(step.route)
    );

    const visibleIndex = activeIndex >= 0 ? activeIndex : 0;

    const totalWidth = WIZARD_STEPS.length * STEP_SIZE - STEP_GAP;

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-3">

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
                        {WIZARD_STEPS.map((step, index) => {
                            const isActive = activeIndex === index;
                            const isComplete = activeIndex > index;

                            return (
                                <button
                                    key={step.title}
                                    type="button"
                                    className={`btn text-start p-3 border flex-shrink-0 ${
                                        isActive
                                            ? "border-primary bg-primary-subtle"
                                            : "border-light-subtle bg-white"
                                    }`}
                                    style={{ width: `${STEP_WIDTH}px` }}
                                    onClick={() => navigate(
                                        routes.progressReport.replace('*', step.route)
                                    )}
                                >
                                    <div className="d-flex flex-column- gap-3 h-100">
                                        <span
                                            className={`mx-auto rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 ${
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

                                        <span className="min-w-0">
                                            <span className={`d-block small ${ isActive ? "text-primary" : "text-dark"}`}>
                                                {step.title}
                                            </span>
                                            <span className="d-block text-secondary mt-1" style={{ fontSize: '11px' }}>
                                                {step.description}
                                            </span>
                                        </span>

                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="alert alert-info small mt-4 mb-0">
                    <i className="bi bi-lightbulb me-2"></i>
                    Complete each section, then review the report at the end.
                </div>

            </div>
        </div>
    );
};
