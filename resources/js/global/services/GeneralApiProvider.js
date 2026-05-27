import { Auth } from "../api/Auth";

export class GeneralApiProvider{
    
    register(api){
        return {
            auth: new Auth(api),
        }
    }
}