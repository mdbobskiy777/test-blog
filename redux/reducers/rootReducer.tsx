import {combineReducers} from 'redux';
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
    latestPosts: postsReducer
});
type ReducerType = typeof rootReducer
export type AppStoreType = ReturnType<ReducerType>
export default rootReducer;
