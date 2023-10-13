import Members from "_feed/members";
import { getMember } from "_feed/members";


export async function generateStaticParams() {

    const params = Object.entries(Members).map(([key, value]) => {

        return { name: encodeURIComponent(key) }
    });
    console.log(params);

    return params;
}




export default function Member({ params }) {
    const name = params.name;
    const member_info = getMember(name);
    console.log(name);

    // useless? 
    if (member_info === undefined) {
        return {
            notFound: true,
        };
    }

    return (
        <div>
            {Object.entries(member_info).map(([key, value]) => (
                <p>{key}:{value}</p>
            ))}
        </div>
    );
}

