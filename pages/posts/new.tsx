import {MainLayout} from "../../components/MainLayout";
import {Field, Form} from "react-final-form";
import FormControlsCreator from "../../components/FormsControls/FormsControls";
import {connect} from "react-redux";
import {add_post_success, addPost} from "../../redux/actions/getPostsActions";
import Link from "next/Link";
import React, {useEffect} from "react";


const Input = FormControlsCreator('input')


function NewPost(props: { add_post_success: (arg0: boolean) => void; addPostSuccess: boolean;
addPost: (arg0: any, arg1: any) => void; submitError: any; }) {
    useEffect(() => {
        return () => {
            props.add_post_success(false);
        }

    }, [])
    if (props.addPostSuccess) {
        return (
            <div>
                <div>New Post added</div>
                <Link href={'/'}><a>Back to latest posts</a></Link>
            </div>
        )

    }
    return (
        <MainLayout title={`Blog | New post`}>
            <Form onSubmit={(form) => {
                props.addPost(form.title, form.body);
            }}
                  render={({handleSubmit, form}):React.ReactNode => (
                      <form onSubmit={handleSubmit}>
                          <div>
                              <Field name="title" component={Input} placeholder="Post title"/>
                          </div>
                          <div>
                              <Field name="body"
                                     component={Input} placeholder="Post body"/>
                          </div>
                          <div>
                              <button type="submit">Submit</button>
                          </div>
                      </form>
                  )}
            >
            </Form>
        </MainLayout>
    )
}

const mapStateToProps = (state: { latestPosts: { addPostSuccess: boolean; }; }) => ({
    addPostSuccess: state.latestPosts.addPostSuccess
})

export default connect(mapStateToProps, {addPost, add_post_success})(NewPost)