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

      <Container className='px-2'>


        {
          recommandedGames.length > 0 &&
          <MoreStories
            posts={recommandedGames}
            limit={6}
            title='遊戲推薦'
            jumpUrl='/channel/recommanded-games'
            icon='bi-joystick'
          />
        }

        {
          technicalReport.length > 0 &&
          <MoreStories
            posts={technicalReport}
            limit={6}
            title='技術報告'
            jumpUrl='/channel/technical-report'
            icon='bi-file-earmark-code'
          />
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
    <section className={cn(style.heroContainer, 'mx-auto mt-3 px-2')}>
      {/* <h2 className={cn(style.featuredTitle, 'h1')}><em>Featured.</em></h2> */}
      <div className={cn(style.postContainer, 'box-shadow')}>
        <div className={cn(style.coverImageContainer, '')}>
          <CoverImage title={title} src={index_img} abbr={abbrlink} />
        </div>
        <div className={cn(style.postContent, '')}>
          <div className='d-flex align-items-center my-2'>

            <h2 className={cn(style.featuredTitle, '')}><em>Featured</em><i className="bi-vector-pen ms-2"></i></h2>
            <div className='ms-2'>
              <Avatar member={author} />
            </div>
          </div>
          <div>
            <h3 className="my-1">
              <Link
                href={`/article/${abbrlink}`}
                className="h2 text-light text-decoration-none"
              >
                <strong>{title}</strong>
              </Link>
            </h3>
            <div className={style.hr}></div>
            <p className={cn(style.heroExcerpt, "my-1 h5")}>{excerpt}</p>
            <div className="my-0">
              <i className="bi-calendar-week-fill me-2"></i>
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
  limit,
  icon
}:
  {
    posts: Post[],
    title?: string,
    jumpUrl?: string,
    limit?: number,
    icon?: string
  }) {
  return (
    <section className={style.bookmarkContainer}>
      <div className={cn(style.bookmark, 'box-shadow p-2 ms-4 ms-md-5 ')}>
        <div className={cn('d-flex o-hidden align-items-center h-100', style.sectionTitle)}>
          <div className={cn('ms-2')}>
            <h2 className={cn('text-decoration-none fw-bold fst-italic h3')}>
              <Link className="text-decoration-none" href={jumpUrl || '/article'}>
                <i className={cn(icon, "me-2")}></i>{title || 'More Stories'}
              </Link>
            </h2>

          </div>
        </div>
      </div>
      <div className={cn('container-board', 'mx-auto p-1 p-md-2 box-shadow')}>
        <Row className={cn('pt-4 pt-md-4 mt-2 mx-0 px-1 px-md-2 px-xl-4 o-hidden')}>
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
        <div className='d-flex p-3 align-items-center'>
          <div className={cn(style.viewAllHr, 'ms-auto')}>
          </div>
          <div className={cn('ms-2')}>
            <Link className="h4 fw-bold font-serif text-decoration-none" href={jumpUrl || '/article'}>
              View All
              <i className="bi-arrow-right-circle-fill ms-2"></i>
            </Link>
          </div>
        </div>
        {/* <Row className='p-3 justify-content-end'>
          <div className={cn('col-2 text-end')}>
            <Link className="h4 fw-bold font-serif" href={jumpUrl || '/article'}>
              View all
              <i className="bi-arrow-right-circle-fill ms-2"></i>
            </Link>
          </div>
        </Row> */}

      </div>
    </section>
  )
}

