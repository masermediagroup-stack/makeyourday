import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ReactNode } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { FadeUp } from '../motion/fade-up'
import { StaggerGroup, StaggerItem } from '../motion/stagger-group'
import { LiveActivityFeed } from './live-activity-feed'
import { KpiCards } from './kpi-cards'
import { PrimaryAreaChart } from './primary-area-chart'
import { activityData, kpiData, revenueData } from '../../data/dashboard-mock'
import type { DashboardPage } from '../../types/dashboard'

type PageContentProps = {
  page: DashboardPage
}

const teamLoadData = [
  { week: 'W1', platform: 48, customer: 29, enablement: 16 },
  { week: 'W2', platform: 52, customer: 27, enablement: 18 },
  { week: 'W3', platform: 56, customer: 24, enablement: 20 },
  { week: 'W4', platform: 59, customer: 26, enablement: 19 },
  { week: 'W5', platform: 57, customer: 28, enablement: 22 },
]

function Panel({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow: string
  children: ReactNode
}) {
  return (
    <FadeUp>
      <Card className="p-6 md:p-8 hover:shadow-[var(--shadow-lift)]">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{eyebrow}</p>
        <h2 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-semibold tracking-tight text-[var(--text)]">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </Card>
    </FadeUp>
  )
}

function OverviewPage() {
  return (
    <StaggerGroup className="space-y-4">
      <KpiCards items={kpiData} />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <PrimaryAreaChart data={revenueData} />
        <LiveActivityFeed items={activityData} />
      </section>
    </StaggerGroup>
  )
}

function ForecastingPage() {
  return (
    <div className="space-y-5">
      <Panel title="Scenario stack" eyebrow="Forecast controls">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.15fr_1fr_1fr]">
          {[
            ['Base', '47.2% close rate', 'teal'],
            ['Conservative', '42.9% close rate', 'neutral'],
            ['Aggressive', '53.6% close rate', 'navy'],
          ].map(([label, detail, tone]) => (
            <Card key={label} className="p-4 hover:-translate-y-[1px]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--text)]">{label}</p>
                <Badge tone={tone as 'teal' | 'neutral' | 'navy'}>{label}</Badge>
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{detail}</p>
            </Card>
          ))}
        </div>
      </Panel>
      <Panel title="Pipeline confidence curve" eyebrow="Model output">
        <div className="h-[310px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#66707c', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#66707c', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--surface)' }}
              />
              <Area type="monotone" dataKey="conversion" stroke="#1ea5a1" fill="#1ea5a11f" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  )
}

function WorkspacePage() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
      <Panel title="Operational allocation" eyebrow="Team focus">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={teamLoadData}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#66707c', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#66707c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--surface)' }}
              />
              <Area type="monotone" dataKey="platform" stackId="1" stroke="#20344e" fill="#20344e29" />
              <Area type="monotone" dataKey="customer" stackId="1" stroke="#1ea5a1" fill="#1ea5a133" />
              <Area type="monotone" dataKey="enablement" stackId="1" stroke="#4a617b" fill="#4a617b22" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="Current initiatives" eyebrow="Execution board">
        <div className="space-y-3">
          {[
            ['Pipeline hygiene rollout', 'Owner: Nadia Keller', 'success'],
            ['Renewal narrative refresh', 'Owner: Elena Mirov', 'teal'],
            ['At-risk expansion rescue', 'Owner: Mika Torres', 'navy'],
          ].map(([title, owner, tone]) => (
            <Card key={title} className="p-4 hover:-translate-y-[1px]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--text)]">{title}</p>
                <Badge tone={tone as 'success' | 'teal' | 'navy'}>{tone}</Badge>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">{owner}</p>
            </Card>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function ActivityPage() {
  return (
    <div className="space-y-5">
      <Panel title="Real-time account timeline" eyebrow="Live activity">
        <LiveActivityFeed items={activityData} />
      </Panel>
      <FadeUp>
        <Card className="p-6">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">System notices</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              'HubSpot sync latency normalized in US-East.',
              'Attribution pipeline now uses backfilled lead source tags.',
              'Forecast model v4.3 promoted to default workspace.',
              'Sandbox exports currently queued with priority drain.',
            ].map((note) => (
              <Card key={note} className="bg-[var(--surface-muted)] p-4 hover:-translate-y-[1px]">
                <p className="text-sm text-[var(--text-muted)]">{note}</p>
              </Card>
            ))}
          </div>
        </Card>
      </FadeUp>
    </div>
  )
}

function RoadmapPage() {
  return (
    <StaggerGroup className="space-y-5">
      <Panel title="Quarter plan" eyebrow="Milestones">
        <div className="space-y-2">
          {[
            ['May 04', 'Predictive churn alerts', 'In validation'],
            ['May 19', 'Automated pipeline anomaly digest', 'In development'],
            ['Jun 02', 'Workspace-based access policy', 'Scheduled'],
            ['Jun 17', 'Forecast confidence decomposition', 'Scheduled'],
          ].map(([date, title, status]) => (
            <StaggerItem key={title}>
              <div className="grid grid-cols-[90px_1fr_auto] items-center gap-3 rounded-[10px] border border-[var(--line)] bg-[var(--surface-muted)] p-3 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px]">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{date}</p>
                <p className="text-sm font-medium text-[var(--text)]">{title}</p>
                <Badge tone={status === 'In development' ? 'teal' : 'navy'}>{status}</Badge>
              </div>
            </StaggerItem>
          ))}
        </div>
      </Panel>
    </StaggerGroup>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-5">
      <Panel title="Workspace defaults" eyebrow="Preferences">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ['Currency profile', 'USD and annualized MRR'],
            ['Forecast horizon', '8-week rolling model'],
            ['Attribution model', 'Weighted multi-touch'],
            ['Notification digest', 'Hourly'],
          ].map(([label, value]) => (
            <Card key={label} className="p-4 hover:-translate-y-[1px]">
              <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</p>
              <p className="mt-2 text-sm font-medium text-[var(--text)]">{value}</p>
            </Card>
          ))}
        </div>
      </Panel>
      <FadeUp>
        <Card className="flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">API credentials</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Rotate keys used for telemetry ingestion and warehouse exports.
            </p>
          </div>
          <Button>Rotate keys</Button>
        </Card>
      </FadeUp>
    </div>
  )
}

export function DashboardPageContent({ page }: PageContentProps) {
  if (page === 'forecasting') return <ForecastingPage />
  if (page === 'workspace') return <WorkspacePage />
  if (page === 'activity') return <ActivityPage />
  if (page === 'roadmap') return <RoadmapPage />
  if (page === 'settings') return <SettingsPage />
  return <OverviewPage />
}
