import {combineReducers} from 'redux';
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
    latestPosts: postsReducer
});

export default rootReducer;
