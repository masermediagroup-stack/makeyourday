import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { RevenuePoint } from '../../types/dashboard'
import { Card } from '../ui/card'
import { FadeUp } from '../motion/fade-up'

type PrimaryAreaChartProps = {
  data: RevenuePoint[]
}

function currency(value: number) {
  return `$${Math.round(value / 1000)}k`
}

export function PrimaryAreaChart({ data }: PrimaryAreaChartProps) {
  return (
    <FadeUp>
      <Card className="h-full p-6 hover:shadow-[var(--shadow-lift)]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.13em] text-[var(--text-muted)]">Primary trend</p>
            <h2 className="m-0 text-xl font-semibold tracking-tight text-[var(--text)]">MRR vs Conversion</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Last 8 weeks</p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1ea5a1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1ea5a1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#66707c', fontSize: 12 }} />
              <YAxis
                yAxisId="mrr"
                axisLine={false}
                tickLine={false}
                tickFormatter={currency}
                tick={{ fill: '#66707c', fontSize: 12 }}
              />
              <YAxis
                yAxisId="conversion"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: '#66707c', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                }}
              />
              <Area
                yAxisId="mrr"
                type="monotone"
                dataKey="mrr"
                stroke="#20344e"
                strokeWidth={2}
                fill="url(#mrrFill)"
                animationDuration={600}
              />
              <Area
                yAxisId="conversion"
                type="monotone"
                dataKey="conversion"
                stroke="#1ea5a1"
                strokeWidth={2}
                fillOpacity={0}
                animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </FadeUp>
  )
}
