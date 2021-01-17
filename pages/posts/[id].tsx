import {MainLayout} from "../../components/MainLayout";
import {postsAPI} from "../../api/api";
import {/*add_comment_success,*/ addComment, getPost} from "../../redux/actions/getPostsActions";
import {connect, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {Field, Form} from "react-final-form";
import FormControlsCreator from "../../components/FormsControls/FormsControls";
import {CommentType, PostType} from "../../redux/reducers/postsReducer";
import styled from "styled-components";
import {useRouter} from "next/router";


const MyUL = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid black;
  background: white;


`

const MyBtn = styled.button`
  padding: 10px;
  font-size: 1em;
  margin: 10px auto;
  background-color: lightblue;
  border-radius: 5px;

`
const MyH1 = styled.h1`
  padding: 5px;
  margin: 0 auto;
`

const MyLI = styled.li`
  margin: 5px auto;
  border: 1px solid black;
  background-color: lightblue;
  padding: 5px;
  border-radius: 5px;

`
const MyFormContainer = styled.div`
  margin: 10px;

`

const MyInput = styled.textarea`
  wrap-option: soft;
  width: 30%;
  min-height: 50px;
  resize: none;
  border: 1px solid black;

`
const MyTitle = styled.div`
  margin: 5px auto;
  border: 1px solid black;
  padding: 5px;
  background: white;

`
const MyDiv = styled.div`
  margin: 5px auto;
  padding: 5px;

`
const MyBody = styled.div`
  margin: 5px auto;
  border: 1px solid black;
  padding: 15px;
  background: white;
`

const MyCommentInput = FormControlsCreator(MyInput)

type GetInitialPropsType = {
    AppTree: any,
    asPath: string,
    isServer: boolean,
    pathName: string,
    query: {
        id: number
    },
    store: any
}

function Post(props: {
    getPost: (arg0: any) => void; clean_post: () => void; pageProps: { id: any; }; post: any;
    addComment: (arg0: any, arg1: any) => void; submitError: any;
}) {
    useEffect(() => {
        return () => {
            {
                /*
                                props.add_comment_success(false)
                */
            }
        }
    })

    const actualProps = {...(props.post) ? props.post : props.pageProps}
    console.log(actualProps)
    return (
        <MainLayout title={`Blog | Post ${actualProps.id}`}>
            <MyTitle>
                <MyH1>{actualProps.title}</MyH1>
            </MyTitle>
            <MyBody>
                <p>{actualProps.body}</p>
            </MyBody>
            <h2>Comments: </h2>
            <MyUL>{(actualProps.comments) && actualProps.comments.map((comment: CommentType, i: number) => {
                return <MyLI key={i}>{comment.body}</MyLI>
            })}</MyUL>

            <Form onSubmit={(form) => {
                props.addComment(actualProps.id, form.comment)
                form.comment = ""
            }}
                  render={({submitError = props.submitError, handleSubmit, form}) => (
                      <form onSubmit={handleSubmit}>
                          <MyFormContainer>
                              <MyDiv>
                                  <Field name="comment" component={MyCommentInput} placeholder="Write comment"/>
                              </MyDiv>
                              <MyDiv>
                                  <MyBtn type="submit">Create comment</MyBtn>
                              </MyDiv>
                          </MyFormContainer>
                      </form>
                  )}
            >
            </Form>
        </MainLayout>
    )
}

Post.getInitialProps = async (props: GetInitialPropsType): Promise<PostType> => {

    const post = await postsAPI.getPost(props.query.id);
    props.store.dispatch(getPost(props.query.id))
    return post
}

const mapStateToProps = (state: { latestPosts: { post: any; }; }) => ({
    /*
        addCommentSuccess: state.latestPosts.addCommentSuccess,
    */
    post: state.latestPosts.post,
})
export default connect(mapStateToProps, {addComment /*add_comment_success,*/ , getPost})(Post)