import { getAllPosts, isTechnicalReport } from 'lib/api'
import Container from 'components-layout/container'
import PostPreview from 'components/post-preview'
import cn from 'classnames'
import style from 'styles/channel.module.css'
import { Col, Row } from 'react-bootstrap'
import { notFound } from 'next/navigation'

const channels = [
  {
    name: 'recommanded-games',
    title: '遊戲推薦',
    description: 'For You',
    color: 'bg-info',
    isTechnicalReport: false,

  },
  {
    name: 'technical-report',
    title: '技術報告',
    description: 'Dive Deep',
    color: 'bg-warning',
    isTechnicalReport: true,
  }
];

export async function generateStaticParams() {
  let result = channels.map((channel) => {
    return {
      name: channel.name,
    }
  })
  //console.log(result)
  return result
}

export default function Channel({params}: { params: { name: string }}) {
  //console.log(params);
  
  const channel = channels.find(channel => channel.name === params.name);
  if (!channel) {
    notFound();
  }

  //console.log(channel);
  const allPosts = getAllPosts();
  const posts = allPosts.filter(post => channel.isTechnicalReport === isTechnicalReport(post));
  return (
    <>
      <section className={cn(channel.color)}>
        <Container className={cn(style.banner ,'w-100 h-100 d-flex align-items-center')}>

            <div className={cn('')}>
              <h1 className="text-4xl font-bold">
                {channel.title}
              </h1>
              <p className="h5 mt-2 text-lg">
                {channel.description}
              </p>
            </div>

        </Container>
      </section>
      <section>
        <Container className={cn(style.postArea)}>
          <Row className={cn('my-3 px-1 px-md-2 px-xl-4')}>
          {posts.map((post) => (
            <Col className={cn('col-12 col-md-6 col-xl-4 d-flex')} key={post.slug}>
              <PostPreview
                title={post.title}
                index_img={post.index_img}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                abbr={post.abbrlink}
              />
            </Col>
          ))}
        </Row>
        </Container>
      </section>
    </>
    // <Container>
    //     <div className="flex flex-col items-center justify-center w-full">
    //         <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
    //             {channel.title}
    //         </h1>
    //         <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400">
    //             {channel.description}
    //         </p>
    //     </div>
    //     <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
    //         {posts.map((post) => (
    //             <PostPreview
    //                 key={post.slug}
    //                 title={post.title}
    //                 index_img={post.index_img}
    //                 date={post.date}
    //                 author={post.author}
    //                 slug={post.slug}
    //                 excerpt={post.excerpt}
    //                 abbr={post.abbrlink}
    //             />
    //         ))}
    //     </div>
    // </Container>
  )
}