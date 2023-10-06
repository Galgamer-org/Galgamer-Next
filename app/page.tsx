import { getAllPosts } from '../lib/api'
import Container from '../components-layout/container'
import Intro from '../components/intro'
import Post from '../interfaces/post'
import PostPreview from '../components/post-preview'
import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import cn from 'classnames'

import style from '@/styles/index.module.css'
import { Col, Row } from 'react-bootstrap'


export default function Index() {
  const allPosts = getAllPosts()
  return <IndexPage allPosts={allPosts}></IndexPage>
}

type Props = {
  allPosts: Post[]
}

type heroProps = {
  title: string
  index_img: string
  date: Date
  excerpt: string
  author: Author
  slug: string
  abbr: number
}

function IndexPage({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            index_img={heroPost.index_img}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            abbr={heroPost.abbrlink}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} limit={6} title='遊戲推薦' />}

      </Container>

    </>
  )
}


function HeroPost({
  title,
  index_img,
  date,
  excerpt,
  author,
  slug,
  abbr,
}: heroProps) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={index_img} abbr={abbr} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              href={`/article/${abbr}`}
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateObj={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}

function MoreStories({ 
  posts, 
  title,
  jumpUrl,
  limit 
}: 
{ 
  posts: Post[], 
  title?: string,
  jumpUrl?: string,
  limit?: number 
}) {
  return (
    <section>
      <div className="my-4 font-bold justify-content-between d-flex align-items-center">
        <div className={cn('d-inline-block mr-auto')}>
          <h2>
            {title || 'More Stories'}
          </h2>
        </div>
        <div className={cn('d-inline-block')}>
          <Link className="text-lg font-bold" href={jumpUrl || '/article'}>
            View all 
          </Link>
        </div>
      </div>
      <Row className={cn('my-3 px-1 px-md-2 px-xl-4')}>
        {posts.slice(0, limit || posts.length).map((post) => (
          <Col className={cn('col-12 col-md-6 col-xl-4')} key={post.slug}>
            <PostPreview
              title={post.title}
              index_img={post.index_img}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              abbr={post.abbrlink}
            />
          </Col>
        ))}
      </Row>
    </section>
  )
}

