const DURATION = 0.25

export const contentVariants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: {
      duration: DURATION,
    },
  },
  exit: { scaleY: 0 },
}

export const scaleVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: DURATION,
    },
  },
  exit: { scale: 0 },
}

export const liVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (isActive: boolean) => ({
    scale: 1,
    opacity: 1,
    color: isActive ? '#272727' : '#c7b9a5',
    transition: {
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 22,
    },
  }),
  exit: { scale: 0, opacity: 0 },
}

export const spanVariants = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0 },
}

export const infinityIconVariants = {
  active: {
    fill: '#272727',
    transition: {
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 22,
    },
  },
  inactive: {
    fill: '#c7b9a5',
    transition: {
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 22,
    },
  },
}
