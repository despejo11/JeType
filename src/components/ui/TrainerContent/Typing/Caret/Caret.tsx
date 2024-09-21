import styles from './style.module.scss'
import { TCaretProps } from './types'
import { caretVariants } from '../variants'
import { motion } from 'framer-motion'

export default function Caret({ position, isTestRunning }: TCaretProps) {
  return (
    <motion.span
      className={styles.caret}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      // @ts-ignore
      variants={caretVariants}
      animate={isTestRunning ? 'animate' : 'blink'}
      initial='initial'
      exit='exit'
    />
  )
}
