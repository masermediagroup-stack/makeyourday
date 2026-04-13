import * as React from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[12px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
        className
      )}
      {...props}
    />
  )
}
