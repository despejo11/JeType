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
    <div className={styles.content} id='howTo'>
      <svg
        width='1563'
        height='1954'
        viewBox='0 0 1563 1954'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          ref={svgPath}
          d='M243.365 3C375.101 18.8548 717.312 82.8019 769.452 200.626C860.244 405.799 1055.69 592.915 901.5 741C844.979 795.284 660 870 665 937.5C674.984 1072.28 633.987 1196.41 626.475 1231.93C615.383 1284.37 556.956 1410.88 614.272 1391.51C781.279 1335.07 958.212 1166.06 1081.32 1064.66C1230.06 942.148 1362.1 808.758 1501.23 678.686C1556.62 626.896 1570.41 635.309 1552.81 713.775C1406.87 1364.62 756.886 1869.34 3 1951'
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
