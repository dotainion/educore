export class HRRoutes{
    dashboard = '/dashboard';
    employees = '/employees';
    addEmployeeOption = '/employee/option';
    csvImport = '/csv/import';
    addEmployee = '/add/employee/*';
    editEmployee = (employeeId=':employeeId')=> `/edit/employee/${employeeId}`;
    viewEmployee = (employeeId=':employeeId')=> `/view/employee/${employeeId}`;
    leaveRequests = '/leave/requests';
    documentUpload = (userId=':userId')=> `/document/upload/${userId}`;
    reports = '/reports';
    jobs = '/jobs';
    createJob = '/create/job';
    editJob = (jobId=':jobId')=> `/edit/job/${jobId}`;
    viewJob = (jobId=':jobId')=> `/view/job/${jobId}`;
    applicant = (applicantId=':applicantId')=> `/applicant/${applicantId}`;
    allApplicants = '/list/applicants';
    scheduling = (applicantId=':applicantId')=> `/scheduling/${applicantId}`;
    createSchedule = (applicantId=':applicantId')=> `/create/schedule/${applicantId}`;
    publishJob = (jobId=':jobId')=> `/publish/job/${jobId}`;
    formBuilder = '/form/builder';
    formViewer = '/form/viewer';
    formAssignment = '/form/assignment';
    rolesAndPermission = (employeeId=':employeeId')=> `/roles/&/permission/${employeeId}`;
    createOffer = (applicantId=':applicantId')=> `/create/offer/${applicantId}`;
    createApplicant = (jobId=':jobId')=> `/create/applicant/${jobId}`;
    offers = '/offers';
    recruitment = {
        recruite: '/recruitment/start',
        board: (jobId=':jobId')=> `/recruitment/pipeline/${jobId}`,
        search: (jobId=':jobId')=> `/search/recruitment/pipeline/${jobId}`,
        applied: (applicantId=':applicantId')=> `/recruitment/pipeline/applied/${applicantId}`,
        screening: (applicantId=':applicantId')=> `/recruitment/pipeline/screening/${applicantId}`,
        interview: (applicantId=':applicantId')=> `/recruitment/pipeline/interview/${applicantId}`,
        offer: (applicantId=':applicantId')=> `/recruitment/pipeline/offer/${applicantId}`,
        hired: (applicantId=':applicantId')=> `/recruitment/pipeline/hired/${applicantId}`,
        rejected: (applicantId=':applicantId')=> `/recruitment/pipeline/rejected/${applicantId}`
    }
    onboarding = {
        board: '/onboarding/pipeline',
        activation: (applicantId=':applicantId')=> `/onboarding/pipeline/activation/${applicantId}`,        
        HRSetup: (applicantId=':applicantId')=> `/onboarding/pipeline/hr/setup/${applicantId}`,
        ITSetup: (applicantId=':applicantId')=> `/onboarding/pipeline/it/setup/${applicantId}`,
        documents: (applicantId=':applicantId')=> `/onboarding/pipeline/documents/${applicantId}`,
        training: (applicantId=':applicantId')=> `/onboarding/pipeline/training/${applicantId}`,
        firstDay: (applicantId=':applicantId')=> `/onboarding/pipeline/first/day/${applicantId}`,
        completed: (applicantId=':applicantId')=> `/onboarding/pipeline/completed/${applicantId}`,
        employee: {
            newEmployeeProfile: ()=> '/employee/profile',
            convertToEmployeeProfile: (applicantId=':applicantId')=> `/employee/profile/${applicantId}`,
            employeeProfile: (userId=':userId')=> `/employee/profile/${userId}`,
            organizationAssignment: (userId=':userId')=> `/organization/assignment/${userId}`,
            employmentInformation: (userId=':userId')=> `/employment/information/${userId}`,
            scheduleWorkforceSettings: (userId=':userId')=> `/schedule/workforce/settings/${userId}`,
            compensationPayroll: (userId=':userId')=> `/compensation/payroll/${userId}`,
            emergencyContacts: (userId=':userId')=> `/emergencyc/ontacts/${userId}`,
            addressInformation: (userId=':userId')=> `/address/information/${userId}`,
            systemAccessPermissions: (userId=':userId')=> `/system/access/permissions/${userId}`,
            documentsCompliance: (userId=':userId')=> `/documents/compliance/${userId}`,
        }
    }
    settings = {
        company: '/settings/company',
        departments: '/settings/departments',
        rules: '/settings/rules',
        integrations: '/settings/integrations',
        notifications: '/settings/notifications',
    }
    workSchedule = {
        dashboard: '/work/schedule/dashboard',
        autoScheduleGenerator: '/auto/schedule/generator',
        coverageMonitor: '/coverage/monitor',
        employeeAvailabilityManager: '/employee/availability/manager',
        approvalWorkflow: '/schedule/approval/workflow',
        assignmentCenter: '/schedule/assignment/center',
        auditTrailViewer: '/schedule/audit/trail/viewer',
        intelligenceDashboard: '/schedule/intelligence/dashboard',
        publishCenter: '/schedule/publish/center',
        shiftSwapCenter: '/shift/swap/center',
        calendarView: '/workforce/calendar/view',
        ruleBuilder: '/work/schedule/rule/builder',
        shiftBuilder: '/shift/builder'
    }
    testing = '/testing';

    constructor(){
        this.recruitment.run = this.recruitment.jobOpenings;
    }

    register(route){
        return {
            hr: this
        }
    }
};