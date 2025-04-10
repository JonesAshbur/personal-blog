'use client'

import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/layout/Container'
import { Prose } from '@/components/shared/Prose'
import { type BlogType } from '@/lib/blogs'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BlogLayout({
  blog,
  children,
}: {
  blog: BlogType
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null

    const handleScroll = () => {
      setIsScrolling(true)
      
      // 清除之前的定时器
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
      
      // 设置新的定时器，在滚动停止200ms后将isScrolling设为false
      scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
    }
  }, [])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to blogs"
              className={`group mb-8 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md shadow-md shadow-zinc-800/5 ring-1 transition-all duration-200 sticky top-20 left-4 -ml-14 z-10 ${
                isScrolling 
                  ? 'opacity-60 bg-white/30 ring-white/40 dark:bg-zinc-800/30 dark:ring-white/30' 
                  : 'opacity-20 hover:opacity-100 bg-white/10 ring-white/20 dark:bg-zinc-800/10 dark:ring-white/10 dark:hover:ring-white/20'
              }`}
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-800 transition group-hover:stroke-zinc-900 dark:stroke-zinc-200 dark:group-hover:stroke-white" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 break-words">
                {blog.title}
              </h1>
              <time
                dateTime={blog.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(blog.date)}</span>
                <span className="mx-2">·</span>
                <span>{blog.author}</span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
