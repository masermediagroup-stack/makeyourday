import { AnimatePresence, motion } from 'framer-motion'
import { BellSimple, MagnifyingGlass, SlidersHorizontal } from '@phosphor-icons/react'
import type { DashboardTool } from '../../types/dashboard'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

type ToolWorkspacesProps = {
  activeTool: DashboardTool
}

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] as const },
}

function SnapshotPanel() {
  return (
    <Card variant="interactive" className="p-6 md:p-8">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Quarter review</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">Q2 snapshot workspace</h2>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          ['Revenue quality', '$4.28M ARR, 118.7% NRR'],
          ['Conversion', '47.2% weighted close rate'],
          ['Retention pressure', '2.8% logo churn'],
        ].map(([title, body]) => (
          <Card key={title} variant="subtle" className="p-4">
            <p className="text-sm font-semibold text-[var(--text)]">{title}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{body}</p>
          </Card>
        ))}
      </div>
    </Card>
  )
}

function SearchPanel() {
  return (
    <Card variant="interactive" className="p-6 md:p-8">
      <div className="flex items-center gap-3">
        <MagnifyingGlass size={20} weight="duotone" className="text-[var(--teal)]" />
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Search workspace</h2>
      </div>
      <label htmlFor="workspace-search" className="mt-5 block text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
        Query
      </label>
      <input
        id="workspace-search"
        placeholder="Search accounts, events, notes, or model variants"
        className="mt-2 h-11 w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--teal)]"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="navy">Northline Labs</Badge>
        <Badge tone="teal">expansion risk</Badge>
        <Badge tone="neutral">forecast delta</Badge>
      </div>
    </Card>
  )
}

function FiltersPanel() {
  return (
    <Card variant="interactive" className="p-6 md:p-8">
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={20} weight="duotone" className="text-[var(--teal)]" />
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Filter workspace</h2>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          ['Segment', 'Enterprise'],
          ['Region', 'North America'],
          ['Lifecycle stage', 'Renewal window'],
          ['Forecast model', 'Weighted multi-touch'],
        ].map(([label, value]) => (
          <div key={label} className="space-y-2">
            <p className="block text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">{label}</p>
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)]">
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <Button>Apply filters</Button>
        <Button variant="subtle">Reset</Button>
      </div>
    </Card>
  )
}

function NotificationsPanel() {
  return (
    <Card variant="interactive" className="p-6 md:p-8">
      <div className="flex items-center gap-3">
        <BellSimple size={20} weight="duotone" className="text-[var(--teal)]" />
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Notification center</h2>
      </div>
      <div className="mt-5 space-y-3">
        {[
          ['Northline Labs moved to renewal risk watch', '6m ago'],
          ['Expansion quote approved by Nadia Keller', '18m ago'],
          ['Model v4.3 confidence drift corrected', '52m ago'],
        ].map(([message, time]) => (
          <Card key={message} variant="subtle" className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-[var(--text)]">{message}</p>
              <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{time}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}

export function ToolWorkspaces({ activeTool }: ToolWorkspacesProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTool && (
        <motion.section
          key={activeTool}
          {...panelMotion}
          className="mb-4"
          aria-live="polite"
        >
          {activeTool === 'snapshot' && <SnapshotPanel />}
          {activeTool === 'search' && <SearchPanel />}
          {activeTool === 'filters' && <FiltersPanel />}
          {activeTool === 'notifications' && <NotificationsPanel />}
        </motion.section>
      )}
    </AnimatePresence>
  )
}
