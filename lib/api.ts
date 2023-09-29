import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../interfaces/post'
import { el } from 'date-fns/locale'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}


export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = Record<string, any>
  //console.log(data)
  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  const result: PostType = {
    slug: items['slug'],
    title: items['title'],
    author: {
      name: '桐遠暮羽',//data['author']['name'],
      picture: ''//data['author']['picture']
    },
    date: items['date'],
    index_img: items['index_img'],
    excerpt: items['excerpt'],
    ogImage: {
      url: items['index_img']
    },
    content: items['content'],
    abbrlink: items['abbrlink'],
  }
  //console.log(result)

  return result
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostByAbbrlink(abbrlink: number, fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => post.abbrlink == abbrlink)
  return posts[0]
}