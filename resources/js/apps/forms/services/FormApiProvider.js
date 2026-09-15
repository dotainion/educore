import { Form } from "../api/Form";
import { Instance } from "../api/Instance";
import { Template } from "../api/Template";

export class FormApiProvider{
    
    register(api){
        return {
            form: new Form(api),
            instance: new Instance(api),
            template: new Template(api),
        }
    }
}