import styles from './style.module.scss'
import Play from '@/components/Play/Play'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.content}>
      <Link href='/'>
        <img src='/images/other/logo.png' alt='Logo' />
      </Link>

      <div className={styles.music}>
        <p>do you want some music?</p>
        <Play />
      </div>
    </header>
  )
}
