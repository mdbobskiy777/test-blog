import {GET_LATEST_POSTS} from "../actions/getPostsActions";

const initialState = {
    posts: []
}
function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LATEST_POSTS:
            return {...state, posts: action.posts};
        default:
            return state;
    }
};


export default postsReducer;
