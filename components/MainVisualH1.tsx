import Container from 'components-layout/container'
import style from '@/styles/mainvisual.module.css'
import cn from 'classnames'


export default function MainVisualH1(
    { title, description, details, cssClass }:{
        title: string,
        description: string,
        details?: string,
        cssClass?: string
    }
) {
    // use cssClass to determine the background image
    return (
        <section className={cn(cssClass ? cssClass : '')}>
            <div
                className={cn(style.banner, 'container-board mx-auto my-4 box-shadow d-flex align-items-center mainvisualBanner')}
            >
                <div className={cn('w-100 h-100 mainvisualBgMasked', style.bgMasked)}></div>
                <div className={cn('w-100 px-3 px-md-4')}>
                    <h1 className="text-4xl fw-bold">
                        {title}
                    </h1>
                    <p className="h5 mt-2 text-lg fst-italic">
                        {description}
                    </p>
                    {details && <p className="w-50 mt-2">
                        {details}
                    </p>}
                </div>

            </div>
        </section>
    );
}