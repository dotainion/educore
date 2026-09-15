export class Account{
    constructor(API){
        this.api = API;
    }

    async signIn(data){
        return await this.api.post('/login', data);
    }

    async signOut(){
        return await this.api.post('/logout');
    }

    async register(data){
        return await this.api.post('/register', data);
    }

    async recovery(data){
        return await this.api.post('/password/recovery', data);
    }
}
