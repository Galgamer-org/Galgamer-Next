// 封裝了一個 next.js 的 Image 元件，以便根據情況對圖片大小進行探測，按需返回 img 或者 Image


import Image from 'next/image'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import { join } from 'path'
import probe from 'probe-image-size'
import { createReadStream, existsSync } from 'fs'
import { getNomalizedImagePath } from '../lib/image-loader'
import imageLoader from '../lib/image-loader'
import { onlineDirectory, rootDirectory } from '../lib/constants'
import is from 'date-fns/esm/locale/is/index.js'

type imageProps = (Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & ReactMarkdownProps) | Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">

const blackListDomains = [
    'zhimg.com',
    'pinyuncloud.com',
    'elemecdn'
];

const useOnlineImage = true;


export default async function SmartImage(props:imageProps) {
    let {src, alt, className, style} = props;
    // check if src is a local file
    let isLocal = false;
    if( !(src.startsWith('http')) ) {
        isLocal = true;
    }
    if (useOnlineImage && src.startsWith('../image/')) {
        isLocal = false;
    }

    let probeResult: probe.ProbeResult;

    let hasSize = probeResult?.width && probeResult?.height;

    const probeSrc = getProbePath(src);
    if (!hasSize) {
        // get image size
        if(isLocal) {
            // check file exist
            

            if(!existsSync(probeSrc)) {
                console.error(`file ${probeSrc} not exist`);
                probeResult = null;
            }
            else{
                probeResult = await probe(createReadStream(probeSrc));
            }
        }else {
            //probeSrc = encodeURI(probeSrc);
            try {
                // check black list
                let blackListed = false;
                blackListDomains.forEach(domain => {
                    if(probeSrc.includes(domain)){
                        blackListed = true;
                    }
                });
                if(blackListed) {
                    throw new Error(`black listed domain: ${probeSrc}`);
                }

                probeResult = await probe(probeSrc);
            } catch (error) {
                console.error(`probe error: ${probeSrc} : ${error}`);
                probeResult = null;
            }
            
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
            url: src,
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



function getProbePath(path: string) {
    if (!path) {
        return '';
    }
    
    if (path.startsWith('../image/')) {
        if (useOnlineImage){
            let result = new URL(path.replace('../image/', onlineDirectory)).toString();
            return encodeURI(decodeURI(result));
        }else{
            return path.replace('..', rootDirectory);
        }

    } else if (path.startsWith('http')) {
        return encodeURI(decodeURI(path));

    } else {
        return join(rootDirectory, path);
    }
}
