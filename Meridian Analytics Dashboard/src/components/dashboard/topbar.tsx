import { BellSimple, FadersHorizontal, MagnifyingGlass, SidebarSimple } from '@phosphor-icons/react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import type { DashboardPage, DashboardTool, ViewState } from '../../types/dashboard'
import { cn } from '../../lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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
  const [period, setPeriod] = useState('8w')
  const [compareMode, setCompareMode] = useState('prev')
  const [segment, setSegment] = useState('enterprise')

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-4 py-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
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
          <Select value={viewState} onValueChange={(value) => onViewStateChange(value as ViewState)}>
            <SelectTrigger id="view-state" className="w-[122px]">
              <SelectValue placeholder="Dashboard state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="loading">Loading</SelectItem>
              <SelectItem value="empty">Empty</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-3">
          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Global controls</span>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[148px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8w">Last 8 weeks</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="qtd">Quarter to date</SelectItem>
            </SelectContent>
          </Select>
          <Select value={compareMode} onValueChange={setCompareMode}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prev">Compare: previous period</SelectItem>
              <SelectItem value="lastYear">Compare: same quarter last year</SelectItem>
              <SelectItem value="none">No comparison</SelectItem>
            </SelectContent>
          </Select>
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-[174px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enterprise">Segment: Enterprise</SelectItem>
              <SelectItem value="midmarket">Segment: Mid-market</SelectItem>
              <SelectItem value="all">Segment: All accounts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
