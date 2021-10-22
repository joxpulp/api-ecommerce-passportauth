import { types } from '../types/types';

export const setError = (err) => {
	return {
		type: types.uiSetError,
		payload: err,
	};
};

export const removeError = () => {
	return {
		type: types.uiRemoveError,
	};
};

export const setSuccess = (msg) => {
	return {
		type: types.uiSetSuccess,
		payload: msg
	}
}

export const removeSuccess = () => {
	return {
		type: types.uiRemoveSuccess,
	}
}

export const startLoading = () => {
	return {
		type: types.uiStartLoading,
	}
}

export const finishLoading = () => {
	return {
		type: types.uiFinishLoading,
	}
}

export const setLogoutMessage = () => {
	return {
		type: types.uiSetLogoutMessage
	}
}
export const removeLogoutMessage = () => {
	return {
		type: types.uiRemoveLogoutMessage
	}
}
