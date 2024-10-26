import type { Metadata, ResolvingMetadata } from 'next';
import { getCategoryTree, getPostBySlug } from "lib/api";
import Container from "@/components-layout/container";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";
import PostsByYears from '@/components/posts-by-year';
import Link from 'next/link';
import CategoryTree from "@/interfaces/category-tree";
import style from "styles/categories.module.css";
import { countSubTreeLeaves, WalkCategoryTree } from '../tree';
import React from 'react';


type Params = Promise<{ categoryPath: string[] }>;

type CategoryData = {
  posts?: string[],
  children?: CategoryTree
}

export async function generateMetadata(
  props: { params: Params },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const categoryPath = params.categoryPath.map(decodeURIComponent);
  const categoryTree = getCategoryTree();

  const temp = categoryPath.slice();
  const thisCategory = temp.pop()!;
  const parentCategory = temp.pop();
  // if parentCategory is undefined, then parentCategory is a root category
  const categoryData: CategoryData = categoryPath.reduce((acc, categoryName) => {
    return acc.children[categoryName];
  }, {
    posts: [] as string[],
    children: categoryTree
  });
  const postCount = countSubTreeLeaves({ [thisCategory]: categoryData });


  return {
    metadataBase: new URL('https://galgamer.moe'),
    title: `Category: ${thisCategory}`,
    description: `共 ${postCount} 篇文章`, //`標籤：${tag}
    // keywords: post.keywords,

    openGraph: {
      title: `Category: ${thisCategory}`,
      description: `共 ${postCount} 篇文章`, //`標籤：${tag}
      // url: 'https://nextjs.org',
      siteName: 'Galgamer',
      // images: [
      //     {
      //         url: thisMember.photo,  // need fix
      //     }
      // ],
      locale: 'zh_HK',
      type: 'website',
    },

    twitter: {
      card: 'summary',
      title: `Category: ${thisCategory}`,
      description: `共 ${postCount} 篇文章`,
      // images: [thisMember.photo],  // need fix
    },
  }
}

const env = process.env.NODE_ENV

function walkAllPaths(
  tree: CategoryTree,
  traversalPath: string[],  // [] for root, ['category1', 'category2'] for sub-category
): string[][] {
  const result: string[][] = [];
  if (!tree) {
    return result;
  }
  Object.entries(tree).forEach(([categoryName, categoryData]) => {
    result.push([...traversalPath, categoryName]);
    const nextPath = [...traversalPath, categoryName];
    result.push(...walkAllPaths(categoryData.children!, nextPath));
  });
  return result;
}

export async function generateStaticParams() {
  const categoryTree = getCategoryTree();
  const paths = walkAllPaths(categoryTree, []);
  const params = paths.map(path => {
    return { categoryPath: path };
  });

  const temp = [];
  params.forEach((param) => {
    temp.push({ categoryPath: param.categoryPath.map(encodeURIComponent) });
  });
  if (env == "development") {
    params.push(...temp);
  }

  // console.log(params);
  return params;
}

export default async function CategoryPage(
  props: { params: Params }
) {
  const params = await props.params;
  const categoryPath = params.categoryPath.map(decodeURIComponent);
  return (
    <>
      <CategoryInfo categoryPath={categoryPath} />
      <CategoryContent categoryPath={categoryPath} />
    </>
  );
}

function CategoryContent({ categoryPath }: { categoryPath: string[] }) {
  const categoryTree = getCategoryTree();

  const temp = categoryPath.slice();
  const thisCategory = temp.pop()!;
  // if parentCategory is undefined, then parentCategory is a root category
  const categoryData: CategoryData = categoryPath.reduce((acc, categoryName) => {
    return acc.children[categoryName];
  }, {
    posts: [] as string[],
    children: categoryTree
  });

  let result: React.ReactNode;
  if (categoryData.children && Object.keys(categoryData.children!).length > 0) {
    result =
      <section>
        <div className={cn('container-board', 'mt-4 mx-auto box-shadow')}>
          <div className={cn(style.treeWrap, 'px-3 px-lg-5 py-3 py-lg-5 justify-contents-center')}>
            {WalkCategoryTree(
              {
                [thisCategory]: categoryData
              }, temp, 1)}

          </div>
        </div>
      </section>;
  } else {
    result = <PostsByYears
      posts={categoryData.posts!.map(post => getPostBySlug(post))}
    />;
  }

  return (
    <Container className="px-2">
      {result}
    </Container>
  );
}

function CategoryInfo({ categoryPath }: { categoryPath: string[] }) {
  const categoryTree = getCategoryTree();

  const temp = categoryPath.slice();
  const thisCategory = temp.pop()!;
  const parentCategory = temp.pop();
  // if parentCategory is undefined, then parentCategory is a root category
  const categoryData: CategoryData = categoryPath.reduce((acc, categoryName) => {
    return acc.children[categoryName];
  }, {
    posts: [] as string[],
    children: categoryTree
  });
  const postCount = countSubTreeLeaves({ [thisCategory]: categoryData });

  const urlToParent = parentCategory ?
    `/categories/${temp.join('/')}${temp.length !== 0 ? '/' : ''}${parentCategory}`
    : '/categories';

  const parentName = parentCategory ? parentCategory : '所有分類';

  return (
    <Container className="px-2">
      <BookmarkContainer title={
        <Link
          scroll={false}
          href={urlToParent}
          className={cn(style.tagLink, 'd-inline-block px-2 py-1 text-decoration-none')}
        ><i className="bi bi-arrow-left-circle-fill me-1" />{parentName}</Link>
      }>
        <div className="containe myfont py-5">
          <div className={cn('w-100 px-3 px-lg-5')}>
            <h1 className="text-4xl fw-bold">
              Category: {thisCategory}
            </h1>
            <p className="h5 mt-2 text-lg">
              所有分類
              {categoryPath.reduce((acc, categoryName) => {
                return [...acc, <i key={categoryName} className="mx-1 bi bi-arrow-right"></i>, categoryName];
              }, [] as React.ReactNode[])}
            </p>
            <p className="h5 mt-2 text-lg">
              共 {postCount} 篇文章
            </p>
          </div>
        </div>
      </BookmarkContainer>
    </Container>
  );
}
