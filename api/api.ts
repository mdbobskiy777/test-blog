import  axios from "axios"
import {CommentType, PostType} from "../redux/reducers/postsReducer";


type PostsAPIMyType = Array<PostType>
type PostsAPIGetPostType = PostType
type PostsAPICreateCommentType = CommentType
type PostsAPICreatePostType = PostType

type PostsAPIDeletePostType = Record<string, never>

const instance = axios.create({
    baseURL: `https://simple-blog-api.crew.red/`,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postsAPI = {
    getPosts():Promise<PostsAPIMyType> {
        return instance.get<PostsAPIMyType>('posts')
            .then(res => res.data)
    },
    getPost(id:number):Promise<PostType> {
        return instance.get<PostsAPIGetPostType>(`posts/${id}?_embed=comments`).then(res => res.data)
    },
    createComment(id:number, text:string):Promise<any> {
        const raw = {
            postId: id,
            body: text
        }
        return instance.post<PostsAPICreateCommentType>(`comments`,raw )
    },
    createPost(title:string, body:string): Promise<PostType>{
        return instance.post<PostsAPICreatePostType>(`posts`,{
            title,
            body
        }).then(res=>res.data)
    },
    deletePost(id:number):Promise<any>{
        return instance.delete<PostsAPIDeletePostType>(`posts/${id}`)
    },
    updatePost(id:number,title:string, body:string):Promise<any>{
        return instance.put<PostType>(`posts/${id}`, {
            title,
            body
        })
    }

}
