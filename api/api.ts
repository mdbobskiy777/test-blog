import  axios from "axios"
import {CommentType, PostType} from "../redux/reducers/postsReducer";


type PostsAPIMyType = Array<PostType>
type PostsAPIGetPostType = PostType
type PostsAPICreateCommentType = CommentType
type PostsAPICreatePostType = PostType
type PostsAIPDeletePostType = {}
const instance = axios.create({
    baseURL: `https://simple-blog-api.crew.red/`,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postsAPI = {
    getPosts() {
        return instance.get<PostsAPIMyType>('posts')
            .then(res => res.data)
    },
    getPost(id:number) {
        return instance.get<PostsAPIGetPostType>(`posts/${id}?_embed=comments`).then(res => res.data)
    },
    createComment(id:number, text:string) {
        const raw = {
            postId: id,
            body: text
        }
        return instance.post<PostsAPICreateCommentType>(`comments`,raw )
    },
    createPost(title:string, body:string){
        return instance.post<PostsAPICreatePostType>(`posts`,{
            title,
            body
        }).then(res=>res.data)
    },
    deletePost(id:number){
        return instance.delete<PostsAIPDeletePostType>(`posts/${id}`)
    },
    updatePost(id:number,title:string, body:string){
        return instance.put<PostType>(`posts/${id}`, {
            title,
            body
        })
    }

}
