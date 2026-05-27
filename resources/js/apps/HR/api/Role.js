import { ApiGroup } from "../../../global/api/ApiGroup";

export class Role extends ApiGroup{
    //this do not have hr because its belongs to a different module
    __prefix__ = 'role';

    async rolesAndPermissionsByModules(){
        return await this.api.get('hr/sys/roles/&/permisson/by/modules');
    }

    async syncUserRoles(data){
        return await this.api.post('hr/role/roles/sync', data);
    }

    async syncUserPermissions(data){
        return await this.api.post('hr/role/permissions/sync', data);
    }
}