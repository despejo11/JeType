export const caretVariants = {
  initial: { scaleY: 0, y: 4, x: -2.5 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0, y: 4, x: -2.5 },
  blink: {
    scaleY: [0, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export const fadeInOutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: { opacity: 0 },
}

export const toTypeFadeInOutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: { opacity: 0 },
}

export const typingFadeInOutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: 0.1,
    },
  },
  exit: { opacity: 0 },
}

export const tabFadeInOutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 0.9,
    transition: {
      duration: 0.25,
      delay: 0.12,
    },
  },
  exit: { opacity: 0 },
}

export const isErrorFadeInOutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.13,
    },
  },
  exit: { opacity: 0 },
}
