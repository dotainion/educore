export class Auth{
    constructor(API){
        this.api = API;
    }

    async session(){
        return await this.api.get('/session');
    }
}
