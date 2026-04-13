import { BellSimple, FadersHorizontal, MagnifyingGlass, SidebarSimple } from '@phosphor-icons/react'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import type { DashboardPage, DashboardTool, ViewState } from '../../types/dashboard'
import { cn } from '../../lib/utils'

type TopbarProps = {
  onToggleSidebar: () => void
  viewState: ViewState
  onViewStateChange: Dispatch<SetStateAction<ViewState>>
  activePage: DashboardPage
  activeTool: DashboardTool
  onToolChange: (tool: Exclude<DashboardTool, null>) => void
}

const pageTitles: Record<DashboardPage, { label: string; title: string }> = {
  overview: { label: 'Enterprise Workspace', title: 'Revenue Intelligence' },
  forecasting: { label: 'Modeling Studio', title: 'Forecasting' },
  workspace: { label: 'Team Operations', title: 'Workspace' },
  activity: { label: 'System Feed', title: 'Activity Stream' },
  roadmap: { label: 'Planning Cycles', title: 'Roadmap' },
  settings: { label: 'Configuration', title: 'Workspace Settings' },
}

export function Topbar({
  onToggleSidebar,
  viewState,
  onViewStateChange,
  activePage,
  activeTool,
  onToolChange,
}: TopbarProps) {
  const pageMeta = pageTitles[activePage]

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="subtle"
            size="icon"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="hidden md:inline-flex"
          >
            <SidebarSimple size={18} weight="duotone" />
          </Button>
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {pageMeta.label}
            </p>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-[var(--text)]">
              {pageMeta.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="subtle"
            size="sm"
            aria-label="Open quarterly snapshot workspace"
            onClick={() => onToolChange('snapshot')}
            aria-pressed={activeTool === 'snapshot'}
            className={cn(
              'uppercase tracking-[0.14em]',
              activeTool === 'snapshot' && 'bg-[#e8eef9] text-[var(--navy)]'
            )}
          >
            Q2 snapshot
          </Button>
          <Button
            variant="subtle"
            size="icon"
            aria-label="Open search workspace"
            onClick={() => onToolChange('search')}
            aria-pressed={activeTool === 'search'}
            className={cn(activeTool === 'search' && 'bg-[var(--teal-soft)] text-[var(--teal)]')}
          >
            <MagnifyingGlass size={18} weight="duotone" />
          </Button>
          <Button
            variant="subtle"
            size="icon"
            aria-label="Open filter workspace"
            onClick={() => onToolChange('filters')}
            aria-pressed={activeTool === 'filters'}
            className={cn(activeTool === 'filters' && 'bg-[var(--teal-soft)] text-[var(--teal)]')}
          >
            <FadersHorizontal size={18} weight="duotone" />
          </Button>
          <Button
            variant="subtle"
            size="icon"
            aria-label="Open notification center workspace"
            onClick={() => onToolChange('notifications')}
            aria-pressed={activeTool === 'notifications'}
            className={cn(activeTool === 'notifications' && 'bg-[var(--teal-soft)] text-[var(--teal)]')}
          >
            <BellSimple size={18} weight="duotone" />
          </Button>
          <label className="sr-only" htmlFor="view-state">
            Dashboard view state
          </label>
          <select
            id="view-state"
            value={viewState}
            onChange={(event) => onViewStateChange(event.target.value as ViewState)}
            className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2 py-2 text-xs font-medium text-[var(--text)]"
          >
            <option value="ready">Ready</option>
            <option value="loading">Loading</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
    </header>
  )
}
