import axios from 'axios';

export const LOAD_RATING_SUCCESS = "LOAD_RATING_SUCCESS"

let token = localStorage.getItem('token');

function loadRatingSuccess (rating){
    return {
        type: LOAD_RATING_SUCCESS,
        rating: rating
    }
}

export function resetRatingSuccess(url) {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/rating`, {
      rating: 0,
      url: url
    },
      { headers: { "Authorization": `Bearer ${token}` } }
    ).then(response => {
      if (response.data == null) {
        console.log('No response data.')
      } else {
        dispatch(loadRatingSuccess(response.data))
      }
    })
  }
}


export function getRating(url) { 
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_SERVER}/api/rating`, {
        params: {
          url: url},
        headers: {"Authorization": `Bearer ${token}`}
      }).then(response => {
      if (response.data == null) {
         console.log('No response data.')
      } else {
        dispatch(loadRatingSuccess(response.data))
      }
      }).catch((e) => {
        console.log(e)
    })
  }
}
 
export function addRating(rating, url){
    return (dispatch) => {
        return axios.post(`${process.env.REACT_APP_API_SERVER}/api/rating`, {
          rating: rating,
          url: url}, 
        {headers: {"Authorization": `Bearer ${token}`}}
        ).then(response => {
            if(response.data == null){
                console.log('No response data.')
            } else {
                dispatch(loadRatingSuccess(response.data))
            }
        })
    }
}
