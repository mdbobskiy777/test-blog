import {MainLayout} from "../../components/MainLayout";
import {Field, Form} from "react-final-form";
import FormControlsCreator from "../../components/FormsControls/FormsControls";
import {connect} from "react-redux";
import {add_post_success, addPost} from "../../redux/actions/getPostsActions";
import Link from "next/Link";
import {useEffect} from "react";


const Input = FormControlsCreator('input')


function NewPost(props) {
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
                  render={({submitError = props.submitError, handleSubmit, form}) => (
                      <form onSubmit={handleSubmit}>
                          <div>
                              <Field name="title" component={Input} placeholder="Post title"/>
                          </div>
                          <div>
                              <Field name="body"
                                     component={Input} placeholder="Post body"/>
                          </div>
                          <div>
                              <button type="Submit">Submit</button>
                          </div>
                      </form>
                  )}
            >
            </Form>
        </MainLayout>
    )
}

const mapStateToProps = (state) => ({
    addPostSuccess: state.latestPosts.addPostSuccess
})

export default connect(mapStateToProps, {addPost, add_post_success})(NewPost)