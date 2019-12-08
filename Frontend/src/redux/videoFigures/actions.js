import axios from 'axios';

export const GET_VID_DATA = "GET_VID_DATA";
export const GET_LAST_VID_COMMENTED_DATA = "GET_LAST_VID_COMMENTED_DATA";
export const GET_LAST_VID_UPLOADED_DATA = "GET_LAST_VID_UPLOADED_DATA";
export const GET_COMMENT_ASPECT_DATA = "GET_COMMENT_ASPECT_DATA";
export const GET_WEAKEST_ASPECT = "GET_WEAKEST_ASPECT";
 
export function loadVideoData(payload){
    return {
        type: GET_VID_DATA,
        videoData: payload
    }
}

export function loadlastVideoUploadedData(payload){
    return {
        type: GET_LAST_VID_UPLOADED_DATA,
        lastVideoUploadedData: payload
    }
}

export function loadlastVideoCommentedData(payload){
    return {
        type: GET_LAST_VID_COMMENTED_DATA,
        lastVideoCommentedData: payload
    }
}

export function loadCommentAspect(payload){
    return{
        type: GET_COMMENT_ASPECT_DATA,
        commentAspect: payload
    }
}

export function getVideoData(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/videoFigures`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            dispatch(loadVideoData(res.data));
        });
    };
}

export function getlastVideoUploadedData(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/videoFigures/lastVideoUploaded`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            dispatch(loadlastVideoUploadedData(res.data));
        });
    };
}

export function getlastVideoCommentedData(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/videoFigures/lastVideoCommented`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            dispatch(loadlastVideoCommentedData(res.data));
        });
    };
}

export function getCommentAspect(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/videoFigures/commentAspect`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            dispatch(loadCommentAspect(res.data));
        });
    };
}

export function sendWeakestAspect(payload){
    return {
        type: GET_WEAKEST_ASPECT,
        weakestAspect: payload
    }
}