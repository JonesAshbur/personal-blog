"use client"

import { email, socialLinks } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'
import { CustomIcon } from '@/components/shared/CustomIcon'
import { cn } from '@/lib/utils'

export default function SocialLinks({ className }: { className?: string }) {
    // 只保留GitHub图标
    const githubLink = socialLinks.find(link => link.name === 'Github')
    
    return (
        <div className={cn("mt-6 flex items-center", className)}>
            {githubLink && (
                <Link
                    key={githubLink.name}
                    href={`${githubLink.href}?utm_source=${utm_source}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={githubLink.ariaLabel ?? `Follow on ${githubLink.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                    <CustomIcon name={githubLink.icon} />
                    <span className="sr-only">{githubLink.name}</span>
                </Link>
            )}
            <Link
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer"
                aria-label='Email'
                className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            >
                <CustomIcon name='email' />
                <span className="sr-only">Email</span>
            </Link>
        </div>
    )
}