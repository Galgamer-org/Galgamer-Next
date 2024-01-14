import React, { ReactNode } from 'react';
import cn from 'classnames';
import style from '@/styles/bookmark-container.module.css';


export default function BookmarkContainer({ title, children }: { title: ReactNode, children?: ReactNode }) {
    return (
      <section className={style.bookmarkContainer}>
        <div className={cn(style.bookmark, 'box-shadow p-2 ms-4 ms-md-5')}>
          <div className={cn('d-flex o-hidden align-items-center h-100', style.sectionTitle)}>
            <div className={cn('ms-2')}>
              <h2 className={cn('text-decoration-none fw-bold fst-italic h3')}>
                {title}
              </h2>
            </div>
          </div>
        </div>
        <div className={cn('container-board', 'mx-auto p-1 p-md-2 box-shadow')}>
          {children}
        </div>
      </section>
    );
  }