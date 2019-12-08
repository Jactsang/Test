import { LOAD_SUBSCRIPTION_DATA } from './actions';

const initialState = {
    first_name: '',
    subscribed: null,
    subscription_date: '',
    expiry_date: '',
    quota_left: 0
}

export function subscriptionReducer(state = initialState, action){
    switch(action.type){
        case LOAD_SUBSCRIPTION_DATA:
            return {
                ...state,
                subscribed: action.subscribed,
                subscription_date: action.subscription_date,
                expiry_date: action.expiry_date,
                quota_left: action.quota_left,
                first_name: action.first_name
            }
        default: 
        return state;
    }
}