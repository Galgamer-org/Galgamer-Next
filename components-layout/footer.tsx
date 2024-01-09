import Container from 'react-bootstrap/Container'
import style from 'styles/footer.module.css'
import cn from 'classnames'
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Logo from 'components/logo'


export default function Footer() {
  return (
    <footer id={style.footer} className={cn('box-shadow')}>
      <Container className={cn('p-4 mt-5')}>
        <Row className={cn('py-3', style.footerRow)}>

          {/* LOGO */}
          <div className={cn(style.ourLinks, 'col-lg-3')}>
            <div className={cn(style.footerLogo, 'font-serif')}><Logo /><em>Galgamer</em></div>
            <ul>
              <li>
                Galgame 社區 & 交流群，由熱愛美少女的群友們組成。
              </li>
              <li>
                由 Galgamer 編輯部負責維護。
              </li>
              <li>
                <strong>© 2017 - {new Date().getFullYear()}</strong> Galgamer
              </li>
            </ul>
          </div>
          <div className={cn(style.ourLinks, 'my-2 col-6 col-lg-3 offset-lg-1')}>
            <h5>
              社區
            </h5>
            <ul>
              <li className={cn(style.ourLinksItem)}>
                <a href="https://t.me/Galgamer_channel" target="_blank" rel="noopener noreferrer">
                  <i className="bi-telegram"></i> Galgame 頻道
                </a>
              </li>
              <li className={cn(style.ourLinksItem)}>
                <a href="https://t.me/Galgamer" target="_blank" rel="noopener noreferrer">
                  <i className="bi-telegram"></i> Galgame 交流群
                </a>
              </li>
              {/* discord */}
              <li className={cn(style.ourLinksItem)}>
                <a href="https://discord.gg/7z2P3q8" target="_blank" rel="noopener noreferrer">
                  <i className="bi-discord"></i> Galgamer
                </a>
              </li>
              {/* github */}
              <li className={cn(style.ourLinksItem)}>
                <a href="https://github.com/galgamer-org" target="_blank" rel="noopener noreferrer">
                  <i className="bi-github"></i> Galgamer
                </a>
              </li>
              {/* twitter */}
              <li className={cn(style.ourLinksItem)}>
                <a href="https://X.com/galgame_channel" target="_blank" rel="noopener noreferrer">
                  <i className="bi-twitter-x"></i> Galgame 頻道
                </a>
              </li>
              {/* spotify */}
              <li className={cn(style.ourLinksItem)}>
                <a href="https://open.spotify.com/playlist/0vsMmem2b14ohrKzOmUVtd" target="_blank" rel="noopener noreferrer">
                  <i className="bi-spotify"></i> 憂愁
                </a>
              </li>
            </ul>
          </div>
          <div className={cn(style.ourLinks, 'my-2 col-6 col-lg-3')}>
            <h5>
              信息
            </h5>
            <ul>
              <li className={cn(style.ourLinksItem)}>
                <Link href="/terms">
                  條款
                </Link>
              </li>
              <li className={cn(style.ourLinksItem)}>
                <Link href="/legal">
                  法律聲明
                </Link>
              </li>
              <li className={cn(style.ourLinksItem)}>
                <Link href="/privacy">
                  隱私權
                </Link>
              </li>
              <li className={cn(style.ourLinksItem)}>
                <Link href="https://speed.cloudflare.com" target='_blank' rel="noopener noreferrer">
                  網路不正常？
                </Link>
              </li>
              <li className={cn(style.ourLinksItem)}>
                <Link href="https://github.com/Galgamer-org/Draw-Guess-Keywords" target='_blank' rel="noopener noreferrer">
                  召喚美少女！
                </Link>
              </li>
            </ul>
          </div>
        </Row>

      </Container>
    </footer>
  )
}

