import cn from 'classnames'
import Link from 'next/link'
import SmartImage from './smart-image'
import Image from 'next/image'


type Props = {
  title: string
  src: string
  slug?: string
  abbr?: number
}

export default function CoverImage ({ title, src, slug, abbr }: Props) {
  const image = (
    <SmartImage
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm w-full', {
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {abbr ? (
        <Link href={`/article/${abbr}`}  aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}


