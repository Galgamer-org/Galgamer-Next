import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/member'

type Props = {
  title: string
  index_img: string
  date: Date
  author: Author
}

const PostHeader = ({ title, index_img, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar member={author} />
      </div>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={index_img} />
      </div> */}
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar member={author} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateObj={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
