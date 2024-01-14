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
        name: "桐遠暮羽",
        photo: "/member-icon/staff/kiriha.webp",
        bio: "專業畫師這天沒事就研究閉源 lib",
    },
    'SacalWiki': {
        name: "SacalWiki",
        photo: "/member-icon/default.webp",
        bio: "",
    },

    'sora': {
        name: "sora",
        photo: "/member-icon/staff/sora.webp",
        bio: "天无二日，花徒めと是我心中唯一的太阳",
    },

    'Patchouli Knowledge': {
        name: "Patchouli Knowledge",
        photo: "/member-icon/staff/patchouli.webp",
        bio: "我的人生夙願就是給1.9m的偽娘塗紫色的腳趾甲。",
    },

    'かばん':{
        name: "かばん",
        photo: "/member-icon/staff/kaban.webp",
        bio: "お絵描きしてます。イラストのお仕事募集中⇒http://ginirokarasuf.wixsite.com/chocosuki/cont",
    },

    'Kaminotomodachi': {
        name: "Kaminotomodachi",
        photo: "/member-icon/staff/kaminotomodachi.webp",
        bio: "",

    },

    'hiyatoki': {
        name: "hiyatoki",
        photo: "/member-icon/staff/hiyatoki.webp",
        bio: "",

    },

    'Blyatman': {
        name: "Blyatman",
        photo: "/member-icon/staff/blyatman.webp",
        bio: "啊嚏",

    },

    '木衛一': {
        name: "木衛一",
        photo: "/member-icon/staff/木衛一.webp",
        bio: "...Surely thine kind are more than pure Dark...",

    },

    'Nori ko': {
        name: "Nori ko",
        photo: "/member-icon/staff/nori ko.webp",
        bio: "",

    },

    'sym 1018': {
        name: "sym 1018",
        photo: "/member-icon/staff/sym 1018.webp",
        bio: "UTC+8, 16 years old forever.",

    },

    'Triko 🐾': {
        name: "Triko 🐾",
        photo: "/member-icon/staff/triko.webp",
        bio: "When the death come I will be free. 🫵 Big floppa is watching you.",

    },

    'X': {
        name: "X",
        photo: "/member-icon/staff/x.webp",
        bio: "Printf",

    },

    'yukino': {
        name: "yukino",
        photo: "/member-icon/default.webp",
        bio: "",

    },

    'Hz ❁ HoneyWorks': {
        name: "Hz ❁ HoneyWorks",
        photo: "/member-icon/staff/hz.webp",
        bio: "",

    },
};

export const members: MemberList = {
    '-': {
        name: "-",
        photo: "/member-icon/group/-.webp",
        bio: "普通大三狗一只 喜歡玩電子產品+聽東方曲 愛好擺爛",
    },
    'YUZU': {
        name: "YUZU",
        photo: "/member-icon/group/yuzu.webp",
        bio: "逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱 逢樱",
    },
    '星月草': {
        name: "星月草",
        photo: "/member-icon/group/星月草.webp",
        bio: "少年音 年龄就不透露了打咩 可以聊会天兴趣/画画 钢琴 比较喜欢纯音乐放松",
    },
    'RRRRRz': {
        name: "RRRRRz",
        photo: "/member-icon/group/rrrrrz.webp",
        bio: "",
    },
    'SeoiSoeng': {
        name: "SeoiSoeng",
        photo: "/member-icon/group/seoisoeng.webp",
        bio: "幸福的活下去",
    },
    'S-nian': {
        name: "S-nian",
        photo: "/member-icon/group/s-nian.webp",
        bio: "努力提升绘画能力 然后我要让蓝姐姐把自己当成圣诞礼物送给我",
    },
    '千空': {
        name: "千空",
        photo: "/member-icon/group/千空.webp",
        bio: "“艰难登顶”",
    },
    '来 van游戏': {
        name: "来 van游戏",
        photo: "/member-icon/group/来 van游戏.webp",
        bio: "不学无术不会画画的但是是超级稀有的中医学生",
    },
    '凑': {
        name: "凑",
        photo: "/member-icon/group/凑.webp",
        bio: "專門收集資源的鍊金術師，夢想和愛麗絲扭扭抱抱",
    },
    'poly000': {
        name: "poly000",
        photo: "/member-icon/group/poly000.webp",
        bio: "@MeowKateOwO ♥️ | INFJ-T | @NekOPolyO0O | they/them | 无糖mtx",
    },
    'ne koo': {
        name: "ne koo",
        photo: "/member-icon/group/ne koo.webp",
        bio: "/我瓜巴/>_<)",
    },
    '云楼汐': {
        name: "云楼汐",
        photo: "/member-icon/group/云楼汐.webp",
        bio: "時間停止吧，你是多麼美麗/博客:域名过期（",
    },
    'KUN': {
        name: "KUN",
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
            name: name,
            photo: "/member-icon/default.jpeg",
        };
    }
    return result;
}