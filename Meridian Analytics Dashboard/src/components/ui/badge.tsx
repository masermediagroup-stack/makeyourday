import { cn } from '../../lib/utils'

type BadgeProps = {
  children: string
  tone?: 'teal' | 'navy' | 'neutral' | 'success' | 'danger'
  className?: string
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  teal: 'bg-[var(--teal-soft)] text-[var(--teal)]',
  navy: 'bg-[#e8eef9] text-[var(--navy)]',
  neutral: 'bg-[#f2efe8] text-[var(--text-muted)]',
  success: 'bg-[var(--success-soft)] text-[var(--success)]',
  danger: 'bg-[var(--danger-soft)] text-[var(--danger)]',
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
