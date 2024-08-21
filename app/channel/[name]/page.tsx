import { getAllPosts, getPostChannel } from 'lib/api'
import Container from 'components-layout/container'
import style from 'styles/channel.module.css'
import { notFound } from 'next/navigation'
import MainVisualH1 from '@/components/MainVisualH1'
import type { Metadata, ResolvingMetadata } from 'next'
import PostsByYears from '@/components/posts-by-year'
import { channels } from '@/_feed/channels'


type Props = {
  params: Record<string, string>
  searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  //const channel = channels.find(channel => channel.name === params.name);
  const channel = channels[params.name];

  if (!channel) {
    notFound();
  }
  return {
    title: channel.title,
    description: channel.description,
    keywords: ['Galgame', 'Galgame 推薦', '遊戲'],
    
    openGraph: {
      type: 'website',
      locale: 'zh_HK',
      siteName: 'Galgamer',
      url: '/channel/' + params.name,
      title: channel.title,
      description: channel.description,
      images: channel.metaImage,
    },
    twitter: {
      title: channel.title,
      description: channel.description,
      card: 'summary_large_image',
      images: channel.metaImage,
    },
     
  }
};

export async function generateStaticParams() {
  const result = Object.keys(channels).map((name) => {
    return {
      name: name,
    }
  })
  //console.log(result)
  return result
}



export default function Channel({ params }: { params: Record<string, string> }) {
  //console.log(params);

  const channel = channels[params.name];
  if (!channel) {
    notFound();
  }

  //console.log(channel);
  const allPosts = getAllPosts();
  const posts = allPosts.filter(post => params.name === getPostChannel(post));
  return (
    <Container className='px-2'>
      <MainVisualH1
        title={channel.title}
        description={channel.description}
        details={channel.details}
        cssClass={style[channel.cssClass]}
      ></MainVisualH1>
      <PostsByYears posts={posts} />
      {/* <section>
        <div className={cn('container-board', 'mx-auto p-1 p-md-2 box-shadow')}>
          <Row className={cn('pt-4 pt-md-4 mt-2 mx-0 px-1 px-md-2 px-xl-4 o-hidden')}>
            {posts.map((post) => (
              <Col className={cn('col-12 col-md-6 col-xl-4')} key={post.slug}>
                <PostPreview
                  post={post}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section> */}
    </Container>
  )
}