'use client'
import Container from '../../../components/container'
import PostBody from '../../../components/post-body'
import Header from '../../../components/header'
import PostHeader from '../../../components/post-header'
import PostTitle from '../../../components/post-title'
import { CMS_NAME } from '../../../lib/constants'
import type PostType from '../../../interfaces/post'
import ErrorPage from 'next/error'
import { ReactNode } from 'react'


type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
    content?: ReactNode
}

export default function ArticlePage({ post, morePosts, preview, content }: Props) {
    const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
    if (!post?.slug) {
        return <ErrorPage statusCode={404} />
    }
    
    return (
        <Container>
            <Header />

            <>
                <article className="mb-32">

                    <PostHeader
                        title={post.title}
                        index_img={post.index_img}
                        date={post.date}
                        author={post.author}
                    />
                    <PostBody content={content} />
                </article>
            </>

        </Container>
    )
}