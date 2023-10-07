import Member from "interfaces/member";

// type Member = {
//     name: string
//     photo?: string
//     bio?: string
//     url?: string
//     template?: string
//   }

const Members: Member[] = [
    {
        name: "桐遠暮羽",
        photo: "/assets/members/kiriha.webp",
        bio: "Developer",
        url: "/members/kiriha",
    },
    {
        name: "SacalWiki",
        photo: "/assets/members/SacalWiki.jpg",
    },
    {
        name: "sora",
        photo: "/assets/members/sora.jpg",
    },
    {
        name: "Patchouli Knowledge",
        photo: "/assets/members/Patchouli.jpg",
    }
];

export default Members;

export function getMember(name: string): Member {
    let result: Member | undefined;
    if (name === undefined) {
        result =undefined;
    }else{
        result = Members.find((member) => member.name === name);
    }
    if (result === undefined) {
        //console.error(`Member ${name} not found`);
        result = {
            name: name,
            photo: "/assets/members/default.jpeg",
        };
    }
    return result;
}