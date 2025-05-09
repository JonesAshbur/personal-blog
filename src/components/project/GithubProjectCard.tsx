"use client"

import { ArrowRightIcon, HashIcon } from 'lucide-react'
import { ArrowRight, GitFork, Star, GithubLogo, Code } from '@phosphor-icons/react'
import { ProjectItemType } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'

// 截断长名称的函数
function truncateName(name: string, maxLength: number = 20): string {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
}

export function GithubProjectCard({ project, titleAs }: { project: ProjectItemType, titleAs?: keyof JSX.IntrinsicElements }) {
  const utmLink = project.link.href.startsWith('http')
    ? `${project.link.href}?utm_source=${utm_source}`
    : `https://${project.link.href}?utm_source=${utm_source}`
  let Component = titleAs ?? 'h2'
  // 名称处理
  const displayName = truncateName(project.name);
  
  return (
    <li className='group relative flex flex-col items-start h-full'>
      <div className="relative flex flex-col justify-between h-full w-full py-5  px-6 rounded-2xl border border-muted-foreground/20 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-muted/5">
        <div className=''>
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-2'>
            <Code size={20} weight="duotone" className="text-primary" />
            <Component className="text-sm font-semibold tracking-tight truncate max-w-full" title={project.name}>
              {displayName}
            </Component>
          </div>
          <p className="relative z-10 mt-2 text-sm text-muted-foreground line-clamp-2" title={project.description}>
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <div className='flex flex-row items-center gap-2 text-xs font-semibold opacity-80'>
            { project.gitStars !== undefined && (
              <>
                <Star size={16} weight="duotone" /> 
                {project.gitStars}
              </>
            )}
            { project.gitForks !== undefined && (
              <>
                <GitFork size={16} weight="duotone" /> 
                {project.gitForks}
              </>
            )}
          </div>
        </div>
        <Link
          href={utmLink}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute inset-0 z-20'>
          <ArrowRight size={32} weight="duotone" className="absolute bottom-6 right-4 h-4 w-4 group-hover:text-primary group-hover:cursor-pointer" />
        </Link>
      </div>
    </li>
  )
}