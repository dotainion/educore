export class ApiGroup{
    __prefix__ = '';
    __primary_key_name__ = '';
    
    constructor(api){
        this.api = api;
    }

    prefix(){
        if(this.__prefix__.startsWith('/')){
            return this.__prefix__;
        }
        return `/${this.__prefix__}`;
    }

    async set(data, primaryKey){
        if(!primaryKey && !this.__primary_key_name__) {
            throw new Error('When using api set you must pass a primary key property name.');
        }
        if(data[primaryKey || this.__primary_key_name__]){
            return await this.update(data);
        }
        return await this.create(data);
    }

    async create(data){
        return await this.api.post(`${this.prefix()}/create`, data);
    }

    async update(data){
        return await this.api.patch(`${this.prefix()}/update`, data);
    }

    async delete(data){
        return await this.api.delete(`${this.prefix()}/delete`, {params: data});
    }

    async find(data){
        return await this.api.get(`${this.prefix()}/find`, {params: data});
    }

    async list(data){
        return await this.api.get(`${this.prefix()}/list`, {params: data});
    }

    async all(data){
        //return everyting/ without limit and offset
        return await this.api.get(`${this.prefix()}/list`, {params: data});
    }

    async search(data){
        return await this.api.get(`${this.prefix()}/search`, {params: data});
    }
}
