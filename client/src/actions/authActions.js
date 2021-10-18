import { types } from '../types/types';
import axios from 'axios';

const URL = 'http://localhost:8080';
const apiAuth = axios.create({
	withCredentials: true,
});

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

export const loginAuth = (username, password) => {
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
