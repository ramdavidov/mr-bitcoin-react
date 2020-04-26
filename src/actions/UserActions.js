import { UserService } from '../services/UserService'

// SET
export function signup(newUser) {
    return async dispatch => {
        const user = await UserService.signup(newUser);
        dispatch({ type: 'SET_USER', user })
    }
}

// GET
export function getUser() {
    return async dispatch => {
        const user = await UserService.getUser();
        dispatch({ type: 'GET_USER', user })
    }
}

// ADD_MOVE
export function addMove(contact, amount) {
    return async dispatch => {
        const user = await UserService.addMove(contact, amount);
        dispatch({ type: 'SET_USER', user })
    }
}





