//Action Types
import {postsAPI} from "../../api/api";

export const  GET_LATEST_POSTS = "GET_LATEST_POSTS"
export const  GET_POST = "GET_POST"


//Action Creator
export const get_posts = (posts) => ({
    type: GET_LATEST_POSTS,
    posts: posts,
})
export const get_post = (post) => ({
    type: GET_POST,
    post: post,
})

export const getPosts = () => async dispatch => {

            const posts = await postsAPI.getPosts();
            return dispatch(get_posts(posts))

}
export const getPost = (id) => async dispatch => {

    const post = await postsAPI.getPost(id);
    return dispatch(get_post(post))

}