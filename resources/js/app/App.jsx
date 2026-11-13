import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Recovery } from "./pages/Recovery";
import { Layout } from "./layout/Layout";
import { SignOut } from "./pages/SignOut";
import { routes } from "./routes/Routes";
import { Teachers } from "./pages/Teachers";
import { Teacher } from "./pages/Teacher";
import { Students } from "./pages/Students";
import { Classes } from "./pages/Classes";
import { AddClass } from "./pages/AddClass";
import { ReportCard } from "./pages/ReportCard";
import { ReportCardList } from "./pages/ReportCardList";
import { Timetable } from "./pages/Timetable";
import { Subjects } from "./pages/Subjects";
import { AddSubject } from "./pages/AddSubject";
import { TakeAttendance } from "./pages/TakeAttendance";
import { AttendanceHistory } from "./pages/AttendanceHistory";
import { ReportsAnalytics } from "./pages/ReportsAnalytics";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Notifications } from "./pages/Notifications";
import { ViewProgressReport } from "./pages/ViewProgressReport";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthRouter } from "./routes/AuthRouter";
import { AcademicReports } from "./pages/AcademicReports";
import { ProgressReportList } from "./pages/ProgressReportList";
import { Settings } from "./pages/Settings";
import { AcademicAttendance } from "./pages/AcademicAttendance";
import { StudentDetails } from "./pages/reports/StudentDetails";
import { AttendanceBehaviour } from "./pages/reports/AttendanceBehaviour";
import { AcademicResults } from "./pages/reports/AcademicResults";
import { PerformanceComments } from "./pages/reports/PerformanceComments";
import { Approval } from "./pages/reports/Approval";
import { ReportReview } from "./pages/reports/ReportReview";
import { ProgressReportLayout } from "./layout/ProgressReportLayout";
import { StudentInformation } from "./pages/studentCrud/StudentInformation";
import { ParentGuardian } from "./pages/studentCrud/ParentGuardian";
import { MedicalInformation } from "./pages/studentCrud/MedicalInformation";
import { StudentReview } from "./pages/studentCrud/StudentReview";
import { StudentCrudLayout } from "./layout/StudentCrudLayout";
import { StudentEmergencyContacts } from "./pages/studentCrud/StudentEmergencyContacts";
import { ToastProvider } from "./providers/ToastProvider";
import { StudentAddress } from "./pages/studentCrud/StudentAddress";
import { Student } from "./pages/Student";
import { StudentDocuments } from "./pages/studentCrud/StudentDocuments";
import { AdditionalInformation } from "./pages/teacherCrud/AdditionalInformation";
import { AssignClasses } from "./pages/teacherCrud/AssignClasses";
import { AssignSubjects } from "./pages/teacherCrud/AssignSubjects";
import { Employment } from "./pages/teacherCrud/Employment";
import { TeacherInformation } from "./pages/teacherCrud/TeacherInformation";
import { TeacherDocuments } from "./pages/teacherCrud/TeacherDocuments";
import { TeacherCrudLayout } from "./layout/TeacherCrudLayout";

