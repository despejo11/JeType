const DURATION = 0.25
const STAGGER = 0.025

export const textVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
  exit: { opacity: 0 },
}

export const IMGVariants = {
  initial: { opacity: 0, rotate: 90 },
  animate: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, rotate: 90 },
}

export const itemVariants = {
  hidden: {
    y: '200%',
    transition: {
      duration: DURATION,
      delay: 0.1,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: DURATION,
      type: 'spring',
      stiffness: 160,
      damping: 20,
    },
  },
}

export const containerVariants = {
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.1,
    },
  },
}
