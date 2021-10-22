import { types } from '../types/types';
import axios from 'axios';
import { finishLoading, setError, setSuccess, startLoading } from './uiAactions';

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

export const logout = () => {
	return {
		type: types.logout,
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
		try {
			dispatch(startLoading());
			const {
				data: { user, logged },
			} = await apiAuth.post(`${URL}/api/auth/login`, {
				username,
				password,
			});

			dispatch(login(user, logged));
			dispatch(finishLoading());
		} catch ({ response: { data } }) {
			dispatch(finishLoading());
			dispatch(setError(data.error));
		}
	};
};

export const logoutThunk = () => {
	return async (dispatch) => {
		await apiAuth.get(`${URL}/api/auth/logout`);

		dispatch(logout());
	};
};

export const signupThunk = (body) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());
			const {
				data: { msg },
			} = await apiAuth.post(`${URL}/api/auth/signup`, {
				...body,
			});
			dispatch(setSuccess(msg));
			dispatch(finishLoading());
		} catch ({ response: { data } }) {
			dispatch(finishLoading());
			dispatch(setError(data.error));
		}
	};
};

export const isLoggedThunk = () => {
	return async (dispatch) => {
		const {
			data: { logged },
		} = await apiAuth.get(`${URL}/api/auth/islogged`);

		dispatch(isLogged(logged));
	};
};
