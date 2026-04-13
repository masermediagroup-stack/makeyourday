import { useReducedMotion } from 'framer-motion'

export function useReducedMotionSafe() {
  const reduced = useReducedMotion()
  return {
    reduced,
    enterY: reduced ? 0 : 12,
    duration: reduced ? 0 : 0.45,
  }
}
