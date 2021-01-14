import React from 'react';
import {connect} from 'react-redux';
import {get_posts, getPosts} from "../redux/actions/getPostsActions";
import {postsAPI} from "../api/api";
import Link from "next/Link";

class LatestPosts extends React.Component {

    static async getInitialProps({store}) {
        debugger
        const posts = await postsAPI.getPosts();
/*
        store.dispatch(get_posts(posts))
*/
        store.dispatch(getPosts())

        return posts
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        debugger
        if(!this.props.posts){
            this.props.get_posts(this.props.pageProps)
        }
    }

    render() {
        debugger
        return (
            <div>
                <div>Latest posts</div>
                <ul>
                    {this.props.latestPosts.posts.map((post, i) => (
                        <div key={i}>
                            <li key={post.id}>
                                <Link href={`/posts/[id]`} as={`/posts/${post.id}`}><a>{post.title}</a></Link>
                            </li>
                            <button onClick={() => {

                            }}>X
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    latestPosts:state.latestPosts
});

const mapDispatchToProps = {
    get_posts:get_posts
};
export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);

