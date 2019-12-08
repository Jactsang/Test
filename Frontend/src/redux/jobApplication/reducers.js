import { GET_CANDIDATE_DATA } from './actions'

const initialState = {
  candidateInfo: []
}

export function jobApplicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CANDIDATE_DATA:
      return {
        candidateInfo: action.candidateInfo
      }
    default:
      return state;
    }
}