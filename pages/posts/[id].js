import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {postsAPI} from "../../api/api";
import {/*add_comment_success,*/ addComment, getPost} from "../../redux/actions/getPostsActions";
import {connect} from "react-redux";
import {useEffect} from "react";
import {Field, Form} from "react-final-form";
import FormControlsCreator from "../../components/FormsControls/FormsControls";

const Input = FormControlsCreator('input')

function Post(props) {
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
    debugger
    const actualProps = {...(props.post) ? props.post : props.pageProps}
    console.log("ACTUAL PROPS ")
    console.log(actualProps)
    return <MainLayout title={`Blog | Post ${actualProps.id}`}>
        <h1>{actualProps.title}</h1>
        <hr/>
        <p>{actualProps.body}</p>
        <hr/>
        <h2>Comments: </h2>
        <ul>{(actualProps.comments) && actualProps.comments.map((comment, i) => {
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
                          <button type="Submit">Create comment</button>
                      </div>
                  </form>
              )}
        >
        </Form>
    </MainLayout>
}

Post.getInitialProps = async ({store, query}) => {
    const post = await postsAPI.getPost(query.id);
    debugger
    console.log(post)
    store.dispatch(getPost(query.id))

    return post
}

const mapStateToProps = (state) => ({
/*
    addCommentSuccess: state.latestPosts.addCommentSuccess,
*/
    post: state.latestPosts.post,
})
export default connect(mapStateToProps, {addComment, /*add_comment_success,*/ getPost})(Post)