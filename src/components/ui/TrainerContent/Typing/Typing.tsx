import styles from './style.module.scss'
import Caret from './Caret/Caret'
import { codes } from './codes'
import { TTypingProps } from './types'
import { fadeInOutVariants } from './variants'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Typing({
  activeLanguage,
  activeTime,
  onTestStart,
}: TTypingProps) {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [correctChars, setCorrectChars] = useState(0)
  const [timer, setTimer] = useState(activeTime)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [errorIndex, setErrorIndex] = useState<number | null>(null)
  const [errorCount, setErrorCount] = useState(0)
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const charRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
      }
      setIsCapsLockOn(e.getModifierState('CapsLock'))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (activeLanguage) {
      setText(codes[activeLanguage.toLowerCase()])
      setUserInput('')
      setCorrectChars(0)
      setTimer(activeTime)
      setIsTestRunning(false)
      setErrorIndex(null)
      setErrorCount(0)
      setIsFocused(false)
    }
  }, [activeLanguage, activeTime])

  useEffect(() => {
    if (isTestRunning && timer > 0) {
      const interval = setInterval(
        () => setTimer((prevTime) => prevTime - 1),
        1000
      )
      return () => clearInterval(interval)
    }
  }, [isTestRunning, timer])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isFocused || timer === 0 || errorIndex !== null) return
      if (e.key === 'Backspace' || e.key.length > 1) return

      const input = userInput + e.key

      if (!isTestRunning && e.key === text[userInput.length]) {
        setIsTestRunning(true)
        onTestStart()
      }

      if (!isTestRunning) {
        if (e.key === text[userInput.length]) {
          setUserInput(input)
          setCorrectChars((prev) => prev + 1)
        }
        return
      }

      if (e.key === text[userInput.length]) {
        setUserInput(input)
        setCorrectChars((prev) => prev + 1)
      } else {
        setErrorIndex(userInput.length)
        setErrorCount((prev) => prev + 1)
        setTimeout(() => setErrorIndex(null), 100)
      }
    },
    [isFocused, timer, errorIndex, userInput, text, isTestRunning, onTestStart]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const contentElement = document.querySelector(`.${styles.content}`)
      if (contentElement && !contentElement.contains(e.target as Node)) {
        setTimeout(() => {
          setIsFocused(false)
        }, 500)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const getTextWithMotion = useCallback(() => {
    const currentCharIndex = userInput.length
    const lastCharElement = charRefs.current[currentCharIndex]
    const parentElement = lastCharElement?.parentNode as HTMLElement

    let lastCharPosition = { left: 0, top: 0 }

    if (lastCharElement && parentElement) {
      const lastCharRect = lastCharElement.getBoundingClientRect()
      const parentRect = parentElement.getBoundingClientRect()

      lastCharPosition = {
        left: lastCharRect.left - parentRect.left,
        top: lastCharRect.top - parentRect.top,
      }
    }

    return (
      <div
        className={`${styles.wrapper} ${!isFocused ? styles.blurred : ''}`}
        onClick={() => setIsFocused(true)}
      >
        {text &&
          text.split('').map((char, index) => {
            const isCorrect = userInput[index] === char
            const isError = index === errorIndex

            return (
              <span
                key={index}
                ref={(el: HTMLSpanElement | null) => {
                  if (el) {
                    charRefs.current[index] = el
                  }
                }}
                className={styles.char}
                style={{
                  opacity: isCorrect ? 1 : 0.4,
                  backgroundColor: isError ? 'red' : 'transparent',
                }}
              >
                {char}
              </span>
            )
          })}
        <AnimatePresence>
          {isFocused && (
            <Caret position={lastCharPosition} isTestRunning={isTestRunning} />
          )}
        </AnimatePresence>
      </div>
    )
  }, [text, userInput, errorIndex, isFocused, isTestRunning])

  const calculateACC = useMemo(() => {
    const totalTypedChars = correctChars + errorCount
    return totalTypedChars === 0
      ? 0
      : Math.round((correctChars / totalTypedChars) * 100)
  }, [correctChars, errorCount])

  const calculateWPM = useMemo(() => {
    return Math.round(correctChars / 5 / ((activeTime - timer) / 60))
  }, [correctChars, activeTime, timer])

  return (
    <motion.div
      variants={fadeInOutVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={styles.content}
    >
      {isCapsLockOn && <p className={styles.capsLock}>Caps Lock is ON</p>}

      {timer > 0 ? (
        <>
          <AnimatePresence>
            {isTestRunning && (
              <motion.p
                variants={fadeInOutVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className={styles.time}
              >
                Time Remaining: {timer}s
              </motion.p>
            )}
          </AnimatePresence>

          <div
            className={styles.toType}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsFocused(false)
            }}
          >
            <AnimatePresence>
              {!isFocused && !isTestRunning && (
                <motion.div
                  variants={fadeInOutVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  className={styles.message}
                >
                  <img src='/images/other/cursor.png' alt='Cursor' />
                  <p>Click here to focus</p>
                </motion.div>
              )}
            </AnimatePresence>

            {getTextWithMotion()}
          </div>
        </>
      ) : (
        <div className={styles.result}>
          <h3>Test Finished!</h3>
          <p>You typed {correctChars} characters correctly</p>
          <p>Accuracy: {calculateACC}%</p>
          <p>WPM: {calculateWPM}</p>
          <p>Errors: {errorCount}</p>
        </div>
      )}
    </motion.div>
  )
}
