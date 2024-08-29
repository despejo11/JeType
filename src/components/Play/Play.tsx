'use client'

import styles from './style.module.scss'
import SvgMorph from './SvgMorph/SvgMorph'
import { shapeOne, shapeTwo, shapeOneMorphed, shapeTwoMorphed } from './paths'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Play() {
  const [trigger, setTrigger] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleClick = () => {
    setTrigger(!trigger)

    if (!playing) {
      fadeInAudio()
      setPlaying(true)
    } else {
      fadeOutAudio()
      setPlaying(false)
    }
  }

  const handleAnimationComplete = () => {
    setTrigger(false)
  }

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      audio.loop = true
    }
  }, [])

  const fadeInAudio = () => {
    const audio = audioRef.current

    if (audio) {
      audio.volume = 0
      audio.play()
      let volume = 0

      const fadeIn = setInterval(() => {
        if (volume < 1) {
          volume = Math.min(volume + 0.05, 1)
          audio.volume = volume
        } else {
          clearInterval(fadeIn)
        }
      }, 50)
    }
  }

  const fadeOutAudio = () => {
    const audio = audioRef.current

    if (audio) {
      let volume = 1

      const fadeOut = setInterval(() => {
        if (volume > 0) {
          volume = Math.max(volume - 0.05, 0)
          audio.volume = volume
        } else {
          audio.pause()
          clearInterval(fadeOut)
        }
      }, 50)
    }
  }

  return (
    <>
      <audio className={styles.audio} ref={audioRef} src='/music/calm.mp3' />
      <svg
        className={styles.svg}
        id='Play'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 144 178'
        onClick={handleClick}
      >
        <SvgMorph
          paths={[shapeOne, shapeOneMorphed, shapeOne]}
          trigger={trigger}
          onComplete={handleAnimationComplete}
        />
        <SvgMorph
          paths={[shapeTwo, shapeTwoMorphed, shapeTwo]}
          trigger={trigger}
          onComplete={handleAnimationComplete}
        />
      </svg>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className={styles.bars}
          >
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
