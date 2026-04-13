import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionTokens } from '../../lib/motion-tokens'
import { useReducedMotionSafe } from '../../hooks/use-reduced-motion-safe'

type StaggerGroupProps = {
  children: ReactNode
  className?: string
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const { reduced } = useReducedMotionSafe()

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: reduced
            ? { staggerChildren: 0 }
            : { staggerChildren: motionTokens.stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerGroupProps) {
  const { reduced, enterY } = useReducedMotionSafe()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: enterY },
        show: {
          opacity: 1,
          y: 0,
          transition: reduced ? { duration: 0 } : motionTokens.enter,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
