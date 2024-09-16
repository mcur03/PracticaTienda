class Comments{
    private _comment:string

    constructor(
        comment:string
    ){
        this._comment = comment;
    }

    get comment():string{
        return this._comment
    }

    set comment(comment:string){
        this._comment = comment
    }
}