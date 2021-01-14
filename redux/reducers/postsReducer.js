import {GET_LATEST_POSTS, GET_POST} from "../actions/getPostsActions";

const initialState = {
    posts: [],
    post:{}
}
function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LATEST_POSTS:
            return {...state, posts: action.posts};
            case GET_POST:
            return {...state, post: action.post};
        default:
            return state;
    }
};


export default postsReducer;
