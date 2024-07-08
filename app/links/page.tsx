import style from "styles/members.module.css";
import cn from 'classnames';
import { Row } from 'react-bootstrap';
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import type { Metadata } from "next";
import FriendLinks from '@/_feed/friend-links'


export const metadata: Metadata = {
  title: '友情連結',
  description: "Friend Links",
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    siteName: 'Galgamer',
    url: '/links',
    title: '友情連結 ',
    description: 'Friend Links',
  },
  twitter: {
    title: '友情連結',
    description: 'Friend Links',
  },
}

export default function Links() {
  return (
    <Container className="px-2">
      <MainVisualH1
        title="友情連結"
        description="Friend Links"
        details="Galgamer 的友情連結"
        cssClass={style.memberMainVisual}
      >
      </MainVisualH1>

      <div className={cn('container-board', 'mx-auto box-shadow p-1 p-md-2 ')}>
        <section>
          <div className={cn('', '')}
            style={{ padding: '25px' } as React.CSSProperties}
          >
            <Row>
              {FriendLinks.map((link, index) => (
                <FriendLinkUnit key={index} {...link} />
              ))}
            </Row>
          </div>
        </section>
        <section>
          <div className="p-5 p-lg-5">
            {/* <hr /> */}
              <p>請在 <a href="https://t.me/Galgamer_channel" target="_blank">🔗️Galgame 频道</a> 評論區或者 Galgame 交流群留言申請加入我們的友鏈，請按以下格式向我們提供信息：</p>
              <ul>
                <li>网站名称：MOONSTONE</li>
                <li> 简介：PC 游戏制作商 MOONSTONE 官方网站</li>
                <li>链接：https://www.moon-stone.jp/</li>
                <li> 图标：https://www.moon-stone.jp/favicon.ico</li>
              </ul>
          </div>
        </section>
      </div>
    </Container>
  );
}

