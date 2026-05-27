import { AccountApiProvider } from "../../apps/account/service/AccountApiProvider";
import { CRMApiProvider } from "../../apps/CRM/services/CRMApiProvider";
import { EmployeeApiProvider } from "../../apps/employee/services/EmployeeApiProvider";
import { HRApiProvider } from "../../apps/HR/services/HRApiProvider";
import { GeneralApiProvider } from "./GeneralApiProvider";

export class ApiServiceProvider{

    providers = [
        new CRMApiProvider(),
        new AccountApiProvider(),
        new EmployeeApiProvider(),
        new GeneralApiProvider(),
        new HRApiProvider(),
    ];
    
    run(apiInstance){
        this.providers.forEach((provider)=>{
            const apis = provider.register(apiInstance);
            Object.keys(apis).forEach((attr)=>{
                apiInstance[attr] = apis[attr];
            });
        });
    }
}