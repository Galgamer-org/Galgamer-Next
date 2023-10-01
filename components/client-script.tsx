'use client'

import { use, useEffect } from "react";

// a client side script that will be executed on the client side

type Props = {
    children: string[]
}

export default function ClientScript(props: Props){
    const {children} = props;
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

        (0, eval)(`with (window) {${children.join('\n')}}`)

    }, []);
    return <></>
}