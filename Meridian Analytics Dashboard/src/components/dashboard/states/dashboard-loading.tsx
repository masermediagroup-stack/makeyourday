import { Card } from '../../ui/card'

export function DashboardLoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse p-5">
            <div className="h-3 w-32 rounded bg-[var(--line)]" />
            <div className="mt-4 h-10 w-24 rounded bg-[var(--line)]" />
            <div className="mt-4 h-4 w-20 rounded bg-[var(--line)]" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="h-[380px] animate-pulse bg-[var(--surface-muted)]" />
        <Card className="h-[380px] animate-pulse bg-[var(--surface-muted)]" />
      </div>
    </div>
  )
}
