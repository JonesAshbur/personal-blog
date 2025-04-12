import glob from 'fast-glob'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogType = {
  title: string
  description: string
  author: string
  date: string
  slug: string
  tags: string[]
}

// 从description中提取标签
function extractTagsFromDescription(description: string): string[] {
  if (!description) return [];

  // 将description按逗号分割，并去除空格
  const tags = description.split(',').map(tag => tag.trim());

  // 过滤空标签并去重
  const uniqueTags = Array.from(new Set(tags.filter(tag => tag.length > 0)));
  return uniqueTags;
}

async function importBlog(
  blogFilename: string,
): Promise<BlogType> {
  const source = await fs.readFile(
    path.join(process.cwd(), 'src/content/blog', blogFilename),
    'utf-8'
  )

  const { data } = matter(source)

  // 从description中提取标签
  const tags = data.tags || extractTagsFromDescription(data.description);

  // @ts-expect-error
  return {
    slug: blogFilename.replace(/\.mdx$/, ''),
    ...data,
    tags: tags,
  }
}

export async function getAllBlogs(tag?: string) {
  let blogFileNames = await glob('*.mdx', {
    cwd: './src/content/blog',
  })

  let blogs = await Promise.all(blogFileNames.map(importBlog))

  // 按日期排序
  const sortedBlogs = blogs.sort((a, z) => {
    const aDate = a.date ? +new Date(a.date) : 0;
    const zDate = z.date ? +new Date(z.date) : 0;
    return zDate - aDate;
  });

  // 如果指定了标签，则过滤博客
  if (tag && tag !== 'all') {
    return sortedBlogs.filter(blog =>
      blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  return sortedBlogs
}

// 获取所有唯一标签
export async function getAllTags(): Promise<string[]> {
  const blogs = await getAllBlogs();
  const tagsSet = new Set<string>();

  blogs.forEach(blog => {
    blog.tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
  try {
    // 移除可能存在的 .mdx 扩展名
    const cleanSlug = slug.replace(/\.mdx$/, '')
    return await importBlog(`${cleanSlug}.mdx`)
  } catch (error) {
    console.error(`Failed to load blog with slug: ${slug}`, error)
    return null
  }
}