export class AccountRoute{
    signIn = '/login';
    signOut = '/logout';
    recovery = '/recovery';
    signUp = '/register';

    register(){
        return {
            account: this,
        }
    }
}
