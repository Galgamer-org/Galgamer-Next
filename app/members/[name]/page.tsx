import Members from "_feed/members";
import { getMember } from "_feed/members";
import members_css from "styles/members.module.css";

export async function generateStaticParams() {

    const params = Object.entries(Members).map(([key, value]) => {

        return {name: encodeURIComponent(key) }
    });
    console.log(params);

    return params;
}




export default function Member({ params }) {
    const name = decodeURIComponent(params.name);

    const member_info = getMember(name);

    // useless?
    if (member_info === undefined) {
        return {
            notFound: true,
        };
    }
    if(!member_info.personalPage){
        return (
                <div>
                <h2 className={members_css.default_center}>{
                    name
                }   还没对该页面进行施工</h2>
            </div>
        )
    }else{
    return (
        <div>

        </div>
    );
    }
}

