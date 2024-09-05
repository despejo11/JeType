'use client'

import styles from './style.module.scss'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { animatePageOut } from '@/utils/transition'
import { TButtonProps } from './types'

export default function Button({
  children,
  href,
  ...attributes
}: TButtonProps) {
  const [isWideScreen, setIsWideScreen] = useState(false)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  let timeoutId: NodeJS.Timeout | null = null

  const circle = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsWideScreen(window.innerWidth >= 1000)

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1000)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
    timeline.current
      .to(
        circle.current,
        { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
        'enter'
      )
      .to(
        circle.current,
        { top: '-150%', width: '125%', duration: 0.25 },
        'exit'
      )
  }, [])

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeline.current?.tweenFromTo('enter', 'exit')
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play()
    }, 300)
  }

  const handleClick = () => {
    if (href && pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <div
      onMouseEnter={isWideScreen ? manageMouseEnter : undefined}
      onMouseLeave={isWideScreen ? manageMouseLeave : undefined}
      onClick={handleClick}
      {...attributes}
    >
      {children}
      <div ref={circle} className={styles.circle}></div>
    </div>
  )
}
