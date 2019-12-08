import axios from 'axios';

export const LOAD_VIDEOS_SUCCESS = "LOAD_VIDEOS_SUCCESS"
export const LOAD_VIDEOS_FAILURE = "LOAD_VIDEOS_FAILURE"

function loadVideosSuccess (videos){
    return {
        type: LOAD_VIDEOS_SUCCESS,
        videosList: videos
    }
}

function loadVideosFailure (message){
    return {
        type: LOAD_VIDEOS_FAILURE,
        message: message
    }
}
 
export function getVideos(){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_SERVER}/api/videosList`, 
        { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            if(response.data == null){
                dispatch(loadVideosFailure('No response data.'))
            } else {
                dispatch(loadVideosSuccess(response.data))
            }
        })
    }
}

export function listVideoSearch(search){
    let token = localStorage.getItem('token');
    let userType = localStorage.getItem('userType');
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_SERVER}/api/videosList?search=${search}`, 
        { params: {
            userType: userType
        },
            headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            if(response.data == null){
                dispatch(loadVideosFailure('No response data.'))
            } else {
                dispatch(loadVideosSuccess(response.data))
            }
        })
    }
}
