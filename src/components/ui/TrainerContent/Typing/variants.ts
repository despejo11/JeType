export const caretVariants = {
  initial: { scaleY: 0, y: -7.5, x: -2.5 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0, y: -7.5, x: -2.5 },
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
