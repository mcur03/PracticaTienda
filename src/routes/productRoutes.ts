import multer from 'multer';
import { Router } from 'express';
import { ProductContoller } from '../controller/productController';
import { storage } from '../Utils/saveImage';
import { validateToken, verifyRole } from '../middleware/userMiddleware';
// import { validateProductData } from '../middleware/productMiddleware'

const router = Router();
const upload = multer({ storage: storage });

router.post('/registerProduct', validateToken,verifyRole('admin'), upload.single('image'), ProductContoller.create);
router.get('/product', validateToken, ProductContoller.getProducts);
router.get('/product/:name', validateToken, ProductContoller.getByName);
router.put('/product/:id', validateToken, verifyRole('admin'), upload.single('image'), ProductContoller.update);
router.delete('/delete/:id', validateToken, verifyRole('admin'), ProductContoller.delete);


export default router;