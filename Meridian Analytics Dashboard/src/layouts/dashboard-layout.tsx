import { type ReactNode, type SetStateAction, useState } from 'react'
import type { DashboardPage, DashboardTool, ViewState } from '../types/dashboard'
import { Sidebar } from '../components/dashboard/sidebar'
import { Topbar } from '../components/dashboard/topbar'
import { DashboardPageContent } from '../components/dashboard/page-content'
import { ToolWorkspaces } from '../components/dashboard/tool-workspaces'

type DashboardLayoutProps = {
  children: ReactNode
  viewState: ViewState
  onViewStateChange: React.Dispatch<React.SetStateAction<ViewState>>
}

export function DashboardLayout({ children, viewState, onViewStateChange }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [activePage, setActivePage] = useState<DashboardPage>('overview')
  const [activeTool, setActiveTool] = useState<DashboardTool>(null)
  const hasStateLayer = viewState !== 'ready'

  const handleViewStateChange = (next: SetStateAction<ViewState>) => {
    if (typeof next === 'function') {
      onViewStateChange((prev) => {
        const resolved = (next as (value: ViewState) => ViewState)(prev)
        if (resolved !== 'ready') {
          setActiveTool(null)
        }
        return resolved
      })
      return
    }

    if (next !== 'ready') {
      setActiveTool(null)
    }
    onViewStateChange(next)
  }

  return (
    <div className="relative min-h-[100dvh] bg-[var(--bg)]">
      <div className="grain-layer" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1600px]">
        <Sidebar collapsed={collapsed} activePage={activePage} onPageChange={setActivePage} />
        <div className="min-w-0 flex-1">
          <Topbar
            onToggleSidebar={() => setCollapsed((prev) => !prev)}
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            activePage={activePage}
            activeTool={activeTool}
            onToolChange={(tool) => setActiveTool((current) => (current === tool ? null : tool))}
          />
          <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
            {!hasStateLayer && <ToolWorkspaces activeTool={activeTool} />}
            {hasStateLayer ? children : <DashboardPageContent page={activePage} />}
          </main>
        </div>
      </div>
    </div>
  )
}
