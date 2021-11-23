import axios from 'axios';
import { logger } from '../config/logs';
import { Products } from '../models/interfaces';

const body = {
	title: 'Cerezas',
	price: 250,
	thumbnail:
		'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-256.png',
};
const bodyUpdate = {
	title: 'Uvas nuevas',
	price: 500,
	thumbnail:
		'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_uvas-256.png',
};

const api = axios.create({
	baseURL: 'http://localhost:8080',
});

const getProducts = async () => {
	try {
		const { data: products } = await api.get('/api/productos/listar');
		console.log(products);
	} catch (error) {
		logger.error(error);
	}
};

const getProductById = async (id: string) => {
	try {
		const { data: product } = await api.get(`/api/productos/listar/${id}`);
		console.log(product);
	} catch (error) {
		logger.error(error);
	}
};

const addProduct = async (body: Products) => {
	try {
		const { data: product } = await api.post('/api/productos/agregar', body);
		console.log(product);
	} catch (error) {
		logger.error(error);
	}
};

const updateProduct = async (id: string, body: Products) => {
	try {
		const { data: updatedProduct } = await api.put(
			`/api/productos/actualizar/${id}`,
			body
		);
		console.log(updatedProduct);
	} catch (error) {
		logger.error(error);
	}
};

const deleteProduct = async (id: string) => {
    try {
		const { data: updatedProduct } = await api.delete(
			`/api/productos/borrar/${id}`
		);
		console.log(updatedProduct);
	} catch (error) {
		logger.error(error);
	}
};

getProducts();
getProductById('613d34c0d846af730f4e7430');
addProduct(body);
updateProduct('613d34c0d846af730f4e742e', bodyUpdate);
deleteProduct('613d34c0d846af730f4e7432');
