import { connect, createConnection } from 'mongoose';
import { CONFIG } from '../config/config';

export const mongoose = async (): Promise<void> => {
	try {
		await connect(CONFIG.MONGO_URL);
		console.log('Conectado a base de datos');
	} catch (error) {
		console.log(error);
	}
};
export const mongoServer = async () => {
	try {
		const connection = createConnection(CONFIG.MONGO_URL);
		console.log('Conectado a base de datos');
		return connection;
	} catch (error) {
		console.log(error);
	}
};
