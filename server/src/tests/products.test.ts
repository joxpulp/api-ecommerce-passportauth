import Server from '../services/server';
import supertest, { SuperAgentTest } from 'supertest';
import { connection } from 'mongoose';
import { Products } from '../models/interfaces';
import { products } from '../models/productschema';

describe('PRODUCT ENDPOINTS', () => {
	let request: SuperAgentTest;

	beforeAll(() => {
		request = supertest.agent(Server);
	});

	afterAll(async () => {
		await connection.close();
		Server.close();
	});

	test('GET | PRODUCTS: Should return a list of products with 200 status code', async () => {
		const { body: expectedResponse, statusCode } = await request.get(
			'/api/productos/listar'
		);

		expect(statusCode).toBe(200);
		expect(expectedResponse.length).not.toBe(0);
	});

	test('GET | PRODUCT: Should return a product by passing the id, with 200 status code', async () => {
	
		const { body: expectedResponse, statusCode } = await request.get(
			'/api/productos/listar/613d34c0d846af730f4e7430'
		);

		const response = {
			product: {
				_id: '613d34c0d846af730f4e7430',
				title: 'Uva',
				price: 820,
				thumbnail:
					'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png',
			},
		};

		expect(statusCode).toBe(200);
		expect(expectedResponse).toEqual(response);
	});

	test('POST | ADD PRODUCT: Should return added product, with 200 status code', async () => {
		const body: Products = {
			title: 'Manzana',
			price: 820,
			thumbnail:
				'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png',
		};

		jest
			.spyOn(products.prototype, 'save')
			.mockResolvedValueOnce({ _id: '613d34c0d846af730f4e7430', ...body });

		const {
			body: {
				newProduct: { _id, title, price, thumbnail },
			},
			statusCode,
		} = await request.post('/api/productos/agregar').send(body);

		expect(statusCode).toBe(200);
		expect(_id).toEqual('613d34c0d846af730f4e7430');
		expect(title).toEqual(body.title);
		expect(price).toEqual(body.price);
		expect(thumbnail).toEqual(body.thumbnail);
	});

	test('PUT | UPDATE PRODUCT: Should return an updated product, with 200 status code', async () => {
		const mockData: Products = {
			_id: '613d34c0d846af730f4e7430',
			title: 'Aguacate',
			price: 820,
			thumbnail:
				'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png',
		};

		jest
			.spyOn(products, 'findByIdAndUpdate')
			.mockImplementationOnce(() => Promise.resolve(mockData) as any);

		const { body: updatedProduct, statusCode } = await request
			.put('/api/productos/actualizar/613d34c0d846af730f4e7430')
			.send({ title: 'Aguacate' });

		const response = {
			updatedProduct: mockData,
		};

		expect(statusCode).toBe(200);
		expect(updatedProduct).toEqual(response);
	});

	test('DELETE | DELETE PRODUCT: Should return a deleted product, with 200 status code', async () => {
		const mockData: Products = {
			_id: '613d34c0d846af730f4e7430',
			title: 'Aguacate',
			price: 820,
			thumbnail:
				'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png',
		};

		jest
			.spyOn(products, 'findByIdAndDelete')
			.mockImplementationOnce(() => Promise.resolve(mockData) as any);
	
		const { body: updatedProduct, statusCode } = await request
			.delete('/api/productos/borrar/613d34c0d846af730f4e7430')

		const response = {
			deletedProduct: mockData,
		};

		expect(statusCode).toBe(200);
		expect(updatedProduct).toEqual(response);
	});

});
