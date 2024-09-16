
class Product{
    private _imageUrl: string;
    private _name: string;
    private _description: string;
    private _price: number;

    constructor(
        imageUrl: string,
        name: string,
        descriptio: string,
        price: number
    ){
        this._imageUrl = imageUrl;
        this._name = name;
        this._description = descriptio;
        this._price = price
    }

    get imageUrl(): string{
        return this._imageUrl;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get price(): number{
        return this._price;
    }

    set imageUrl(imageUrl: string){
        this._imageUrl = imageUrl;
    }

    set name(name: string){
        this._name = name;
    }

    set description(description: string){
        this._description = description;
    }

    set price(price: number){
        this._price = price;
    }


}

export default Product;