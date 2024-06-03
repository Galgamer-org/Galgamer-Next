'use client'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import cn from 'classnames'
import style from 'styles/header.module.css'
import Logo from 'components/logo'
import SetTheme from 'components-widget/theme.util'

const SiteLogo = '/img/logo.png'

export default function Header() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const size = useWindowSize();

  // close the offcanvas menu when screen size is large
  useEffect(() => {
    if (size.width > 992) {
      setExpanded(false);
    }
  }, [size]);

  return (
    <header className={style.header}>
      <Navbar className={cn(style.navbar, 'fw-bold navbar box-shadow')} expand="lg" expanded={expanded}>
        <Container>
          <div className={cn("d-lg-none", style.navLeftSpace)}></div>
          <Link href='/' className={cn(style.navbarBrand, 'navbar-brand font-serif mx-auto')}>
            {/* <Image src={SiteLogo} width="90" height="90" alt="Galgamer Logo" /> */}
            <span className={cn(style.navbarText, '')}><Logo /><em>Galgamer</em></span>
          </Link>

          <Navbar.Toggle className={cn(style.navbarToggle)} aria-controls="navbarNav" onClick={() => setExpanded(expanded ? false : true)}>
            <i className='bi bi-three-dots'></i>
          </Navbar.Toggle>

          <Navbar.Offcanvas
            id={"navbarNav"}
            aria-labelledby={"navbarNavLabel"}
            placement="start"
            className={cn(style.navbarOffcanvas)}
            onHide={() => setExpanded(false)}
          >
            <Offcanvas.Header>
              <Offcanvas.Title className={style.offcanvasTitle} id={`navbarNavLabel`}>
                <span className={cn(style.navbarText, 'font-serif')}><Logo /><em>Galgamer</em></span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            {/* <hr className='text-white d-lg-none' /> */}
            <Offcanvas.Body>
              <Nav
                defaultActiveKey='/'
                activeKey={pathname}
                //as="ul"
                className={cn('ms-auto font-serif', style.navbarNav)}

              //onSelect={(selectedKey) => {setSelection(selectedKey ? selectedKey : "/")}}
              // onSelect={(selectedKey) => {alert(selectedKey)}}
              >
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link as={Link} href="/" className={cn(style.navbarText, '')}>
                    <i className="bi-house-door-fill me-1"></i>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link as={Link} href="/tags" className={cn(style.navbarText, '')}>
                    <i className="bi-tags-fill me-1"></i>
                    Tags
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link as={Link} href="/categories" className={cn(style.navbarText, '')}>
                    <i className="bi-inboxes-fill me-1"></i>
                    Categories
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link as={Link} href="/members" className={cn(style.navbarText, '')}>
                    <i className="bi-person-fill me-1"></i>
                    Characters
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link as={Link} href="/music" className={cn(style.navbarText, '')}>
                    <i className="bi-music-note-beamed me-1"></i>
                    Music
                  </Nav.Link>
                </Nav.Item>

                {/*主题切换*/}
                <Nav.Item>
                  <SetTheme />
                </Nav.Item>

                {/* separator */}
                <hr className='text-white d-lg-none' />
                {/* close button */}
                <Nav.Item onClick={() => setExpanded(false)}>
                  <Nav.Link className={cn(style.navbarText, 'd-lg-none')}>
                    <i className="bi-x-lg me-1"></i>
                    Close
                  </Nav.Link>
                </Nav.Item>

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>

        </Container>
      </Navbar>
    </header>

  );

}


function Header2() {
  const pathname = usePathname();

  return (
    <header className={style.header}>
      <Navbar className={cn(style.navbar, 'navbar box-shadow')} expand="lg">
        <Container>
          <Link href='/' className={cn(style.navbarBrand, 'navbar-brand font-serif')}>
            {/* <Image src={SiteLogo} width="90" height="90" alt="Galgamer Logo" /> */}
            <span className={cn(style.navbarText, '')}><Logo /><em>Galgamer</em></span>
          </Link>

          <Navbar.Toggle aria-controls="navbarNav">
            <i className='bi bi-three-dots'></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarNav">
            <Nav
              defaultActiveKey='/'
              activeKey={pathname}
              as="ul"
              className={cn('ms-auto', style.navbarNav)}

            //onSelect={(selectedKey) => {setSelection(selectedKey ? selectedKey : "/")}}
            // onSelect={(selectedKey) => {alert(selectedKey)}}
            >
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/" className={cn(style.navbarText, '')}>
                  <i className="bi-house-door-fill me-1"></i>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/tag" className={cn(style.navbarText, '')}>
                  <i className="bi-tag-fill me-1"></i>
                  Tag
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/categories" className={cn(style.navbarText, '')}>
                  <i className="bi-inboxes-fill me-1"></i>
                  Categories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/members" className={cn(style.navbarText, '')}>
                  <i className="bi-person-fill me-1"></i>
                  Members
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} href="/music" className={cn(style.navbarText, '')}>
                  <i className="bi-music-note-beamed me-1"></i>
                  Music
                </Nav.Link>
              </Nav.Item>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  );

}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}