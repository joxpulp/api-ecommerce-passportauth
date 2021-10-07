import { Request, Response } from 'express';
import { messages } from '../models/messageschema';

class MessageController {
	async getMessages(req: Request, res: Response) {
		try {
			const getMessages = await messages.find();

			if (!getMessages.length)
				return res.status(404).json({ error: 'No hay mensajes cargados' });

			return res.json({ messages: getMessages });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
	async addMessage(req: Request, res: Response) {
		try {
			const { email, message, date, time } = req.body;

			if (!email || !message || !date || !time)
				return res.status(404).json({ error: 'Body invalido' });

			const msg = new messages({ email, message, date, time });
			const newMessage = await msg.save();

			return res.json({ message: newMessage });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
}

export const messageController = new MessageController();
