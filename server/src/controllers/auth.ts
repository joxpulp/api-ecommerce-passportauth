import { Request, Response } from 'express';
import { emailEthereal } from '../services/ethereal';


class AuthController {
	
	isLogged(req: Request, res: Response) {
		if (req.user) {
			return res.json({ logged: true, user: req.user });
		} else {
			return res.status(404).json({ logged: false });
		}
	}

	async logout(req: Request, res: Response ) {
		if (req.user) {
			await emailEthereal.sendEmail(
				req.user.emails![0].value,
				`LOGOUT | ${req.user.displayName}`,
				'Te deslogeaste'
			);
			req.logout();
			return res.json({ msg: 'Session ended', logged: false });
		}
		return res
			.status(404)
			.json({ error: 'The is no session started or is already logout' });
	}
}

export const authController = new AuthController();

		
		
		
	;