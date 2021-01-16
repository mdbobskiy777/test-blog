import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {postsAPI} from "../../api/api";
import {/*add_comment_success,*/ addComment, getPost} from "../../redux/actions/getPostsActions";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {Field, Form} from "react-final-form";
import FormControlsCreator from "../../components/FormsControls/FormsControls";
import {CommentType, PostType} from "../../redux/reducers/postsReducer";

const Input = FormControlsCreator('input')

type GetInitialPropsType = {
    AppTree:any,
    asPath:string,
    isServer:boolean,
    pathName:string,
    query:{
        id:number
    },
    store:any
}

function Post(props: {
    getPost: (arg0: any) => void; pageProps: { id: any; }; post: any;
    addComment: (arg0: any, arg1: any) => void; submitError: any;
}) {
    // НЕ НОРМ ШО Я ДЕЛАЮ ПО 2 ЗАПРОСА
    useEffect(() => {
        return () => {
            {
                /*
                                props.add_comment_success(false)
                */
                props.getPost(props.pageProps.id)
            }
        }
    })

    console.log(props.pageProps)
    const actualProps = {...(props.post) ? props.post : props.pageProps}
    console.log("ACTUAL PROPS ")
    console.log(actualProps)
    return (
        <MainLayout title={`Blog | Post ${actualProps.id}`}>
            <h1>{actualProps.title}</h1>
            <hr/>
            <p>{actualProps.body}</p>
            <hr/>
            <h2>Comments: </h2>
            <ul>{(actualProps.comments) && actualProps.comments.map((comment: CommentType, i: number) => {
                return <li key={i}>{comment.body}</li>
            })}</ul>

            <Form onSubmit={(form) => {
                props.addComment(actualProps.id, form.comment)
                form.comment = ""
            }}
                  render={({submitError = props.submitError, handleSubmit, form}) => (
                      <form onSubmit={handleSubmit}>
                          <div>
                              <Field name="comment" component={Input} placeholder="Write comment"/>
                          </div>
                          <div>
                              <button type="submit">Create comment</button>
                          </div>
                      </form>
                  )}
            >
            </Form>
        </MainLayout>
    )
}

Post.getInitialProps = async (props: GetInitialPropsType):Promise<PostType> => {
    console.log(props)
    const post = await postsAPI.getPost(props.query.id);
    console.log(post)
    props.store.dispatch(getPost(props.query.id))

    return post
}

const mapStateToProps = (state: { latestPosts: { post: any; }; }) => ({
    /*
        addCommentSuccess: state.latestPosts.addCommentSuccess,
    */
    post: state.latestPosts.post,
})
export default connect(mapStateToProps, {addComment, /*add_comment_success,*/ getPost})(Post)