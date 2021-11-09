import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import {
	Strategy,
	StrategyOption,
	VerifyFunction,
	Profile,
} from 'passport-facebook';
import { CONFIG } from '../config/config';
import { ReqUser } from '../models/interfaces';
import { emailEthereal } from '../services/ethereal';
import { emailGmail } from '../services/gmail';

// Select passport strategy
const facebookStrategy = Strategy;

// Define the strategy options, in this case we use username field and password field
const strategyOptions: StrategyOption = {
	clientID: CONFIG.FB_CLIENT,
	clientSecret: CONFIG.FB_SECRET,
	callbackURL: CONFIG.FB_CALLBACK_URL,
	profileFields: ['id', 'displayName', 'photos', 'emails'],
};

// Login logic
const loginFunc = async (
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: any
): Promise<VerifyFunction> => {
	await emailEthereal.sendEmail(
		profile.emails![0].value,
		`LOGIN | ${profile.displayName}`,
		'Te logeaste'
	);
	await emailGmail.sendEmail(
		profile.emails![0].value,
		`LOGIN | ${profile.displayName}`,
		'Te logeaste',
		profile.photos![0].value
	);
	return done(null, profile);
};

// Create the login with the local strateg, we pass the strategy options and the login logic contained in loginFunc
passport.use(new facebookStrategy(strategyOptions, loginFunc));

// Serialize the user by id
passport.serializeUser((user: ReqUser, done) => {
	done(null, user);
});

//  Deserialize user by looking to the db with the id and a callback that executes the done.
passport.deserializeUser((user: ReqUser, done) => {
	done(null, user);
});

export const isAuth = (req: Request, res: Response, done: NextFunction) => {
	if (req.isAuthenticated()) {
		done();
	} else {
		return res.status(401).json({
			error: 'You are not authenticated',
		});
	}
};

export default passport;
