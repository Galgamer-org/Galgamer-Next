'use client'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const SiteLogo = '/img/logo.png'

export default function Header() {
  const pathname = usePathname();

  return (
    <header id="header">
      <Navbar className='navbar navbar-light bg-light' expand="lg">
        <Container>
          <Link href='/' className='navbar-brand'>
            <Image src={SiteLogo} width="90" height="90" alt="Galgamer Logo" />
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
                <Nav.Link as={Link} href="/" className='nav-link'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/tag" className='nav-link'>Tag</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/categories" className='nav-link'>Categories</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/members" className='nav-link'>Members</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/music" className='nav-link'>Music</Nav.Link>
              </Nav.Item>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  );

}