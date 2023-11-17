import Members from "_feed/members";
import members_css from "styles/members.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Member from "interfaces/member";

function Card({ member }: { member: Member }) {
    return (
        <div className={`${members_css.card}`}>
            <a href={`/members/${member.name}`}>
                <img src={member.photo} className={members_css.photo} ></img>
            </a>
            <p className={members_css.card_name}>{member.name} </p>
            <p className={members_css.card_bio}>{member.bio}</p>
        </div>
    );
}

function MembersBody() {
    return (
        <div className={members_css.body}>
            <Row className={cn('col-12 col-md-12 col-xl-12 ')}>
            {
                Object.values(Members).map((value: Member, index) => (
                    <Col className={cn('col-12 col-md-4 col-xl-3')}>
                    <Card key={index} member={value} />
                    </Col>
                ))
            }
            </Row>
        </div>
    );
}
function BannerBlock({ member }: { member: Member }) {
    return <div className={`${members_css.banner_name} `}>
        <p>{member.name}</p>
    </div>
}

function Banner() {
    return <div className={members_css.banner}>
        <Row className={cn('col-12 col-md-12 col-xl-12 ')}>
        <p className={members_css.default_center}>Member</p>
        {
            Object.values(Members).map((value: Member, index) => (
                <Col className={cn('col-12 col-md-1 col-xl-1')}>
                <BannerBlock key={index} member={value} />
                </Col>
            ))
        }
        </Row>
    </div>;
}

export default function Member() {
    return (
        <div>
            <Row>
            <Banner />
            </Row>
            <Row>
            <MembersBody />
            </Row>
        </div>
    );
}
