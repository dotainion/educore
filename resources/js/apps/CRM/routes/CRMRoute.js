export class CRMRoute{
    register(route){
        return {
            crm: {
                activity: route.group('activities', 'activity'),
                company: route.group('companies', 'company'),
                contact: route.group('contacts', 'contact'),
                deal: route.group('deals', 'deal'),
                lead: route.group('leads', 'lead'),
                leadsReport: route.path('/leads/report'),
                salesReport: route.path('/sales/report'),
                crmSettings: route.path('/crm/settings'),
                roles: route.path('/roles'),
                dashboard: route.path('/dashboard'),
            },
        }
    }
}
