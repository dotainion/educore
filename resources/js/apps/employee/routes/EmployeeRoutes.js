export class EmployeeRoutes{
    
    register(route){
        return {
            employee: {
                profile: (userId=':userId') => route.path(`/employee/profile/${userId}`),
                create: '/employee/create',
                list: '/employee/list',
            },
        }
    }
}
