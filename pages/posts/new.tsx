import {MainLayout} from "../../components/MainLayout";
import {Field, Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {add_post_success, addPost} from "../../redux/actions/getPostsActions";
import React, {useEffect} from "react";
import styled from 'styled-components';
import FormControlsCreator from "../../components/FormsControls/FormsControls";
import {useRouter} from 'next/router'
import {AppStateType} from "../../redux/reducers/rootReducer";

const MyTitle = styled.textarea`
  wrap-option: soft;
  width: 30%;
  min-height: 50px;
  resize: none;
  margin: 10px;
`
const MyBody = styled.textarea`
  wrap-option: soft;
  width: 80%;
  min-height: 200px;
  resize: none;
  margin: 10px;
`
const MyBtnContainer = styled.div`
  margin: 10px;

`
const MyBtn = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: lightblue;
  border-radius: 5px;

`
const MyInputTitle = FormControlsCreator(MyTitle)
const MyInputBody = FormControlsCreator(MyBody)


function NewPost() {
    const addPostSuccessSelector = useSelector((state: AppStateType) => state.latestPosts.addPostSuccess)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(add_post_success(false))
        }

    }, [])
    if (addPostSuccessSelector) {
        const router = useRouter()
        router.push("/")
    }
    return (
        <MainLayout title={`Blog | New post`}>
            <Form onSubmit={async (form) => {
                dispatch(addPost(form.title, form.body));
            }}
                  render={({handleSubmit, form}): React.ReactNode => (
                      <form onSubmit={handleSubmit}>
                          <div>
                              <Field name="title" component={MyInputTitle} placeholder="Post title"/>
                          </div>
                          <div>
                              <Field name="body"
                                     component={MyInputBody} placeholder="Post body"/>
                          </div>
                          <MyBtnContainer>
                              <MyBtn type="submit">Create post</MyBtn>
                          </MyBtnContainer>
                      </form>
                  )}
            >
            </Form>
        </MainLayout>
    )
}

export default NewPost
