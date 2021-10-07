import { connect } from 'mongoose';
import { CONFIG } from '../config/config';

export const mongoose = async (): Promise<void> => {
	try {
		await connect(CONFIG.MONGO_URL);
		console.log('Conectado a base de datos');
	} catch (error) {
		console.log(error);
	}
};
