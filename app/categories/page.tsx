
import style from "styles/categories.module.css";
import cn from 'classnames';
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import type { Metadata } from "next";
import { getCategoryTree } from "lib/api";
import { WalkCategoryTree } from "./tree";

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
            {WalkCategoryTree(categoryTree, [])}

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
