import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const cardVariants = cva(
  'rounded-[12px] border border-[var(--line)] bg-[var(--surface)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
  {
    variants: {
      variant: {
        default: 'shadow-[var(--shadow-soft)]',
        interactive:
          'shadow-[var(--shadow-soft)] hover:-translate-y-[2px] hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)]',
        subtle: 'bg-[var(--surface-muted)] shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}
