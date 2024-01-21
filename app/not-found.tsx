import style from '@/styles/notfound.module.css';
import cn from 'classnames';

export default function NotFoundPage() {
    return (
        <div className={cn('myfont my-auto', style.container)}>
            <div>

                <h1 className="next-error-h1">
                    404
                </h1>
                {/* <div className='d-inline-block'>
                    <h2>
                        This page could not be found.
                    </h2>
                </div> */}
            </div>
        </div>
    );
}