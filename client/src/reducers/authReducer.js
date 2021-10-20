import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				username: action.payload.username,
				logged: action.payload.logged,
			};

		case types.logout:
			return { ...state, logged: action.payload.logged };

		case types.isLogged:
			return {...state, logged: action.payload.logged}

		default:
			return state;
	}
};
