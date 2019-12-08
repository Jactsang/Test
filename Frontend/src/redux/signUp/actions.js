import axios from 'axios';

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_FAILURE = "SIGNUP_FAILURE"

function signUpSuccess (){
    return {
        type: SIGNUP_SUCCESS
    }
}

function signUpFailure () {
    return {
        type: SIGNUP_FAILURE
    }
}

export function signUpAction(
        name,
        email,
        password, 
        signUpType, 
        firstName,
        lastName,
        summary,
        experience,
        educationAndCertificate,
        instrument1,
        skillLevel1,
        instrument2,
        skillLevel2,
        instrument3,
        skillLevel3,
        languageEnglish,
        languageMandarin,
        languageCantonese,
        referral,
        upload1,
        upload2,
        upload3
    ){

    if(signUpType === 'student'){
        return(dispatch)=>{

            return axios.post(`${process.env.REACT_APP_API_SERVER}/api/signup/student`, {
                name: name,
                email: email,
                password: password
            })
            .then(response => {
                // The back-end will return 'The email exists', if the email already exists
                if(response.data === 'The email exists'){
                    dispatch(signUpFailure())
                } else {
                    dispatch(signUpSuccess())
                }
            }).catch(err => console.log("Error: ", err))
        }
    }

    if(signUpType === 'expert'){
        return(dispatch)=>{

            return axios.post(`${process.env.REACT_APP_API_SERVER}/api/signup/expert`, {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                summary: summary,
                experience: experience,
                educationAndCertificate: educationAndCertificate,
                instrument1: instrument1,
                skillLevel1: skillLevel1,
                instrument2: instrument2,
                skillLevel2: skillLevel2,
                instrument3: instrument3,
                skillLevel3: skillLevel3,
                languageEnglish: languageEnglish,
                languageMandarin: languageMandarin,
                languageCantonese: languageCantonese,
                referral: referral,
                upload1: upload1,
                upload2: upload2,
                upload3: upload3
            })
            .then(response => {
                // The back-end will return 'The email exists', if the email already exists
                if(response.data === 'The email exists'){
                    dispatch(signUpFailure())
                } else {
                    dispatch(signUpSuccess())
                }
            }).catch(err => console.log("Error: ", err))
        }
    }

    if(signUpType === 'admin'){
        return(dispatch)=>{

            return axios.post(`${process.env.REACT_APP_API_SERVER}/api/signup/admin`, {
                email: email,
                password: password
            })
            .then(response => {
                // The back-end will return 'The email exists', if the email already exists
                if(response.data === 'The email exists'){
                    dispatch(signUpFailure())
                } else {
                    dispatch(signUpSuccess())
                }
            }).catch(err => console.log("Error: ", err))
        }
    }



}

// Add expertSignUp & adminSignUp Here
