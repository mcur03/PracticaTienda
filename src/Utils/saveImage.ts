import multer from 'multer';

// Configuración de Multer para guardar las imágenes en una carpeta específica
export const storage = multer.memoryStorage();

