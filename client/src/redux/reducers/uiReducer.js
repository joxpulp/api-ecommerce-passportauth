import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, signupThunk } from './authReducer';

const initialState = {
	loading: false,
	logoutMessage: false,
	msgError: null,
	msgSuccess: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setLogoutMessage(state, action) {
			return {
				...state,
				logoutMessage: true
			}
		},
		removeLogoutMessage(state, action) {
			return {
				...state,
				logoutMessage: false
			}
		},
		removeError(state, action) {
			return {
				...state,
				msgError: null,
			};
		},
		removeSuccess(state, action) {
			return {
				...state,
				msgSuccess: null,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state, action) => {
				return {
					...state,
					loading: true,
				};
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				return {
					...state,
					loading: false,
				};
			})
			.addCase(loginThunk.rejected, (state, action) => {
				return {
					...state,
					msgError: action.payload.error,
					loading: false,
				};
			})
			.addCase(signupThunk.pending, (state, action) => {
				return {
					...state,
					loading: true
				}
			})
			.addCase(signupThunk.fulfilled, (state, action) => {
				return {
					...state,
					loading: false,
					msgSuccess: action.payload.msg,
				};
			})
			.addCase(signupThunk.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					msgError: action.payload.error,
				};
			});
	},
});

export const { setLogoutMessage, removeLogoutMessage, removeError, removeSuccess } = uiSlice.actions;
export default uiSlice.reducer;
