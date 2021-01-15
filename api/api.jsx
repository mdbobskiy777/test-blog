import  axios from "axios"

const instance = axios.create({
    baseURL: `https://simple-blog-api.crew.red/`,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postsAPI = {
    getPosts() {
        return instance.get('posts')
            .then(res => res.data)
    },
    getPost(id) {
        return instance.get(`posts/${id}?_embed=comments`).then(res => res.data)
    },
    createComment(id, text) {
        const raw = {
            postId: parseInt(id,10),
            body: text
        }
        return instance.post(`comments`,raw )
    },
    createPost(title, body){
        return instance.post(`posts`,{
            title,
            body
        }).then(res=>res.data)
    },
    deletePost(id){
        return instance.delete(`posts/${id}`)
    },
    updatePost(id,title, body){
        return instance.put(`posts/${id}`, {
            title,
            body
        })
    }

}
