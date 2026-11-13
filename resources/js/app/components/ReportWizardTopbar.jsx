
import { routes } from '../routes/Routes';
import { HorizontalWizard } from './HorizontalWizard';

export const ReportWizardTopbar = () => {

    const WIZARD_STEPS = [
        {
            route: routes.progressReport.studentDetails,
            title: "Student Details",
            description: "Student, class and reporting period",
            icon: "bi-person-vcard",
        },{
            route: routes.progressReport.attendanceBehaviour,
            title: "Attendance & Behaviour",
            description: "Attendance records and student profile",
            icon: "bi-calendar-check",
        },{
            route: routes.progressReport.academicResults,
            title: "Academic Results",
            description: "Subject marks and term results",
            icon: "bi-journal-text",
        },{
            route: routes.progressReport.performanceComments,
            title: "Performance & Comments",
            description: "Averages, recommendations and notes",
            icon: "bi-chat-square-text",
        },{
            route: routes.progressReport.approvalReview,
            title: "Approval & Review",
            description: "Signatures and final report review",
            icon: "bi-clipboard-check",
        },{
            route: routes.progressReport.finalReview,
            title: "Final Review",
            description: "Check before printing",
            icon: "bi-eye",
        }
    ];

    return (
        <HorizontalWizard steps={WIZARD_STEPS} routesObjects={routes.progressReport}>
            <div className="small mt-4 mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Complete each section, then review the report at the end.
            </div>
        </HorizontalWizard>
    );
};
