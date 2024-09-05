import gsap from 'gsap'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const animatePageIn = () => {
  const banner = document.getElementById('banner')
  const logo = document.getElementById('brandLogo')

  if (banner) {
    const tl = gsap.timeline()

    gsap.set([logo], {
      scale: 1,
      rotate: 0,
      duration: 0.9,
      ease: 'expo.inOut',
    })
    gsap.to([logo], {
      scale: 3.6,
      rotate: 360,
      duration: 0.9,
      ease: 'expo.inOut',
    })

    tl.set([banner], {
      yPercent: 0,
      duration: 0.9,
      ease: 'expo.inOut',
      borderRadius: '0',
    }).to([banner], {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      borderRadius: '50%',
    })
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const banner = document.getElementById('banner')
  const logo = document.getElementById('brandLogo')

  if (banner) {
    const tl = gsap.timeline()

    gsap.set([logo], {
      scale: 3.6,
      rotate: 360,
      duration: 0.9,
      ease: 'expo.inOut',
    })
    gsap.to([logo], {
      scale: 1,
      rotate: 0,
      duration: 0.9,
      ease: 'expo.inOut',
    })

    tl.set([banner], {
      yPercent: 100,
      duration: 0.9,
      ease: 'expo.inOut',
      borderRadius: '50%',
    }).to([banner], {
      yPercent: 0,
      duration: 0.9,
      ease: 'expo.inOut',
      borderRadius: '0',

      onComplete: () => {
        router.push(href)
      },
    })
  }
}
