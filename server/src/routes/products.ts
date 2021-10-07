import { Router } from 'express';
import { productController } from '../controllers/products';
import { authController } from '../controllers/auth';
import { isAuth } from '../middlewares/auth';

const router = Router();

router.get('/listar/:id?', productController.getProducts);
router.get('/vista-test', productController.getProductsTest);
router.post('/agregar', isAuth, productController.addProduct);
router.put('/actualizar/:id', isAuth, productController.updateProduct);
router.delete('/borrar/:id', isAuth, productController.deleteProduct);

export default router;
