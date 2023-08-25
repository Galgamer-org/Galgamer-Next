'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import Alert from '../components/alert'
import Footer from '../components/footer'
import Container from '../components/container'
import { Container as BsContainer } from "react-bootstrap"

type Props = {
  preview?: boolean
  children: React.ReactNode
}

// persistant element across pages
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    preview,
    children,
  }: Props) {
    

    return (
      <html lang="en">
      <body>

      <Alert preview={preview} />
      <main>{children}</main>

          <Footer />
      </body>
    </html>
    )
  }