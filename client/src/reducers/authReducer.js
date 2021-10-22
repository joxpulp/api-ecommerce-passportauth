import { types } from '../types/types';

export const authReducer = (
	state = { username: JSON.parse(localStorage.getItem('username')) } || {},
	action
) => {
	switch (action.type) {
		case types.login:
			return {
				username: action.payload.username,
				logged: action.payload.logged,
			};

		case types.logout:
			return {};

		case types.isLogged:
			return { ...state, logged: action.payload.logged };

		default:
			return state;
	}
};
