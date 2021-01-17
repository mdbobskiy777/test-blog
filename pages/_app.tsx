import {AppInitialProps} from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store, {StoreType} from '../redux/store';
import {Store} from "redux";
import {PostType} from "../redux/reducers/postsReducer";

/*type MyAppType = {
    Component:any,
    store: any,
    ctx: {
        err: any,
        req: any,
        res: any,
        pathname: string,
        query: any,
        asPath: string,
        AppTree: any,
        store: any,
        isServer: boolean
    }
}

class MyApp extends App<MyAppType> {
    static async getInitialProps(props: any): Promise<AppInitialProps> {

        const pageProps = props.Component.getInitialProps ? await props.Component.getInitialProps(props.ctx) : {};

        //Anything returned here can be accessed by the client
        return {pageProps: pageProps};
    }

    render() {
        //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}>
                <Component pageProps={pageProps}/>
            </Provider>
        );
    }
}*/

function MyApp(props: { Component: any; pageProps: Array<PostType>; store: StoreType; }){
        //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = props;

        return (
            <Provider store={store}>
                <Component pageProps={pageProps}/>
            </Provider>
        );
}
MyApp.getInitialProps = async function (props: any): Promise<AppInitialProps> {

    const pageProps = props.Component.getInitialProps ? await props.Component.getInitialProps(props.ctx) : {};

    //Anything returned here can be accessed by the client
    return {pageProps: pageProps};
}

//makeStore function that returns a new store for every request
const makeStore = (): Store<any, any> => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);

