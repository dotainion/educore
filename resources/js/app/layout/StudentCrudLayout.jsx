import { Outlet, useParams } from "react-router-dom";
import { HorizontalWizard } from "../components/HorizontalWizard"
import { routes } from "../routes/Routes";
import { PageNavigationWrapper } from "../components/PageNavigationWrapper";
import { StudentCrudSidebar } from "../components/StudentCrudSidebar";

export const StudentCrudLayout = () =>{

    const params = useParams();

    const sections = [
        {
            route: routes.studentCrud.information(params.studentId),
            title: "Student Information",
            description: "none",
            icon: "bi-person-vcard",
        },{
            route: routes.studentCrud.address(params.studentId),
            title: "Student Address",
            description: "none",
            icon: "bi-geo-alt",
        },{
            route: routes.studentCrud.guardian(params.studentId),
            title: "Parent / Guardian",
            description: "none",
            icon: "bi-people",
        },{
            route: routes.studentCrud.contacts(params.studentId),
            title: "Emergency Contacts",
            description: "none",
            icon: "bi-telephone-plus",
        },{
            route: routes.studentCrud.medical(params.studentId),
            title: "Medical Information",
            description: "none",
            icon: "bi-heart-pulse",
        },{
            route: routes.studentCrud.review(params.studentId),
            title: "Documents & Review",
            description: "none",
            icon: "bi-chat-square-text",
        }
    ];

    return(
        <div className="container-fluid bg-light min-vh-100 pb-5">
            <div className="container-fluid px-0">
                <div className="row g-4">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
                        <div>
                            <div className="d-flex align-items-center gap-2 text-primary small fw-semibold mb-2">
                                <i className="bi bi-mortarboard-fill"></i>
                                STUDENT MANAGEMENT
                            </div>
                            <h2 className="fw-bold mb-1">Student Enrolment</h2>
                            <p className="text-secondary mb-0">
                                Register a new student and collect their enrolment information.
                            </p>
                        </div>
                    </div>

                    <HorizontalWizard
                        steps={sections}
                        routesObjects={routes.studentCrud}
                    />

                    <div className="col-12 col-xl-8">
                        <Outlet />
                    </div>
                    
                    <StudentCrudSidebar />                    

                    <PageNavigationWrapper
                        routesObjects={routes.studentCrud}
                        firstPath={routes.studentCrud.information()}
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
    )
}