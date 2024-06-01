import cn from 'classnames';
import MainVisualH1 from '@/components/MainVisualH1';
import Container from 'components-layout/container';
import '@/styles/github-markdown.css'
import ImageData from '@/interfaces/draw-guess-image';
import styles from '@/styles/draw-guess.module.css';
import { ZoomImage, ZoomImg } from '@/components/zoom-image';
import { Metadata } from 'next'
import CustomDetails from './pageClient';


const INDEX_URL = "https://storage-zone1.galgamer.moe/draw-guess-index-deadbeef/index.json";

export const metadata: Metadata = {
  title: "你畫我猜作品集",
  description: "Draw & Guess Artworks",
  keywords: ['Galgamer', '你畫我猜', '遊戲'],

  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    siteName: 'Galgamer',
    url: '/event/draw-guess',
    title: '你畫我猜作品集',
    description: 'Draw & Guess Artworks',
    images: '/site-assets/metadata/draw-guess.png',
  },
  twitter: {
    title: '你畫我猜作品集',
    description: 'Draw & Guess Artworks',
    card: 'summary_large_image',
    images: '/site-assets/metadata/draw-guess.png',
  },
}

export default async function DrawGuessGallery() {

  const data = await fetch(INDEX_URL).then((res) => res.json());
  // to 年 月 日 時：分
  const lastUpdate = new Date(data._last_update * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' });
  const images: ImageData[] = data._images//.slice(0, 30)
    .map((image: any) => {
      return Object.assign(new ImageData(), image);
    });

  // group the images by each day
  const imagesByDay: Record<string, ImageData[]> = images.reduce((acc, image) => {
    const date = new Date(image._created_time * 1000).toLocaleDateString('zh-CN', { timeZone: 'Asia/Hong_Kong' })
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(image);
    return acc;
  }, {});
  //console.log(imagesByDay);

  return (
    <Container className='px-2'>
      <MainVisualH1
        title={`你畫我猜作品集 (${images.length})`}
        description='Draw & Guess Artworks'
        details='你畫我猜 by Galgamer'
        cssClass={styles.drawGuessH1}
      ></MainVisualH1>
      <section>
        <div className={cn('container-board', 'mx-auto p-1 p-md-2 box-shadow')}>
          <div
            className={cn('markdown-body', 'p-3 p-lg-5', styles.drawGuessContents)} // it is not markdown, but i use the style
          >
            <p>
              {/* 平均一張圖 100K */}
              最後更新時間: {lastUpdate}．
            </p>
            <p>
              「你畫我猜」是 Galgamer 的羣內活動．每位參與者畫出上一個玩家的描述，並猜出上一個玩家的畫作．遊戲的最後進行鑑賞大會，共同分享奇妙的作品和猜測．
            </p>
            <p>
              如果你想加入我們的遊戲，請關注 Galgame 交流群，管理員會定期在群內發布活動通知．<br />
              此外，我們的畫猜詞庫和遊戲規則在這個 GitHub 倉庫，<a href='https://github.com/Galgamer-org/Draw-Guess-Keywords' target='_blank'>🔗Draw-Guess-Keywords</a>，請前往查看．
            </p>

            {/* <details>
              <summary><strong>目錄</strong></summary>
              <ul>
                {Object.keys(imagesByDay).map((date) => (
                  <li key={date}><a href={`#${date} 作品 (${imagesByDay[date].length})`}>{date} 作品 ({imagesByDay[date].length})</a></li>
                ))}
              </ul>
            </details> */}

            {Object.entries(imagesByDay).map(([date, images], index) => {
              return (
                <div key={date}>
                  <CustomDetails defaultOpen={index < 2} 
                    title={
                      <>
                        <span className="anchor" id={`${date} 作品 (${images.length})`} style={{
                          position: 'absolute',
                          transform: 'translateY(-30vh)',
                        } as React.CSSProperties}></span>
                        <h2 key={date + 'title'} className='my-2'>
                          {date} 作品 ({images.length})
                        </h2>
                      </>
                    }
                    >
                    <div className='d-flex flex-wrap'>
                      {images.map((image: ImageData) => (
                        <div key={image._hash} className='col-12 col-md-4 col-lg-3 p-3 '>
                          <div className='o-hidden rounded box-shadow'>
                            <ZoomImg
                              src={image.getURL()}
                              alt={image._draw_what ? `${image._draw_what} by ${image._author}` : image._created_time_readable}
                              width={image._width}
                              height={image._height}
                              className='h-auto'
                              loading='lazy'
                              decoding='async'
                            >
                            </ZoomImg>

                          </div>
                          {image._draw_what &&
                            <div className='pt-2'>
                              <p className='m-0'><span className=' fst-italic fw-bolder'>{image._draw_what}</span><br />@{image._author}</p>
                            </div>
                          }
                          {!image._draw_what &&
                            <div className='pt-2'>
                              <p className='m-0'>{new Date(image._created_time * 1000).toLocaleTimeString('zh-CN', { timeZone: 'Asia/Hong_Kong' })}</p>
                            </div>
                          }
                        </div>
                      ))}
                    </div>

                  </CustomDetails>
                </div>
              );

            })}

          </div>
        </div>
      </section>
    </Container>
  );
}



