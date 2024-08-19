import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Container from 'components-layout/container'
import style from '@/styles/mainvisual.module.css'
import cn from 'classnames'
import React from 'react';

type Props = {
  title: string
  index_img: string
  date: Date
  author: string
  excerpt: string
}

function PostHeader({ title, index_img, date, author, excerpt }: Props) {
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
      <MainVisualH1
        title={title}
        description={excerpt}
        details={
          <div className=''>
            <Avatar name={author} />
            <DateFormatter dateObj={date} />
          </div>
        }
        cssClass={"thisPostHeader"}
      ></MainVisualH1>
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
        className={cn(style.banner, 'container-board mx-auto mt-4 mb-3 box-shadow d-flex align-items-center mainvisualBanner')}
      >
        <div className={cn('w-100 h-100 mainvisualBgMasked', style.bgMasked)}></div>
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
