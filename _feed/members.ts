import Member from "interfaces/member";

// type Member = {
//     name: string
//     photo?: string
//     bio?: string
//     url?: string
//     template?: string
//   }

type MemberList = Record<string, Member>;

const Members: MemberList = {
    '桐遠暮羽': {
        name: "桐遠暮羽",
        photo: "/assets/members/kiriha.webp",
        bio: "Developer",
    },
    'SacalWiki': {
        name: "SacalWiki",
        photo: "/assets/members/SacalWiki.jpg",
    },
    'sora': {
        name: "sora",
        photo: "/assets/members/sora.jpg",
    },
    'Patchouli Knowledge': {
        name: "Patchouli Knowledge",
        photo: "/assets/members/patchouli.jpg",
    }
};

export default Members;

export function getMember(name: string): Member {
    let result: Member | undefined;
    if (name === undefined) {
        result = undefined;
    } else {
        result = Members[name];
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