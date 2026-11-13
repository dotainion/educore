import { Outlet, useParams } from "react-router-dom";
import { HorizontalWizard } from "../components/HorizontalWizard"
import { routes } from "../routes/Routes";
import { PageNavigationWrapper } from "../components/PageNavigationWrapper";
import { StudentCrudSidebar } from "../components/StudentCrudSidebar";

export const TeacherCrudLayout = () =>{

    const params = useParams();

    const sections = [
        {
            route: routes.editTeacher.information(params.teacherId),
            title: "Teacher Information",
            description: "Personal and contact information",
            icon: "bi-person-vcard",
        },{
            route: routes.editTeacher.employment(params.teacherId),
            title: "Teacher Address",
            description: "Residential and mailing address",
            icon: "bi-geo-alt",
        },{
            route: routes.editTeacher.assignClasses(params.teacherId),
            title: "Assign Classes",
            description: "Manage assigned classes",
            icon: "bi-easel2",
        },{
            route: routes.editTeacher.assignSubjects(params.teacherId),
            title: "Assign Subjects",
            description: "Manage teaching subjects",
            icon: "bi-journal-bookmark",
        },{
            route: routes.editTeacher.documents(params.teacherId),
            title: "Documents",
            description: "Teacher documents and records",
            icon: "bi-folder2-open",
        },{
            route: routes.editTeacher.additionalInformation(params.teacherId),
            title: "Additional Information",
            description: "Qualifications and other details",
            icon: "bi-card-text",
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
                                TEACHER MANAGEMENT
                            </div>
                            <h2 className="fw-bold mb-1">Teacher Enrolment</h2>
                            <p className="text-secondary mb-0">
                                Register a new teacher and collect their enrolment information.
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