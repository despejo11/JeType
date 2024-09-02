import styles from '@/styles/not-found.module.scss'
import Button from '@/components/Button/Button'
import Link from 'next/link'

export default function notFound() {
  return (
    <div className={styles.content}>
      <img
        className={styles.background}
        src='/images/bg/404Bg.png'
        alt='Pattern'
      />

      <div className={styles.error}>
        <img src='/images/other/404.png' alt='404' />

        <Link href='/'>
          <Button className={styles.button}>
            <p className={styles.first}>Back to Home</p>
            <p className={styles.second}>Back to Home</p>
            <p className={styles.third}>Back to Home</p>
          </Button>
        </Link>
      </div>
    </div>
  )
}
