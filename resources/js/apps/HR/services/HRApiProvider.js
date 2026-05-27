import { ActivityLog } from "../api/ActivityLog";
import { Address } from "../api/Address";
import { Applicant } from "../api/Applicant";
import { Compliance } from "../api/Compliance";
import { Department } from "../api/Department";
import { Document } from "../api/Document";
import { DocumentType } from "../api/DocumentType";
import { Employee } from "../api/Employee";
import { Employment } from "../api/Employment";
import { Hired } from "../api/Hired";
import { Interview } from "../api/Interview";
import { Job } from "../api/Job";
import { LeaveRequest } from "../api/LeaveRequest";
import { Offer } from "../api/Offer";
import { Onboarding } from "../api/Onboarding";
import { Organization } from "../api/Organization";
import { Rejected } from "../api/Rejected";
import { Role } from "../api/Role";
import { Schedule } from "../api/Schedule";
import { Screening } from "../api/Screening";
import { SystemAccess } from "../api/SystemAccess";

export class HRApiProvider{
    
    register(api){
        return {
            employee: new Employee(api),
            department: new Department(api),
            address: new Address(api),
            employment: new Employment(api),
            organization: new Organization(api),
            systemAccess: new SystemAccess(api),
            compliance: new Compliance(api),
            role: new Role(api),
            onboarding: new Onboarding(api),
            leaveRequest: new LeaveRequest(api),
            job: new Job(api),
            applicant: new Applicant(api),
            document: new Document(api),
            documentType: new DocumentType(api),
            activityLog: new ActivityLog(api),
            screening: new Screening(api),
            interview: new Interview(api),
            offer: new Offer(api),
            hired: new Hired(api),
            rejected: new Rejected(api),
            schedule: new Schedule(api),
        }
    }
}