import { Ads } from "../api/Ads";

export class MainPannelApiProvider{
    
    register(api){
        return {
            ads: new Ads(api),
        }
    }
}