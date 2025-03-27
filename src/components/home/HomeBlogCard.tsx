"use client"

import { ArrowRight, BookOpen } from '@phosphor-icons/react'
import { type BlogType } from '@/lib/blogs'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'

// 截断长标题的函数
function truncateTitle(title: string, maxLength: number = 20): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + '...';
}

export function HomeBlogCard({ blog, titleAs }: { blog: BlogType, titleAs?: keyof JSX.IntrinsicElements }) {
  const utmLink = `/blogs/${blog.slug}?utm_source=${utm_source}`
  let Component = titleAs ?? 'h2'
  // 标题处理
  const displayTitle = truncateTitle(blog.title);
  
  return (
    <div className='group relative flex flex-col items-start h-full'>
      <div className="relative flex flex-col justify-between h-full w-full py-5 px-6 rounded-2xl border border-muted-foreground/20 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-muted/5">
        <div className=''>
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-2'>
            <BookOpen size={20} weight="duotone" />
            <Component className="text-sm font-semibold tracking-tight truncate max-w-full" title={blog.title}>
              {displayTitle}
            </Component>
          </div>
          <p className="relative z-10 mt-2 text-sm text-muted-foreground line-clamp-2" title={blog.description}>
            {blog.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <div className='flex flex-row items-center gap-2 text-xs font-semibold opacity-80'>
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </div>
        </div>
        <Link
          href={utmLink}
          className='absolute inset-0 z-20'>
          <ArrowRight size={32} weight="duotone" className="absolute bottom-6 right-4 h-4 w-4 group-hover:text-primary group-hover:cursor-pointer" />
        </Link>
      </div>
    </div>
  )
}
