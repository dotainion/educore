import { Navigate, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { AuthProvider } from "../../global/context/AuthProvider";
import { ApiProvider } from "../../global/context/ApiProvider";
import { Jobs } from "./pages/Jobs";
import { AddEmployee } from "./pages/AddEmployee";
import { EmployeeView } from "./pages/EmployeeView";
import { Reports } from "./pages/Reports ";
import { LeaveRequests } from "./pages/LeaveRequests";
import { routes } from "../../global/routes/Routes";
import { RecruitmentLayout } from "./layouts/RecruitmentLayout";
import { OnboardingLayout } from "./layouts/OnboardingLayout";
import { Dashboard } from "./pages/Dashboard";
import { CreateJob } from "./pages/CreateJob";
import { DocumentUpload } from "./pages/DocumetUpload";
import { Recruite } from "./pages/recruitment/Recruite";
import { Employees } from "./pages/Employees";
import { AllApplicants } from "./pages/applicants/AllApplicants";
import { Scheduling } from "./pages/Scheduling";
import { ViewApplicant } from "./pages/applicants/ViewApplicant";
import { SettingsLayout } from "./layouts/SettingsLayout";
import { Company } from "./pages/settings/Company";
import { Departments } from "./pages/settings/Departments";
import { HRRules } from "./pages/settings/HRRules";
import { Integrations } from "./pages/settings/Integrations";
import { Notifications } from "./pages/settings/Notifications";
import { PublishJob } from "./pages/PublishJob";
import { RolesAndPermission } from "./pages/RolesAndPermission";
import { EditEmployee } from "./pages/EditEmployee";
import { EditJob } from "./pages/EditJob";
import { ViewJob } from "./pages/ViewJob";
import { CreateOffer } from "./pages/CreateOffer";
import { Offers } from "./pages/Offers";
import { CreateSchedule } from "./pages/CreateSchedule";
import { RecruitmentBoard } from "./pages/recruitment/RecruitmentBoard";
import { OnboardingBoard } from "./pages/onboarding/OnboardingBoard";
import { SearchRecruitmentPipeline } from "./pages/recruitment/SearchRecruitmentPipeline";
import { AppliedWorkspace } from "./pages/recruitment/AppliedWorkspace";
import { ScreeningWorkspace } from "./pages/recruitment/ScreeningWorkspace";
import { InterviewWorkspace } from "./pages/recruitment/InterviewWorkspace";
import { OfferWorkspace } from "./pages/recruitment/OfferWorkspace";
import { HiredWorkspace } from "./pages/recruitment/HiredWorkspace";
import { RejectedWorkspace } from "./pages/recruitment/RejectedWorkspace";
import { CreateApplicant } from "./pages/applicants/CreateApplicant";
import { AddEmployeeOptions } from "./pages/AddEmployeeOptions";
import { CSVImport } from "./pages/CSVImport";
import { ScheduleDashboard } from "./pages/workSchedule/ScheduleDashboard";
import { ActivationWorkspace } from "./pages/onboarding/ActivationWorkspace";
import { HRSetupWorkspace } from "./pages/onboarding/HRSetupWorkspace";
import { ITSetupWorkspace } from "./pages/onboarding/ITSetupWorkspace";
import { DocumentsWorkspace } from "./pages/onboarding/DocumentsWorkspace";
import { TrainingWorkspace } from "./pages/onboarding/TrainingWorkspace";
import { FirstDayWorkspace } from "./pages/onboarding/FirstDayWorkspace";
import { CompletedWorkspace } from "./pages/onboarding/CompletedWorkspace";
import { WorkScheduleRuleBuilder } from "./pages/workSchedule/WorkScheduleRuleBuilder";
import { ShiftSwapCenter } from "./pages/workSchedule/ShiftSwapCenter";
import { WorkforceCalendarView } from "./pages/workSchedule/WorkforceCalendarView";
import { SchedulePublishCenter } from "./pages/workSchedule/SchedulePublishCenter";
import { ScheduleIntelligenceDashboard } from "./pages/workSchedule/ScheduleIntelligenceDashboard";
import { ScheduleAuditTrailViewer } from "./pages/workSchedule/ScheduleAuditTrailViewer";
import { ScheduleAssignmentCenter } from "./pages/workSchedule/ScheduleAssignmentCenter";
import { EmployeeAvailabilityManager } from "./pages/workSchedule/EmployeeAvailabilityManager";
import { CoverageMonitor } from "./pages/workSchedule/CoverageMonitor";
import { AutoScheduleGenerator } from "./pages/workSchedule/AutoScheduleGenerator";
import { ScheduleApprovalWorkflow } from "./pages/workSchedule/ScheduleApprovalWorkflow";
import { EmployeeOnboardingLayout } from "./layouts/EmployeeOnboardingLayout";
import { OrganizationAssignment } from "./pages/onboarding/employment/OrganizationAssignment";
import { EmployeeProfile } from "./pages/onboarding/employment/EmployeeProfile";
import { EmploymentInformation } from "./pages/onboarding/employment/EmploymentInformation";
import { ScheduleWorkforceSettings } from "./pages/onboarding/employment/ScheduleWorkforceSettings";
import { CompensationPayroll } from "./pages/onboarding/employment/CompensationPayroll";
import { EmergencyContacts } from "./pages/onboarding/employment/EmergencyContacts";
import { AddressInformation } from "./pages/onboarding/employment/AddressInformation";
import { SystemAccessPermissions } from "./pages/onboarding/employment/SystemAccessPermissions";
import { DocumentsCompliance } from "./pages/onboarding/employment/DocumentsCompliance";
import { ShiftBuilder } from "./pages/workSchedule/ShiftBuilder";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider>
            <Route element={<RecruitmentLayout />}>
                <Route path={routes.hr.recruitment.board()} element={<RecruitmentBoard />} />
                <Route element={<Layout />}>
                    <Route path={routes.hr.recruitment.search()} element={<SearchRecruitmentPipeline />} />
                    <Route path={routes.hr.recruitment.applied()} element={<AppliedWorkspace />} />
                    <Route path={routes.hr.recruitment.screening()} element={<ScreeningWorkspace />} />
                    <Route path={routes.hr.recruitment.interview()} element={<InterviewWorkspace />} />
                    <Route path={routes.hr.recruitment.offer()} element={<OfferWorkspace />} />
                    <Route path={routes.hr.recruitment.hired()} element={<HiredWorkspace />} />
                    <Route path={routes.hr.recruitment.rejected()} element={<RejectedWorkspace />} />
                </Route>
            </Route>
            <Route element={<OnboardingLayout />}>
                <Route path={routes.hr.onboarding.board} element={<OnboardingBoard />} />
                <Route element={<Layout />}>
                    <Route path={routes.hr.onboarding.activation()} element={<ActivationWorkspace />} />
                    <Route path={routes.hr.onboarding.HRSetup()} element={<HRSetupWorkspace />} />
                    <Route path={routes.hr.onboarding.ITSetup()} element={<ITSetupWorkspace />} />
                    <Route path={routes.hr.onboarding.documents()} element={<DocumentsWorkspace />} />
                    <Route path={routes.hr.onboarding.training()} element={<TrainingWorkspace />} />
                    <Route path={routes.hr.onboarding.firstDay()} element={<FirstDayWorkspace />} />
                    <Route path={routes.hr.onboarding.completed()} element={<CompletedWorkspace />} />
                </Route>
            </Route>
            <Route element={<Layout />}>
                <Route element={<SettingsLayout />}>
                    <Route path={routes.hr.settings.company} element={<Company />} />
                    <Route path={routes.hr.settings.departments} element={<Departments />} />
                    <Route path={routes.hr.settings.rules} element={<HRRules />} />
                    <Route path={routes.hr.settings.integrations} element={<Integrations />} />
                    <Route path={routes.hr.settings.notifications} element={<Notifications />} />
                </Route>
                <Route>
                    <Route path={routes.hr.workSchedule.dashboard} element={<ScheduleDashboard />} />
                    <Route path={routes.hr.workSchedule.autoScheduleGenerator} element={<AutoScheduleGenerator />} />
                    <Route path={routes.hr.workSchedule.coverageMonitor} element={<CoverageMonitor />} />
                    <Route path={routes.hr.workSchedule.employeeAvailabilityManager} element={<EmployeeAvailabilityManager />} />
                    <Route path={routes.hr.workSchedule.approvalWorkflow} element={<ScheduleApprovalWorkflow />} />
                    <Route path={routes.hr.workSchedule.assignmentCenter} element={<ScheduleAssignmentCenter />} />
                    <Route path={routes.hr.workSchedule.auditTrailViewer} element={<ScheduleAuditTrailViewer />} />
                    <Route path={routes.hr.workSchedule.intelligenceDashboard} element={<ScheduleIntelligenceDashboard />} />
                    <Route path={routes.hr.workSchedule.publishCenter} element={<SchedulePublishCenter />} />
                    <Route path={routes.hr.workSchedule.shiftSwapCenter} element={<ShiftSwapCenter />} />
                    <Route path={routes.hr.workSchedule.calendarView} element={<WorkforceCalendarView />} />
                    <Route path={routes.hr.workSchedule.ruleBuilder} element={<WorkScheduleRuleBuilder />} />
                    <Route path={routes.hr.workSchedule.shiftBuilder} element={<ShiftBuilder />} />
                </Route>
                <Route element={<EmployeeOnboardingLayout />}>
                    <Route>
                        {/* these route is navigated to the same component just different path with different params */}
                        <Route path={routes.hr.onboarding.employee.newEmployeeProfile()} element={<EmployeeProfile />} />
                        <Route path={routes.hr.onboarding.employee.convertToEmployeeProfile()} element={<EmployeeProfile />} />
                        <Route path={routes.hr.onboarding.employee.employeeProfile()} element={<EmployeeProfile />} />
                    </Route>
                    <Route path={routes.hr.onboarding.employee.organizationAssignment()} element={<OrganizationAssignment />} />
                    <Route path={routes.hr.onboarding.employee.employmentInformation()} element={<EmploymentInformation />} />
                    <Route path={routes.hr.onboarding.employee.scheduleWorkforceSettings()} element={<ScheduleWorkforceSettings />} />
                    <Route path={routes.hr.onboarding.employee.compensationPayroll()} element={<CompensationPayroll />} />
                    <Route path={routes.hr.onboarding.employee.emergencyContacts()} element={<EmergencyContacts />} />
                    <Route path={routes.hr.onboarding.employee.addressInformation()} element={<AddressInformation />} />
                    <Route path={routes.hr.onboarding.employee.systemAccessPermissions()} element={<SystemAccessPermissions />} />
                    <Route path={routes.hr.onboarding.employee.documentsCompliance()} element={<DocumentsCompliance />} />
                </Route>
                <Route path={routes.hr.dashboard} element={<Dashboard />} />
                <Route path={routes.hr.employees} element={<Employees />} />
                <Route path={routes.hr.reports} element={<Reports />} />
                <Route path={routes.hr.addEmployeeOption} element={<AddEmployeeOptions />} />
                <Route path={routes.hr.csvImport} element={<CSVImport />} />
                <Route path={routes.hr.addEmployee} element={<AddEmployee />} />
                <Route path={routes.hr.editEmployee()} element={<EditEmployee />} />
                <Route path={routes.hr.viewEmployee()} element={<EmployeeView />} />
                <Route path={routes.hr.leaveRequests} element={<LeaveRequests />} />
                <Route path={routes.hr.createJob} element={<CreateJob />} />
                <Route path={routes.hr.documentUpload()} element={<DocumentUpload />} />
                <Route path={routes.hr.jobs} element={<Jobs />} />
                <Route path={routes.hr.recruitment.recruite} element={<Recruite />} />
                <Route path={routes.hr.allApplicants} element={<AllApplicants />} />
                <Route path={routes.hr.scheduling()} element={<Scheduling />} />
                <Route path={routes.hr.createSchedule()} element={<CreateSchedule />} />
                <Route path={routes.hr.applicant()} element={<ViewApplicant />} />
                <Route path={routes.hr.editJob()} element={<EditJob />} />
                <Route path={routes.hr.viewJob()} element={<ViewJob />} />
                <Route path={routes.hr.publishJob()} element={<PublishJob />} />
                <Route path={routes.hr.rolesAndPermission()} element={<RolesAndPermission />} />
                <Route path={routes.hr.createOffer()} element={<CreateOffer />} />
                <Route path={routes.hr.offers} element={<Offers />} />
                <Route path={routes.hr.createApplicant()} element={<CreateApplicant />} />
            </Route>
            <Route path={routes.default} element={<Navigate to={routes.hr.dashboard} />} />
        </RoutesProvider>
    )
}
