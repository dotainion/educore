import { AccountRoute } from "../../apps/account/routes/AccountRoute";
import { CRMRoute } from "../../apps/CRM/routes/CRMRoute";
import { EmployeeRoutes } from "../../apps/employee/routes/EmployeeRoutes";
import { HRRoutes } from "../../apps/HR/routes/HRRoutes";
import { AppsRoutes } from "../../apps/launcher/routes/AppsRoutes";
import { RouteServiceProvider } from "./RouteServiceProvider";

export class Routes extends RouteServiceProvider{
    providers = [
        new AccountRoute(),
        new CRMRoute(),
        new EmployeeRoutes(),
        new AppsRoutes(),
        new HRRoutes(),
    ];

    constructor(){
        super();
        this.register();
    }
    
    register(){
        this.providers.forEach((provider)=>{
            try{
                const rts = provider.register(this.requirment());
                Object.keys(rts).forEach((attr)=>{
                    if(this[attr]) throw new Error(`Route ${attr} already been registered.`);
                    this[attr] = rts[attr];
                });
            }catch(error){
                console.error(error);
            }
        });
    }
}

export const routes = new Routes();
