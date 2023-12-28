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
                'aspectRatio': '1',
                'marginRight': '0.1em',
                'verticalAlign': 'middle',
                'WebkitMaskImage': 'var(--mask-image)',
                'maskImage': 'var(--mask-image)',
                'WebkitMaskSize': 'contain',
                'maskSize': 'contain',
                'WebkitMaskRepeat': 'no-repeat',
                'maskRepeat': 'no-repeat',
            } as React.CSSProperties}
        
        ></i>

    )
}