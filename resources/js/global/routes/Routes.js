import { AccountRoute } from "../../apps/account/routes/AccountRoute";
import { CRMRoute } from "../../apps/CRM/routes/CRMRoute";
import { EmployeeRoutes } from "../../apps/employee/routes/EmployeeRoutes";
import { FormRoutes } from "../../apps/forms/routes/FormRoutes";
import { HRRoutes } from "../../apps/HR/routes/HRRoutes";
import { AppsRoutes } from "../../apps/launcher/routes/AppsRoutes";
import { MainPannelRoutes } from "../../apps/mainPannel/routes/MainPannelRoutes";
import { TechClubRoutes } from "../../apps/techclub/routes/TechClubRoutes";
import { RouteServiceProvider } from "./RouteServiceProvider";

export class Routes extends RouteServiceProvider{
    providers = [
        new AccountRoute(),
        new CRMRoute(),
        new EmployeeRoutes(),
        new AppsRoutes(),
        new HRRoutes(),
        new FormRoutes(),
        new TechClubRoutes(),
        new MainPannelRoutes(),
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
