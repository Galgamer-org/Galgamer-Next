import { getAllPosts, isTechnicalReport } from '../lib/api'
import Container from '../components-layout/container'
import Post from '../interfaces/post'
import PostPreview from '../components/post-preview'
import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import cn from 'classnames'
import style from 'styles/index.module.css'
import { Col, Row } from 'react-bootstrap'
import FriendLinkUnit from '@/components/FriendLinkUnit'
import FriendLinks from '@/_feed/friend-links'
import BookmarkContainer from '@/components/bookmark-container'
import ppstyle from '@/styles/post-preview.module.css'
import React from 'react'
import MainVisualH1 from '@/components/MainVisualH1'
import dgstyles from '@/styles/draw-guess.module.css';

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

        {/* <Link href='/event/draw-guess' className={cn('text-decoration-none', dgstyles.link)}> */}
          <MainVisualH1
            title={<Link href='/event/draw-guess' className={cn('text-decoration-none', dgstyles.link)}>
              <h1><b>你畫我猜作品集</b></h1>
              </Link>}
            description='Draw & Guess Artworks'
            details={
              <div className='d-flex align-items-center'><b className='me-2'>主席</b><Avatar name="Kaminotomodachi" /></div>
            }
            cssClass={dgstyles.drawGuessH1}
          ></MainVisualH1>
        {/* </Link> */}
        <div className={'my-5'}></div>

        <FriendLinkBody />
      </Container>

    </>

  );
}


function HeroPost({
  post
}: { post: Post }) {
  const { title, index_img, date, author, excerpt, abbrlink, tags, categories } = post;
  return (
    <section className={cn(style.heroContainer, 'mx-auto mt-3 px-2')}>
      {/* <h2 className={cn(style.featuredTitle, 'h1')}><em>Featured.</em></h2> */}
      <div className={cn(style.postContainer, 'box-shadow')}>
        <div className={cn(style.coverImageContainer, '')}>
          <CoverImage title={title} src={index_img} abbr={abbrlink} loading='eager' />
        </div>
        <div className={cn(style.postContent, '')}>
          <div className='d-flex align-items-center my-2'>

            <h2 className={cn(style.featuredTitle, '')}><em>Featured</em><i className="bi-vector-pen ms-2"></i></h2>
            <div className='ms-2' style={{ pointerEvents: 'all' } as React.CSSProperties}>
              <Avatar name={author} />
            </div>
          </div>
          <div>
            <h3 className="my-1">
              <a
                href={`/article/${abbrlink}`}
                className="h2 text-light text-decoration-none"
              >
                <strong>{title}</strong>
              </a>
            </h3>
            <div className={style.hr}></div>
            <p className={cn(style.heroExcerpt, "my-2 h5")}>{excerpt}</p>
            <div
              className={cn('myfont', ppstyle.postMeta)}
              style={{ pointerEvents: 'all' } as React.CSSProperties}
            >
              <div className="text-lg my-1 me-3">
                <i className="bi-calendar-week-fill me-2"></i>
                <DateFormatter dateObj={date} />
              </div>
              {categories.length !== 0 && <div className="text-lg my-1 me-3">
                {/* category */}
                <i className="bi-inboxes-fill me-2"></i>
                {categories.map(function (category, index) {
                  // if category is an array, then it is a nested category, should map to /categories/category1/category2/...
                  // if category is a string, then it is a top level category, should map to /categories/category

                  if (Array.isArray(category)) {
                    const result: React.ReactNode[] = [];
                    for (let i = 0; i < category.length; i++) {
                      const categoryName = category[i];
                      const categoryPath = (category as Array<string>).slice(0, i + 1).join('/');
                      result.push(
                        <Link href={`/categories/${categoryPath}`} key={categoryPath} className={cn(ppstyle.metaLink)} >
                          {categoryName}
                        </Link>
                      );
                    }
                    return result;
                  } else {
                    return (
                      <Link href={`/categories/${category}`} key={category} className={cn(ppstyle.metaLink)}>
                        {category}
                      </Link>
                    );
                  }
                })}
              </div>}

              {tags.length !== 0 && <div className="text-lg my-1 me-3">
                {/* tags */}
                <i className="bi-tag-fill me-2"></i>
                {tags.map((tag) => (
                  <Link href={`/tags/${tag}`} key={tag} className={cn(ppstyle.metaLink)}>
                    {tag}
                  </Link>
                ))}
              </div>}
            </div>


          </div>
        </div>
      </div>

    </section>
  );
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

    <BookmarkContainer
      title={
        <Link className="text-decoration-none" href={jumpUrl || '/article'}>
          <i className={cn(icon, "me-2")}></i>{title || 'More Stories'}
        </Link>
      }
    >
      <Row className={cn('pt-4 pt-md-4 mt-2 mx-0 px-1 px-md-2 px-xl-4 o-hidden')}>
        {posts.slice(0, limit || posts.length).map((post) => (

          <Col className={cn('col-12 col-md-6 col-xl-4')} key={post.slug}>

            <PostPreview
              post={post}
            />
          </Col>
        ))}
      </Row>
      <div className='d-flex p-3 align-items-center'>
        <div className={cn(style.viewAllHr, 'ms-auto')}>
        </div>
        <div className={cn('ms-2')}>
          <Link className="fs-2 fw-bold font-serif text-decoration-none" href={jumpUrl || '/article'}>
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
    </BookmarkContainer>

  );
}

function FriendLinkBody() {
  return (
    <BookmarkContainer
      title={
        <Link className="text-decoration-none" href={'/links'}>
          <i className={cn("bi-link-45deg", "me-2")}></i>友情連結
        </Link>
      }>
      <div className={style.links}>
        <div className={style.linksBody}>
          <Row>
            {FriendLinks.map((link, index) => (
              <FriendLinkUnit key={index} {...link} />
            ))}
          </Row>
        </div>
      </div>
    </BookmarkContainer>
  );
}


