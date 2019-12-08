import { LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE } from './actions'

const initialState = {
  comments: [],
  commentsSummary: {}
}

export function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS_SUCCESS:

      let commentAspectArray = action.payload.map(comment => comment.commentAspect)

      let commentTypeArray = action.payload.map(comment => comment.commentType)

        


      return {
        comments: action.payload,
        commentsSummary: {
          total: action.payload.length,
          positive: (commentTypeArray.filter(type => type === true)).length,
          critical: (commentTypeArray.filter(type => type === false)).length,
          posture: (commentAspectArray.filter(aspect => aspect === "posture")).length,
          accuracy: (commentAspectArray.filter(aspect => aspect === "accuracy")).length,
          style: (commentAspectArray.filter(aspect => aspect === "style")).length,
          others: (commentAspectArray.filter(aspect => aspect !== "posture" && aspect !== "accuracy" && aspect !== "style")).length
        }
      }
    case LOAD_COMMENTS_FAILURE:
      return state;
    default:
      return state;
    }
  }