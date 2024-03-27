import Member from "interfaces/member";

// type Member = {
//     name: string
//     photo?: string
//     bio?: string
//     url?: string
//     template?: string
//   }

type MemberList = Record<string, Member>;

export const staffs: MemberList = {
    '桐遠暮羽': {
        photo: "/member-icon/staff/kiriha.webp",
        bio: "專業畫師這天沒事就研究閉源 lib（",
    },
    'SacalWiki': {
        photo: "/member-icon/staff/sacal.webp",
        bio: "",
    },
    'sora': {
        photo: "/member-icon/staff/sora.webp",
        bio: "天无二日，花徒めと是我心中唯一的太阳",
    },

    'Patchouli Knowledge': {
        photo: "/member-icon/staff/patchouli.webp",
        bio: "來者不拒，口味廣泛",
    },

    'かばん':{
        photo: "/member-icon/staff/kaban.webp",
        bio: "お絵描きしてます。イラストのお仕事募集中⇒http://ginirokarasuf.wixsite.com/chocosuki/cont",
    },

    'Kaminotomodachi': {
        photo: "/member-icon/staff/kaminotomodachi.webp",
        bio: "本群老東西協會副主席",

    },

    'Hiyatoki': {
        photo: "/member-icon/staff/hiyatoki.webp",
        bio: "",

    },

    'Blyatman': {
        photo: "/member-icon/staff/blyatman.webp",
        bio: "啊嚏",

    },

    '木衛一': {
        photo: "/member-icon/staff/木衛一.webp",
        bio: "...Surely thine kind are more than pure Dark...",
    },

    'Noriko': {
        photo: "/member-icon/staff/nori ko.webp",
        bio: "",

    },

    'sym 1018': {
        photo: "/member-icon/staff/sym 1018.webp",
        bio: "UTC+8, 16 years old forever.",

    },

    'Triko': {
        photo: "/member-icon/staff/triko.webp",
        bio: "When the death come I will be free. 🫵 Big floppa is watching you.",

    },

    'X': {
        photo: "/member-icon/staff/x.webp",
        bio: "Printf",

    },

    'Yuk1No': {
        photo: "/member-icon/staff/yukino.webp",
        bio: "",

    },

    'CodeHz': {
        photo: "/member-icon/staff/hz.webp",
        bio: "",

    },

    'Eriko P': {
        photo: "/member-icon/group/seoisoeng.webp",
        bio: "＋852 0721 0831",
    },
};

export const members: MemberList = {
    '-': {
        photo: "/member-icon/group/-.webp",
        bio: "普通大三狗一只 喜歡玩電子產品+聽東方曲 愛好擺爛",
    },
    'Yuzu': {
        photo: "/member-icon/group/yuzu.webp",
        bio: "逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱",
    },
    '星月草': {
        photo: "/member-icon/group/星月草.webp",
        bio: "少年音 年龄就不透露了打咩 可以聊会天兴趣/画画 钢琴 比较喜欢纯音乐放松",
    },
    'RRRRRz': {
        photo: "/member-icon/group/rrrrrz.webp",
        bio: "",
    },
    'S-nian': {
        photo: "/member-icon/group/s-nian.webp",
        bio: "努力提升绘画能力 然后我要让蓝姐姐把自己当成圣诞礼物送给我",
    },
    '千空': {
        photo: "/member-icon/group/千空.webp",
        bio: "“艰难登顶”",
    },
    '来 van游戏': {
        photo: "/member-icon/group/来 van游戏.webp",
        bio: "不学无术不会画画的但是是超级稀有的中医学生",
    },
    '凑': {
        photo: "/member-icon/group/凑.webp",
        bio: "專門收集資源的鍊金術師，夢想和愛麗絲扭扭抱抱",
    },
    'poly000': {
        photo: "/member-icon/group/poly000.webp",
        bio: "@MeowKateOwO ♥️ | INFJ-T | @NekOPolyO0O | they/them | 无糖mtx",
    },
    'ne koo': {
        photo: "/member-icon/group/ne koo.webp",
        bio: "/我瓜巴/>_<)",
    },
    '云楼汐': {
        photo: "/member-icon/group/云楼汐.webp",
        bio: "時間停止吧，你是多麼美麗/博客:域名过期（",
    },
    'KUN': {
        photo: "/member-icon/group/kun.webp",
        bio: "KUN IS THE CUTEST! 鲲最可爱！萌萌 galgame 群：https://t.me/kungalgame",
    }

};

export function getMember(name: string): Member {
    let result: Member | undefined;
    if (name === undefined) {
        result = undefined;
    } else {
        result = staffs[name] ?? members[name];
    }
    if (result === undefined) {
        //console.error(`Member ${name} not found`);
        result = {
            photo: "/member-icon/default.jpeg",
        };
    }
    return result;
}