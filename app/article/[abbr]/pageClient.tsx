'use client'
import ErrorPage from 'next/error'
import Container from '../../../components/container'
import PostBody from '../../../components/post-body'
import Header from '../../../components/header'
import PostHeader from '../../../components/post-header'
import PostTitle from '../../../components/post-title'
import { CMS_NAME } from '../../../lib/constants'
import markdownToHtml from '../../../lib/markdownToHtml'
import type PostType from '../../../interfaces/post'

type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
}

export default function ArticlePage({ post, morePosts, preview }: Props) {
    const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
    if ( !post?.slug) {
        return <ErrorPage statusCode={404} />
    }
    const content = markdownToHtml(post.content)
    return (
            <Container>
                <Header />

                    <>
                        <article className="mb-32">

                            <PostHeader
                                title={post.title}
                                coverImage={post.coverImage}
                                date={post.date}
                                author={post.author}
                            />
                            <PostBody content={content} />
                        </article>
                    </>

            </Container>
    )
}