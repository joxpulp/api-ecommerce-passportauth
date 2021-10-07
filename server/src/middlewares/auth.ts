import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import passportLocal, {
	VerifyFunctionWithRequest,
	IStrategyOptionsWithRequest,
} from 'passport-local';
import { userModel } from '../models/userschema';

interface User {
	_id?: string;
}

// Select passport strategy
const localStrategy = passportLocal.Strategy;

// Define the strategy options, in this case we use username field and password field
const strategyOptions: IStrategyOptionsWithRequest = {
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true,
};

// Login logic
const loginFunc = async (
	req: Request,
	username: string,
	password: string,
	done: any
): Promise<VerifyFunctionWithRequest> => {
	const user = await userModel.findOne({ username });

	if (!user || !(await user.isValidPassword(password))) {
		return done(null, false, {
			error:
				'Invalid username or password, try again',
		});
	}

	return done(null, user);
};

//  Signup logic
const signupFunc = async (
	req: Request,
	username: string,
	password: string,
	done: any
) => {
	try {
		const { username, password, email, name, lastname } = req.body;

		if (!username || !password || !email || !name || !lastname) {
			return done(null, false, { error: 'Missing fields in body' });
		}

		const user = await userModel.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (user) {
			return done(null, false, { error: 'User already exist, try with other option' }); 
		} else {
			const userData = {
				username,
				password,
				email,
				name,
				lastname,
			};

			const newUser = new userModel(userData);
			await newUser.save();
			return done(null, newUser);
		}
	} catch (error) {
		done(error);
	}
};

// Create the login with the local strateg, we pass the strategy options and the login logic contained in loginFunc
passport.use('login', new localStrategy(strategyOptions, loginFunc));

// Create the signup with the local strategy, we pass the strategy options and the signup logic contained in signupFunc
passport.use('signup', new localStrategy(strategyOptions, signupFunc));

// Serialize the user by id
passport.serializeUser((user: User, done) => {
	done(null, user._id);
});

//  Deserialize user by looking to the db with the id and a callback that executes the done.
passport.deserializeUser((userId, done) => {
	userModel.findById(userId, (err: any, user: any) => {
		done(err, user);
	});
});

export const isAuth = (req: Request, res: Response, done: NextFunction) => {
	if (req.isAuthenticated()) {
		done();
	} else {
		return res.status(401).json({
			error:
				'You are not authenticated',
		});
	}
};

export default passport;
