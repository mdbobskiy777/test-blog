import Link from "next/Link"
import Head from "next/head";
import React from "react"

/*type PropsType = {
    title:string,
    children:React.ReactChildren
}*/
export function MainLayout(props: { title: React.ReactNode; children: React.ReactNode; }){
    return (
        <div>
            <Head>
                <title>{props.title}</title>
            </Head>
            <nav>
                <Link href = {'/'}><a>Latest posts</a></Link>
            </nav>
            <nav>
                <Link href = {'/posts/new'}><a>Create new post</a></Link>
            </nav>
            <main>{props.children}</main>
        </div>
    )
}

