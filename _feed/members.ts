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
        photo: "/member-icon/kiriha.webp",
        bio: "Developer",
    },
    'SacalWiki': {
        name: "SacalWiki",
        // photo: "/member-icon/SacalWiki.jpg",
        photo: "/member-icon/kiriha.webp",
    },
    'sora': {
        name: "sora",
        // photo: "/member-icon/sora.jpg",
        photo: "/member-icon/kiriha.webp",
        bio: "天无二日，花徒めと是我心中唯一的太阳",
    },
    'Patchouli Knowledge': {
        name: "Patchouli Knowledge",
        photo: "/member-icon/patchouli.jpg",
        bio: "",

    },

    'kaban':{
        name: "kaban",
        // photo: "/member-icon/kaban.webp",
        photo: "/member-icon/kiriha.webp",
        bio: "",
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
            photo: "/member-icon/default.jpeg",
        };
    }
    return result;
}