
import style from "styles/categories.module.css";
import cn from 'classnames';
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import BookmarkContainer from "@/components/bookmark-container";
import type { Metadata } from "next";
import { getCategoryTree, getPostBySlug } from "lib/api";
import Link from "next/link";
import CategoryTree from "@/interfaces/category-tree";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: '分類',
  description: "文章類別",
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    siteName: 'Galgamer',
    url: '/categories',
    title: '分類',
    description: '文章類別',
  },
  twitter: {
    title: '分類',
    description: '文章類別',
  },
}

function panic() {
  debugger;
  return '6';
}

function WalkCategoryTree(tree: CategoryTree): ReactNode {
  return (
    <ul>
      {Object.entries(tree).map(([categoryName, categoryData]) => (
        <div className={cn(style.tree)} key={categoryName}>
          <details className="my-3">
            <summary className="h5 fw-bold">{categoryName}</summary>
            {categoryData.posts &&
              <ul>
                {categoryData.posts.map((post) => (
                  <li key={categoryName + post} className="my-3 fw-bold">
                    <Link href={`/article/${getPostBySlug(post).abbrlink}`}>
                      {getPostBySlug(post).title}
                    </Link>
                  </li>
                ))}
              </ul>
            }
            {categoryData.children && WalkCategoryTree(categoryData.children)}
          </details>
        </div>
      ))}
    </ul>
  );
}

export default async function Categories() {
  const categoryTree = getCategoryTree();

  return (
    <Container className="px-2">
      <MainVisualH1
        title={'分類'}
        description="Categories"
        details="文章分類"
        cssClass={style.categorysMainVisual}
      >
      </MainVisualH1>
      <section>
        <div className={cn('container-board', 'mx-auto box-shadow')}>
          <div className={cn('', 'p-3 p-lg-5 justify-contents-center')}>
            {WalkCategoryTree(categoryTree)}

          </div>
        </div>
      </section>
      {/* <BookmarkContainer title={
                  <><i className="bi bi-emoji-wink-fill me-2"></i>Tags2</>
              }>
                  <MembersBody list={members} />
              </BookmarkContainer> */}
    </Container>
  );
}
