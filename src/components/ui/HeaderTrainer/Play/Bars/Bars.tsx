import styles from './style.module.scss'
import { barsVariants } from './variants'
import { motion } from 'framer-motion'

export default function Bars() {
  return (
    <motion.div
      variants={barsVariants}
      initial='hidden'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.6, delay: 1 }}
      className={styles.bars}
    >
      <div className={styles.item}></div>
      <div className={styles.item}></div>
      <div className={styles.item}></div>
      <div className={styles.item}></div>
    </motion.div>
  )
}
