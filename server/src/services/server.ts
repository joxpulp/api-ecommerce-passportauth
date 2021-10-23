import express, { Request, Response } from 'express';
import { CONFIG } from '../config/config';
import * as http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import compression from 'compression'
import passport from '../middlewares/auth'
import { mongoose } from '../db/mongoose';
import apiRouter from '../routes/index';

mongoose();
const app = express();
const server = new http.Server(app);
app.use(express.static(path.resolve('public')));

app.use(compression())
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
app.use('/api', apiRouter);
app.get('/*', (req: Request, res: Response) => {
	const indexHtml = path.resolve('public/index.html');
	res.sendFile(indexHtml);
});

export default server;
