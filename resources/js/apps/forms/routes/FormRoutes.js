export class FormRoutes{
    
    register(route){
        return {
            form: {
                create: '/create/form',
                build: (templateId=':templateId') => `/create/form/${templateId}`,
                list: '/list/forms',
                view: (formId=':formId') => `/view/form/${formId}`,
            },
            instance: {
                list: '/list/form/instance',
                create: (formId=':formId') => `/create/form/instance/${formId}`,
                view: (instanceId=':instanceId') => `/create/form/instance/${instanceId}`,
            }
        }
    }
}
