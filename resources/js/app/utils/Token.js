class Token{
    TOKEN_KEY = '8f3a2c71-6d94-4b0e-a825-1c7e9f603d42';
    
    set(data){
        window.localStorage.setItem(this.TOKEN_KEY, data);
    }

    isset(){
        return !!this.get();
    }

    unset(){
        window.localStorage.setItem(this.TOKEN_KEY, null);
    }

    get(){
        return window.localStorage.getItem(this.TOKEN_KEY);
    }
}

export const token = new Token();