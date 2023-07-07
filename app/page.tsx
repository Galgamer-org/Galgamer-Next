import { getAllPosts } from '../lib/api'
import IndexPage from './pageClient'

export default function Index(){
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])
  return <IndexPage allPosts={allPosts}></IndexPage>
}
