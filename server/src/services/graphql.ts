import { buildSchema } from 'graphql';
import { Args } from '../models/interfaces';
import { products } from '../models/productschema';

export const graphqlSchema = buildSchema(`
    type Query {
        getProducts: [Product]
        getProduct(id: String!): Product
    }

    type Mutation {
        addProduct(title: String!, price: Int!, thumbnail: String!): Product
    },

    type Product {
        _id: String
        title: String
        price: Int
        thumbnail: String
    }
`);

export const graphqlRoot = {
	getProducts: async () => {
		return await products.find();
	},
	getProduct: async (args: Args) => {
		return await products.findById(args.id);
	},
	addProduct: async (args: Args) => {
		const product = new products({
			title: args.title,
			price: args.price,
			thumbnail: args.thumbnail,
		});
        
		return await product.save();
	},
};
