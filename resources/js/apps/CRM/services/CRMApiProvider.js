import { Activity } from "../api/Activity";
import { Address } from "../api/Address";
import { Company } from "../api/Company";

export class CRMApiProvider{
    
    register(api){
        return {
            activity: new Activity(api),
            company: new Company(api),
            address: new Address(api),
        }
    }
}