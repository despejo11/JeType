'use client'

import styles from './style.module.scss'
import { languages } from './languages'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LanguageSelection({
  setActiveLanguage,
}: {
  setActiveLanguage: (language: string) => void
}) {
  const [activeLanguage, localSetActiveLanguage] = useState('JavaScript')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)

  const handleSelectClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const handleLanguageClick = useCallback(
    (language: string) => {
      localSetActiveLanguage(language)
      setActiveLanguage(language)
      setIsDropdownOpen(false)
    },
    [setActiveLanguage]
  )

  const formatLanguage = (language: string) => {
    return language
      .replace(/(#)/g, '<span>#</span>')
      .replace(/(\+\+)/g, '<span>++</span>')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 80,
      transition: { staggerChildren: 0.1, staggerDirection: -1, delay: 0.4 },
    },
    visible: {
      opacity: 1,
      height: 190,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  }

  const availableLanguages = languages.filter(
    (language) => language !== activeLanguage
  )

  return (
    <div className={styles.content}>
      <div className={styles.select} onClick={handleSelectClick}>
        <img src='/images/other/LSIcon.png' alt='Globe' />

        <AnimatePresence mode='wait'>
          <motion.p
            key={activeLanguage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            dangerouslySetInnerHTML={{ __html: formatLanguage(activeLanguage) }}
          />
        </AnimatePresence>

        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          exit={{ rotate: 0 }}
          width='18'
          height='15'
          viewBox='0 0 18 15'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9 15L0.339745 0L17.6603 0L9 15Z' />
        </motion.svg>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={dropdownVariants}
            ref={dropdown}
            className={styles.dropdown}
          >
            <img src='/images/bg/LSBg.png' alt='Pattern' />

            {availableLanguages.map((language) => (
              <motion.p
                key={language}
                className={styles.item}
                onClick={() => handleLanguageClick(language)}
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: formatLanguage(language) }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
