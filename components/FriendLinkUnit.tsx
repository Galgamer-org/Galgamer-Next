import style from '@/styles/links.module.css';
import cn from "classnames";
import FriendLink from "@/interfaces/friend-link";
import { Link } from 'next-view-transitions';
import SmartImage from './smart-image';
import slugify from '@/lib/sluglify';

function FriendLinkUnit({ avatar, href, title, info }: FriendLink) {
    return (
        <div className={cn(`col-xs-12 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 myfont`)}>
            <Link 
                href={href}  
                className={style.link} 
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                <div className={cn('align-items-center d-flex', style.linkRow)}>

                    <div className={style.linkAvatar}>
                        <SmartImage src={avatar} alt={title} style={{ viewTransitionName: 'profile-photo-' + slugify(title) }} />
                    </div>

                    <div className={style.linkText}>
                        <div className={cn(style.linkTitle, 'fw-bold')}>{title}</div>
                        <div className={style.linkInfo}>{info}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}



export default FriendLinkUnit;