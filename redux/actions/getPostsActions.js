//Action Types
import {postsAPI} from "../../api/api";

export const  GET_LATEST_POSTS = "GET_LATEST_POSTS"


//Action Creator
export const get_posts = (posts) => ({
    type: GET_LATEST_POSTS,
    posts: posts
})

export const getPosts = () => async dispatch => {

            const posts = await postsAPI.getPosts();
            return dispatch(get_posts(posts))

}