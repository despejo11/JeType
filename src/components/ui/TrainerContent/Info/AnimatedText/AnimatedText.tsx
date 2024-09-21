import styles from './style.module.scss'
import { TWrapperProps, TAnimatedTextProps } from './types'
import { itemVariants, containerVariants } from '../variants'
import { motion } from 'framer-motion'

const Wrapper = ({ children }: TWrapperProps) => {
  return <span>{children}</span>
}

export default function AnimatedText({ text }: TAnimatedTextProps) {
  const characters = text
    .split('')
    .map((char) => (char === ' ' ? '\u00A0' : char))

  return (
    <motion.span
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      {characters.map((char, index) => (
        <Wrapper key={index}>
          <span className={styles.text}>
            <motion.span variants={itemVariants}>{char}</motion.span>
          </span>
        </Wrapper>
      ))}
    </motion.span>
  )
}
