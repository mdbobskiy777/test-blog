import {AppInitialProps} from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store, {StoreType} from '../redux/store';
import {Store} from "redux";
import {PostType} from "../redux/reducers/postsReducer";

type MyAppType = {
    Component: any,
    pageProps: Array<PostType>,
    store: StoreType;
}

function MyApp(props: MyAppType) {

    const {Component, pageProps, store} = props;

    return (
        <Provider store={store}>
            <Component pageProps={pageProps}/>
        </Provider>
    );
}

MyApp.getInitialProps = async function (props: any): Promise<AppInitialProps> {

    const pageProps = props.Component.getInitialProps ? await props.Component.getInitialProps(props.ctx) : {};
    return {pageProps: pageProps};
}

const makeStore = (): Store<any, any> => store;

export default withRedux(makeStore)(MyApp);

