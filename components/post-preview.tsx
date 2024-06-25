import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import cn from 'classnames'
import type PostType from '@/interfaces/post'
import style from '@/styles/post-preview.module.css'

type Props = {
  post: PostType
}

const PostPreview = ({
  post: {
    title,
    excerpt,
    date,
    author,
    slug,
    index_img,
    abbrlink,
    tags,
    categories,
  },
}: Props) => {

  return (
    <div className="mb-4 w-100">
      <div className="mb-3 o-hidden box-shadow "
        style={{ borderRadius: 'var(--small-board-border-radius)' } as React.CSSProperties}
      >
        <CoverImage slug={slug} title={title} src={index_img} abbr={abbrlink} />
      </div>
      <div className='my-2'>
        <Avatar name={author} />
      </div>
      <h3 className="my-2 h5">
        <a
          href={`/article/${abbrlink}`}
          className="text-decoration-none preview-title"
        >
          <strong>{title}</strong>
        </a>
      </h3>

      <p className="text-lg leading-relaxed my-2">{excerpt}</p>
      <div
        className={cn('myfont', style.postMeta)}
      >
        {/* post metadata */}
        <div className="text-lg my-1 me-3">
          {/* date */}
          <i className="bi-calendar-week-fill me-2"></i>
          <DateFormatter dateObj={date} />
        </div>

        {categories.length !== 0 && <div className="text-lg my-1 me-3">
          {/* category */}
          <i className="bi-inboxes-fill me-2"></i>
          {categories.map(function (category, index) {
            // if category is an array, then it is a nested category, should map to /categories/category1/category2/...
            // if category is a string, then it is a top level category, should map to /categories/category

            if (Array.isArray(category)) {
              const result: React.ReactNode[] = [];
              for (let i = 0; i < category.length; i++) {
                const categoryName = category[i];
                const categoryPath = (category as Array<string>).slice(0, i + 1).join('/');
                result.push(
                  <a href={`/categories/${categoryPath}`} key={categoryPath} className={cn(style.metaLink)} >
                    {categoryName}
                  </a>
                );
              }
              return result;
            } else {
              return (
                <a href={`/categories/${category}`} key={category} className={cn(style.metaLink)}>
                  {category}
                </a>
              );
            }
          })}
        </div>}

        {tags.length !== 0 && <div className="text-lg my-1 me-3">
          {/* tags */}
          <i className="bi-tag-fill me-2"></i>
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag} className={cn(style.metaLink)}>
              {tag}
            </Link>
          ))}
        </div>}

      </div>

    </div>
  )
}

export default PostPreview
