// import style from './logo.module.css'
import cn from 'classnames'

export default function Logo() {
    return (
        <i className={cn("style.logo")}
            style={{ 
                '--mask-image': 'url(/logo.webp)',
                'display': 'inline-block',
                'backgroundColor': 'currentColor',
                'height': '1em',
                'width': 'auto',
                'aspect-ratio': '1',
                'margin-right': '0.1em',
                'vertical-align': 'middle',
                '-webkit-mask-image': 'var(--mask-image)',
                'mask-image': 'var(--mask-image)',
                '-webkit-mask-size': 'contain',
                'mask-size': 'contain',
                '-webkit-mask-repeat': 'no-repeat',
                'mask-repeat': 'no-repeat',
            } as React.CSSProperties}
        
        ></i>

    )
}