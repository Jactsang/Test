import { LOAD_RATING_SUCCESS } from './actions'

const initialState = {
  rating: 0
}

export function ratingReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RATING_SUCCESS:
      return {
        rating: action.rating
      }
    default:
      return state;
    }
  }