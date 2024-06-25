import type { Metadata, ResolvingMetadata } from 'next';
import { getAllTags } from "lib/api";
import Container from "@/components-layout/container";
import style from "@/styles/members.module.css";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";
import PostsByYears from '@/components/posts-by-year';
import PostType from '@/interfaces/post';
import Link from 'next/link';

type MetadataProps = {
  params: { tag: string }
}

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const posts = getAllTags()[tag];


  return {
    metadataBase: new URL('https://galgamer.moe'),
    title: `Tag: ${tag}`,
    description: `共 ${posts.length} 篇文章`, //`標籤：${tag}
    // keywords: post.keywords,

    openGraph: {
      title: `Tag: ${tag}`,
      description: `共 ${posts.length} 篇文章`, //`標籤：${tag}
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
      title: `Tag: ${tag}`,
      description: `共 ${posts.length} 篇文章`,
      // images: [thisMember.photo],  // need fix
    },
  }
}

const env = process.env.NODE_ENV



export function generateStaticParams() {
  const params = Object.keys(getAllTags()).map((tagName) => {
    return { tag: tagName };
  });

  const temp = [];
  params.forEach((param) => {
    const encoded = encodeURIComponent(param.tag);
    if (encoded !== param.tag) {
      //console.log(`Tag ${param.tag} is encoded to ${encoded}`);
      temp.push({ tag: encoded });
    }
  });
  if (env == "development") {
    params.push(...temp);
  }

  //console.log(params);
  return params;
}



export default function TagPostList({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getAllTags()[tag];
  if (!posts) {
    throw Error(`Tag ${tag} not found, and original tag is ${params.tag}`);
  }

  return (
    <>
      <TagInfo tag={tag} length={posts.length} />
      <PostOfTag posts={posts} />
    </>
  );
}

function TagInfo({ tag, length }: { tag: string, length?: number }) {
  return (
    <Container className="px-2">
      <BookmarkContainer title={
        <Link
          scroll={false}
          href="/tags"
          className={cn(style.tagLink, 'd-inline-block px-2 py-1 text-decoration-none')}
        ><i className="bi bi-arrow-left-circle-fill me-1" />所有 Tags</Link>
      }>
        <div className="container myfont py-5">
          <div className={cn('w-100 px-3 px-lg-5')}>
            <h1 className="text-4xl fw-bold">
              Tag: {tag}
            </h1>
            <p className="h5 mt-2 text-lg">
              共 {length} 篇文章
            </p>
          </div>
        </div>
      </BookmarkContainer>
    </Container>
  );
}

function PostOfTag({ posts }: { posts: PostType[] }) {
  return (
    <Container className="px-2">
      <PostsByYears posts={posts} />
    </Container>
  );
}
