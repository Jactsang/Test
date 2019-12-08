import axios from 'axios';

export const GET_CANDIDATE_DATA = "GET_CANDIDATE_DATA";
 
export function loadCandidateData(payload){
    return {
        type: GET_CANDIDATE_DATA,
        candidateInfo: payload
    }
}

export function getProcessedCandidate(){
    return (dispatch) => {
        // console.log('start getting candidate info')
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/admin/processedjobs`)
        .then(res => {
            // console.log('candidate info: ', res.data)
            dispatch(loadCandidateData(res.data));
        });
    };
}

export function getPendingCandidate(){
    return (dispatch) => {
        console.log('start getting candidate info')
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/admin/pendingjobs`)
        .then(res => {
            dispatch(loadCandidateData(res.data));
        });
    };
}

