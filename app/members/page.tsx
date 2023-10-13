import Members from "_feed/members";
import members_css from "styles/members.module.css";
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Member from "interfaces/member";

function Card({ member }: { member: Member }) {
    return (
        <div className={`${members_css.card} col-12 col-md-6 col-xl-4`}>
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
            {
                Object.values(Members).map((value: Member, index) => (
                    <Card key={index} member={value} />
                ))
            }
        </div>
    );
}
function BannerBlock({ member }: { member: Member }) {
    return <div className={`${members_css.banner_name} col-12 col-md-1 col-xl-1`}>
        <p>{member.name}</p>
    </div>
}

function Banner() {
    return <div className={members_css.banner}>
        <p>Galgamer成员</p>
        {
            Object.values(Members).map((value: Member, index) => (
                <BannerBlock key={index} member={value} />
            ))
        }
    </div>;
}

export default function Member() {
    return (
        <div>
            <Banner />
            <MembersBody />
        </div>
    );
}
