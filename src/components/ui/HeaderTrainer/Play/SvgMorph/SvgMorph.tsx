'use client'

import { interpolate } from 'flubber'
import { useState, useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { TSvgMorphProps } from './types'

export default function SvgMorph({
  paths,
  trigger,
  onComplete,
}: TSvgMorphProps) {
  const [pathIndex, setPathIndex] = useState(0)
  const progress = useMotionValue(pathIndex)
  const isFirstRender = useRef(true)

  const arrayOfIndex = paths.map((_, i) => i)
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  })

  useEffect(() => {
    if (!trigger && !isFirstRender.current) return
    isFirstRender.current = false

    const animation = animate(progress, pathIndex, {
      duration: 0.25,
      ease: 'easeInOut',

      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0)
          setPathIndex(1)
        } else {
          setPathIndex(pathIndex + 1)
        }

        onComplete()
      },
    })

    return () => {
      animation.stop()
    }
  }, [trigger, pathIndex])

  return <motion.path fill='#f14317' d={path} />
}
