import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Container from 'components-layout/container'
import mvstyle from '@/styles/mainvisual.module.css'
import cn from 'classnames'
import React from 'react';
import style from "@/styles/article.module.css";
import PostType from '@/interfaces/post'
import Link from 'next/link'


function PostHeader({post}: {post: PostType}) {
  const { title, index_img, date, author, excerpt, categories, tags } = post;
  return (
    <>
      <style>
        {`
        .thisPostHeader .container-board{
          background-image: url(${index_img});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-color: var(--board-bg-color);
        `}
      </style>
      <Container className={cn('', style.headerContainer)}>
        <div className={cn(style.date, 'myfont fst-italic fw-bold h5 ')}>
          <DateFormatter dateObj={date} />
        </div>

        <h1 className="text-4xl fw-bold mb-3">
          {title}
        </h1>
        <div className={cn(style.separator, 'd-flex align-items-center d-none')}>
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
          <div className={cn(style.hr, 'w-100')}></div>
        </div>
        <p className={style.excerpt}>
          {excerpt || ''}
        </p>
        <div className='d-flex align-items-center mb-3'>
          <i className="bi-vector-pen me-2 h3 mb-0"></i>
          <Avatar name={author} />
        </div>
        {categories.length !== 0 && <div className="text-lg my-1 me-3 myfont">
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
                  <Link href={`/categories/${categoryPath}`} key={categoryPath} className={cn(style.metaLink)} >
                    {categoryName}
                  </Link>
                );
              }
              return result;
            } else {
              return (
                <Link href={`/categories/${category}`} key={category} className={cn(style.metaLink)}>
                  {category}
                </Link>
              );
            }
          })}
        </div>}

        {tags.length !== 0 && <div className="text-lg my-1 me-3 myfont">
          {/* tags */}
          <i className="bi-tag-fill me-2"></i>
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag} className={cn(style.metaLink)}>
              {tag}
            </Link>
          ))}
        </div>}
      </Container>
      {/* <MainVisualH1
        title={title}
        description={excerpt}
        details={
          <div className=''>
            <Avatar name={author} />
            <DateFormatter dateObj={date} />
          </div>
        }
        cssClass={"thisPostHeader"}
      ></MainVisualH1> */}
    </>
  )
}


function MainVisualH1(
  { title, description, details, cssClass }: {
    title: string | React.ReactNode,
    description: string | React.ReactNode,
    details?: string | React.ReactNode,
    cssClass?: string
  }
) {
  if (typeof title === 'string') {
    title = <h1 className="text-4xl fw-bold">
      {title}
    </h1>
  }
  if (typeof description === 'string') {
    description = <p className="h5 mt-2 text-lg fst-italic">
      {description}
    </p>
  }
  if (details && typeof details === 'string') {
    details = <p className="w-50 mt-2">
      {details}
    </p>
  }


  // use cssClass to determine the background image
  return (
    <section className={cn(cssClass ? cssClass : '')}>
      <div
        className={cn(mvstyle.banner, 'container-board mx-auto mt-4 mb-3 box-shadow d-flex align-items-center mainvisualBanner')}
      >
        <div className={cn('w-100 h-100 mainvisualBgMasked', mvstyle.bgMasked)}></div>
        <div className={cn('w-100 px-3 px-lg-5')}>
          {title}
          {description}

          {details}

        </div>

      </div>
    </section>
  );
}

export default PostHeader
