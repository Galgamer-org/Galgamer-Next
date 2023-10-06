// 封裝了一個 next.js 的 Image 元件，以便根據情況對圖片大小進行探測，按需返回 img 或者 Image

import Image from 'next/image'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import { join } from 'path'
import probe from 'probe-image-size'
import { createReadStream, existsSync } from 'fs'

const assetDirectory = join(process.cwd() ,'public/assets', 'blog-images')


type imageProps = (Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & ReactMarkdownProps) | Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">


export default async function SmartImage(props:imageProps) {
    let {src, alt, className, style} = props;
    // check if src is a local file
    let realSrc = src;
    let isLocal = false;
    if(!(src.startsWith('http'))) {
        realSrc = getNomalizedImagePath(src);
        isLocal = true;
    }

    let probeResult: probe.ProbeResult;

    let hasSize = probeResult?.width && probeResult?.height;


    if (!hasSize) {
        // get image size
        if(isLocal) {
            // check file exist
            if(!existsSync(realSrc)) {
                console.error(`file ${realSrc} not exist`);
                probeResult = null;
            }
            else{
                probeResult = await probe(createReadStream(realSrc));
            }
        }else {
            realSrc = encodeURI(realSrc);
            //console.log(`probe ${realSrc}`);
            probeResult = await probe(realSrc);
        }
    } else {
        probeResult = {
            width: parseInt(props.width as string),
            height: parseInt(props.height as string),
            length: 0,
            type: 'jpg',
            mime: 'image/jpeg',
            wUnits: 'px',
            hUnits: 'px',
            url: realSrc,
        }
    }

    if(!className){
        className = '';
    }

    if(!probeResult) {
        return <img src={src} alt={alt} className={`${className} stupid-image`} style={style} />
    }

    // use filename as alt if alt is not provided
    if(!alt) {
        alt = src.split('/').pop();
    }

    return <Image src={src} alt={alt} width={probeResult.width} height={probeResult.height} className={`${className} smart-image`} style={style} />

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