'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import Alert from '../components/alert'
import Footer from '../components-layout/footer'
import Header from '../components-layout/Header'
import Container from '../components-layout/container'
import { Container as BsContainer } from "react-bootstrap"

type Props = {
  children: React.ReactNode
}

// persistant element across pages
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: Props) {
    

    return (
      <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
    )
  }