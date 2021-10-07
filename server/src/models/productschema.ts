import { Schema, model } from 'mongoose';
import { Products } from './interfaces';

const productsCollection = 'productos';

const productsSchema = new Schema<Products>(
	{
		title: { type: String, required: true, max: 100 },
		price: {
			type: Number,
			required: true,
			min: [100, `El valor es {VALUE}, debe ser como minimo 100`],
			max: [5000, `El valor es {VALUE}, debe ser como maximo 5000`],
		},
		thumbnail: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const products = model<Products>(productsCollection, productsSchema);
