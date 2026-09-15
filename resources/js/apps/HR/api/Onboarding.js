import { ApiGroup } from "../../../global/api/ApiGroup";

export class Onboarding{
    __prefix__ = 'hr/onboarding';

    constructor(api){
        this.profile = new RouteBuilder(api, this.__prefix__, 'profile');
        this.employmentInfo = new RouteBuilder(api, this.__prefix__, 'employment/info');
        this.scheduleSettings = new RouteBuilder(api, this.__prefix__, 'schedule/settings');
        this.compensation = new RouteBuilder(api, this.__prefix__, 'compensation');
        this.emergencyContact = new RouteBuilder(api, this.__prefix__, 'emergency/contact');
        this.addrInfo = new RouteBuilder(api, this.__prefix__, 'addr/info');
        this.permissions = new RouteBuilder(api, this.__prefix__, 'permissions');
        this.documents = new RouteBuilder(api, this.__prefix__, 'documents');
        this.metadata = new RouteBuilder(api, this.__prefix__, 'metadata');
        this.orgAssignment = new RouteBuilder(api, this.__prefix__, 'org/assignment');
    }
}

class RouteBuilder extends ApiGroup{
    constructor(api, base, route){
        super(api);
        this.__prefix__ = `${base}/${route}`;
    }

    primarykey(propertyName){
        this.__primary_key_name__ = propertyName;
        return this;
    }
}
