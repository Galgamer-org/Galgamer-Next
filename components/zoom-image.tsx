'use client';

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "@/styles/react-medium-image-zoom.css";
import React from "react";

type imgProps = React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement> & ExtraProps;

interface ExtraProps {
    src: string;
    alt: string;
    height: number;
    width: number;
    className: string;
}

function ZoomImage(props: imgProps) {
    const { src, alt, height, width, className, ...others } = props;
    return (
        <Zoom
            key={Math.random()}
        >
            <Image
                src={src as string}
                alt={alt}
                height={(height as number)}
                width={(width as number)}
                className={className}
            />
        </Zoom>
    );
}

function ZoomImg(props: imgProps) {
    const { src, alt, height, width, className, ...others } = props;
    return (
        <Zoom
            key={Math.random()}
        >
            <img
                src={src as string}
                alt={alt}
                height={(height as number)}
                width={(width as number)}
                className={className}
                {...others}
            />
        </Zoom>
    );
}

export { ZoomImage, ZoomImg };