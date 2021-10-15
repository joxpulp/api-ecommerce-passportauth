import { Router } from 'express';
import productsRouter from './products';
import messagesRouter from './messages';
import authRouter from './auth'
import { processController } from '../controllers/process';


const router = Router();

router.use('/productos', productsRouter)
router.use('/mensajes', messagesRouter)
router.use('/auth', authRouter)
router.get('/info', processController.info)
router.get('/randoms', processController.randoms)

export default router;