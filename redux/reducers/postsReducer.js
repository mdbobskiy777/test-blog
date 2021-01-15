import {ADD_COMMENT_SUCCESS, ADD_POST_SUCCESS, GET_LATEST_POSTS, GET_POST} from "../actions/getPostsActions";

const initialState = {
    posts: null,
    post: null,
    addPostSuccess:false,
/*
    addCommentSuccess:false
*/
}

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LATEST_POSTS:
            return {...state, posts: action.posts};
        case GET_POST:
            return {...state, post: action.post};
        case ADD_POST_SUCCESS:
            return {...state, addPostSuccess: action.addPostSuccess};
   /*     case ADD_COMMENT_SUCCESS:
            return {...state, addCommentSuccess: action.addCommentSuccess};*/
        default:
            return state;
    }
}


export default postsReducer;
