import { types } from '../types/types';
import axios from 'axios';

const URL = 'http://localhost:8080';
const apiAuth = axios.create({
	withCredentials: true,
});

//* AUTH ACTION CREATORS SYNCRONOUS 
export const login = (username, logged) => {
	return {
		type: types.login,
		payload: {
			username,
			logged,
		},
	};
};

export const logout = (logged) => {
	return {
		type: types.logout,
		payload: {
			logged,
		},
	};
};

export const isLogged = (logged) => {
	return {
		type: types.isLogged,
		payload: {
			logged,
		},
	};
};

//* AUTH ACTION CREATORS ASYNC
export const loginThunk = (username, password) => {
	return async (dispatch) => {
		const loginData = await apiAuth.post(`${URL}/api/auth/login`, { username, password });

		dispatch(login(loginData.data.user, loginData.data.logged));
	};
};

export const logoutThunk = () => {
	return async (dispatch) => {
		const loginData = await apiAuth.get(`${URL}/api/auth/logout`);

		dispatch(logout(loginData.data.logged));
	};
};

export const isLoggedThunk = () => {
	return async (dispatch) => {
		const loginData = await apiAuth.get(`${URL}/api/auth/islogged`)

		dispatch(isLogged(loginData.data.logged));
	};
};