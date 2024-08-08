import CategoryTree from "@/interfaces/category-tree";
import { ReactNode } from "react";
import Link from "next/link";
import { getCategoryTree, getPostBySlug } from "lib/api";

import style from "styles/categories.module.css";
import cn from 'classnames';

export function countSubTreeLeaves(tree: CategoryTree): number {
  return Object.values(tree).reduce((acc, data) => {
    if (data === undefined) debugger;
    const { posts, children } = data;
    if (posts) {
      acc += posts.length;
    }
    if (children) {
      acc += countSubTreeLeaves(children);
    }
    return acc;
  }, 0);
}

export function WalkCategoryTree(
  tree: CategoryTree,
  traversalPath: string[],  // [] for root, ['category1', 'category2'] for sub-category
  defaultOpenLevel = 0,
)
  : ReactNode {
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
            <details className="my-4" open={defaultOpenLevel > 0}>
              <summary className="d-flex align-items-center">
                <div className={cn(style.categoryIcon)}>
                  <i className="bi bi-caret-right-fill"></i>
                </div>
                <div className={cn('fw-bold', style.categoryTitle)}>{categoryName}</div>
                <Link
                  className={cn('d-block ms-auto fw-bold', style.categoryCount)}
                  href={`/categories/${traversalPath.join('/')}${traversalPath.length !== 0 ? '/' : ''}${categoryName}`}
                >
                  {countSubTreeLeaves(
                    { [categoryName]: categoryData }
                  )}
                  <i className="bi bi-file-earmark-text-fill ms-1"></i>
                  <i className="bi-arrow-right-circle-fill ms-1"></i>
                </Link>
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
              {categoryData.children
                && WalkCategoryTree(categoryData.children, [...traversalPath, categoryName], defaultOpenLevel - 1)}
            </details>
          </div>
        ))}
    </ul>
  );
}