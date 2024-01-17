import { staffs, members } from "_feed/members";
import { getMember } from "_feed/members";
import member from "@/interfaces/member";
import Container from "@/components-layout/container";
import style from "@/styles/members.module.css";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";


export async function generateStaticParams() {
    const params = Object.keys({ ...staffs, ...members }).map((name) => ({
        name: encodeURIComponent(name),
    }));

    return params;
}



export default function Member({ params }) {
    const name = decodeURIComponent(params.name);

    const member_info = getMember(name);

    if (member_info === undefined || !member_info.personalPage) {
        return <DefaultCharacterPages members={member_info}  />;
    }

    <CharacterPages members={member_info} />

}
function CharacterPages({ members }: { members: member }) {
    return (
        <Container className="px-2">
            <BookmarkContainer title={
                <>{members.name}</>
            }>
            </BookmarkContainer>

        </Container>

    );

}
function DefaultCharacterPages({ members }: { members: member }) {
    return (
        <Container className="px-2">
            <BookmarkContainer title={
                <>{members.name}</>
            }>
                <div className="container myfont">
                    <p className={style.defaultText}>
                        因为 <b>{members.name}</b> 没有提供个人主页内容，所以该页面是简陋的默认页面。
                    </p>
                    <div className={cn(`${style.InfoPhoto} d-flex flex-column flex-sm-row`)}>
                        <div className={cn(`${style.linkAvatar} col-lg-3 col-xl-2`)}>
                            <img src={members.photo} alt={members.name} />
                        </div>
                        <div className={cn(`${style.InfoText} col-lg-9 col-xl-10`)}>
                            <div className={cn(`${style.InfoBio} font-serif`)}>
                                {members.bio !== "" ? `"${members.bio}"` : "这是一个默认Bio(这个家伙懒爆了，Bio都不提供)"}
                            </div>
                        </div>
                    </div>
                </div>
            </BookmarkContainer>
        </Container>
    );
}

