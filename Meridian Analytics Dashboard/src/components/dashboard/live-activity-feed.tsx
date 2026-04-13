import { motion } from 'framer-motion'
import type { ActivityItem } from '../../types/dashboard'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { motionTokens } from '../../lib/motion-tokens'

type LiveActivityFeedProps = {
  items: ActivityItem[]
}

export function LiveActivityFeed({ items }: LiveActivityFeedProps) {
  return (
    <Card className="h-full p-6 hover:shadow-[var(--shadow-lift)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-lg font-semibold tracking-tight text-[var(--text)]">Live activity</h2>
        <Badge tone="teal">Live</Badge>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...motionTokens.enter, delay: index * 0.05 }}
            className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-muted)] p-3 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px]"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-[var(--text)]">{item.actor}</p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{item.at}</p>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {item.action} <span className="font-medium text-[var(--text)]">{item.context}</span>
            </p>
            <Badge tone={item.tone} className="mt-2">
              {item.tone}
            </Badge>
          </motion.article>
        ))}
      </div>
    </Card>
  )
}
