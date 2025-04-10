import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Highlight, themes } from 'prism-react-renderer'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  if (href?.startsWith('/')) {
    return <Link 
            href={href} 
            {...props} 
            className='text-primary font-semibold decoration-1 hover:decoration-2 underline underline-offset-2' 
          />
  }
  if (href?.startsWith('#')) {
    return <a {...props} className='text-primary font-semibold decoration-1 hover:decoration-2 underline underline-offset-2' />
  }
  return <a 
          target="_blank"
          rel="noopener noreferrer nofollow" 
          {...props} 
          className='text-primary font-semibold decoration-1 hover:decoration-2 underline underline-offset-2' 
        />
}

// 自定义代码块组件，支持语法高亮
const CustomCode = ({ className, children, ...props }: any) => {
  // 从className中提取语言，例如："language-javascript"
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  if (!language) {
    // 如果没有指定语言，返回普通代码行
    return <code className="px-1 py-0.5 rounded-md bg-zinc-900 text-zinc-100" {...props}>{children}</code>
  }

  return (
    <Highlight 
      theme={themes.vsDark}
      code={String(children).trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="my-6 overflow-x-auto rounded-lg bg-zinc-900">
          <pre className="p-4" style={{ ...style }}>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })} className="text-zinc-100">
                <span className="mr-4 inline-block w-4 text-right text-zinc-500 select-none">
                  {lineIndex + 1}
                </span>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}

export const mdxComponents: MDXComponents = {
  Image: (props: ImageProps) => <Image {...props} className='rounded-3xl my-6' />,
  a: CustomLink,
  h1: (props: any) => <h1 className="my-6 text-4xl font-bold tracking-tight sm:text-5xl" {...props} />,
  h2: (props: any) => <h2 className="my-6 text-3xl font-bold tracking-tight sm:text-4xl" {...props} />,
  h3: (props: any) => <h3 className="my-6 text-2xl font-bold tracking-tight sm:text-3xl" {...props} />,
  p: (props: any) => <p className="my-6 text-base opacity-80" {...props} />,
  ul: (props: any) => <ul className="my-6 list-disc list-inside mt-6 text-base opacity-80" {...props} />,
  ol: (props: any) => <ol className="my-6 list-decimal list-inside mt-6 text-base opacity-80" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-6" {...props} />,
  code: CustomCode,
  pre: (props: any) => <pre className="overflow-x-auto" {...props} />,
}
