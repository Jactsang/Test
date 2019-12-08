import axios from 'axios';
export const LOAD_SUBSCRIPTION_DATA = "LOAD_SUBSCRIPTION_DATA"

function loadSubscriptionData (payload){
    console.log('payload[0].subscribed_at ', payload[0].subscribed_at)
    return {
        type: LOAD_SUBSCRIPTION_DATA,
        first_name: payload[0].first_name,
        subscribed: payload[0].subscribed,
        subscription_date: payload[0].subscribed_at,
        expiry_date: payload[0].expiry_date,
        quota_left: payload[0].quota_increased
    }
}

export function getSubscriptionData(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        console.log('getting subscription data...')
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/subscription`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            console.log('got the subscription data!', res.data)
            dispatch(loadSubscriptionData(res.data));
        });
    };
}
