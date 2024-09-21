import styles from './style.module.scss'
import InfinityIcon from './InfinityIcon'
import { TModesProps, TTabsProps, TTabProps } from './types'
import {
  contentVariants,
  scaleVariants,
  liVariants,
  spanVariants,
} from './variants'
import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const initialModesState: Record<string, string[]> = {
  python: ['single quote', 'no error'],
  'c++': ['single quote', 'no error'],
  default: ['single quote', 'no error', 'semicolon free'],
}

const timeTabs = ['15', '30', '60', 'infinity']

export default function Modes({
  activeLanguage,
  setActiveTime,
  activeTime,
}: TModesProps) {
  const [languageModes, setLanguageModes] = useState<Record<string, string[]>>({
    python: [],
    'c++': [],
    default: [],
  })
  const [activeModes, setActiveModes] = useState<string[]>([])
  const [availableModes, setAvailableModes] = useState<string[]>([])

  const currentModes = useMemo(() => {
    const lowerCaseLanguage = activeLanguage.toLowerCase()
    return initialModesState[lowerCaseLanguage] || initialModesState.default
  }, [activeLanguage])

  useEffect(() => {
    setAvailableModes(currentModes)

    setActiveModes((prevModes) => {
      const lowerCaseLanguage = activeLanguage.toLowerCase()
      const savedModes = languageModes[lowerCaseLanguage] || []
      return savedModes.filter((mode) => currentModes.includes(mode))
    })
  }, [activeLanguage, currentModes, languageModes])

  const toggleMode = useCallback(
    (mode: string) => {
      const lowerCaseLanguage = activeLanguage.toLowerCase()

      setActiveModes((prevModes) => {
        const updatedModes = prevModes.includes(mode)
          ? prevModes.filter((m) => m !== mode)
          : [...prevModes, mode]

        setLanguageModes((prevState) => ({
          ...prevState,
          [lowerCaseLanguage]: updatedModes,
        }))

        return updatedModes
      })
    },
    [activeLanguage]
  )

  const handleTimeChange = useCallback(
    (time: string) => {
      setActiveTime(time === 'infinity' ? Infinity : parseInt(time))
    },
    [setActiveTime]
  )

  return (
    <motion.div
      variants={contentVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={styles.content}
    >
      <motion.div
        variants={scaleVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.tabs}
      >
        <Tabs
          tabs={availableModes}
          activeTabs={activeModes}
          onTabClick={toggleMode}
        />
      </motion.div>

      <motion.img
        variants={scaleVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.background}
        src='/images/bg/modesBg.png'
        alt='Pattern'
      />

      <motion.div
        variants={scaleVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.tabs}
      >
        <Tabs
          tabs={timeTabs}
          activeTabs={[
            activeTime === Infinity ? 'infinity' : String(activeTime),
          ]}
          onTabClick={handleTimeChange}
        />
      </motion.div>
    </motion.div>
  )
}

const Tabs = ({ tabs, activeTabs, onTabClick }: TTabsProps) => (
  <ul className={styles.options}>
    <AnimatePresence>
      {tabs.map((tab, idx) => (
        <Tab
          key={idx}
          isActive={activeTabs.includes(tab)}
          onClick={() => onTabClick(tab)}
        >
          {tab === 'infinity' ? (
            <InfinityIcon isActive={activeTabs.includes('infinity')} />
          ) : (
            tab
          )}
        </Tab>
      ))}
    </AnimatePresence>
  </ul>
)

const Tab = ({ children, onClick, isActive }: TTabProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const isNumber = !isNaN(Number(children))

  const activeWidths: Record<string, number> = useMemo(
    () => ({
      'no error': 88,
      'semicolon free': 142,
      'single quote': 123,
      default: 41,
    }),
    []
  )

  const activeWidth = activeWidths[String(children)] || activeWidths.default

  return (
    <motion.li
      variants={liVariants}
      custom={isActive}
      initial='initial'
      animate='animate'
      exit='exit'
      ref={ref}
      onClick={onClick}
      className={isNumber ? styles.numberTab : styles.tab}
    >
      <AnimatePresence>
        {isActive && (
          <motion.span
            variants={spanVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            style={{ width: activeWidth }}
            className={styles.isActive}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.li>
  )
}
