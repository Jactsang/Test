import axios from "axios";

export const GET_EARNING_FIGURES = "GET_EARNING_FIGURES";

export function loadEarningData(payload) {
  return {
    type: GET_EARNING_FIGURES,
    vidTotalNumber: payload.numOfVids,
    vidTotalDuration: payload.durationOfVids,
    lastVideoPost: payload.lastVideoPost,
    lastVideoComment: payload.lastVideoComment
  };
}

export function getEarningData() {
  let token = localStorage.getItem("token");
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/earningFigures`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        dispatch(loadEarningData(res.data));
      });
  };
}
