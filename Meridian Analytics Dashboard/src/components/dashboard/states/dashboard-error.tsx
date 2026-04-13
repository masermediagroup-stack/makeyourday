import { WarningCircle } from '@phosphor-icons/react'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'

type DashboardErrorStateProps = {
  onRetry: () => void
}

export function DashboardErrorState({ onRetry }: DashboardErrorStateProps) {
  return (
    <Card className="mx-auto max-w-3xl border-[var(--danger)]/20 bg-[var(--danger-soft)] p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--danger)]">
        <WarningCircle size={24} weight="duotone" />
      </div>
      <h3 className="m-0 text-2xl tracking-tight text-[var(--text)]">Data sync interrupted</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        We could not load this workspace snapshot. Verify your source credentials, then retry the sync.
      </p>
      <Button className="mt-6" onClick={onRetry}>
        Retry snapshot
      </Button>
    </Card>
  )
}
