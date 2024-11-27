import styles from './style.module.scss'
import Caret from './Caret/Caret'
import { defaultN } from './codes/JavaScript/defaultN'
import { TTypingProps } from './types'
import {
  fadeInOutVariants,
  typingFadeInOutVariants,
  tabFadeInOutVariants,
  isErrorFadeInOutVariants,
} from './variants'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Typing({
  activeLanguage,
  activeTime,
  onTestStart,
  activeModes,
}: TTypingProps) {
  const [text, setText] = useState<string[]>([])
  const [userInput, setUserInput] = useState('')
  const [correctChars, setCorrectChars] = useState(0)
  const [timer, setTimer] = useState(activeTime)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [errorIndex, setErrorIndex] = useState<number | null>(null)
  const [errorCount, setErrorCount] = useState(0)
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [errorIndexes, setErrorIndexes] = useState<{
    [lineIndex: number]: number[]
  }>({})
  const [lineHeight, setLineHeight] = useState(65)

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
      const selectedCode = defaultN.JavaScriptOne
      const fullText = Object.values(selectedCode)
      setText(fullText)
      setUserInput('')
      setCorrectChars(0)
      setTimer(activeTime)
      setIsTestRunning(false)
      setErrorIndex(null)
      setErrorCount(0)
      setIsFocused(false)
      setCurrentLine(0)
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

  const isNoErrorMode = activeModes.includes('no error')

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (
        !isFocused ||
        timer === 0 ||
        (e.key.length > 1 && e.key !== 'Backspace') ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey
      ) {
        return
      }

      const currentLineText = text[currentLine]
      let input = userInput

      if (!isTestRunning) {
        if (e.key === currentLineText[0]) {
          setIsTestRunning(true)
          onTestStart()
        } else {
          return
        }
      }

      if (isNoErrorMode) {
        if (e.key === 'Backspace' && userInput.length > 0) {
          const lastCharIndex = userInput.length - 1
          const isErrorAtLastChar =
            errorIndexes[currentLine]?.includes(lastCharIndex)
          const isLastCharSpace = userInput[lastCharIndex] === ' '

          if (isErrorAtLastChar || isLastCharSpace) {
            setUserInput((prevInput) => prevInput.slice(0, -1))

            if (isErrorAtLastChar) {
              setErrorIndexes((prev) => ({
                ...prev,
                [currentLine]: prev[currentLine].filter(
                  (index) => index !== lastCharIndex
                ),
              }))
            }
          } else {
            return
          }
        } else {
          if (e.key === currentLineText[userInput.length]) {
            setCorrectChars((prev) => prev + 1)
          } else {
            setErrorIndexes((prev) => ({
              ...prev,
              [currentLine]: [...(prev[currentLine] || []), userInput.length],
            }))
          }

          input = userInput + e.key
          setUserInput(input)

          if (input.length === currentLineText.length) {
            setUserInput('')
            setCurrentLine((prev) => prev + 1)
          }
        }
      } else {
        if (e.key === 'Backspace') {
          return
        }

        if (e.key === currentLineText[userInput.length]) {
          setUserInput(input + e.key)
          setCorrectChars((prev) => prev + 1)

          if (input.length + 1 === currentLineText.length) {
            setUserInput('')
            setCurrentLine((prev) => prev + 1)
          }
        } else {
          setErrorIndex(userInput.length)
          setErrorCount((prev) => prev + 1)
          setTimeout(() => setErrorIndex(null), 100)
        }
      }
    },
    [
      isFocused,
      timer,
      userInput,
      text,
      currentLine,
      isTestRunning,
      activeModes,
      isNoErrorMode,
    ]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const contentElement = document.querySelector(`.${styles.content}`)
      if (
        contentElement &&
        !contentElement.contains(e.target as Node) &&
        !isTestRunning
      ) {
        setTimeout(() => {
          setIsFocused(false)
        }, 500)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [isTestRunning])

  useEffect(() => {
    const updateLineHeight = () => {
      setLineHeight(window.innerWidth <= 1100 ? 45 : 65)
    }

    updateLineHeight()
    window.addEventListener('resize', updateLineHeight)

    return () => window.removeEventListener('resize', updateLineHeight)
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
        top: currentLine > 0 ? lineHeight : 0,
      }
    }

    return (
      <div
        className={`${styles.wrapper} ${!isFocused ? styles.blurred : ''}`}
        onClick={() => setIsFocused(true)}
      >
        {text &&
          text
            .slice(
              currentLine === 0 ? currentLine : currentLine - 1,
              currentLine === 0 ? currentLine + 3 : currentLine + 2
            )
            .map((line, lineIndex) => {
              const actualLineIndex =
                currentLine === 0 ? lineIndex : currentLine - 1 + lineIndex
              const isPreviousLine = currentLine > 0 && lineIndex === 0
              const isActiveLine =
                lineIndex === 0 && currentLine === 0
                  ? true
                  : lineIndex === 1 && currentLine > 0
              const isNextLine = lineIndex === 2

              return (
                <div key={lineIndex} className={styles.line}>
                  {line.split('').map((char, charIndex) => {
                    const isCorrect =
                      isActiveLine && userInput[charIndex] === char
                    const isError = isActiveLine && charIndex === errorIndex
                    const isPermanentError =
                      errorIndexes[actualLineIndex]?.includes(charIndex)
                    const isPermanentErrorSpace =
                      isPermanentError && char === ' '

                    return (
                      <span
                        key={charIndex}
                        ref={(el: HTMLSpanElement | null) => {
                          if (el && isActiveLine) {
                            charRefs.current[charIndex] = el
                          }
                        }}
                        className={styles.char}
                        style={{
                          color: isPermanentError
                            ? '#de1818'
                            : isError
                            ? '#de1818'
                            : isCorrect
                            ? 'inherit'
                            : isNextLine
                            ? '#00000066'
                            : isPreviousLine
                            ? 'inherit'
                            : '#00000066',
                        }}
                      >
                        <AnimatePresence>
                          {(isError || isPermanentErrorSpace) && (
                            <motion.span
                              variants={isErrorFadeInOutVariants}
                              initial='initial'
                              animate='animate'
                              exit='exit'
                              className={styles.isError}
                            />
                          )}
                        </AnimatePresence>
                        {char}
                      </span>
                    )
                  })}
                </div>
              )
            })}
        <AnimatePresence>
          {isFocused && (
            <Caret position={lastCharPosition} isTestRunning={isTestRunning} />
          )}
        </AnimatePresence>
      </div>
    )
  }, [
    text,
    userInput,
    errorIndex,
    errorIndexes,
    isFocused,
    isTestRunning,
    currentLine,
  ])

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
    <div className={styles.content}>
      <motion.div
        variants={fadeInOutVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <AnimatePresence mode='wait'>
          {isCapsLockOn && (
            <motion.p
              variants={fadeInOutVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              className={styles.capsLock}
            >
              Caps Lock
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={typingFadeInOutVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.typing}
      >
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
                  {activeTime === Infinity ? (
                    <svg
                      width='29'
                      height='14'
                      viewBox='0 0 29 14'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M6.15 13.65C4.11667 13.65 2.58333 13.05 1.55 11.85C0.55 10.65 0.0500001 9.06667 0.0500001 7.1C0.0500001 5.1 0.55 3.5 1.55 2.3C2.58333 1.06667 4.11667 0.449999 6.15 0.449999C7.61667 0.449999 8.95 0.866665 10.15 1.7C11.35 2.5 12.7 3.71667 14.2 5.35C15.6667 3.78333 16.9667 2.6 18.1 1.8C19.2667 0.966666 20.5667 0.549999 22 0.549999C23.9667 0.583332 25.4667 1.18333 26.5 2.35C27.5333 3.51667 28.05 5.08333 28.05 7.05C28.0167 9.01667 27.4833 10.6 26.45 11.8C25.45 12.9667 23.9667 13.55 22 13.55C20.5667 13.5833 19.2667 13.1833 18.1 12.35C16.9667 11.5167 15.6667 10.3333 14.2 8.8C12.7 10.4 11.35 11.6167 10.15 12.45C8.95 13.25 7.61667 13.65 6.15 13.65ZM6.05 11.45C7.15 11.45 8.16667 11.1 9.1 10.4C10.0667 9.66667 11.2333 8.55 12.6 7.05C11.2333 5.58333 10.0667 4.5 9.1 3.8C8.16667 3.06667 7.15 2.7 6.05 2.7C4.71667 2.66667 3.71667 3.03333 3.05 3.8C2.41667 4.56667 2.1 5.66667 2.1 7.1C2.1 8.5 2.41667 9.58333 3.05 10.35C3.71667 11.0833 4.71667 11.45 6.05 11.45ZM22.15 11.3C23.4167 11.3333 24.3833 10.95 25.05 10.15C25.7167 9.31667 26.05 8.28333 26.05 7.05C26.05 5.78333 25.7167 4.76667 25.05 4C24.3833 3.2 23.4167 2.81667 22.15 2.85C21.0833 2.85 20.0833 3.18333 19.15 3.85C18.25 4.51667 17.1167 5.58333 15.75 7.05C17.1167 8.51667 18.25 9.6 19.15 10.3C20.0833 10.9667 21.0833 11.3 22.15 11.3Z' />
                    </svg>
                  ) : (
                    timer
                  )}
                </motion.p>
              )}
            </AnimatePresence>

            <div className={styles.toTypeWrapper}>
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

      <motion.div
        variants={tabFadeInOutVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: !isTestRunning ? 0.9 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.shortcuts}
          >
            <div className={styles.shortcut}>
              <p>
                <span className={styles.symbol}>{text[0]?.[0]}</span>{' '}
                <span className={styles.line}>—</span> start the test
              </p>
            </div>

            <div className={styles.shortcut}>
              <p>
                <span className={styles.tab}>tab</span>{' '}
                <span className={styles.line}>—</span> restart test
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
