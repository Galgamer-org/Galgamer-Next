import markdownStyles from '/styles/github-markdown-light.module.css'
import { ReactNode } from 'react'

type Props = {
  content: ReactNode
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown-body']}
        children={content}
      />
    </div>
  )
}

export default PostBody
