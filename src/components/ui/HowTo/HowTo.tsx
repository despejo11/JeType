'use client'

import styles from './style.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { TTip } from './types'

const tips: TTip[] = [
  {
    number: 1,
    title: 'Avoid Looking at the Keyboard',
    description: `One of the most effective ways to increase your typing speed is to train yourself to type without looking at the keyboard. This technique, known as "touch typing" allows you to rely on muscle memory, which can significantly boost your speed. Practice by typing slowly at first, ensuring your fingers are placed on the correct keys, and gradually increase your speed as you become more comfortable.`,
  },
  {
    number: 2,
    title: 'Practice Regularly',
    description: `Consistency is the key to improving your typing speed. Make it a habit to practice your typing every day. Even 10-15 minutes of focused practice each day can make a significant improvement over time. By using typing tools regularly, you will develop the muscle memory and accuracy you need to type faster and more efficiently.`,
  },
  {
    number: 3,
    title: 'Use All Your Fingers',
    description: `Many people rely on just a few fingers when typing, but using all ten fingers is crucial for increasing speed. Proper finger placement on the home row (ASDF for the left hand, JKL; for the right hand) allows for more efficient typing. Practice spreading out your fingers and using each one to press the corresponding keys. This will reduce the need to move your hands across the keyboard, making your typing faster and more fluid.`,
  },
  {
    number: 4,
    title: 'Focus on Accuracy First',
    description: `While speed is important, accuracy should be your primary focus when practicing. Typing quickly but with many mistakes will slow you down in the long run, as you’ll need to go back and correct errors. Start by typing more slowly and carefully, making sure each keystroke is correct. As your accuracy improves, your speed will naturally increase.`,
  },
]

export default function HowTo() {
  const svgPath = useRef<SVGPathElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const path = svgPath.current
    if (!path) return
    const pathLength = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: path,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  const highlightKeywords = (text: string) => {
    const parts = text.split(/(ASDF|JKL;)/)

    return parts.map((part, index) =>
      part === 'ASDF' || part === 'JKL;' ? (
        <span key={index}>{part}</span>
      ) : (
        part
      )
    )
  }

  return (
    <div className={styles.content}>
      <svg
        width='1557'
        height='1948'
        viewBox='0 0 1557 1948'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          ref={svgPath}
          d='M242.438 3C373.667 18.8059 714.56 82.5561 766.498 200.018C856.941 404.558 660.851 653.715 507.256 801.344C450.953 855.461 629.646 885.144 659.177 935.51C700.991 1006.82 631.556 1192.74 624.072 1228.14C613.024 1280.42 554.821 1406.54 611.916 1387.23C778.28 1330.97 954.531 1162.48 1077.17 1061.39C1225.33 939.255 1356.87 806.276 1495.45 676.605C1550.63 624.975 1564.37 633.362 1546.84 711.585C1401.46 1360.42 753.981 1863.59 3 1945'
        />
      </svg>

      <div className={styles.head}>
        <p>
          How to <span>Code</span> Faster<span>?</span>
        </p>
        <img src='/images/other/usefulTips.png' alt='Useful Tips' />
      </div>

      <div className={styles.tips}>
        {tips.map((tip) => (
          <div key={tip.number} className={styles.tip}>
            <p className={styles.title}>
              <span>{tip.number}.</span> {tip.title}
            </p>
            <p className={styles.description}>
              {highlightKeywords(tip.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
