import { Metadata } from 'next'
import styles from '@/styles/not-found.module.scss'
import Button from '@/components/Button/Button'

export const metadata: Metadata = {
  title: 'JeType — 404',
  description: 'Page not found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function notFound() {
  return (
    <div className={styles.content}>
      <img
        className={styles.background}
        src='/images/bg/404Bg.webp'
        alt='Pattern'
      />

      <div className={styles.error}>
        <img src='/images/other/404.webp' alt='404' />

        <Button href='/' className={styles.button}>
          <p className={styles.first}>Back to Home</p>
          <p className={styles.second}>Back to Home</p>
          <p className={styles.third}>Back to Home</p>
        </Button>
      </div>
    </div>
  )
}
