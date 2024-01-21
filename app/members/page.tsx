import { staffs, members } from "_feed/members";
import style from "styles/members.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Member from "interfaces/member";
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import BookmarkContainer from "@/components/bookmark-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: '登場人物',
    description: "Galgamer 群友（美少女）",
    openGraph: {
        type: 'website',
        locale: 'zh_HK',
        siteName: 'Galgamer',
        url: '/members',
        title: '登場人物 ',
        description: 'Galgamer 群友（美少女）',
    },
    twitter: {
        title: '登場人物',
        description: 'Galgamer 群友（美少女）',
    },
}

export default function Member() {
    return (
        <Container className="px-2">
            <MainVisualH1
                title="登場人物"
                description="Characters"
                details="Galgamer 群友（美少女）"
                cssClass={style.memberMainVisual}
            >
            </MainVisualH1>
            <BookmarkContainer title={
                <><i className="bi bi-wrench me-2"></i>Staff</>
            }>
                <MembersBody list={staffs} />
            </BookmarkContainer>
            <BookmarkContainer title={
                <><i className="bi bi-emoji-wink-fill me-2"></i>一般通過羣友</>
            }>
                <MembersBody list={members} />
            </BookmarkContainer>
        </Container>
    );
}


function MembersBody({ list }: { list?: Record<string, Member> }) {
    return (
        <div className={style.MembersBody}>
            <Row>
                {
                    Object.entries(list).map(([name, member], index) => (
                    <FriendLinkUnit
                        key={index}
                        title={name}
                        href={`/members/${encodeURIComponent(name)}`}
                        avatar={member.photo}
                        info={member.bio}
                    ></FriendLinkUnit>
                ))}
            </Row>
        </div>
    );
}
