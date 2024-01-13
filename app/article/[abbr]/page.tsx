import { getPostBySlug, getAllPosts, getPostByAbbrlink } from '../../../lib/api'
import markdownToHtml from '../../../lib/markdownToHtml'
import Container from '../../../components-layout/container'
import PostHeader from '../../../components/post-header'
import markdownStyles from '/styles/github-markdown-light.module.css'
import { ReactNode } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import cn from 'classnames'
import { parse } from 'path'

//export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts();
  let result = posts.map((post) => {
    return {
      abbr: post.abbrlink.toString(),
    }
  })
  //console.log(result)
  return result.slice(0, 5);
}


type MetadataProps = {
  params: { abbr: string }
}
 
export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const abbr = params.abbr

  const post = getPostByAbbrlink(parseInt(abbr));
 
  return {
    metadataBase: new URL('https://galgamer.moe'),
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: 'https://nextjs.org',
      siteName: 'Galgamer',
      images: [
        {
          url: post.index_img,  // need fix
        }
      ],
      locale: 'zh_TW',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.index_img],  // need fix
    },
  }
}



export default async function Article({ params }) {
  const post = getPostByAbbrlink(params.abbr)
  const content = markdownToHtml(post.content)

  return <div className={cn('container-xl')}>
      <article className="mb-32">
        <PostHeader
          title={post.title}
          index_img={post.index_img}
          date={post.date}
          author={post.author}
        />
        <PostBody content={content} />
      </article>

  </div>
}


function PostBody ({ content }: {
  content: ReactNode
}) {
  return (
    <div className="mx-auto">
      <div
        className={cn(markdownStyles['markdown-body'], 'px-1 px-md-3 px-lg-5')}
        children={content}
      />
    </div>
  )
}

