import Link from "next/Link"
import Head from "next/head";
import React from "react"
import styled from 'styled-components';

/*type PropsType = {
    title:string,
    children:React.ReactChildren
}*/


const MyNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: darkgray;
  font-size: 1.25em;
  max-width: 1280px;
  padding: 5px;
  margin: 0 auto;
  border: 1px solid;
`
const MyDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid;

`
const MyDivContainer = styled.div`
  min-height: 600px;
  background: #e5eff5;
  border: 1px solid;

`

const MyA = styled.a`
  border: 1px solid;

`

export function MainLayout(props: { title: React.ReactNode; children: React.ReactNode; }): JSX.Element {
    return (
        <MyDivContainer>
            <MyNav>
                <Link href={'/'}><MyA>Latest posts</MyA></Link>
                <Link href={'/posts/new'}><MyA>Create new post</MyA></Link>
            </MyNav>
            <MyDiv>
                <Head>
                    <title>{props.title}</title>
                </Head>

                <main>{props.children}</main>
            </MyDiv>
        </MyDivContainer>

    )
}

