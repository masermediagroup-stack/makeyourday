export const motionTokens = {
  spring: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  },
  enter: {
    duration: 0.45,
    ease: [0.32, 0.72, 0, 1] as const,
  },
  quick: {
    duration: 0.22,
    ease: [0.32, 0.72, 0, 1] as const,
  },
  stagger: 0.08,
} as const
