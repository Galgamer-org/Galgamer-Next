import cn from 'classnames'
import Link from 'next/link'
import SmartImage from './smart-image'
import Image from 'next/image'
import style from '../styles/cover-image.module.css'


type Props = {
  title: string
  src: string
  slug?: string
  abbr?: number
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function CoverImage ({ title, src, slug, abbr, className, loading }: Props) {
  const image = (
    <SmartImage
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(' w-100', style.coverImage, className)}
      loading={loading}
    />
  )
  return (
    <>
      {abbr ? (
        <Link href={`/article/${abbr}`}  aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </>
  )
}


