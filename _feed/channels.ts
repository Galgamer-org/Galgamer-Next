// {
//     title: '技術報告',
//     description: 'Dive Deep',
//     details: '美少女們不爲人知的幕後。我們在這裏分享一些研究成果☝️',
//     cssClass: 'techPostArea',
//     metaImage: '/site-assets/metadata/technical-report.png',
//     icon: 'bi-file-earmark-code',
//   }

type channel = {
    title: string;
    description: string;
    details: string;
    cssClass: string;
    metaImage: string;
    icon: string;
};

export const channels: Record<string, channel> = {
    'recommanded-games': {
        title: '遊戲推薦',
        description: 'Picked for you',
        details: 'Galgamer 群友親自體驗，親自爲你推薦！',
        cssClass: 'gamePostArea',
        metaImage: '/site-assets/metadata/recommanded-games.png',
        icon: 'bi-joystick',
    },
    'technical-report': {
        title: '技術報告',
        description: 'Dive Deep',
        details: '美少女們不爲人知的幕後。我們在這裏分享一些研究成果☝️',
        cssClass: 'techPostArea',
        metaImage: '/site-assets/metadata/technical-report.png',
        icon: 'bi-file-earmark-code',
    },
};
