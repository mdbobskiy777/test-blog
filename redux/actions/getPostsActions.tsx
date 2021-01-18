import {postsAPI} from "../../api/api";
import {
    ActionsType,
    AddPostSuccess, CleanPostType,
    GetLatestPostsType,
    GetPostType,
    PostType
} from "../reducers/postsReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reducers/rootReducer";

export const GET_LATEST_POSTS = "GET_LATEST_POSTS"
export const GET_POST = "GET_POST"
export const CLEAN_POST = "CLEAN_POST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"

//Action Creator
export const get_posts = (posts: Array<PostType>): GetLatestPostsType => ({
    type: GET_LATEST_POSTS,
    posts: posts,
})
export const clean_post = (): CleanPostType => ({
    type: CLEAN_POST
})
export const get_post = (post: PostType): GetPostType => ({
    type: GET_POST,
    post: post,
})
export const add_post_success = (isAdd: boolean): AddPostSuccess => ({
    type: ADD_POST_SUCCESS,
    addPostSuccess: isAdd
})


export const addPost = (title: string, body: string): ThunkAction<Promise<void>, AppStateType, undefined, ActionsType> =>
    async (dispatch) => {

        const response = await postsAPI.createPost(title, body);
        if (response) {
            dispatch(add_post_success(true))
        }

    }

export const deletePost = (id: number): ThunkAction<Promise<void>, AppStateType, undefined, ActionsType> =>
    async dispatch => {
        await postsAPI.deletePost(id);
        return dispatch(getPosts())

    }

export const addComment = (id: number, text: string): ThunkAction<Promise<void>, AppStateType, undefined, ActionsType> =>
    async (dispatch) => {
        await postsAPI.createComment(id, text);
        await dispatch(getPost(id))
    }

export const getPosts = (): ThunkAction<Promise<void>, AppStateType, undefined, ActionsType> =>
    async (dispatch) => {
        const posts = await postsAPI.getPosts();
        dispatch(get_posts(posts))
    }
export const getPost = (id: number): ThunkAction<Promise<void>, AppStateType, undefined, ActionsType> =>
    async (dispatch) => {

        const post = await postsAPI.getPost(id);
        dispatch(get_post(post))
    }
