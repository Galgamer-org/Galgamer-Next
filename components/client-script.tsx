'use client'

import { ReactNode, useEffect } from "react";
import Script from "next/script";

// a client side script that will be executed on the client side

type Props = {
    children: ReactNode & ReactNode[];
    src?: string;
}

export default function ClientScript(props: Props){
    const { children, src } = props;
    
    const inline = children ? children.toString().split('\n') : [];
    
    //console.log(inline);
    useEffect(() => {

        // eval(children.join('\n'));

        // const result = children.join('\n');
        // const id_hash = result.slice(0, 10);
        // const script = document.createElement('script');
        // script.setAttribute('id', 'client-script' + id_hash);
        // script.innerHTML = result;

        // if(document.getElementById('client-script' + id_hash) == null){
        //     document.body.appendChild(script);
        // }
        if(!inline.length) return;
        const result = inline.join('\n');
        try {
            (0, eval)(`with (window) {${result}}`);
        } catch (error) {
            console.error(error);
        }
        
        // refresh the page when exit
        return () => {
            //window.location.reload();
        }
    }, []);

    if(src){
        return <Script src={src} />
    }
    return <></>
}