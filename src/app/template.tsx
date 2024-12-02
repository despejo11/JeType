'use client'

import Lenis from 'lenis'
import { ReactNode, useEffect } from 'react'
import { animatePageIn } from '@/utils/transition'

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    animatePageIn()

    const lenis = new Lenis({
      duration: 0.9,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div>
      <div id='banner' className='banner'>
        <img
          className='brandLogo'
          id='brandLogo'
          src='/images/other/brandLogo.webp'
          alt='logo'
        />
      </div>
      {children}
    </div>
  )
}
