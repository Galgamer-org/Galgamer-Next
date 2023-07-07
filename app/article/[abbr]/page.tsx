import { getPostBySlug, getAllPosts } from '../../../lib/api'
import ArticlePage from './pageClient'

//export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts(['slug'])
  let result =  posts.map((post) => {
    return {
        abbr: post.slug,
    }
  })
  //console.log(result)
  return result
}

export default async function Article({params}){
  const post = getPostBySlug(params.abbr, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  return <ArticlePage
    post={post}
    morePosts={[]}
  ></ArticlePage>
}

type Params = {
  params: {
    slug: string
  }
}


