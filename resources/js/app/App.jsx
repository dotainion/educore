import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Recovery } from "./pages/Recovery";
import { Layout } from "./layout/Layout";
import { SignOut } from "./pages/SignOut";
import { routes } from "./routes/Routes";
import { ProgressReport } from "./pages/reports/ProgressReport";
import { Teachers } from "./pages/Teachers";
import { AddTeacher } from "./pages/AddTeacher";
import { Students } from "./pages/Students";
import { AddStudent } from "./pages/AddStudent";
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

export const App = () =>{
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route element={<AuthRouter><Layout /></AuthRouter>}>
                        <Route path={routes.progressReport} element={<ProgressReport />} />
                        <Route path={routes.viewProgressReport} element={<ViewProgressReport />} />
                        <Route path={routes.reportCard} element={<ReportCard />} />
                        <Route path={routes.reportCardList} element={<ReportCardList />} />
                        <Route path={routes.progressReportList} element={<ProgressReportList />} />
                        <Route path={routes.academicReports} element={<AcademicReports />} />
                        <Route path={routes.teachers} element={<Teachers />} />
                        <Route path={routes.addTeacher} element={<AddTeacher />} />
                        <Route path={routes.students} element={<Students />} />
                        <Route path={routes.addStudent} element={<AddStudent />} />
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
                </Routes>
            </HashRouter>
        </AuthProvider>
        
    )
}
