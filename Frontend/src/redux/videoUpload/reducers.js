import { ADD_VID_ACTION,
    STORE_THUMBNAIL_URL_ACTION,
    STORE_VIDEO_URL_ACTION,
    STORE_VIDEO_DURATION_ACTION,
    STORE_SCORESHEET_URL_ACTION
     } from './actions';

const initialState = {
vidInfo : [],
videoURL: '',
thumbnailURL: '',
videoDuration: 0,
scoresheetURL: ''
}

export function vidUploadReducer (state = initialState, action){
switch(action.type){
    case ADD_VID_ACTION:
        return{
            ...state,
            vidInfo: state.vidInfo.concat([action.vidInfo])
        }
    case STORE_THUMBNAIL_URL_ACTION:
        return{
            ...state,
            thumbnailURL: action.thumbnailURL
        }
    case STORE_VIDEO_URL_ACTION:
            return{
                ...state,
                videoURL: action.videoURL
        }
    case STORE_VIDEO_DURATION_ACTION:
            return{
                ...state,
                videoDuration: action.videoDuration
        }
    case STORE_SCORESHEET_URL_ACTION:
            return{
                ...state,
                scoresheetURL: action.scoresheetURL
        }
    default: 
    return state;
}
}