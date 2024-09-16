class User{
    private _email: string;
    private _pass: string;
    private _rol: 'admin' | 'client';

    constructor(
        email:string,
        pass:string,
        rol: 'admin' | 'client'
    ){
        this._email = email;
        this._pass = pass;
        this._rol = rol;
    }

    get email():string{
        return this._email
    }
    get pass():string{
        return this._pass;
    }
    get rol():'admin' | 'client'{
        return this._rol
    }

    set email(email:string){
        this._email = email;
    }
    set pass(pass:string){
        this._pass = pass;
    }
    set rol(rol:'admin' | 'client'){
        this._rol = rol;
    }
}

export default User;