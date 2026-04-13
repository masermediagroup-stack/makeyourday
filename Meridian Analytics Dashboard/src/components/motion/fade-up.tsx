import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '../../hooks/use-reduced-motion-safe'
import { motionTokens } from '../../lib/motion-tokens'

type FadeUpProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const { reduced, enterY } = useReducedMotionSafe()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: enterY }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { ...motionTokens.enter, delay }
      }
    >
      {children}
    </motion.div>
  )
}
