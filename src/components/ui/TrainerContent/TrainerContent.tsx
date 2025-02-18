'use client'

import styles from './style.module.scss'
import Header from '../Header/Header'
import HeaderTrainer from '../HeaderTrainer/HeaderTrainer'
import Bars from '../HeaderTrainer/Play/Bars/Bars'
import Info from './Info/Info'
import Modes from './Modes/Modes'
import LanguageSelection from './LanguageSelection/LanguageSelection'
import Typing from './Typing/Typing'
import Footer from '../Footer/Footer'
import { animatePageOut } from '@/utils/transition'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function TrainerContent() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript')
  const [activeModes, setActiveModes] = useState<string[]>([])
  const [activeTime, setActiveTime] = useState(60)
  const [testStarted, setTestStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [playing, setPlaying] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const scrollToHowTo = () => {
    if (pathname !== '/#howTo') {
      animatePageOut('/#howTo', router)
    }
  }

  const handleTestStart = () => {
    setTestStarted(true)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const testStartedVariants = (testStarted: boolean) => ({
    opacity: testStarted ? 0 : 1,
    pointerEvents: testStarted ? 'none' : ('auto' as 'none' | 'auto'),
  })

  const initialModesState: Record<string, string[]> = {
    python: ['single quote', 'no error'],
    'c++': ['single quote', 'no error'],
    default: ['single quote', 'no error', 'semicolon free'],
  }

  const [languageModes, setLanguageModes] = useState<Record<string, string[]>>({
    python: [],
    'c++': [],
    default: [],
  })

  const currentModes = useMemo(() => {
    const lowerCaseLanguage = activeLanguage.toLowerCase()
    return initialModesState[lowerCaseLanguage] || initialModesState.default
  }, [activeLanguage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        if (testStarted) {
          setTestStarted(false)
          return
        }

        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [testStarted])

  return (
    <div className={styles.content}>
      <motion.div key='header'>
        {isMobile ? (
          <Header />
        ) : (
          <HeaderTrainer
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            testStarted={testStarted}
            playing={playing}
            setPlaying={setPlaying}
          />
        )}
      </motion.div>

      <AnimatePresence>{playing && <Bars />}</AnimatePresence>

      <div className={styles.desktop}>
        <AnimatePresence mode='wait'>
          {showInfo ? (
            <motion.div key='info'>
              <Info />
            </motion.div>
          ) : (
            <motion.div key='other'>
              <motion.div
                key='modesLS'
                animate={testStartedVariants(testStarted)}
              >
                <Modes
                  activeLanguage={activeLanguage}
                  activeTime={activeTime}
                  setActiveTime={setActiveTime}
                  activeModes={activeModes}
                  currentModes={currentModes}
                  languageModes={languageModes}
                  setLanguageModes={setLanguageModes}
                  setActiveModes={setActiveModes}
                />
                <LanguageSelection setActiveLanguage={setActiveLanguage} />
              </motion.div>

              <Typing
                activeLanguage={activeLanguage}
                activeTime={activeTime}
                onTestStart={handleTestStart}
                activeModes={activeModes}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.mobile}>
        <p className={styles.description}>
          Are you writing code on
          <br />a mobile device<span>?</span>
          <svg
            width='26'
            height='27'
            viewBox='0 0 26 27'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M21.5547 3.73632C19.2467 1.62224 16.2098 0.458984 13 0.458984H12.9784C9.74979 0.464256 6.65542 1.64512 4.3745 3.74237C2.09359 5.83961 0.81253 8.68185 0.812535 11.6452V17.0592C0.808896 17.9202 1.08813 18.7621 1.61379 19.4752C2.13945 20.1884 2.88712 20.7395 3.75922 21.0566L5.14847 21.5632C5.29354 21.616 5.42186 21.7014 5.52166 21.8115C5.62147 21.9216 5.68958 22.053 5.71976 22.1935L6.3057 24.8895C6.39155 25.2792 6.62134 25.6297 6.95625 25.8818C7.29116 26.1339 7.71064 26.2722 8.14379 26.2732H8.78129C8.90561 26.2732 9.02483 26.2279 9.11274 26.1472C9.20065 26.0665 9.25004 25.9571 9.25004 25.843V23.716C9.25004 23.253 9.63793 22.8555 10.1424 22.8324C10.2692 22.8268 10.3959 22.8449 10.5148 22.8855C10.6337 22.9262 10.7424 22.9886 10.8343 23.069C10.9261 23.1493 10.9993 23.2459 11.0493 23.353C11.0992 23.4601 11.125 23.5753 11.125 23.6918V25.843C11.125 25.9571 11.1744 26.0665 11.2623 26.1472C11.3502 26.2279 11.4695 26.2732 11.5938 26.2732C11.7181 26.2732 11.8373 26.2279 11.9252 26.1472C12.0132 26.0665 12.0625 25.9571 12.0625 25.843V23.716C12.0625 23.253 12.4504 22.8555 12.9549 22.8324C13.0817 22.8268 13.2084 22.8449 13.3273 22.8855C13.4462 22.9262 13.5549 22.9886 13.6468 23.069C13.7386 23.1493 13.8118 23.2459 13.8618 23.353C13.9117 23.4601 13.9375 23.5753 13.9375 23.6918V25.843C13.9375 25.9571 13.9869 26.0665 14.0748 26.1472C14.1627 26.2279 14.282 26.2732 14.4063 26.2732C14.5306 26.2732 14.6498 26.2279 14.7377 26.1472C14.8257 26.0665 14.875 25.9571 14.875 25.843V23.716C14.875 23.253 15.2629 22.8555 15.7674 22.8324C15.8942 22.8268 16.0209 22.8449 16.1398 22.8855C16.2587 22.9262 16.3674 22.9886 16.4593 23.069C16.5511 23.1493 16.6243 23.2459 16.6743 23.353C16.7242 23.4601 16.75 23.5753 16.75 23.6918V25.843C16.75 25.9571 16.7994 26.0665 16.8873 26.1472C16.9752 26.2279 17.0945 26.2732 17.2188 26.2732H17.8563C18.2895 26.2724 18.709 26.1342 19.044 25.8822C19.379 25.6302 19.609 25.2797 19.695 24.89L20.2809 22.1935C20.3114 22.0532 20.3796 21.9221 20.4792 21.812C20.5789 21.7019 20.7069 21.6164 20.8516 21.5632L22.2409 21.0566C23.113 20.7395 23.8606 20.1884 24.3863 19.4752C24.9119 18.7621 25.1912 17.9202 25.1875 17.0592V11.735C25.1875 8.72331 23.8985 5.88321 21.5547 3.73632ZM8.05824 17.662C7.39241 17.7021 6.7291 17.5548 6.15678 17.24C5.58447 16.9251 5.13034 16.4575 4.85497 15.8997C4.5796 15.3418 4.49607 14.7202 4.61553 14.1176C4.73499 13.5151 5.05175 12.9603 5.52358 12.5272C5.9954 12.0942 6.59986 11.8034 7.25634 11.6938C7.91282 11.5842 8.59011 11.6608 9.1979 11.9136C9.80569 12.1663 10.3151 12.5831 10.6581 13.1084C11.0012 13.6337 11.1616 14.2425 11.118 14.8537C11.066 15.5828 10.7269 16.2697 10.164 16.7864C9.60103 17.3031 8.85264 17.6143 8.05824 17.662ZM14.4649 20.9625C14.3037 21.0612 14.1137 21.1127 13.92 21.1104H12.0801C11.8868 21.1125 11.6972 21.061 11.5364 20.9625C11.3792 20.8647 11.2581 20.7255 11.1891 20.5632C11.12 20.4009 11.1063 20.2232 11.1496 20.0536L12.0819 17.4937C12.2383 17.1307 12.4873 16.8618 12.8828 16.815C13.3668 16.7612 13.7032 16.9694 13.9147 17.4722L14.8522 20.0536C14.8955 20.2233 14.8817 20.401 14.8125 20.5633C14.7433 20.7256 14.6221 20.8648 14.4649 20.9625ZM18.3719 17.662C17.7061 17.7021 17.0428 17.5548 16.4705 17.24C15.8981 16.9251 15.444 16.4575 15.1686 15.8997C14.8933 15.3418 14.8097 14.7202 14.9292 14.1176C15.0487 13.5151 15.3654 12.9603 15.8373 12.5272C16.3091 12.0942 16.9135 11.8034 17.57 11.6938C18.2265 11.5842 18.9038 11.6608 19.5116 11.9136C20.1194 12.1663 20.6288 12.5831 20.9718 13.1084C21.3149 13.6337 21.4753 14.2425 21.4317 14.8537C21.3796 15.583 21.0404 16.27 20.4772 16.7867C19.914 17.3034 19.1654 17.6145 18.3707 17.662H18.3719Z' />
          </svg>
        </p>

        <div className={styles.about}>
          <p>Read About</p>

          <a onClick={scrollToHowTo}>
            How to <span>Code</span> Faster<span>?</span>
          </a>

          <img src='/images/bg/trainerMobileBg.webp' alt='Pattern' />
        </div>
      </div>

      {isMobile && <Footer />}
    </div>
  )
}
