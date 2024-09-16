import { RowDataPacket } from 'mysql2';
import db from '../config/db';
import Product from '../Dto/productDto';
// import Product from '../Dto/productDto';


export class ProductRepository{
    static async RegisterProduct(imageUrl:string, name:string, description:string, price:number): Promise<void>{
        
        await db.query('INSERT INTO product(image_url, nameP, descriptionP, price) VALUES(?,?,?,?)',
        [imageUrl, name, description, price as number]);
    }

    static async deleteProduct(id:number): Promise<void>{
        await db.query('DELETE FROM product WHERE id = ?', [id])
    }

    static async getAllProduct(): Promise<Product[]>{
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM product');
        if(rows.length > 0){
            const image = rows.map(row =>({
                id: row.id,
                name: row.nameP,
                description: row.descriptionP,
                proce: row.price,
                image: `data:image/jpeg;base64,${row.image_url.toString('base64')}`
            }));
        }
        return rows as Product[];
    }

    static async getProductByName(name: string): Promise<Product[]>{
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM product WHERE nameP like LOWER(?)', [`%${name}%`])

        if(rows.length > 0){
            const image = await rows.map(row =>({
                id: row.id,
                image: `data:image/jpeg;base64,${row.image_url.toString('base64')}`
            }))
        }
        return rows as Product[];
    }

    static async updateProduct(id: number, imageUrl: string | null, name: string, description: string, price: number): Promise<void> {
        // Actualiza solo si los campos están presentes
        const query = `UPDATE product SET nameP = ?, descriptionP = ?, price = ? , image_url = ? WHERE id = ?`;
        const values = [name, description, price, imageUrl, id];
        await db.query(query, values);
    }
    
}


// static async updateProduct(id: number, imageUrl: string | null, name: string, description: string, price: number): Promise<void> {
//     // Actualiza solo si los campos están presentes
//     const query = `UPDATE product SET nameP = ?, descriptionP = ?, price = ? ${imageUrl ? ', image_url = ?' : ''} WHERE id = ?`;
//     const values = imageUrl ? [name, description, price, imageUrl, id] : [name, description, price, id];
//     await db.query(query, values);
// }



















// static async updateProduct(image:string, name:string, description: string, price:number, id: number): Promise<void>{
//     await db.query('UPDATE product SET image_url=?, nameP=?, descriptionP=?, price=? WHERE id=?',
//     [image, name, description, price as number, id]);
// }