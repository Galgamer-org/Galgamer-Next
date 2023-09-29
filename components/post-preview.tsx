import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

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
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={index_img} abbr={abbr}/>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/article/${abbr}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateObj={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}

export default PostPreview
