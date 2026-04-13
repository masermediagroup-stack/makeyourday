import { useMemo, useState } from 'react'
import { DashboardLayout } from './layouts/dashboard-layout'
import { DashboardLoadingState } from './components/dashboard/states/dashboard-loading'
import { DashboardEmptyState } from './components/dashboard/states/dashboard-empty'
import { DashboardErrorState } from './components/dashboard/states/dashboard-error'
import type { ViewState } from './types/dashboard'

function App() {
  const [viewState, setViewState] = useState<ViewState>('ready')
  const stateView = useMemo(() => {
    if (viewState === 'loading') {
      return <DashboardLoadingState />
    }
    if (viewState === 'empty') {
      return <DashboardEmptyState />
    }
    if (viewState === 'error') {
      return <DashboardErrorState onRetry={() => setViewState('ready')} />
    }
    return null
  }, [viewState])

  return (
    <DashboardLayout viewState={viewState} onViewStateChange={setViewState}>
      {stateView}
    </DashboardLayout>
  )
}

export default App
