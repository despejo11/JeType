const DURATION = 0.25

export const IMGVariants = {
  initial: { scale: 0, y: -10 },
  animate: {
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION,
    },
  },
  exit: { scale: 0, y: -10 },
}

export const activeLanguageVariants = {
  initial: { y: '200%' },
  animate: {
    y: 0,
    transition: {
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 20,
    },
  },
  exit: { y: '-200%' },
}

export const SVGScaleVariants = {
  initial: { scale: 0, y: -10 },
  animate: {
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION,
    },
  },
  exit: { scale: 0, y: -10 },
}

export const SVGRotateVariants = {
  initial: { rotate: 0 },
  animate: (isDropdownOpen: boolean) => ({
    rotate: isDropdownOpen ? 180 : 0,
    transition: {
      duration: DURATION,
    },
  }),
  exit: { rotate: 0 },
}

export const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 90,
    transition: { delay: 0.3 },
  },
  visible: {
    opacity: 1,
    height: 190,
  },
}

export const dropdownItemVariants = {
  initial: { y: '-100%' },
  animate: {
    y: 0,
    transition: {
      delay: 0.15,
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 20,
    },
  },
  exit: { y: '100%' },
}
