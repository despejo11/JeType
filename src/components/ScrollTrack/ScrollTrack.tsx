'use client'

import styles from './style.module.scss'
import gsap from 'gsap'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default function ScrollTrack() {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const { scrollYProgress } = useScroll()
  const completionPercentage = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const unsubscribe = completionPercentage.on('change', (latest) => {
      const percentage = parseFloat(latest.toFixed(0))
      setScrollPercentage(percentage)
      setShowButton(percentage >= 60)
    })

    return () => {
      unsubscribe()
    }
  }, [completionPercentage])

  const scrollToTop = () => {
    gsap.registerPlugin(ScrollToPlugin)
    gsap.to(window, { duration: 1.2, scrollTo: { y: 0 }, ease: 'expo.inOut' })
  }

  return (
    <AnimatePresence>
      <motion.div
        key='scrollTrack'
        className={styles.track}
        initial={{ opacity: 0 }}
        animate={{
          opacity: scrollPercentage > 0 && scrollPercentage < 100 ? 1 : 0,
        }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.thumb}
          style={{ scaleX: scrollYProgress }}
        />
        <p>{scrollPercentage}%</p>
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            key='scrollButton'
            className={styles.button}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y:
                scrollPercentage === 100
                  ? 'clamp(2.563rem, 2.358rem + 1.02vw, 3.125rem)' // height + offset (41/50)
                  : 0,
            }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
          >
            On Top
          </motion.button>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
