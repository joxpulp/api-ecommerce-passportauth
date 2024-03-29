import { Request, Response } from 'express';
import faker from 'faker';
import { products } from '../models/productschema';
import { Products } from '../models/interfaces';
import { logger } from '../config/logs';

class ProductController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (id) {
				const singleProduct = await products.findById(id);
				if (singleProduct === null) {
					return res
						.status(404)
						.json({ error: 'Product with this id does not exist' });
				}
				return res.json({ product: singleProduct });
			} else {
				const get = await products.find();
				if (get.length === 0) {
					return res.status(404).json({ error: 'There are no products' });
				}
				return res.json({ products: get });
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				logger.fatal(error.message);
				res.status(500).json({ error: error.message });
			}
		}
	}

	getProductsTest(req: Request, res: Response) {
		const { cant } = req.query;
		const response: Products[] = [];
		const fakerProducts = {
			title: faker.commerce.productName(),
			price: Number(faker.commerce.price()),
			thumbnail: faker.image.technics(),
		};

		if (cant) {
			if (Number(cant) !== 0) {
				for (let i = 0; i < Number(cant); i++) {
					response.push(fakerProducts);
				}
				return res.json({ products: response });
			}
			return res.status(404).json({ message: 'There are no products' });
		}

		for (let i = 0; i < 10; i++) {
			response.push(fakerProducts);
		}
		return res.json({ productos: response });
	}

	async addProduct(req: Request, res: Response) {
		try {
			const { title, price, thumbnail } = req.body;

			if (!title || !price || !thumbnail) {
				logger.warn('Falto algo en body');
				return res.status(400).json({ error: 'Missing body fields' });
			}

			const product = new products({ title, price, thumbnail });
			const newProduct = await product.save();
			logger.info('Producto CREADO');
			return res.json({ newProduct });
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				logger.fatal(error.message);
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, price, thumbnail } = req.body;

			const product = await products.findByIdAndUpdate(
				id,
				{ $set: req.body },
				{ runValidators: true }
			);
			if (product === null) {
				return res.status(404).json({
					error: 'Product with this id does not exist',
				});
			} else {
				return res.json({ updatedProduct: product });
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				logger.fatal(error.message);
				res.status(500).json({ error: error.message });
			}
		}
	}

	async deleteProduct(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const product = await products.findByIdAndDelete(id);
			if (product === null) {
				return res.status(404).json({
					error: 'Product with this id does not exist',
				});
			} else {
				return res.json({ deletedProduct: product });
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				logger.fatal(error.message);
				logger.debug('Si hay un error en delete, debe salir este mensaje');
				res.status(500).json({ error: error.message });
			}
		}
	}
}

export const productController = new ProductController();
