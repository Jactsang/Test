import { LOAD_VIDEOS_SUCCESS, LOAD_VIDEOS_FAILURE } from './actions'

const initialState = {
    videosList: [],
    chosenVideoInfo: {},
    link: ''
}

export function videosListReducer (state = initialState, action){
    switch(action.type){
        case LOAD_VIDEOS_SUCCESS:
          return{
              ...state,
              videosList: action.videosList
          }
        case LOAD_VIDEOS_FAILURE:
          return state;
      
        default: 
        return state;
    }
}