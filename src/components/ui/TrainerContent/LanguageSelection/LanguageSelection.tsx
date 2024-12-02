import styles from './style.module.scss'
import { languages } from './languages'
import { TLanguageSelectionProps } from './types'
import {
  dropdownVariants,
  pActiveLanguageVariants,
  activeLanguageVariants,
  dropdownItemVariants,
  IMGVariants,
  SVGScaleVariants,
  SVGRotateVariants,
} from './variants'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LanguageSelection({
  setActiveLanguage,
}: TLanguageSelectionProps) {
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

  const availableLanguages = languages.filter(
    (language) => language !== activeLanguage
  )

  return (
    <div className={styles.content}>
      <div className={styles.select} onClick={handleSelectClick}>
        <motion.img
          variants={IMGVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          src='/images/other/LSIcon.webp'
          alt='Globe'
        />

        <motion.p
          variants={pActiveLanguageVariants}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <AnimatePresence mode='wait'>
            <motion.a
              key={activeLanguage}
              initial='initial'
              animate='animate'
              exit='exit'
              variants={activeLanguageVariants}
              dangerouslySetInnerHTML={{
                __html: formatLanguage(activeLanguage),
              }}
            />
          </AnimatePresence>
        </motion.p>

        <motion.div
          variants={SVGScaleVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          key='SVGscale'
        >
          <motion.svg
            variants={SVGRotateVariants}
            animate='animate'
            custom={isDropdownOpen}
            width='18'
            height='15'
            viewBox='0 0 18 15'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9 15L0.339745 0L17.6603 0L9 15Z' />
          </motion.svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            ref={dropdown}
            className={styles.dropdown}
          >
            <img src='/images/bg/LSBg.webp' alt='Pattern' />

            {availableLanguages.map((language) => (
              <div key={language} className={styles.item}>
                <motion.p
                  variants={dropdownItemVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  onClick={() => handleLanguageClick(language)}
                  dangerouslySetInnerHTML={{
                    __html: formatLanguage(language),
                  }}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
