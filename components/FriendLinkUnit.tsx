import {Row, Col} from "react-bootstrap"
import style from '@/styles/links.module.css'
import cn from "classnames";
import FriendLink from "@/interfaces/friend-link";


function FriendLinkUnit({ avatar, href, title, info }: FriendLink) {
    return (
        <div className={cn(`col-xs-12 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 myfont`)}>
            <a href={href}  className={style.link} >
                <div className={cn('align-items-center d-flex', style.linkRow)}>

                    <div className={style.linkAvatar}>
                        <img src={avatar} alt={title} />
                    </div>

                    <div className={style.linkText}>
                        <div className={cn(style.linkTitle, 'fw-bold')}>{title}</div>
                        <div className={style.linkInfo}>{info}</div>
                    </div>
                </div>
            </a>
        </div>
    );
}



export default FriendLinkUnit;