import { staffs, members } from "_feed/members";
import style from "styles/members.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Member from "interfaces/member";
import Container from 'components-layout/container'
import MainVisualH1 from "@/components/MainVisualH1";
import FriendLinkUnit from "@/components/FriendLinkUnit";
import BookmarkContainer from "@/components/bookmark-container";


export default function Member() {
    return (
        <Container className="px-2">
            <MainVisualH1
                title="社區成員"
                description="Our Members"
                details="这里是编辑部的成员列表页面，点击图片即可进入其个人主页(施工中)"
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
                {Object.values(list).map((value: Member, index) => (
                    <FriendLinkUnit
                        key={index}
                        title={value.name}
                        href={`/members/${value.name}`}
                        avatar={value.photo}
                        info={value.bio}
                    ></FriendLinkUnit>
                ))}
            </Row>
        </div>
    );
}
