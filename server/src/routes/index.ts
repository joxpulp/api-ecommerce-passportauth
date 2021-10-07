import { Router } from 'express';
import productsRouter from './products';
import messagesRouter from './messages';
import authRouter from './auth'

const router = Router();

router.use('/productos', productsRouter)
router.use('/mensajes', messagesRouter)
router.use('/auth', authRouter)

export default router;