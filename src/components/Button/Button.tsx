'use client'

import styles from './style.module.scss'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { TButtonProps } from './types'

export default function Button({ children, ...attributes }: TButtonProps) {
  const [isWideScreen, setIsWideScreen] = useState(false)

  const circle = useRef(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  let timeoutId: NodeJS.Timeout | null = null

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

  return (
    <div
      onMouseEnter={isWideScreen ? manageMouseEnter : undefined}
      onMouseLeave={isWideScreen ? manageMouseLeave : undefined}
      {...attributes}
    >
      {children}
      <div ref={circle} className={styles.circle}></div>
    </div>
  )
}