export const App = () =>{
    return (
        <AuthProvider>
            <ToastProvider>
                <HashRouter>
                    <Routes>
                        <Route element={<AuthRouter><Layout /></AuthRouter>}>
                            <Route path={routes.progressReport.base} element={<ProgressReportLayout />}>
                                <Route path={routes.progressReport.studentDetails} element={<StudentDetails />} />
                                <Route path={routes.progressReport.attendanceBehaviour} element={<AttendanceBehaviour />} />
                                <Route path={routes.progressReport.academicResults} element={<AcademicResults />} />
                                <Route path={routes.progressReport.performanceComments} element={<PerformanceComments />} />
                                <Route path={routes.progressReport.approvalReview} element={<Approval />} />
                                <Route path={routes.progressReport.finalReview} element={<ReportReview />} />
                                <Route path="*" element={<Navigate to={routes.progressReport.absolute(routes.progressReport.studentDetails)} />} />
                            </Route>
                            <Route path={routes.viewProgressReport} element={<ViewProgressReport />} />
                            <Route path={routes.reportCard} element={<ReportCard />} />
                            <Route path={routes.reportCardList} element={<ReportCardList />} />
                            <Route path={routes.progressReportList} element={<ProgressReportList />} />
                            <Route path={routes.academicReports} element={<AcademicReports />} />
                            <Route path={routes.teachers} element={<Teachers />} />
                            <Route>
                                <Route path={routes.editTeacher.information()} element={<TeacherInformation />} />
                                <Route path={routes.editTeacher.assignClasses()} element={<AssignClasses />} />
                                <Route path={routes.editTeacher.assignSubjects()} element={<AssignSubjects />} />
                                <Route path={routes.editTeacher.employment()} element={<Employment />} />
                                <Route path={routes.editTeacher.documents()} element={<TeacherDocuments />} />
                                <Route path={routes.editTeacher.additionalInformation()} element={<AdditionalInformation />} />
                            </Route>
                            <Route path={routes.studentCrud.base} element={<TeacherCrudLayout />}>
                                <Route path={routes.teacherCrud.information()} element={<TeacherInformation />} />
                                <Route path={routes.teacherCrud.assignClasses()} element={<AssignClasses />} />
                                <Route path={routes.teacherCrud.assignSubjects()} element={<AssignSubjects />} />
                                <Route path={routes.teacherCrud.employment()} element={<Employment />} />
                                <Route path={routes.teacherCrud.documents()} element={<TeacherDocuments />} />
                                <Route path={routes.teacherCrud.additionalInformation()} element={<AdditionalInformation />} />
                            </Route>
                            <Route path={routes.viewTeacher()} element={<Teacher />} />
                            <Route path={routes.students} element={<Students />} />
                            <Route path={routes.viewStudent()} element={<Student />} />
                            <Route>
                                <Route path={routes.editStudent.information()} element={<StudentInformation />} />
                                <Route path={routes.editStudent.address()} element={<StudentAddress />} />
                                <Route path={routes.editStudent.guardian()} element={<ParentGuardian />} />
                                <Route path={routes.editStudent.contacts()} element={<StudentEmergencyContacts />} />
                                <Route path={routes.editStudent.medical()} element={<MedicalInformation />} />
                                <Route path={routes.editStudent.documents()} element={<StudentDocuments />} />
                            </Route>
                            <Route path={routes.studentCrud.base} element={<StudentCrudLayout />}>
                                <Route path={routes.studentCrud.information()} element={<StudentInformation />} />
                                <Route path={routes.studentCrud.address()} element={<StudentAddress />} />
                                <Route path={routes.studentCrud.guardian()} element={<ParentGuardian />} />
                                <Route path={routes.studentCrud.contacts()} element={<StudentEmergencyContacts />} />
                                <Route path={routes.studentCrud.medical()} element={<MedicalInformation />} />
                                <Route path={routes.studentCrud.review()} element={<StudentReview />} />
                                <Route path="*" element={<Navigate to={routes.studentCrud.absolute(routes.studentCrud.information())} />} />
                            </Route>
                            <Route path={routes.classes} element={<Classes />} />
                            <Route path={routes.addClass} element={<AddClass />} />
                            <Route path={routes.timetable} element={<Timetable />} />
                            <Route path={routes.subjects} element={<Subjects />} />
                            <Route path={routes.addSubject} element={<AddSubject />} />
                            <Route path={routes.takeAttendance} element={<TakeAttendance />} />
                            <Route path={routes.attendanceHistory} element={<AttendanceHistory />} />
                            <Route path={routes.academicAttendance} element={<AcademicAttendance />} />
                            <Route path={routes.reportsAnalytics} element={<ReportsAnalytics />} />
                            <Route path={routes.dashboard} element={<Dashboard />} />
                            <Route path={routes.notifications} element={<Notifications />} />
                            <Route path={routes.settings} element={<Settings />} />
                            <Route path={'*'} element={<NotFound />} />
                        </Route>
                        <Route path={routes.signUp} element={<Register />} />
                        <Route path={routes.signIn} element={<SignIn />} />
                        <Route path={routes.recovery} element={<Recovery />} />
                        <Route path={routes.signOut} element={<SignOut />} />
                        <Route path={routes.default} element={<Navigate to={routes.signIn} />} />
                        <Route path={'*'} element={<Navigate to={routes.signIn} />} />
                        {/**This is for testing*/}
                        <Route path="/test" element={<Student />} />
                    </Routes>
                </HashRouter>
            </ToastProvider>
        </AuthProvider>
        
    )
}
