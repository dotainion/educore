import { ApiGroup } from "../../../global/api/ApiGroup";

export class Employee extends ApiGroup{
    //this do not have hr because its belongs to a different module
    __prefix__ = 'employee';
}