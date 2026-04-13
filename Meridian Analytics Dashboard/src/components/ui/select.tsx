import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'

export function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'inline-flex h-9 items-center justify-between gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--surface)] px-3 text-xs font-medium text-[var(--text)] shadow-[var(--shadow-soft)] transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none hover:-translate-y-[1px] hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)] focus-visible:ring-2 focus-visible:ring-[var(--teal)]/50 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown size={12} weight="bold" className="text-[var(--text-muted)]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 max-h-72 min-w-[10rem] overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-lift)]',
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-[var(--text-muted)]">
          <CaretUp size={12} weight="bold" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-[var(--text-muted)]">
          <CaretDown size={12} weight="bold" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-[7px] py-2 pl-8 pr-2 text-xs text-[var(--text)] outline-none data-[highlighted]:bg-[var(--surface-muted)] data-[highlighted]:text-[var(--text)]',
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center text-[var(--teal)]">
        <SelectPrimitive.ItemIndicator>
          <Check size={12} weight="bold" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
