import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import uiReducer  from '../reducers/uiReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		ui: uiReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
