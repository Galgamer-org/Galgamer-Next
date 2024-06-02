'use client';
import React, { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';


type FancyboxProps = {
  delegate?: string;
  options?: Record<string, any>;
  children?: React.ReactNode | React.ReactNode[];
};

function Fancybox(props: FancyboxProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(delegate, options);

    return () => {
      NativeFancybox.unbind(delegate);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{props.children}</div>;
}

type imageProps = (Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">) | Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">;

type FancyboxImageProps = imageProps & {
  groupid?: string;
};

function FancyboxImage(props: FancyboxImageProps) {
  return (
    <Fancybox options={{
      "wheel": "slide",
    }}>
      <a data-fancybox={props.groupid || "gallery"} href={props.src} data-caption={props.alt || props.title || ""}>
        <img {...props} />
      </a>
    </Fancybox>
  );
}

export { Fancybox, FancyboxImage };