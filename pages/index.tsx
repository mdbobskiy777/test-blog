import React from 'react';
import {connect} from 'react-redux';
import {deletePost, get_posts, getPosts} from "../redux/actions/getPostsActions";
import {postsAPI} from "../api/api";
import Link from "next/Link";
import {MainLayout} from "../components/MainLayout";
import {useEffect} from "react";

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


function LatestPosts(props: { latestPosts: { posts: any; }; get_posts: (arg0: any) => void; pageProps: any; deletePost: (arg0: any) => void; }) {

    useEffect(() => {
            if (!props.latestPosts.posts) {
                props.get_posts(props.pageProps)
            }
    },[props.latestPosts.posts])

    const actualProps = [...(props.latestPosts.posts) ? props.latestPosts.posts : props.pageProps]

    return (
        <MainLayout title={'Blog | Latest Posts'}>
            <div>Latest posts</div>
            <ul>
                {actualProps.map((post, i) => (
                    <div key={i}>
                        <li key={post.id}>
                            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}><a>{post.title}</a></Link>
                        </li>
                        <button onClick={() => {
                            props.deletePost(post.id)
                        }}>X
                        </button>
                    </div>
                ))}
            </ul>
        </MainLayout>
    )
}

const mapStateToProps = (state: { latestPosts: any; }) => ({
    latestPosts: state.latestPosts
});

LatestPosts.getInitialProps = async function ({store}) {
    const posts = await postsAPI.getPosts();
    store.dispatch(getPosts())

    return posts
}

const mapDispatchToProps = ({
    get_posts: get_posts,
    deletePost: deletePost
});
export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)

