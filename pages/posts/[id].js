import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {postsAPI} from "../../api/api";
import {getPost} from "../../redux/actions/getPostsActions";

function Post(props) {
    // НЕ НОРМ ШО Я ДЕЛАЮ ПО 2 ЗАПРОСА
    console.log(props.pageProps)
    return <MainLayout title={`Blog | Post ${props.id}`}>
        <h1>{props.pageProps.title}</h1>
        <hr/>
        <p>{props.pageProps.body}</p>
    </MainLayout>
}

Post.getInitialProps = async ({store, query}) => {
    const post = await postsAPI.getPost(query.id);
    debugger
    console.log(post)
    store.dispatch(getPost(query.id))

    return post
}
export default Post