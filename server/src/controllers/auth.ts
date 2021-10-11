import { Request, Response, NextFunction } from 'express';

class AuthController {
	
	isLogged(req: Request, res: Response) {
		if (req.user) {
			return res.json({ logged: true, user: req.user });
		} else {
			return res.status(404).json({ logged: false });
		}
	}

	logout(req: Request, res: Response ) {
		if (req.user) {
			req.logout();
			return res.json({ msg: 'Session ended', logged: false });
		}
		return res
			.status(404)
			.json({ error: 'The is no session started or is already logout' });
	}
}

export const authController = new AuthController();
