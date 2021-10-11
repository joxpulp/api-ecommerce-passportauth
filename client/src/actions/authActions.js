import { types } from "../types/types"

export const loginAuth = (username, password) => {
    return {
        type: types.login,
        payload: {
            username,
            password
        }
    }
}

