import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Card } from '@/components/shared/Card'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { type BlogType, getAllBlogs, getAllTags } from '@/lib/blogs'
import { formatDate } from '@/lib/formatDate'
import { blogHeadLine } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'
import { TagList } from '@/components/blog/TagList'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

interface BlogProps {
  blog: BlogType
}

function Blog({ blog }: BlogProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/${blog.slug}`}>
          {blog.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-2 mb-2">
            <TagList tags={blog.tags} showAllTag={false} />
          </div>
        )}
        <Card.Cta>Read blog</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  )
}

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `${decodedTag} - 博客标签`,
    description: `查看关于 ${decodedTag} 的所有博客文章`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)

  const blogs = await getAllBlogs(decodedTag)
  const allTags = await getAllTags()

  if (blogs.length === 0) {
    notFound()
  }

  return (
    <SimpleLayout
      title={`${decodedTag} 相关文章`}
      intro={`以下是关于 ${decodedTag} 的所有博客文章`}
      icon={<CustomIcon name='pencil' size={28} />}
    >
      <div className="mb-8">
        <TagList tags={allTags} className="mt-4" />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {blogs.map((blog: BlogType) => (
            <Blog key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
