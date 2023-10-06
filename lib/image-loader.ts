import { join } from 'path'

const assetDirectory = join('/assets', 'blog-images')
const onlineDirectory = new URL('https://galgamer.moe/image/').toString()

type props = {
    src: string
    width: number
    quality?: number
}


export function getNomalizedImagePath(path: string, directory?: string): string {
    if (!path) {
        return '';
    }
    
    if (path.startsWith('../image/')) {
        return new URL(path.replace('../image/', onlineDirectory)).toString();
    } else {
        return path;
    }
}

export default function imageLoader({ src, width, quality }: props) {
    //console.log(src)
    const width2 = width * 2;
    // meaningless...

    return getNomalizedImagePath(src);
}