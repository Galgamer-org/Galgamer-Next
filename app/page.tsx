import { getAllPosts } from '../lib/api'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

export default function Index(){
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'index_img',
    'excerpt',
    'abbrlink'
  ])
  return <IndexPage allPosts={allPosts}></IndexPage>
}

type Props = {
  allPosts: Post[]
}

function IndexPage({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
      <>
          <Container>
              <Intro />
              {heroPost && (
                  <HeroPost
                      title={heroPost.title}
                      index_img={heroPost.index_img}
                      date={heroPost.date}
                      author={heroPost.author}
                      slug={heroPost.slug}
                      excerpt={heroPost.excerpt}
                      abbr={heroPost.abbrlink}
                  />
              )}
              { morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>

      </>
  )
}