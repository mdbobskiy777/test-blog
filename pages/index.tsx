import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    clean_post, deletePost, get_posts, getPosts
} from "../redux/actions/getPostsActions";
import {postsAPI} from "../api/api";
import Link from "next/Link";
import {MainLayout} from "../components/MainLayout";
import {useEffect} from "react";
import {AnyAction, CombinedState} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {
    InitialStateType,
    ActionsType,
    PostType,
    GetLatestPostsType,
    CleanPostType
} from '../redux/reducers/postsReducer';
import styled from 'styled-components';
import {AppStateType} from "../redux/reducers/rootReducer";

type PostListType = {
    posts: Array<PostType>,
    deletePost: (id: number) => ThunkAction<Promise<void>, AppStateType, undefined, ActionsType>,
    dispatch: ThunkDispatch<AppStateType, any, AnyAction>
}

type LatestPostsProps = {
    latestPosts: InitialStateType,
    get_posts: (posts: Array<PostType>) => GetLatestPostsType,
    pageProps: Array<PostType>,
    deletePost: (id: number) => ThunkAction<Promise<void>, AppStateType, undefined, ActionsType>,
    clean_post: () => CleanPostType
}

type GetInitialPropsType = {
    store: {
        dispatch: (arg0: ThunkAction<Promise<void>,
            CombinedState<{ latestPosts: InitialStateType; }>, undefined, ActionsType>) => void;
    }
}


const MyUL = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid;
  background: white;

`
const MyA = styled.a`
`
const MyBtn = styled.button`
  color: red;
  border: 1px solid black;
  border-radius: 5px;
`
const MyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 95%;
  height: 50px;
  margin: 5px auto;
  border: 1px solid;
  padding-right: 10px;
  background-color: lightblue;
  border-radius: 5px;
`
const MyH1 = styled.h1`
  background: white;
  padding: 10px;
  border: 1px solid;

`

const MyLI = styled.li`
  margin-left: 10px;
  padding: 5px;
`
const MyBtnContainer = styled.div`
  margin: 5px;

`

const PostsList = (props: PostListType): JSX.Element => {
    return (
        <MyUL>
            {props.posts.map((post, i) => (
                <MyDiv key={i}>
                    <div>
                        <MyLI key={post.id}>
                            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}><MyA>{post.title}</MyA></Link>
                        </MyLI>
                    </div>
                    <MyBtnContainer>
                        <MyBtn onClick={async () => {
                            await props.dispatch(deletePost(post.id))
                        }}>X
                        </MyBtn>
                    </MyBtnContainer>

                </MyDiv>
            ))}
        </MyUL>
    )
}


function LatestPosts(props: LatestPostsProps) {
    const latestPostsSelector = useSelector((state: AppStateType) => state.latestPosts)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(clean_post())

    }, [])
    useEffect(() => {
        if (!latestPostsSelector.posts) {
            dispatch(get_posts(props.pageProps))
        }
    }, [latestPostsSelector.posts])

    const actualProps = [...(latestPostsSelector.posts) ? latestPostsSelector.posts : props.pageProps]

    return (
        <MainLayout title={'Blog | Latest Posts'}>
            <MyH1>Latest posts:</MyH1>
            <PostsList posts={actualProps} deletePost={props.deletePost} dispatch={dispatch}/>
        </MainLayout>
    )
}

LatestPosts.getInitialProps = async function (props: GetInitialPropsType) {
    const posts = await postsAPI.getPosts();
    props.store.dispatch(getPosts())

    return posts
}

export default LatestPosts

