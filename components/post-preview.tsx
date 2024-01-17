import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/member'

type Props = {
  title: string
  index_img: string
  date: Date
  excerpt: string
  author: Author
  slug: string
  abbr: number
}

const PostPreview = ({
  title,
  index_img,
  date,
  excerpt,
  author,
  slug,
  abbr,
}: Props) => {
  return (
    <div className="mb-4 w-100">
      <div className="mb-3 o-hidden box-shadow "
        style={{ borderRadius: 'var(--small-board-border-radius)' } as React.CSSProperties}
      >
        <CoverImage slug={slug} title={title} src={index_img} abbr={abbr}/>
      </div>
      <div className='my-2'>
        <Avatar member={author} />
      </div>
      <h3 className="my-2 h5">
        <Link
          href={`/article/${abbr}`}
          className="text-decoration-none preview-title"
        >
          <strong>{title}</strong>
        </Link>
      </h3>

      <p className="text-lg leading-relaxed my-2">{excerpt}</p>
      <div className="text-lg my-1">
        <i className="bi-calendar-week-fill me-2"></i>
        <DateFormatter dateObj={date} />
      </div>
    </div>
  )
}

export default PostPreview
