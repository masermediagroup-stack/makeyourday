import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] active:translate-y-px',
  {
    variants: {
      variant: {
        default: 'bg-[var(--text)] text-white hover:bg-[#333a44] hover:-translate-y-[1px]',
        subtle:
          'bg-[var(--surface-muted)] text-[var(--text)] border border-[var(--line)] hover:bg-white hover:-translate-y-[1px] hover:shadow-[var(--shadow-soft)]',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-xs',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
