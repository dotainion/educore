import { ReportWizardTopbar } from "../components/ReportWizardTopbar";
import { Outlet } from "react-router-dom";
import { routes } from "../routes/Routes";
import { PageNavigationWrapper } from "../components/PageNavigationWrapper";

export const ProgressReportLayout = () => {
    return (
        <div className="container-fluid bg-light min-vh-100 pb-5">
            <div className="container-fluid px-0">
                <div className="row g-4">
                    <ReportWizardTopbar />
                    
                    <Outlet />

                    <PageNavigationWrapper
                        routesObjects={routes.progressReport}
                        firstPath={routes.progressReport.studentDetails}
                    />

                    <div className="d-flex flex-wrap justify-content-between gap-2 mt-3 px-1">
                        <span className="small text-secondary">
                            <i className="bi bi-info-circle me-1"></i>
                            Your entries remain available while moving between sections.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
