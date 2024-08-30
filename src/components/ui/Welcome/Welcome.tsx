import styles from './style.module.scss'
import Background from './Background'

export default function Welcome() {
  return (
    <div className={styles.content}>
      <p className={styles.learnTo}>Learn to</p>
      <Background />
      <p className={styles.withUs}>With Us</p>
    </div>
  )
}
