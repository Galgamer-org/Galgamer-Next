import { getPostBySlug, getAllPosts, getPostByAbbrlink } from '../../../lib/api'
import ArticlePage from './pageClient'


//export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts(['slug', 'abbrlink'])
  let result =  posts.map((post) => {
    return {
        abbr: post.abbrlink.toString(),
    }
  })
  //console.log(result)
  return result
}

export default async function Article({params}){
  const post = getPostByAbbrlink(params.abbr, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'index_img',
    'excerpt',
    'abbrlink'
  ])
  return <ArticlePage
    post={post}
    morePosts={[]}
  ></ArticlePage>
}

type Params = {
  params: {
    slug: string
    abbr: number
  }
}

