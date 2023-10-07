'use client'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import cn from 'classnames'
import style from 'styles/header.module.css'

const SiteLogo = '/img/logo.png'

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={style.header}>
      <Navbar className={cn(style.navbar, 'navbar')} expand="lg">
        <Container>
          <Link href='/' className='navbar-brand'>
            {/* <Image src={SiteLogo} width="90" height="90" alt="Galgamer Logo" /> */}
            <span className={cn(style.navbarText, '')}><em>Galgamer</em></span>
          </Link>

          <Navbar.Toggle aria-controls="navbarNav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarNav">
            <Nav
              defaultActiveKey='/'
              activeKey={pathname}
              as="ul"
              className='navbar-nav'
              //onSelect={(selectedKey) => {setSelection(selectedKey ? selectedKey : "/")}}
              // onSelect={(selectedKey) => {alert(selectedKey)}}
            >
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/" className={cn(style.navbarText, '')}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/tag" className={cn(style.navbarText, '')}>Tag</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/categories" className={cn(style.navbarText, '')}>Categories</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/members" className={cn(style.navbarText, '')}>Members</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/music" className={cn(style.navbarText, '')}>Music</Nav.Link>
              </Nav.Item>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  );

}