import Link from "../node_modules/next/Link";
import Head from "next/head";
import React from "react"
import styled from 'styled-components';

type PropsType = {
    title: React.ReactNode,
    children:React.ReactNode
}


const MyNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  font-size: 1.25em;
  max-width: 1280px;
  padding: 5px;
  margin: 5px auto;
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
`

const MyA = styled.a`

`
const MyNavDiv = styled.div`
  border: 1px solid;
  padding: 5px;
  background: #e5eff5;
  font-size: 1.25em;
  border-radius: 5px;

`

export function MainLayout(props:PropsType ): JSX.Element {
    return (
        <MyDivContainer>
            <MyNav>
                <MyNavDiv>
                    <Link href={'/'}><MyA>Latest posts</MyA></Link>
                </MyNavDiv>
                <MyNavDiv>
                    <Link href={'/posts/new'}><MyA>Create new post</MyA></Link>
                </MyNavDiv>
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

