import { User } from "../api/User";

export class EmployeeApiProvider{
    
    register(api){
        return {
            user: new User(api),
        }
    }
}