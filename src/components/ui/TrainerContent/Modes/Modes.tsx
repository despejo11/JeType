'use client'

import styles from './style.module.scss'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TTabsProps, TTabProps } from './types'

export default function Modes({ activeLanguage }: { activeLanguage: string }) {
  const initialModesState: Record<string, string[]> = {
    python: ['single quote', 'no error'],
    'c++': ['single quote', 'no error'],
    default: ['single quote', 'no error', 'semicolon free'],
  }

  const [activeModes, setActiveModes] = useState<string[]>([])
  const [activeTime, setActiveTime] = useState('60')
  const [availableModes, setAvailableModes] = useState<string[]>([])

  useEffect(() => {
    const lowerCaseLanguage = activeLanguage.toLowerCase()
    const currentModes =
      initialModesState[lowerCaseLanguage] || initialModesState.default

    setAvailableModes(currentModes)
  }, [activeLanguage])

  useEffect(() => {
    const lowerCaseLanguage = activeLanguage.toLowerCase()
    const currentModes =
      initialModesState[lowerCaseLanguage] || initialModesState.default

    setActiveModes((prevModes) =>
      prevModes.filter((mode) => currentModes.includes(mode))
    )
  }, [activeLanguage])

  const toggleMode = (mode: string) => {
    setActiveModes((prevModes) =>
      prevModes.includes(mode)
        ? prevModes.filter((m) => m !== mode)
        : [...prevModes, mode]
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.tabs}>
        <Tabs
          tabs={availableModes}
          activeTabs={activeModes}
          onTabClick={toggleMode}
        />
      </div>

      <img
        className={styles.background}
        src='/images/bg/modesBg.png'
        alt='Pattern'
      />

      <div className={styles.tabs}>
        <Tabs
          tabs={['15', '30', '60', 'infinity']}
          activeTabs={[activeTime]}
          onTabClick={setActiveTime}
        />
      </div>
    </div>
  )
}

function Tabs({ tabs, activeTabs, onTabClick }: TTabsProps) {
  return (
    <ul className={styles.options}>
      <AnimatePresence>
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            isActive={activeTabs.includes(tab)}
            onClick={() => onTabClick(tab)}
          >
            {tab === 'infinity' ? <InfinityIcon /> : tab}
          </Tab>
        ))}
      </AnimatePresence>
    </ul>
  )
}

function Tab({ children, onClick, isActive }: TTabProps) {
  const ref = useRef<HTMLLIElement>(null)
  const isNumber = !isNaN(Number(children))

  return (
    <motion.li
      ref={ref}
      onClick={onClick}
      className={`${isNumber ? styles.numberTab : styles.tab} ${
        isActive ? styles.active : ''
      }`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
    >
      {children}
    </motion.li>
  )
}

function InfinityIcon() {
  return (
    <svg
      width='29'
      height='14'
      viewBox='0 0 29 14'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6.15 13.65C4.11667 13.65 2.58333 13.05 1.55 11.85C0.55 10.65 0.0500001 9.06667 0.0500001 7.1C0.0500001 5.1 0.55 3.5 1.55 2.3C2.58333 1.06667 4.11667 0.449999 6.15 0.449999C7.61667 0.449999 8.95 0.866665 10.15 1.7C11.35 2.5 12.7 3.71667 14.2 5.35C15.6667 3.78333 16.9667 2.6 18.1 1.8C19.2667 0.966666 20.5667 0.549999 22 0.549999C23.9667 0.583332 25.4667 1.18333 26.5 2.35C27.5333 3.51667 28.05 5.08333 28.05 7.05C28.0167 9.01667 27.4833 10.6 26.45 11.8C25.45 12.9667 23.9667 13.55 22 13.55C20.5667 13.5833 19.2667 13.1833 18.1 12.35C16.9667 11.5167 15.6667 10.3333 14.2 8.8C12.7 10.4 11.35 11.6167 10.15 12.45C8.95 13.25 7.61667 13.65 6.15 13.65ZM6.05 11.45C7.15 11.45 8.16667 11.1 9.1 10.4C10.0667 9.66667 11.2333 8.55 12.6 7.05C11.2333 5.58333 10.0667 4.5 9.1 3.8C8.16667 3.06667 7.15 2.7 6.05 2.7C4.71667 2.66667 3.71667 3.03333 3.05 3.8C2.41667 4.56667 2.1 5.66667 2.1 7.1C2.1 8.5 2.41667 9.58333 3.05 10.35C3.71667 11.0833 4.71667 11.45 6.05 11.45ZM22.15 11.3C23.4167 11.3333 24.3833 10.95 25.05 10.15C25.7167 9.31667 26.05 8.28333 26.05 7.05C26.05 5.78333 25.7167 4.76667 25.05 4C24.3833 3.2 23.4167 2.81667 22.15 2.85C21.0833 2.85 20.0833 3.18333 19.15 3.85C18.25 4.51667 17.1167 5.58333 15.75 7.05C17.1167 8.51667 18.25 9.6 19.15 10.3C20.0833 10.9667 21.0833 11.3 22.15 11.3Z' />
    </svg>
  )
}
