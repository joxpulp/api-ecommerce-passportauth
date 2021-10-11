import { Router } from 'express';
import { CONFIG } from '../config/config';
import { authController } from '../controllers/auth';
import passportFacebook from '../middlewares/facebook-auth';

const router = Router();

router.get('/facebook-login', passportFacebook.authenticate('facebook', { scope: ['email'] }));
router.get(
	'/facebook-callback',
	passportFacebook.authenticate('facebook', {
		successRedirect: CONFIG.SUCCESS_REDIRECT,
		failureRedirect: CONFIG.FAILURE_REDIRECT,
	})
);
router.get('/logout', authController.logout);
router.get('/islogged', authController.isLogged);

export default router;
