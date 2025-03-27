import { Container } from '@/components/layout/Container'
import { ReactNode } from 'react'

export function SimpleLayout({
  title,
  intro,
  children,
  icon,
}: {
  title: string
  intro: string
  children?: React.ReactNode
  icon?: ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="flex flex-row items-center gap-2 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {icon}
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
