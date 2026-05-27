import { ApiGroup } from "../../../global/api/ApiGroup";

export class ActivityLog extends ApiGroup{
    //this do not have hr because its belongs to a different module
    __prefix__ = 'sys/activity/log';
}