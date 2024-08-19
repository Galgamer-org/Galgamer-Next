import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../interfaces/post'
import CategoryTree from '@/interfaces/category-tree'
import { getMember } from '_feed/members'

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
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
  'keywords',
  'hidden',
  'categories',
];

export function getPostBySlug(slug: string) {
  if(!slug.endsWith('.md')) { slug += '.md'; }

  const extention = slug.split('.').pop();
  const realSlug = slug.replace(new RegExp(`.${extention}$`), '');
  const fullPath = join(postsDirectory, `${realSlug}.${extention}`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents, { excerpt: true });

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
    if (field === 'categories') {
      if(typeof data[field] === 'string') {
        items[field] = [data[field]];
      }
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  })

  // console.log(items['categories'])

  const result: PostType = {
    slug: items['slug'],
    title: items['title'],
    tags: items['tags'] ? items['tags'] : [],
    author: items['author'],
    date: items['date'],
    index_img: items['index_img'] ? items['index_img'] : '',
    excerpt: items['excerpt'] ? items['excerpt'] : '',
    ogImage: {
      url: items['index_img']
    },
    content: items['content'],
    abbrlink: items['abbrlink'],
    keywords: (items['keywords'] ? items['keywords'] : '').split(',').map((keyword) => keyword.trim()),
    hidden: items['hidden'] ? items['hidden'] : false,
    categories: items['categories'] ? items['categories'] : [],
  };
  //if(result.categories === undefined || !result.categories[0]) debugger;
  // console.log(result)
  return result;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)).filter((post) => !post.hidden);
  return posts;
}

export function getAllTags(): Record<string, PostType[]> {
  const posts = getAllPosts();
  const tags = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag].push(post);
      } else {
        tags[tag] = [post];
      }
    });
  });
  return tags;
}

function checkUndefined(obj: any) {
  if (obj === undefined) {
    debugger;
  }
}

export function getCategoryTree(): CategoryTree {
  const posts = getAllPosts();
  const categories: CategoryTree = posts.reduce<CategoryTree>((acc, post) => {
    const postCategories = post.categories;
    // categories can be [string, string], or [string, [string, string]]

      if(postCategories.length === 0) postCategories.push('未分類');
      postCategories.forEach((category: string | Array<string>) => {
        if (typeof category === 'string') {
          if (acc[category]) {
            acc[category].posts.push(post.slug);
          } else {
            acc[category] = { posts: [post.slug] };
          }
        } else if (Array.isArray(category)) {
          // 有多個 category 的，其中第一個是放在 root 下的
          acc = walkCategoryArray(acc, category, post);
        }
      });
    
    return acc;
  }, {});
  return categories;
}

function walkCategoryArray(
  subTree: CategoryTree,
  categoryArray: string[],
  thisPost: PostType
): CategoryTree {
  const category = categoryArray.shift();
  if (!category) {
    // the article has no category, push it to 未分類
    if (subTree['未分類']) {
      subTree['未分類'].posts.push(thisPost.slug);
    } else {
      subTree['未分類'] = { posts: [thisPost.slug] };
    }
    return subTree;
  }
  // checkUndefined(category);
  if (categoryArray.length === 0) { // it is a leaf
    checkUndefined(subTree);
    if (subTree[category]) {
      subTree[category].posts.push(thisPost.slug);
    } else {
      subTree[category] = { children: {}, posts: [thisPost.slug] };
    }
    return subTree;
  }

  if (subTree[category]) {
    subTree[category].children =
      walkCategoryArray(subTree[category].children, categoryArray, thisPost);
  } else {
    subTree[category] = {
      posts: [],
      children: walkCategoryArray({}, categoryArray, thisPost)
    };
  }
  return subTree;
}

export function isTechnicalReport(post: PostType) {
  let result = false;
  const technicalKeywords = ['技術報告', '技术报告', '笔记', '筆記', '漢化'];
  // check against keywords and tags
  // keywords is separated by comma
  const keywords = post.keywords;
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