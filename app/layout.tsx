import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/colors.css';
import '@/styles/s3fonts-woff-woff2.css';
import '@/styles/fonts.css';
import '@/styles/main.css';
import Footer from '../components-layout/footer';
import Header from '../components-layout/Header';
import ReturnTopButton from '@/components/ReturnTop';
import { ViewTransitions } from 'next-view-transitions'

import type { Metadata } from 'next';


type Props = {
  children: React.ReactNode
};

const urlBase = 'https://galgamer.moe'; 

export const metadata: Metadata = {
  title: {
    template: '%s - Galgamer',
    default: 'Galgamer',
  },
  description: '因爲你是一個一個一個 <Galgamer/美少女> 啊啊啊啊阿',
  openGraph: {
    type: 'website',
    title: 'Galgamer',
    url: urlBase,
    siteName: 'Galgamer',
    description: '因爲你是一個一個一個 <Galgamer/美少女> 啊啊啊啊阿',
    images: '/site-assets/metadata/homepage.png',
    locale: 'zh_HK',
  },
  twitter: {
    card: 'summary',
    title: 'Galgamer',
    description: '因爲你是一個一個一個 <Galgamer/美少女> 啊啊啊啊阿',
    creator: '@Galgame_Channel',
    images: '/site-assets/metadata/homepage.png',
  },
  metadataBase: new URL(urlBase),
  referrer: 'origin-when-cross-origin',
  keywords: ['Galgame', '美少女', '遊戲'],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// persistant element across pages
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: Props) {


  return (
    <ViewTransitions>
      <html lang="zh-Hant">
        <head>

          <script dangerouslySetInnerHTML={
            {
              __html: `
              const _themeLocalStorage = localStorage.getItem('theme');
              // console.log('themeSystem: ', _themeLocalStorage);
              if (_themeLocalStorage) {
                document.querySelector(':root').dataset.theme = _themeLocalStorage;
              }
              `
            }
          }></script>

        </head>
        <body>
          <Header />
          <main className='main-container'>
            {children}
          </main>
          <div className='my-3' />
          <ReturnTopButton />
          <Footer />
          <div className='background-layer-😁👍🏻' />
        </body>
      </html>
    </ViewTransitions>
  )
}