import express, { Request, Response } from 'express';
import { CONFIG } from '../config/config';
import * as http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from '../middlewares/auth'
import flash from 'connect-flash'
import connectMongo from 'connect-mongo';
import { mongoose } from '../db/mongoose';
import apiRouter from '../routes/index';

mongoose();
const app = express();
const server = new http.Server(app);

app.set('trust proxy', 1);
app.set('json spaces', 2);
app.use(cookieParser());
app.use(
	cors({
		origin: true,
		methods: ['GET', 'POST'],
		credentials: true,
	})
);
app.use(
	session({
		store: connectMongo.create({ mongoUrl: CONFIG.MONGO_URL }),
		secret: CONFIG.SECRET,
		cookie: { sameSite: false, secure: 'auto', maxAge: 1000 * 120 },
		saveUninitialized: false,
		resave: true,
		rolling: true
	})
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string
app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Connected to the API' });
});
app.use('/api', apiRouter);

export default server;
