import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../interfaces/post'
import { el } from 'date-fns/locale'

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

const fields = [
  'title',
  'date',
  'slug',
  'author',
  'content',
  'ogImage',
  'index_img',
  'excerpt',
  'abbrlink',
  'tags',
  'keywords'
];

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = Record<string, any>
  //console.log(data)
  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  })

  const result: PostType = {
    slug: items['slug'],
    title: items['title'],
    tags: items['tags'] ? items['tags'] : [],
    author: {
      name: '桐遠暮羽',//data['author']['name'],
      picture: ''//data['author']['picture']
    },
    date: items['date'],
    index_img: items['index_img'] ? items['index_img'] : '',
    excerpt: items['excerpt'] ? items['excerpt'] : '',
    ogImage: {
      url: items['index_img']
    },
    content: items['content'],
    abbrlink: items['abbrlink'],
    keywords: items['keywords'] ? items['keywords'] : ''
  };
  //console.log(result)

  return result;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function isTechnicalReport(post: PostType) {
  let result = false;
  const technicalKeywords = ['技術報告', '技术报告', '笔记', '筆記', '漢化'];
  // check against keywords and tags
  // keywords is separated by comma
  const keywords = post.keywords.split(',').map((keyword) => keyword.trim());
  for (let i = 0; i < keywords.length; i++) {
    if (technicalKeywords.includes(keywords[i])) {
      result = true;
      break;
    }
  }
  for (let i = 0; i < post.tags.length; i++) {
    if (technicalKeywords.includes(post.tags[i])) {
      result = true;
      break;
    }
  }

  return result;
}

export function getPostByAbbrlink(abbrlink: number) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.abbrlink == abbrlink);
  return posts[0];
}