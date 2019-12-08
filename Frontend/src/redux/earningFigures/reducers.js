import { GET_EARNING_FIGURES } from "./actions";

// grab initial state from the backend?

const initialState = {
  vidTotalNumber: 0,
  vidTotalDuration: 0,
  lastVideoPost: [],
  lastVideoComment: []
};

export function earnFiguresReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EARNING_FIGURES:
      return {
        ...state,
        vidTotalNumber: action.vidTotalNumber,
        vidTotalDuration: action.vidTotalDuration,
        lastVideoPost: state.lastVideoPost.concat(action.lastVideoPost),
        lastVideoComment: state.lastVideoComment.concat(action.lastVideoComment)
      };
    default:
      return state;
  }
}
