'use client'

import styles from './style.module.scss'
import Background from './Background'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Welcome() {
  const learnTo = useRef(null)
  const getTo = useRef(null)
  const skillIn = useRef(null)
  const trainTo = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: 0, delay: 0.6 })
    tl.to(learnTo.current, { display: 'block', duration: 0 })
      .to(learnTo.current, { display: 'none', duration: 0, delay: 0.33 })
      .to(getTo.current, { display: 'block', duration: 0 })
      .to(getTo.current, { display: 'none', duration: 0, delay: 0.33 })
      .to(skillIn.current, { display: 'block', duration: 0 })
      .to(skillIn.current, { display: 'none', duration: 0, delay: 0.33 })
      .to(trainTo.current, { display: 'block', duration: 0 })
      .to(trainTo.current, { display: 'none', duration: 0, delay: 0.33 })
      .to(learnTo.current, { display: 'block', duration: 0 })
  }, [])

  return (
    <div className={styles.content}>
      <p ref={learnTo} className={styles.learnTo}>
        Learn to
      </p>
      <p ref={getTo} className={styles.getTo}>
        Get to
      </p>
      <p ref={skillIn} className={styles.skillIn}>
        Skill in
      </p>
      <p ref={trainTo} className={styles.trainTo}>
        Train to
      </p>

      <Background />
      <p className={styles.withUs}>With Us</p>
    </div>
  )
}
