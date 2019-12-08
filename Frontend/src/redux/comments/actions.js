import axios from 'axios';

export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS"
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE"
export const UPDATE_COMMENT = "UPDATE_COMMENT"


export function loadCommentsSuccess(responseData) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    payload: responseData
  }
}

export function loadCommentsFailure(message) {
  return {
    type: LOAD_COMMENTS_FAILURE,
    message: message
  }
}


let token = localStorage.getItem('token');
let userType = localStorage.getItem('userType');


export function getComments(currentVideoLink) { 
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_SERVER}/api/commentsList/`, {
        params: {
          link: currentVideoLink,
          userType: userType},
        headers: {"Authorization": `Bearer ${token}`}
      }).then(response => {
      if (response.data == null) {
        dispatch(loadCommentsFailure('No response data.'))
      } else {
        dispatch(loadCommentsSuccess(response.data))
      }
      }).catch((e) => {
        console.log(e)
    })
  }
}

export function addComment(commentState) {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/commentsList`, {
      comment: commentState,
      userType: userType}, 
      {headers: {"Authorization": `Bearer ${token}`}}
      ).then(response => {
      if (response.data == null) {
        dispatch(loadCommentsFailure('No response data.'))
      } else {
        dispatch(loadCommentsSuccess(response.data))
      }
    })
  }
}


export function updateCommentOnChange(selectedComment) {
  return (dispatch) => {
    return axios.put(`${process.env.REACT_APP_API_SERVER}/api/commentsList/${selectedComment.id}`,{
      selectedComment: selectedComment,
      userType: userType
      },
      {
      headers: {"Authorization": `Bearer ${token}`}
      }).then(response => {
      if (response.data == null) {
        dispatch(loadCommentsFailure('No response data.'))
      } else {
        dispatch(loadCommentsSuccess(response.data))
      }
    })
  }
}


export function deleteComment(commentState) {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_API_SERVER}/api/commentsList/${commentState.id}`, {
      headers: {"Authorization": `Bearer ${token}`},
      data: {commentState: commentState,
      userType: userType}
      }).then(response => {
      if (response.data == null) {
        dispatch(loadCommentsFailure('No response data.'))
      } else {
        dispatch(loadCommentsSuccess(response.data))
      }
    })
  }
}