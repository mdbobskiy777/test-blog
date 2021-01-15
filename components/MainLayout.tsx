import Link from "next/Link"
import Head from "next/head";
import React from "react"

export function MainLayout({children, title = 'Next App'}){
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <nav>
                <Link href = {'/'}><a>Latest posts</a></Link>
            </nav>
            <nav>
                <Link href = {'/posts/new'}><a>Create new post</a></Link>
            </nav>
            <main>{children}</main>
        </>
    )
}