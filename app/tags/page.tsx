import style from "styles/tags.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import BookmarkContainer from "@/components/bookmark-container";
import type { Metadata } from "next";
import { getAllTags } from "lib/api";
import Link from "next/link";

export const metadata: Metadata = {
  title: '標籤',
  description: "文章標籤分類",
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    siteName: 'Galgamer',
    url: '/tags',
    title: '標籤',
    description: '文章標籤分類',
  },
  twitter: {
    title: '標籤',
    description: '文章標籤分類',
  },
}

export default async function Tags() {
  const _tags = getAllTags()
  const tagsSortByCount = Object.entries(_tags).sort((a, b) => b[1].length - a[1].length);

  return (
    <Container className="px-2">
      <MainVisualH1
        title={'標籤' + ' (' + tagsSortByCount.length + ')'}
        description="Tags"
        details="文章標籤分類"
        cssClass={style.tagsMainVisual}
      >
      </MainVisualH1>
      <section>
        <div className={cn('container-board', 'mx-auto box-shadow')}>
          <div className={cn('', 'p-3 p-lg-5 justify-contents-center')}>

            {tagsSortByCount.map(([tag, posts], index) => (
              // first 10 have size 50, next 10 have size 45, the rest have size 38
              <TagCell key={index} tag={tag} length={posts.length} 
                size={posts.length >= 10 ? 60 : posts.length >= 5 ? 45 : 38}
              />
            ))}
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


function TagCell({ tag, length, size = 38 }: { tag: string, length?: number, size?: number}) {
  // size can have 38 45 50;
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} className={cn('d-inline-flex text-decoration-none m-2', style.container, "align-items-center")}
      style={{"--height": size + "px"} as React.CSSProperties}
    >
      <div className={cn(style.name, "font-weight-bold ms-3 me-2 myfont")}>
        <i className="bi bi-tag-fill me-1"></i>
        {tag}
      </div>
      <div className={cn(style.count, "")}>
        {length}
      </div>
    </Link>
  );
}