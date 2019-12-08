import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_NOW } from './actions';

// This sets default isAuthenticated: false
const initialState = {
    isAuthenticated: localStorage.getItem('token') !== null || false
}

export function authReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            
            return  {
                // This is the auth state in store
                isAuthenticated: true,
                userType: action.userType
            }
        case LOGIN_FAILURE:
            return  {
                isAuthenticated: false,
                loginErrorMessage: 'Wrong Email or Password'
            }

        case LOGOUT_NOW:
            return Object.assign({}, state, {
                isAuthenticated: false
            });

        default:
            return state;
    }
}


