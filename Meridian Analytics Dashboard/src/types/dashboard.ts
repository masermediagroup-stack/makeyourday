export type ViewState = 'ready' | 'loading' | 'empty' | 'error'
export type DashboardPage =
  | 'overview'
  | 'forecasting'
  | 'workspace'
  | 'activity'
  | 'roadmap'
  | 'settings'

export type DashboardTool = 'snapshot' | 'search' | 'filters' | 'notifications' | null

export type KPI = {
  id: string
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
  note: string
}

export type RevenuePoint = {
  week: string
  mrr: number
  conversion: number
}

export type ActivityItem = {
  id: string
  actor: string
  action: string
  context: string
  at: string
  tone: 'teal' | 'navy' | 'success'
}
