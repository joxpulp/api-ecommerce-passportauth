import * as http from 'http';
import { Server } from 'socket.io';
import { products } from '../models/productschema';
import { messages } from '../models/messageschema';
import { smsTwilio } from './twilio';

// Socket Server
export const ioServer = (server: http.Server) => {
	const io = new Server(server);
	io.on('connection', async (socket) => {
		console.log('Client Connected Ya');

		try {
			socket.on('addProduct', async (product) => {
				try {
					const newProduct = new products(product);
					await newProduct.save();
				} catch (error) {
					console.log(error);
				}
				io.emit('products', await products.find());
			});

			socket.emit('products', await products.find());

			socket.on('sendMessage', async (message) => {
				try {
					const newMessage = new messages(message);
					await newMessage.save();
					if (message.message.toLowerCase().includes('administrador')) {
						await smsTwilio.sendMessage(message.email, message.message)
					}
				} catch (error) {
					console.log(error);
				}
				io.emit('messages', await messages.find());
			});

			socket.emit('messages', await messages.find());
		} catch (error) {
			console.log(error);
		}
	});

	return io;
};
