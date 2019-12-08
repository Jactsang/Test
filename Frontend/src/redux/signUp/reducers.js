import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actions';

const initialState = {
    isSignUped: false
}

export function signUpReducer(state = initialState, action) {

    switch (action.type) {
        case SIGNUP_SUCCESS:
            return  {
                isSignUped: true
            }
        case SIGNUP_FAILURE:
            return  {
                isSignUped: false,
                signUpErrorMessage: 'The email exists'
            }
        default:
            return state;
    }
}


