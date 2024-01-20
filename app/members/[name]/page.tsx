import { staffs, members } from "_feed/members";
import { getMember } from "_feed/members";
import member from "@/interfaces/member";
import Container from "@/components-layout/container";
import style from "@/styles/members.module.css";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";


export function generateStaticParams() {
    const params = Object.keys({ ...staffs, ...members }).map((member) => {
        return { name: member, };
    });

    const temp = [];
    params.forEach((param) => {
        const encoded = encodeURIComponent(param.name);
        if (encoded !== param.name) {
            temp.push({ name: encoded });
        }
    });
    params.push(...temp);

    return params;
}



export default function MemberProfile({ params } : { params: { name: string } }) {
    const name = decodeURIComponent(params.name);
    // console.log(name);

    const member_info = getMember(name);

    if (member_info === undefined || !member_info.personalPage) {
        return <DefaultCharacterPages name={name} member={member_info} />;
    }

    <CharacterPages name={name} member={member_info} />

}


function CharacterPages({ name, member }: { name: string, member: member }) {
    return (
        <Container className="px-2">
            <BookmarkContainer title={
                <>{name}</>
            }>
            </BookmarkContainer>

        </Container>

    );
}

function DefaultCharacterPages({ name, member }: { name: string, member: member }) {
    return (
        <Container className="px-2">
            <BookmarkContainer title={
                <><i className="bi bi-person-heart me-1" />{name}</>
            }>
                <div className="container myfont">
                    <p className={style.defaultText}>
                        因为 <b>{name}</b> 没有提供个人主页内容，所以该页面是简陋的默认页面。
                    </p>
                    <div className={cn(`${style.InfoPhoto} d-flex flex-column flex-sm-row`)}>
                        <div className={cn(`${style.linkAvatar} col-lg-3 col-xl-2`)}>
                            <img src={member.photo} alt={name} />
                        </div>
                        <div className={cn(`${style.InfoText} col-lg-9 col-xl-10`)}>
                            <div className={cn(`${style.InfoBio} font-serif`)}>
                                {member.bio !== "" ? `"${member.bio}"` : "这是一个默认 Bio (这个家伙懒爆了，Bio 都不提供)"}
                            </div>
                        </div>
                    </div>
                </div>
            </BookmarkContainer>
        </Container>
    );
}

