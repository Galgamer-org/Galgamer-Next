import {Row, Col} from "react-bootstrap"
import styles from 'styles/links.module.css'
import cn from "classnames";

let Links: link[] = [
    {
        avatar: "https://galgamer.moe/image/main/galgroup.webp",
        href: "https://t.me/Galgamer",
        title: "Galgame 交流群",
        info: "我們的討論區"
    }, {
        avatar: "https://galgamer.moe/image/main/Gdiscord.webp",
        href: "https://discord.gg/6RaztntJ2N",
        title: "Galgamer Discord",
        info: "Discord 上的討論區"
    }, {
        avatar: "https://galgamer.moe/image/main/kiriha2.webp",
        href: "https://t.me/KiritouKurehar",
        title: "桐遠暮羽頻道",
        info: "編輯部的碎碎念（接受文章投稿！）"
    }, {
        avatar: "https://galgamer.moe/image/main/Sakuya.webp",
        href: "https://galgamer.moe/OpenDrawing",
        title: "OpenDrawing Project",
        info: "OpenDrawing 學習資料" }
    , {
        avatar: "https://galgamer.moe/image/main/ero-ban-xia.jpg",
        href: "https://t.me/eroBanXia",
        title: "精品黄油 頻道",
        info: "半夏 殘風的頻道，上谷歌之前先去這裏看一看...？" }
    , {
        avatar: "https://galgamer.moe/image/main/moeworld.png",
        href: "https://blog.moeworld.tech/",
        title: "空域 - 晓空 blog",
        info: "来和我们一起来让世界变得更萌一些吧~" }
    , {
        avatar: "https://galgamer.moe/image/main/shinnku.ico",
        href: "https://shinnku.com/",
        title: "失落の小站",
        info: "Galgame 資源網盤 Shinnku.com" }
    , {
        avatar: "https://galgamer.moe/image/main/nekosc.png",
        href: "https://nekosc.com/",
        title: "零件's Blog",
        info: "Tech Otakus Save The World" }
    , {
        avatar: "https://galgamer.moe/image/main/cloudflare.webp",
        href: "https://www.cloudflare.com/",
        title: "Cloudflare",
        info: "❤️️Host on Cloudflare☁️️" }
    , {
        avatar: "https://galgamer.moe/image/main/google.webp",
        href: "https://www.google.com/",
        title: "谷歌搜索",
        info: "找資源不求人 上谷歌自己搜" }
    , {
        avatar: "https://galgamer.moe/image/main/steam.ico",
        href: "https://store.steampowered.com/",
        title: "真・蒸汽平臺",
        info: "什麼遊戲都能買到的境外勢力商店"
    }    , {
        avatar: "https://galgamer.moe/image/main/hf.webp",
        href: "https://store.hikarifield.co.jp/",
        title: "光之領域",
        info: "明目張膽往中國賣 Galgame 的商店"
    }

]

type link = {
    avatar: string;
    href: string;
    title: string;
    info: string;
}

function LinksUnit({ avatar, href, title, info }: link) {
    return (
        <div className={`col-xs-12 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3`}>
            <a href={href}  className={styles.link} >
                <Row>
                    <Col md={3} sm={2} xs={2}>
                        <div className={styles.linkAvatar}>
                            <img src={avatar} alt={title} />
                        </div>
                    </Col>
                    <Col md={9} sm={10} xs={10}>
                        <div className={styles.linkTitle}>{title}</div>
                        <div className={styles.linkInfo}>{info}</div>
                    </Col>
                </Row>
            </a>
        </div>
    );
}
function LinksBody() {
    return (
        <div className={styles.linksBoard}>
            <div className={styles.TitleBox}>
                <Row>
                <Col md={2} sm={2} xs={2} >
                <div className={styles.TitleBoxIco}>
                    <i className={cn(" bi-link-45deg", "me-2", styles.linkIcon)}></i>
                </div>
                </Col>
                <Col md={6} sm={6} xs={6}>
                <h3 className={styles.LinksBodyTitle}>友情連結</h3>
                </Col>
                </Row>
            </div>

        <div className={"container-board mx-auto p-1 p-md-2 box-shadow"} >
            <div className={styles.links}>
                <div className={styles.LinksBody}>
                    <Row>
                        {Links.map((link, index) => (
                            <LinksUnit key={index} {...link} />
                        ))}
                    </Row>
                </div>
            </div>
        </div>
        </div>
    );
}


export default LinksBody;