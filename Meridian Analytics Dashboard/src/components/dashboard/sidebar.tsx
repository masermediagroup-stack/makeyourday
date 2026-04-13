import {
  ChartLineUp,
  ClockCounterClockwise,
  Compass,
  Gear,
  House,
  Stack,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { motionTokens } from '../../lib/motion-tokens'
import type { DashboardPage } from '../../types/dashboard'

type SidebarProps = {
  collapsed: boolean
  activePage: DashboardPage
  onPageChange: (page: DashboardPage) => void
}

const navItems = [
  { key: 'overview', label: 'Overview', icon: House },
  { key: 'forecasting', label: 'Forecasting', icon: ChartLineUp },
  { key: 'workspace', label: 'Workspace', icon: Stack },
  { key: 'activity', label: 'Activity', icon: ClockCounterClockwise },
  { key: 'roadmap', label: 'Roadmap', icon: Compass },
  { key: 'settings', label: 'Settings', icon: Gear },
]

export function Sidebar({ collapsed, activePage, onPageChange }: SidebarProps) {
  return (
    <motion.aside
      layout
      transition={motionTokens.spring}
      className={cn(
        'sticky top-0 hidden h-[100dvh] border-r border-[var(--line)] bg-[var(--surface)] p-4 md:block',
        collapsed ? 'w-[88px]' : 'w-[250px]'
      )}
      aria-label="Primary navigation"
    >
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="h-9 w-9 rounded-[10px] bg-[var(--navy)]" />
        {!collapsed && (
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Meridian</p>
            <p className="text-sm font-semibold text-[var(--text)]">Control Layer</p>
          </div>
        )}
      </div>

      <nav className="space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.label}
              type="button"
              onClick={() => onPageChange(item.key as DashboardPage)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...motionTokens.enter, delay: index * 0.03 }}
              className={cn(
                'group flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]/50',
                activePage === item.key && 'bg-[var(--teal-soft)] text-[var(--teal)]'
              )}
              aria-current={activePage === item.key ? 'page' : undefined}
            >
              <Icon size={18} weight="duotone" />
              {!collapsed && <span>{item.label}</span>}
            </motion.button>
          )
        })}
      </nav>
    </motion.aside>
  )
}
