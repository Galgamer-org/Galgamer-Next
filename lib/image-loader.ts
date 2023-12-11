import { join } from 'path'
import { onlineDirectory } from './constants'


type props = {
    src: string
    width: number
    quality?: number
}


export function getNomalizedImagePath(path: string, directory?: string): string {
    //console.log(path);
    if (!path) {
        return '';
    }
    
    if (path.startsWith('../image/')) {
        return path.replace('..', '');
    } else if (path.startsWith('http')) {
        return path;
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