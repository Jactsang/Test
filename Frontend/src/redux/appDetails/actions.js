import axios from 'axios';

export const LOAD_DETAILS_SUCCESS = "LOAD_DETAILS_SUCCESS"
export const LOAD_DETAILS_FAILURE = "LOAD_DETAILS_FAILURE"

export function loadDetailsSuccess(responseData) {
  return {
    type: LOAD_DETAILS_SUCCESS,
    details: responseData
  }
}

export function loadDetailsFailure(message) {
  return {
    type: LOAD_DETAILS_FAILURE,
    message: message
  }
}

let token = localStorage.getItem('token');

export function getPendingDetails(application_id) {
  return (dispatch) => {
    console.log('getting pending details')
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/jobDetails/pendingApplicationDetails`, {
      params: { id: application_id },
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => {
      if (response.data == null) {
        dispatch(loadDetailsFailure('No response.'))
      } else {
        dispatch(loadDetailsSuccess(response.data))
      }
    }).catch((e) => {
      console.log('Cant get application details.' + e)
    })
  }
}

export function getProcessedDetails(application_id) {
  return (dispatch) => {
    console.log('start getting processed details')
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/jobDetails/processedApplicationDetails`, {
      params: { id: application_id },
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => {
      if (response.data == null) {
        dispatch(loadDetailsFailure('No response.'))
      } else {
        dispatch(loadDetailsSuccess(response.data))
      }
    }).catch((e) => {
      console.log('Cant get application details.' + e)
    })
  }
}

export function processApplication(application_id, status) {
  return (dispatch) => {
    console.log('start processing')
    axios.put(`${process.env.REACT_APP_API_SERVER}/api/jobDetails/processApplication/${application_id}`,
      { id: application_id, status: status },
      { headers: { "Authorization": `Bearer ${token}` }
      }).then(() => {
        console.log('success!!')
      }).catch((e) => {
        console.log('Cant update application details.' + e)
      })
  }
}