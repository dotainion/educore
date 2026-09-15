import { v4 as uuidv4 } from "uuid";
import { ApiServiceProvider } from "./ApiServiceProvider";

export class ApiSubscription{

    constructor(api){
        this.api = api;
        this.provider = new ApiServiceProvider();

        if(!window?.fxs){
            window.fxs = {
                loadings: [],
                successes: [],
                errors: [],
                finallies: []
            };
        }

        this.subscribe = {
            to: {
                loading: (fx) => this.appendSubscription('loadings', fx),
                error: (fx) => this.appendSubscription('errors', fx),
                success: (fx) => this.appendSubscription('successes', fx),
                finally: (fx) => this.appendSubscription('finallies', fx)
            },
            trigger: {
                loading: (...data) => this.triggerSubscription('loadings', data),
                error: (...data) => this.triggerSubscription('errors', data),
                success: (...data) => this.triggerSubscription('successes', data),
                finally: (...data) => this.triggerSubscription('finallies', data)
            }
        }

        this.unsubscribe = {
            from: {
                error: (subscription) => this.removeSubscription('errors', subscription),
                success: (subscription) => this.removeSubscription('successes', subscription),
                finally: (subscription) => this.removeSubscription('finallies', subscription)
            }
        }
    }

    appendSubscription = (type, fx) =>{
        const data = {id: uuidv4(), trigger: fx};
        window.fxs[type].push(data);
        return data;
    }

    removeSubscription = (type, subscription) =>{
        window.fxs[type] = window.fxs[type].filter((fx)=>fx.id !== subscription.id);
    }

    triggerSubscription(type, ...data){
        window.fxs[type].forEach((fx)=>fx.trigger(...data));
    }

    async trigger(arg){
        try{
            this.triggerSubscription('loadings', {
                route: arg.route,
                data: arg.data
            });
            const response = await arg.api(arg.route, arg.data);
            this.triggerSubscription('successes', response);
            return response;
        }catch(error){
            this.triggerSubscription('errors', error);
            throw error;
        }finally{
            this.triggerSubscription('finallies');
        }
    }

    get = (route, data) => this.trigger({api: async (...g)=>await this.api.get(...g), route, data});
    post = (route, data) => this.trigger({api: async (...g)=>await this.api.post(...g), route, data});
    patch = (route, data) => this.trigger({api: async (...g)=>await this.api.patch(...g), route, data});
    put = (route, data) => this.trigger({api: async (...g)=>await this.api.put(...g), route, data});
    delete = (route, data) => this.trigger({api: async (...g)=>await this.api.delete(...g), route, data});
}
