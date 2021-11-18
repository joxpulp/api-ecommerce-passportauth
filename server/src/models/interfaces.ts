export interface Products {
	title: string;
	price: number;
	thumbnail: string;
}

export interface Messages {
	email: string;
	message: string;
	date: string;
	time: string;
}
export interface Args {
	id?: string;
	title?: string;
	thumbnail?: string;
	price?: number;
}

export interface User {
	_id: string;
	username: string;
	password: string;
	email: string;
	name: string;
	lastname: string;
	isValidPassword(password: string): Promise<boolean>
}

declare module 'express-session' {
	interface Session {
		loggedIn: boolean;
		messages: string;
	}
	
}
