import { remark } from 'remark'
import html from 'remark-html'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { ReactNode } from 'react'

export default function markdownToHtml(markdown: string) : ReactNode{

  return <ReactMarkdown 
    children={markdown}
  />
}
