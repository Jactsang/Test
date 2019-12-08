import axios from 'axios';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

function loginSuccess (userType){
    return {
        type: LOGIN_SUCCESS,
        userType: userType
    }
}

function loginFailure (message) {
    return {
        type: LOGIN_FAILURE,
        message: message
    }
}

export function loginUser(email, password){
    return(dispatch)=>{
        return axios.post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
            email: email,
            password: password

        }).then(response => {

          console.log(response,'action response')

            if(response.data === 'Wrong Email or Password'){
                dispatch(loginFailure())
            } else if (!response.data.token) {
                dispatch(loginFailure(response.data.message || 'No Token!'))
            } else {
              // You will receive the token after POST.

              // Save token, userID and UserType on browser. Therefore, you wont log out when you refresh the page
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userID', response.data.userID)

                let userType
                // Check if students column in DB = true, save 'student' as UserType in localStorage
                if(response.data.studentUserType === true) {
                  localStorage.setItem('userType', 'student');
                  userType = 'student';
                }
                if(response.data.expertUserType === true) {
                  localStorage.setItem('userType', 'expert')
                  userType = 'expert';
                }
                if(response.data.adminUserType === true) {
                  localStorage.setItem('userType', 'admin')
                  userType = 'admin';
                }

                if(response.data.jobApplicationPendingUserType === true) {
                  localStorage.setItem('userType', 'jobPending')
                  userType = 'jobPending';
                }

                dispatch(loginSuccess(userType))
            }
        }).catch(err => console.log("Error: ", err))
    }
}

export function loginFacebook(accessToken) {
    return (dispatch) => {
      return axios
        .post(
          `${process.env.REACT_APP_API_SERVER}/api/login/facebook`,
          {
            access_token: accessToken
          }
        )
        .then(response => {
          if (response.data == null) {
            dispatch(loginFailure('Unknown Error'));
          } else if (!response.data.token) {
     
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginFailure(response.data.message || ''));
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.data.token);
            // Dispatch the success action
            dispatch(loginSuccess());
          }
        })
        .catch(err => console.log('Error: ', err));
    };
  }

  export const LOGOUT_NOW = 'LOGOUT_NOW';

  export function logoutSuccess() {
    return {
      type: LOGOUT_NOW
    }
  }
  export function logoutNow() {
    return (dispatch) => {
      localStorage.clear('token');
      localStorage.clear('userID');
      localStorage.clear('userType');
      dispatch(logoutSuccess())
    }
  }


