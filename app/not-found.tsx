import style from '@/styles/notfound.module.css';
import bmstyle from '@/styles/bookmark-container.module.css';

import cn from 'classnames';
import Container from "@/components-layout/container";
import Link from 'next/link';
import { ReactNode } from 'react';

export default function NotFoundPage() {
  return (
    <Container className="px-2 h-100">
      <style >{`
        main {
          margin: auto 0;
        }
      `}</style>
      <BookmarkContainer title={
        <Link
          href="/"
          scroll={false}
          className={cn(style.tagLink, 'd-inline-block px-2 py-1 text-decoration-none')}
        ><i className="bi bi-arrow-left-circle-fill me-1" />返回主頁</Link>
      }>
        <div className={cn(style.words, "container myfont py-5")}>

            <div className={cn('w-100 px-3 px-lg-5')}>
              <h1 className="text-4xl fw-bold">
                找不到網頁...
              </h1>
              <p className="h5 mt-2">
                404 Not Found
              </p>
              <p className="h5 mt-2">
                你捨得打破這片寧靜嗎？
              </p>
            </div>
            <div className={style.bgContainer}></div>
        </div>
      </BookmarkContainer>
    </Container>
  );
}

function BookmarkContainer({ title, children }: { title: ReactNode, children?: ReactNode }) {
  return (
    <section className={bmstyle.bookmarkContainer}>
      <div className={cn(bmstyle.bookmark, 'box-shadow p-2 ms-4 ms-md-5 pe-5')}>
        <div className={cn('d-flex align-items-center h-100', bmstyle.sectionTitle)}>
          <div className={cn('ms-2')}>
            <h2 className={cn('text-decoration-none fw-bold fst-italic h3')}>
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className={cn('container-board', 'mx-auto box-shadow o-hidden')}>
        {children}
      </div>
    </section>
  );
}