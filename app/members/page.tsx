import Members from "_feed/members";
import members_css from "styles/members.module.css";
import cn from 'classnames';
import {Col, Row} from 'react-bootstrap';
import Member from "interfaces/member";

function Body() {
    return (
        <div className={`${members_css.Body}`}>
            <Row>
                <PageInfo/>
            </Row>
                <MembersBody/>
        </div>
    )
}

function MembersBody() {
    return (
        <div className={members_css.MembersBody}>
            <Row>
                {Object.values(Members).map((value: Member, index) => (
                    <Col key={index} className={cn('col-2 col-md-2 col-xl-3')}>
                        <MemberCard member={value} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}


function MemberCard({ member }: { member: Member }) {
    return (
        <div className={members_css.Card}>
            <Row>
                <Col md={4}>
                    <div className={members_css.MembersPhoto}>
                        <a href={`/members/${member.name}`}>
                        <img src={member.photo} className={members_css.CardAvatar} alt="Member Avatar" />
                        </a>
                    </div>
                </Col>
                <Col md={8} >
                    <div className={members_css.MembersDetails}>
                        <p className={members_css.MembersName}>{member.name}</p>
                        <p>{member.bio}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}


function PageInfo() {
    return (
        <div>
            <Row >
                <div className={members_css.InfoTitle}>
                    Members
                </div>
            </Row>
            <Row>
                <div className={members_css.InfoText}>
                    <p>
                        这里是编辑部的成员列表页面，点击图片即可进入其个人主页(施工中)
                    </p>
                </div>
            </Row>
        </div>
    )
}

export default function Member() {
    return (
        <div>
            <Body/>
        </div>
    );
}
