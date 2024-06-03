import { staffs, members } from "_feed/members";
import style from "styles/members.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import type Member from "interfaces/member";
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import BookmarkContainer from "@/components/bookmark-container";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/hexo-api";

export const metadata: Metadata = {
    title: '標籤',
    description: "文章標籤分類",
    openGraph: {
        type: 'website',
        locale: 'zh_HK',
        siteName: 'Galgamer',
        url: '/tags',
        title: '標籤', 
        description: '文章標籤分類',
    },
    twitter: {
        title: '標籤',
        description: '文章標籤分類',
    },
}

export default async function Tags() {
    console.log('Tags');
    const tags = await getAllTags();
    return (
        <Container className="px-2">
            <MainVisualH1
                title="標籤"
                description="Tags"
                details="文章標籤分類"
                cssClass={style.memberMainVisual}
            >
            </MainVisualH1>
            <BookmarkContainer title={
                <><i className="bi bi-tags me-2"></i>Tags1</>
            }>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </BookmarkContainer>
            {/* <BookmarkContainer title={
                <><i className="bi bi-emoji-wink-fill me-2"></i>Tags2</>
            }>
                <MembersBody list={members} />
            </BookmarkContainer> */}
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
