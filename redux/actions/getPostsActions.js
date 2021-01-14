import {postsAPI} from "../../api/api";

export const  GET_LATEST_POSTS = "GET_LATEST_POSTS"
export const  GET_POST = "GET_POST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"

//Action Creator
export const get_posts = (posts) => ({
    type: GET_LATEST_POSTS,
    posts: posts,
})
export const get_post = (post) => ({
    type: GET_POST,
    post: post,
})
export const add_post_success = (isAdd) => ({
    type: ADD_POST_SUCCESS,
    addPostSuccess:isAdd
})

/*export const add_comment_success = (isAdd) => ({
    type: ADD_COMMENT_SUCCESS,
    addCommentSuccess:isAdd
})*/
export const addPost = (title, body) => async dispatch => {

    const responce = await postsAPI.createPost(title, body);
    if(responce){
         dispatch(add_post_success(true))
    }

}

export const deletePost = (id) => async dispatch => {
    await postsAPI.deletePost(id);
    return dispatch(getPosts())

}

export const addComment = (id, text) => async dispatch => {

    const responce = await postsAPI.createComment(id, text);
    /*   if(responce){
           dispatch(add_comment_success(true))
       }*/

}

export const getPosts = () => async dispatch => {

            const posts = await postsAPI.getPosts();
            return dispatch(get_posts(posts))

}
export const getPost = (id) => async dispatch => {

    const post = await postsAPI.getPost(id);
    return dispatch(get_post(post))

}