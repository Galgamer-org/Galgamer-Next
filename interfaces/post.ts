
// category can be a string:
// categories:
//   - notes
// should return ['notes']

// or an array of strings:
// categories:
//   - notes
//   - translation
// should return ['notes', 'translation']

// or an array of objects:
// categories:
//   - ['company', 'moonstone']
//   - ['reviews']
// should return [['company', 'moonstone'], ['reviews']]

type Category = any[]


type PostType = {
  slug: string
  title: string
  date: Date
  author: string | null
  excerpt: string
  banner_img?: string
  index_img: string
  ogImage: {
    url: string
  }
  content: string
  asset_directory?: string | null
  abbrlink: number
  tags?: string[]
  keywords?: string[]
  categories?: Category
  hidden?: boolean
}

export default PostType
