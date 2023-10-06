import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: Date
  author: Author | null
  excerpt: string
  banner_img?: string
  index_img: string
  ogImage: {
    url: string
  }
  content: string
  asset_directory?: string | null
  abbrlink: number
  tags: string[]
  keywords: string
}

export default PostType
