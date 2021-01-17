import React from 'react';
import {connect} from 'react-redux';
import {deletePost, get_posts, getPosts} from "../redux/actions/getPostsActions";
import {postsAPI} from "../api/api";
import Link from "next/Link";
import {MainLayout} from "../components/MainLayout";
import {useEffect} from "react";
import {CombinedState} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {InitialStateType, ActionsType, PostType} from '../redux/reducers/postsReducer';
import styled from 'styled-components';

/*class LatestPosts extends React.Component {

    // НЕ НОРМ ШО Я ДЕЛАЮ ПО 2 ЗАПРОСА

    static async getInitialProps({store}) {
        debugger
        const posts = await postsAPI.getPosts();
/!*
        store.dispatch(get_posts(posts))
*!/
        store.dispatch(getPosts())

        return posts
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        debugger
        if(!this.props.latestPosts.posts){
            this.props.get_posts(this.props.pageProps)
        }
    }

    render() {
        debugger
        return (
            <MainLayout title={'Blog | Latest Posts'}>
                <div>Latest posts</div>
                <ul>
                    {this.props.latestPosts.posts.map((post, i) => (
                        <div key={i}>
                            <li key={post.id}>
                                <Link href={`/posts/[id]`} as={`/posts/${post.id}`}><a>{post.title}</a></Link>
                            </li>
                            <button onClick={() => {
                                this.props.deletePost(post.id)
                            }}>X
                            </button>
                        </div>
                    ))}
                </ul>
            </MainLayout>
        );
    }
}*/

const MyUL = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  background: red;
  padding: 5px;
`
const MyA = styled.a`
  color: #eaeaea;
`
const MyBtn = styled.button`
  color: red;
`
const MyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: chocolate;
  max-width: 500px;
  height: 50px;
  margin: 5px;
`
const MyH1 = styled.h1`
  padding: 10px;
`

const MyLI = styled.li`
  background: gray;
  margin-left: 10px;

`
type PostListType = {
    posts: Array<PostType>,
    deletePost: (arg0: any) => void;
}

const PostsList = (props: PostListType): JSX.Element => {
    return (
        <MyUL>
            {props.posts.map((post, i) => (
                <MyDiv key={i}>
                    <MyLI key={post.id}>
                        <Link href={`/posts/[id]`} as={`/posts/${post.id}`}><MyA>{post.title}</MyA></Link>
                    </MyLI>
                    <MyBtn onClick={() => {
                        props.deletePost(post.id)
                    }}>X
                    </MyBtn>
                </MyDiv>
            ))}
        </MyUL>
    )
}

function LatestPosts(props: {
    latestPosts: { posts: any; }; get_posts: (arg0: any) => void; pageProps: any;
    deletePost: (arg0: any) => void;
}) {

    useEffect(() => {
        if (!props.latestPosts.posts) {
            props.get_posts(props.pageProps)
        }
    }, [props.latestPosts.posts])

    const actualProps = [...(props.latestPosts.posts) ? props.latestPosts.posts : props.pageProps]

    return (
        <MainLayout title={'Blog | Latest Posts'}>
            <MyH1>Latest posts</MyH1>
            <PostsList posts={actualProps} deletePost={props.deletePost}/>
        </MainLayout>
    )
}

const mapStateToProps = (state: { latestPosts: any; }) => ({
    latestPosts: state.latestPosts
});

LatestPosts.getInitialProps = async function (props: { store: { dispatch: (arg0: ThunkAction<Promise<void>, CombinedState<{ latestPosts: InitialStateType; }>, undefined, ActionsType>) => void; }; }) {
    const posts = await postsAPI.getPosts();
    props.store.dispatch(getPosts())

    return posts
}

const mapDispatchToProps = ({
    get_posts: get_posts,
    deletePost: deletePost
});
export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)

