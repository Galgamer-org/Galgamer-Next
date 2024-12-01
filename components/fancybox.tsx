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
      // NativeFancybox.unbind(delegate);
      // NativeFancybox.close();
      NativeFancybox.destroy();
    };
  });

  return <div ref={containerRef}>{props.children}</div>;
}

type imageProps = (Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">) | Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">;

type FancyboxImageProps = imageProps & {
  groupid?: string;
  dataMedia?: string;
  dataCaption?: string;
  dataSources?: string;
  dataHref?: string;
};

function FancyboxImage(props: FancyboxImageProps) {
  let { groupid, dataMedia, dataCaption, dataSources, dataHref, ...rest } = props;
  dataCaption = props.dataCaption || props.alt || props.title || "";
  const href = props.dataHref || props.src || "";

  return (
    <Fancybox options={{
      "wheel": "slide",
      "animated": true,
    }}>
      <a 
        // no more groupid, because it will add to url's #hash
        // when the hash change, it will trigger popstate and interfere 
        // with view transitions component to cause severe lag
        data-fancybox//</Fancybox>={props.groupid || "gallery"} 
        href={href} 
        data-caption={dataCaption}
        data-media={props.dataMedia}
        data-sources={props.dataSources}
      >
        <img {...rest} />
      </a>
    </Fancybox>
  );
}

export { Fancybox, FancyboxImage };