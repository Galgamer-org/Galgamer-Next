
import style from "styles/categories.module.css";
import cn from 'classnames';
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import type { Metadata } from "next";
import { getCategoryTree, getPostBySlug } from "lib/api";
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

function countSubTreeLeaves(tree: CategoryTree): number {
  return Object.values(tree).reduce((acc, { posts, children }) => {
    if (posts) {
      acc += posts.length;
    }
    if (children) {
      acc += countSubTreeLeaves(children);
    }
    return acc;
  }, 0);
}

function WalkCategoryTree(tree: CategoryTree): ReactNode {
  return (
    <ul className={cn(style.treeUl)}>
      {Object.entries(tree)
        .sort(([aName, aData], [bName, bData]) => {
          const aLeaves = countSubTreeLeaves(
            { [aName]: aData }
          );
          const bLeaves = countSubTreeLeaves(
            { [bName]: bData }
          );
          return bLeaves - aLeaves;
        })
        .map(([categoryName, categoryData]) => (
          <div className={cn(style.tree)} key={categoryName}>
            <details className="my-4">
              <summary className="d-flex align-items-center">
                <div className={cn(style.categoryIcon)}>
                  <i className="bi bi-caret-right-fill"></i>
                </div>
                <div className={cn('fw-bold', style.categoryTitle)}>{categoryName}</div>
                <div className={cn('ms-auto fw-bold', style.categoryCount)}>
                  {countSubTreeLeaves(
                    { [categoryName]: categoryData }
                  )}<i className="bi bi-file-earmark-text-fill ms-1"></i>

                </div>
              </summary>
              {categoryData.posts &&
                <ul>
                  {categoryData.posts.map((post) => (
                    <li key={categoryName + post} className="my-3 fw-bold">
                      <a href={`/article/${getPostBySlug(post).abbrlink}`}>
                        {getPostBySlug(post).title}
                      </a>
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
          <div className={cn(style.treeWrap, 'px-3 px-lg-5 py-3 py-lg-5 justify-contents-center')}>
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
