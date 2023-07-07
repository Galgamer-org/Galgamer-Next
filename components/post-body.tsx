import markdownStyles from './markdown-styles.module.css'
import { ReactNode } from 'react'

type Props = {
  content: ReactNode
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        children={content}
      />
    </div>
  )
}

export default PostBody
