import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { KPI } from '../../types/dashboard'
import { Card } from '../ui/card'
import { StaggerItem } from '../motion/stagger-group'
import { motionTokens } from '../../lib/motion-tokens'

type KpiCardsProps = {
  items: KPI[]
}

export function KpiCards({ items }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const positive = item.trend === 'up'
        return (
          <StaggerItem key={item.id}>
            <motion.div layout whileHover={{ y: -2 }} transition={motionTokens.spring}>
              <Card className="p-5 hover:shadow-[var(--shadow-lift)]">
                <p className="text-[11px] uppercase tracking-[0.13em] text-[var(--text-muted)]">{item.label}</p>
                <p
                  className="mt-3 text-[42px] leading-[0.95] tracking-tight text-[var(--text)] [font-variant-numeric:tabular-nums]"
                  style={{ fontFamily: 'var(--font-stat)' }}
                >
                  {item.value}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      positive
                        ? 'bg-[var(--success-soft)] text-[var(--success)]'
                        : 'bg-[var(--danger-soft)] text-[var(--danger)]'
                    }`}
                  >
                    {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {item.delta}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{item.note}</span>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
        )
      })}
    </div>
  )
}
