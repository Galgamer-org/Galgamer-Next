'use client'
import { join } from 'path'

const assetDirectory = join('/assets', 'blog-images')


type props = {
    src: string
    width: number
    quality?: number
}


function getNomalizedImagePath(path: string, directory?: string): string {
    if (!path) {
        return '';
    }
    
    if (path.startsWith('../image/')) {
        return join(assetDirectory || '', path.replace('../image/', ''))
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