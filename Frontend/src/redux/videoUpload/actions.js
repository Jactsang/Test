import axios from 'axios';

export const ADD_VID_ACTION = 'ADD_VID_ACTION';
export const STORE_THUMBNAIL_URL_ACTION = 'STORE_THUMBNAIL_URL_ACTION';
export const STORE_VIDEO_URL_ACTION = 'STORE_VIDEO_URL_ACTION';
export const STORE_VIDEO_DURATION_ACTION = 'STORE_VIDEO_DURATION_ACTION';
export const STORE_SCORESHEET_URL_ACTION = 'STORE_SCORESHEET_URL_ACTION';

export function addVid(payload){
    return {
        type: ADD_VID_ACTION,
        vidInfo: payload
    }
};

export function uploadVid(payload){
    let userId = localStorage.getItem('userID');
    console.log('!!!!!!!', userId)
    return (dispatch) => {
        return axios.post(`${process.env.REACT_APP_API_SERVER}/api/videosUploaded`, {
            payload: payload,
            id: userId
        })
        .then(res => {
            dispatch(addVid(payload));
        });
    }
}

export function sendThumbnail(payload){
    return{
        type: STORE_THUMBNAIL_URL_ACTION,
        thumbnailURL: payload
    }
}

export function sendVidURL(payload){
    return{
        type: STORE_VIDEO_URL_ACTION,
        videoURL: payload
    }
}

export function sendVidDuration(payload){
    return{
        type: STORE_VIDEO_DURATION_ACTION,
        videoDuration: payload
    }
}

export function sendScoresheetURL(payload){
    return{
        type: STORE_SCORESHEET_URL_ACTION,
        scoresheetURL: payload
    }
}