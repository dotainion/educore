import { Account } from "../api/Account";

export class AccountApiProvider{
    
    register(api){
        return {
            account: new Account(api),
        }
    }
}