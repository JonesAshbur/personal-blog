import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/60 text-primary-foreground shadow hover:bg-primary/70",
        secondary:
          "border-transparent bg-secondary/60 text-secondary-foreground hover:bg-secondary/70",
        destructive:
          "border-transparent bg-destructive/60 text-destructive-foreground shadow hover:bg-destructive/70",
        outline: "text-foreground",
        glass: "border-transparent bg-white/10 text-foreground shadow backdrop-blur-md hover:bg-white/20 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/40",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
