import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://apipassredux.herokuapp.com';
const apiAuth = axios.create({
	withCredentials: true,
});

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (body, { rejectWithValue }) => {
		try {
			const { data } = await apiAuth.post(`${URL}/api/auth/login`, body);
			return data;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
	await apiAuth.get(`${URL}/api/auth/logout`);
});

export const signupThunk = createAsyncThunk(
	'auth/signup',
	async (body, { rejectWithValue }) => {
		try {
			const { data } = await apiAuth.post(`${URL}/api/auth/signup`, body);
			return data;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const isLoggedThunk = createAsyncThunk(
	'auth/isLogged',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await apiAuth.get(`${URL}/api/auth/islogged`);

			return data;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

const initialState = {
	username: JSON.parse(localStorage.getItem('username')) || {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(isLoggedThunk.fulfilled, (state, action) => {
				return {
					...state,
					logged: action.payload.logged,
				};
			})
			.addCase(isLoggedThunk.rejected, (state, action) => {
				return {
					logged: action.payload.logged,
				};
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				return {
					username: action.payload.user,
					logged: action.payload.logged,
				};
			})
			.addCase(logoutThunk.fulfilled, (state, action) => {
				return {};
			});
	},
});

export default authSlice.reducer;
