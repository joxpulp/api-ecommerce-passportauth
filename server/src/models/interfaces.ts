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

export interface User {
	_id: string;
	username: string;
	password: string;
	email: string;
	name: string;
	lastname: string;
	isValidPassword(password: string): Promise<boolean>
}

export interface ReqUser {
	_id?: string;
	displayName?: string;
	photos?: object[];
}


declare module 'express-session' {
	interface Session {
		loggedIn: boolean;
		messages: string;
	}
	
}
