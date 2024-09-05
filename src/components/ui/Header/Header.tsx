'use client'

import styles from './style.module.scss'
import Play from '@/components/Play/Play'
import { usePathname, useRouter } from 'next/navigation'
import { animatePageOut } from '@/utils/transition'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    const href = '/'

    if (pathname === href) {
      animatePageOut(href, router)

      setTimeout(() => {
        window.location.reload()
      }, 900)
    } else if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <header className={styles.content}>
      <img onClick={handleClick} src='/images/other/logo.png' alt='Logo' />

      <div className={styles.music}>
        <p>do you want some music?</p>
        <Play />
      </div>
    </header>
  )
}
