import { getAllPosts, isTechnicalReport } from '../lib/api'
import Container from '../components-layout/container'
import Post from '../interfaces/post'
import PostPreview from '../components/post-preview'
import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import type Author from '../interfaces/member'
import cn from 'classnames'

import style from 'styles/index.module.css'
import { Col, Row } from 'react-bootstrap'




export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];
  const recommandedGames = allPosts.filter(post => !isTechnicalReport(post));
  const technicalReport = allPosts.filter(post => isTechnicalReport(post));

  return (
    <>
      {heroPost && (
        <HeroPost
          post={heroPost}
        />
      )}

      <Container>


        {
          recommandedGames.length > 0 &&
          <MoreStories posts={recommandedGames} limit={6} title='遊戲推薦' jumpUrl='/channel/recommanded-games' />
        }
          
        {
          technicalReport.length > 0 &&
          <MoreStories posts={technicalReport} limit={6} title='技術報告' jumpUrl='/channel/technical-report' />
        }
      </Container>

    </>
  )
}


function HeroPost({
  post
}: { post: Post }) {
  const { title, index_img, date, author, excerpt, abbrlink } = post;


  return (
    <section className={cn(style.featuredContainer, 'container-fluid mt-3')}>
      <h2 className={cn(style.featuredTitle, 'h1')}><em>Featured.</em></h2>
      <div className={cn(style.postContainer, '')}>
        <div className={cn(style.coverImageContainer, '')}>
          <CoverImage title={title} src={index_img} abbr={abbrlink} />
        </div>
        <div className={cn(style.postContent, '')}>
          <div className='my-2'>
            <Avatar member={author} />
          </div>
          <div>
            <h3 className="my-1">
              <Link
                href={`/article/${abbrlink}`}
                className="h1 text-light text-decoration-none"
              >
                <strong>{title}</strong>
              </Link>
            </h3>
            <div className={style.hr}></div>
            <p className="h3 my-2">{excerpt}</p>
            <div className="my-1">
              <DateFormatter dateObj={date} />
            </div>
          </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" focusable="false" role="presentation" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m18 8 4 4-4 4M2 12h20" vectorEffect="non-scaling-stroke"></path></svg>
          </Link>
        </div>
      </div>
      <Row className={cn('my-3 px-1 px-md-2 px-xl-4 o-hidden')}>
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

