import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { signUpReducer as SignUpReducer } from './signUp/reducers'
import { authReducer as AuthReducer } from "./auth/reducers";
import { videosListReducer as VideosListReducer } from "./videosList/reducers";
import { commentsReducer as CommentsReducer } from "./comments/reducers";
import { vidUploadReducer as VidUploadReducer } from "./videoUpload/reducers";
import { vidFiguresReducer as VidFiguresReducer } from "./videoFigures/reducers";
import { ratingReducer as RatingReducer } from "./rating/reducers";
import { earnFiguresReducer as EarnFiguresReducer } from "./earningFigures/reducers";
import { jobApplicationReducer as JobApplicationReducer } from "./jobApplication/reducers";
import { appDetailsReducer as AppDetailsReducer} from './appDetails/reducers'
import { subscriptionReducer as SubscriptionReducer } from './subscription/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    comments: CommentsReducer,
    signUp: SignUpReducer,
    videosList: VideosListReducer,
    vidUploadStore: VidUploadReducer,
    vidFiguresStore: VidFiguresReducer,
    rating: RatingReducer,
    detailsStore: AppDetailsReducer,
    earnFiguresStore: EarnFiguresReducer,
    jobApplicationStore: JobApplicationReducer,
    subscriptionStore: SubscriptionReducer
  }),
  composeEnhancers(applyMiddleware(thunk, logger))
);
