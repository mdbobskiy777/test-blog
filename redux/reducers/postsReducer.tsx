import {ADD_POST_SUCCESS, CLEAN_POST, GET_LATEST_POSTS, GET_POST} from "../actions/getPostsActions";

export type CommentType = {
    id:number,
    postId:number,
    body:string
}
export type PostType = {
    id:number,
    title:string,
    body:string,
    comments?: Array<CommentType>
}
export type InitialStateType = {
    posts: Array<PostType> | null,
    post: PostType | null,
    addPostSuccess: boolean
}

const initialState: InitialStateType = {
    posts: null,
    post: null,
    addPostSuccess:false,
/*
    addCommentSuccess:false
*/
}

export type GetLatestPostsType = {
    type: typeof GET_LATEST_POSTS,
    posts: Array<PostType>
}
export type CleanPostType = {
    type: typeof CLEAN_POST
}
export type GetPostType = {
    type: typeof GET_POST,
    post: PostType
}
export type AddPostSuccess = {
    type: typeof ADD_POST_SUCCESS,
    addPostSuccess: boolean
}

export type ActionsType = GetLatestPostsType | GetPostType | AddPostSuccess | CleanPostType

function postsReducer(state = initialState, action: ActionsType) : InitialStateType {
    switch (action.type) {
        case GET_LATEST_POSTS:
            return {...state, posts: action.posts};
        case GET_POST:
            return {...state, post: action.post};
            case CLEAN_POST:
            return {...state, post: null};
        case ADD_POST_SUCCESS:
            return {...state, addPostSuccess: action.addPostSuccess};
   /*     case ADD_COMMENT_SUCCESS:
            return {...state, addCommentSuccess: action.addCommentSuccess};*/
        default:
            return state;
    }
}


export default postsReducer;
