import { GET_VID_DATA, GET_LAST_VID_COMMENTED_DATA, GET_LAST_VID_UPLOADED_DATA, GET_COMMENT_ASPECT_DATA, GET_WEAKEST_ASPECT } from './actions';

// grab initial state from the backend?

const initialState = {
    videoData: [],
    lastVideoCommentedData: [],
    lastVideoUploadedData: [],
    commentAspect: [],
    weakestAspect: ''
}


export function vidFiguresReducer(state = initialState, action){
    switch(action.type){
        case GET_VID_DATA:
            return {
                ...state,
                videoData: action.videoData
            }
        case GET_LAST_VID_COMMENTED_DATA:
            return {
                ...state,
                lastVideoCommentedData: action.lastVideoCommentedData
            }
        case GET_LAST_VID_UPLOADED_DATA:
            return {
                ...state,
                lastVideoUploadedData: action.lastVideoUploadedData
            }
        case GET_COMMENT_ASPECT_DATA:
            return{
                ...state,
                commentAspect: action.commentAspect
            }
        case GET_WEAKEST_ASPECT:
            return{
                ...state,
                weakestAspect: action.weakestAspect
            }
        default: 
        return state;
    }
}