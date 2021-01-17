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
`
const MyDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  background: #e5eff5;
  padding: 5px;
`
const MyDivContainer = styled.div`
  background: gray;
  min-height: 600px;
`

const MyA = styled.a`
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

