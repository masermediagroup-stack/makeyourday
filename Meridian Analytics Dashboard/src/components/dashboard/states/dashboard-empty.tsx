import { FileArrowDown } from '@phosphor-icons/react'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'

export function DashboardEmptyState() {
  return (
    <Card className="mx-auto max-w-3xl p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--teal-soft)] text-[var(--teal)]">
        <FileArrowDown size={24} weight="duotone" />
      </div>
      <h3 className="m-0 text-2xl tracking-tight text-[var(--text)]">No telemetry yet</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Connect your data source to start tracking account expansion, conversion health, and churn risk signals.
      </p>
      <Button className="mt-6">Connect source</Button>
    </Card>
  )
}
