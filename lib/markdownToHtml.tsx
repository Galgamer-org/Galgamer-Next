import { remark } from 'remark'
import { ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'

export default function markdownToHtml(markdown: string) : ReactNode{

  return <Markdown 
    remarkPlugins={[[remarkGfm, {}]]}
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: 'h2',
      img(props){
          const {src, alt, className} = props
          return <Image src={src} alt={alt} width={1920} height={1080} />
      }
    }}
  >
    {markdown}
  </Markdown>
}
