import { LOAD_DETAILS_SUCCESS, LOAD_DETAILS_FAILURE } from './actions'

const initialState = {
  details: []
}

export function appDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DETAILS_SUCCESS:
      return {
        details: action.details
        // details: state.details.concat([action.details])
      }
    case LOAD_DETAILS_FAILURE:
      return state;
    default:
      return state;
    }
  }