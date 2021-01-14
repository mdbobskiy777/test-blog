import Link from "next/Link"
import Head from "next/head";
export function MainLayout({children, title = 'Next App'}){
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <nav>
                <Link href = {'/'}><a>Latest posts</a></Link>
            </nav>
            <main>{children}</main>
        </>
    )
}