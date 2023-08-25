'use client'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

type Props = {
    allPosts: Post[]
}

export default function IndexPage({ allPosts }: Props) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
        <>
            <Container>
                <Intro />
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.coverImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>

        </>
    )
}