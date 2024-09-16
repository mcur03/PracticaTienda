import { Request, Response, NextFunction } from 'express';

export const validateProductData = (req: Request, res: Response, next: NextFunction) => {
    const { name, price, description } = req.body;

    // Verificar que todos los campos estén presentes
    if (!name) {
        return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
    }
    if (!price) {
        return res.status(400).json({ message: 'El campo precio es obligatorio.' });
    }
    if (!description) {
        return res.status(400).json({ message: 'El campo descripción es obligatorio.' });
    }

    // Validar que el precio sea un número válido mayor que 0
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número válido mayor que 0.' });
    }

    // Validar que la descripción tenga un tamaño mínimo, por ejemplo 10 caracteres
    if (description.length < 10) {
        return res.status(400).json({ message: 'La descripción debe tener al menos 10 caracteres.' });
    }

    // Si todas las validaciones pasan, continuar al siguiente middleware/controlador
    next();
};
