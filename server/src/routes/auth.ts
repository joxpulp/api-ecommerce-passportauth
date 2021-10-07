import { Router } from 'express';
import { authController } from '../controllers/auth';
import passport from '../middlewares/auth';

const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.get('/islogged', authController.isLogged);

export default router;
