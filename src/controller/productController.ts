import { Request, Response } from 'express';
import Product from '../Dto/productDto';
import { ProductRepository } from '../repositories/productRepository'

export class ProductContoller{
    static async create(req:Request, res:Response){
        try{
            const { name, price, description } = req.body;
            const image = req.file?.buffer;
            if (!image) {
                return res.status(400).json({ message: "La imagen es requerida" });
            }
            await ProductRepository.RegisterProduct(String(image), name, description, parseFloat(price))
            return res.status(201).json({
                message: 'Producto guardado exitosamente',
                product: {
                    name,
                    price,
                    description,
                    image
                }
            });
        }catch(error){
            console.error('Error al registrar el prducto', error);
            res.status(500).json({message: 'Error al registrar el producto: ', error})   
        }
    }       

    static async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            if(!id){
                return res.status(500).json({ message: 'Se necesita el id para eliminar el producto,'});
            }
            await ProductRepository.deleteProduct(Number(id))
            return res.status(200).json({message: 'El producto se elimino corresctamente'})
        } catch (error) {
            console.error('error al eliminar el producto', error);
            return res.status(500).json({message: 'Error al eliminar el producto', error})
        }
    }

    static async getProducts(_req:Request, res:Response){
        try {
            const product = await ProductRepository.getAllProduct();
            return res.status(200).json(product);
        } catch (error) {
            console.error('Error al optener los productos', error);
            return res.status(500).json({message: 'Error al optener los productos', error})
        }
    }

    static async getByName(req:Request, res:Response){
        try {
            const { name } = req.params
            const product = await ProductRepository.getProductByName(name as string);
            return res.status(200).json(product)
        } catch (error) {
            console.error(error);   
            return res.status(500).json({message: 'Error buscar el producto'})
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, price, description } = req.body;
            const image = req.file?.buffer;

            if (!id) {
                return res.status(400).json({ message: "El ID es obligatorio" });
            }

            // Llama al repositorio para actualizar el producto
            await ProductRepository.updateProduct(Number(id), String(image), name, description, parseFloat(price));

            return res.status(200).json({
                message: 'Producto actualizado exitosamente',
                product: { id, name, price, description, image }
            });
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            return res.status(500).json({ message: 'Error al actualizar el producto', error });
        }
    }
} 




// static async update(req:Request, res:Response){
//     try {
//         const { id } = req.params;
//         const image = req.file?.buffer;
//         if(!req.body.name) console.log('hola');
        
//         const { name, price, description } = req.body;
//         console.log('Datos:', id, name, price, description);
        
//         await ProductRepository.updateProduct(String(image), name, description, Number(price), Number(id))
//         return res.status(200).json({
//             message: 'Producto editado exitosamente'
//         });
//     } catch (error) {
//         console.error('Error al editar el producto', error);
//         return res.status(500).json({message: 'Error al editar el producto', error})
//     }
// }