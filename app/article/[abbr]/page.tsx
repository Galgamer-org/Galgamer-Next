import { getPostBySlug, getAllPosts, getPostByAbbrlink } from '../../../lib/api'
import ArticlePage from './pageClient'
import markdownToHtml from '../../../lib/markdownToHtml'


//export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts();
  let result =  posts.map((post) => {
    return {
        abbr: post.abbrlink.toString(),
    }
  })
  //console.log(result)
  return result;
}

export default async function Article({params}){
  const post = getPostByAbbrlink(params.abbr)

  const content = markdownToHtml(post.content)
  return <ArticlePage
    post={post}
    morePosts={[]}
    content={content}
  ></ArticlePage>
}



