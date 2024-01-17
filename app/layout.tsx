import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/colors.css';
import '@/styles/s3fonts-woff-woff2.css';
import '@/styles/fonts.css';
import '@/styles/main.css';
import Footer from '../components-layout/footer';
import Header from '../components-layout/Header';
import type { Metadata } from 'next';


type Props = {
  children: React.ReactNode
};

export const metadata: Metadata = {
  title: {
    template: '%s - Galgamer',
    default: 'Galgamer',
  },
  description: 'Galgamer Home Page',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Galgamer',
    url: 'https://next.galgamer.moe',
    title: 'Galgamer',
    description: 'Galgamer Home Page',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galgamer',
    description: 'Galgamer Home Page',
  },
  metadataBase: new URL('https://next.galgamer.moe'),
  generator: 'Next.js',
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
    <html lang="zh-Hant">
      <head>

        <script dangerouslySetInnerHTML={
          {
            __html: `
            let _themeLocalStorage = localStorage.getItem('theme');
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
        <Footer />
      </body>
    </html>
  )
}