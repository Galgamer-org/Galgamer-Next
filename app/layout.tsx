import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/colors.css'
import '../styles/main.css'
import '../styles/s3fonts-woff-woff2.css'
import '../styles/fonts.css'
import Footer from '../components-layout/footer'
import Header from '../components-layout/Header'

type Props = {
  children: React.ReactNode
}
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: 'Galgamer',
  description: 'Galgamer Home Page',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://galgamer.moe',
    title: 'Galgamer',
    description: 'Galgamer Home Page',
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
      <body>
        <Header />
        <main className='main-container'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
    )
  }