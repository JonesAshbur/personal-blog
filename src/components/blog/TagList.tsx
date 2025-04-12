"use client"

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

interface TagListProps {
  tags: string[]
  className?: string
  showAllTag?: boolean
  onClick?: (tag: string) => void
}

export function TagList({ tags, className = '', showAllTag = true, onClick }: TagListProps) {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || 'all'

  const handleTagClick = (tag: string) => {
    if (onClick) {
      onClick(tag)
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {showAllTag && (
        <Link
          href="/blogs"
          onClick={() => handleTagClick('all')}
          className={`no-underline`}
        >
          <Badge
            variant={currentTag === 'all' ? 'default' : 'glass'}
            className="cursor-pointer transition-all hover:scale-105"
          >
            ALL
          </Badge>
        </Link>
      )}

      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blogs?tag=${tag}`}
          onClick={() => handleTagClick(tag)}
          className={`no-underline`}
        >
          <Badge
            variant={currentTag === tag ? 'default' : 'glass'}
            className="cursor-pointer transition-all hover:scale-105"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
