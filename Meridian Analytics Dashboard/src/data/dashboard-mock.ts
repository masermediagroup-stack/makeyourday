import type { ActivityItem, KPI, RevenuePoint } from '../types/dashboard'

export const kpiData: KPI[] = [
  {
    id: 'arr',
    label: 'Annual Recurring Revenue',
    value: '$4.28M',
    delta: '+12.4%',
    trend: 'up',
    note: 'Quarter over quarter',
  },
  {
    id: 'nrr',
    label: 'Net Revenue Retention',
    value: '118.7%',
    delta: '+3.1%',
    trend: 'up',
    note: 'Enterprise cohort',
  },
  {
    id: 'churn',
    label: 'Gross Logo Churn',
    value: '2.8%',
    delta: '-0.6%',
    trend: 'down',
    note: 'Trailing 60 days',
  },
  {
    id: 'pipeline',
    label: 'Qualified Pipeline',
    value: '$893k',
    delta: '+8.9%',
    trend: 'up',
    note: 'Next 45 days',
  },
]

export const revenueData: RevenuePoint[] = [
  { week: 'W1', mrr: 280000, conversion: 41.2 },
  { week: 'W2', mrr: 294000, conversion: 43.6 },
  { week: 'W3', mrr: 307000, conversion: 44.1 },
  { week: 'W4', mrr: 315000, conversion: 45.5 },
  { week: 'W5', mrr: 326000, conversion: 47.2 },
  { week: 'W6', mrr: 334000, conversion: 46.8 },
  { week: 'W7', mrr: 348000, conversion: 48.4 },
  { week: 'W8', mrr: 356000, conversion: 49.1 },
]

export const activityData: ActivityItem[] = [
  {
    id: 'a1',
    actor: 'Nadia Keller',
    action: 'approved enterprise quote',
    context: 'Northline Labs',
    at: '3m ago',
    tone: 'teal',
  },
  {
    id: 'a2',
    actor: 'Rohan Patel',
    action: 'flagged churn risk',
    context: 'Monarch Freight',
    at: '11m ago',
    tone: 'navy',
  },
  {
    id: 'a3',
    actor: 'Elena Mirov',
    action: 'closed expansion seat block',
    context: 'Archetype Health',
    at: '24m ago',
    tone: 'success',
  },
  {
    id: 'a4',
    actor: 'Mika Torres',
    action: 'synced CS handoff notes',
    context: 'Pacific Relay',
    at: '46m ago',
    tone: 'teal',
  },
]
