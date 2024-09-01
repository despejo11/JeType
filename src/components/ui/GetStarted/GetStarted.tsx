'use client'

import styles from './style.module.scss'
import Button from '@/components/Button/Button'
import { useState, useEffect, useRef, MouseEvent } from 'react'
import { toZonedTime } from 'date-fns-tz'
import { format } from 'date-fns'

export default function GetStarted() {
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const timeZone = 'Europe/Berlin'

  useEffect(() => {
    const updateTime = () => {
      const zonedDate = toZonedTime(new Date(), timeZone)
      setCurrentTime(format(zonedDate, 'HH:mm:ss'))
      setCurrentDate(format(zonedDate, 'dd/MM/yyyy'))
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [timeZone])

  const path = useRef<SVGPathElement>(null)

  let progress = 0
  let x = 0.5
  let time = Math.PI / 999
  let reqId: number | null = null

  useEffect(() => {
    setPath(progress)
  }, [])

  const setPath = (progress: number) => {
    const width = window.innerWidth * 1

    path.current?.setAttributeNS(
      null,
      'd',
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    )
  }

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { movementY, clientX } = e
    const pathBound = path.current?.getBoundingClientRect()

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width
      progress += movementY
      setPath(progress)
    }
  }

  const manageMouseLeave = () => {
    animateOut()
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time)
    progress = lerp(progress, 0, 0.025)
    time += 0.22
    setPath(newProgress)

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 999
    progress = 0
  }

  return (
    <div className={styles.content}>
      <div className={styles.getStarted}>
        <img
          className={styles.sphere}
          src='/images/other/sphere.png'
          alt='Sphere'
        />

        <div className={styles.arrow}>
          <img src='/images/other/arrow.svg' alt='Arrow' />

          <Button className={styles.button}>
            <p className={styles.first}>Get Started</p>
            <p className={styles.second}>Get Started</p>
            <p className={styles.third}>Get Started</p>
          </Button>
        </div>

        <div className={styles.time}>
          <p className={styles.currentTime}>{currentTime}</p>
          <p className={styles.date}>{currentDate}</p>
        </div>
      </div>

      <div className={styles.line}>
        <div
          onMouseEnter={() => {
            manageMouseEnter()
          }}
          onMouseMove={(e) => {
            manageMouseMove(e)
          }}
          onMouseLeave={() => {
            manageMouseLeave()
          }}
          className={styles.hover}
        ></div>

        <svg>
          <path ref={path}></path>
        </svg>
      </div>
    </div>
  )
}
