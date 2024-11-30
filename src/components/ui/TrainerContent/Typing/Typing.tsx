import styles from './style.module.scss'
import Caret from './Caret/Caret'
import {
  defaultNJavaScript,
  SFJavaScript,
  SQJavaScript,
  SQSFJavaScript,
} from './codes/index'
import { TTypingProps } from './types'
import {
  fadeInOutVariants,
  toTypeFadeInOutVariants,
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
  const [currentLine, setCurrentLine] = useState(0)
  const [errorIndexes, setErrorIndexes] = useState<{
    [lineIndex: number]: number[]
  }>({})
  const [lineHeight, setLineHeight] = useState(65)
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)

  const charRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        e.preventDefault()

        if (isTestRunning) {
          setIsTestRunning(false)
          setUserInput('')
          setCorrectChars(0)
          setErrorCount(0)
          setErrorIndex(null)
          setCurrentLine(0)
          setErrorIndexes({})
          setTimer(activeTime)
          setCurrentCodeIndex(0)
          return
        } else {
          setCurrentCodeIndex((prevIndex) => (prevIndex + 1) % 3)
        }
      }

      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
      }

      setIsCapsLockOn(e.getModifierState('CapsLock'))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTestRunning])

  useEffect(() => {
    if (activeLanguage) {
      let modeKey = ''

      if (
        activeModes.includes('semicolon free') &&
        activeModes.includes('single quote')
      ) {
        modeKey = 'SQSF'
      } else if (activeModes.includes('semicolon free')) {
        modeKey = 'SF'
      } else if (activeModes.includes('single quote')) {
        modeKey = 'SQ'
      }

      const languageKey = `${modeKey}${activeLanguage}`
      let selectedCode

      switch (languageKey) {
        case 'SFJavaScript':
          selectedCode = SFJavaScript
          break
        case 'SQJavaScript':
          selectedCode = SQJavaScript
          break
        case 'SQSFJavaScript':
          selectedCode = SQSFJavaScript
          break
        default:
          selectedCode = defaultNJavaScript
      }

      const codeVariants = [
        selectedCode.JavaScriptOne || {},
        selectedCode.JavaScriptTwo || {},
        selectedCode.JavaScriptThree || {},
      ]

      const fullText = Object.values(codeVariants[currentCodeIndex] || {})
      setText(fullText)
      setUserInput('')
      setCorrectChars(0)
      setTimer(activeTime)
      setIsTestRunning(false)
      setErrorIndex(null)
      setErrorCount(0)
      setCurrentLine(0)
    }
  }, [activeLanguage, activeModes, activeTime, currentCodeIndex])

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
      <div className={styles.wrapper}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${activeLanguage}-${activeModes.join(
              '-'
            )}-${currentCodeIndex}`}
            variants={toTypeFadeInOutVariants}
            initial='initial'
            animate='animate'
            exit='exit'
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
              <Caret
                position={lastCharPosition}
                isTestRunning={isTestRunning}
              />
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }, [text, userInput, errorIndex, errorIndexes, isTestRunning, currentLine])

  const calculateACC = useMemo(() => {
    const totalTypedChars = correctChars + errorCount
    return totalTypedChars === 0
      ? '0.00'
      : ((correctChars / totalTypedChars) * 100).toFixed(2)
  }, [correctChars, errorCount])

  const calculateWPM = useMemo(() => {
    const timeInMinutes = (activeTime - timer) / 60
    return timeInMinutes === 0
      ? '0.00'
      : (correctChars / 5 / timeInMinutes).toFixed(2)
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
        <AnimatePresence mode='wait'>
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

              <motion.div
                variants={fadeInOutVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className={styles.toTypeWrapper}
              >
                <div className={styles.toType}>{getTextWithMotion()}</div>
              </motion.div>
            </>
          ) : (
            <motion.div
              variants={fadeInOutVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              className={styles.result}
            >
              <div className={styles.resultFlex}>
                <div className={styles.head}>
                  <p>Test Type</p>
                  <p>WPM</p>
                  {isNoErrorMode ? null : <p>ACC</p>}
                  <p>Characters</p>
                </div>

                <div className={styles.stats}>
                  <div className={styles.modes}>
                    <p className={styles.language}>{activeLanguage}</p>
                    <p className={styles.activeTime}>
                      {activeTime}
                      <span>s</span>
                    </p>
                    <div className={styles.textModes}>
                      {activeModes.includes('semicolon free') && (
                        <p>— Semicolon Free</p>
                      )}
                      {activeModes.includes('single quote') && (
                        <p>— Single Quote</p>
                      )}
                      {activeModes.includes('no error') && (
                        <p>— No Error Mode</p>
                      )}
                    </div>
                  </div>

                  {isNoErrorMode ? (
                    <svg
                      width='260'
                      height='99'
                      viewBox='0 0 260 99'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className={styles.backgroundSVGNoErrorMode}
                    >
                      <mask id='path-1-inside-1_133_157' fill='white'>
                        <path d='M111.671 24.4307C111.671 12.1323 112.135 1.60345 112.702 1.03533C113.267 0.465659 115.353 0 117.337 0C120.865 0 120.942 0.321313 120.968 15.1343L120.994 30.2687L125.577 22.5075C128.91 16.8635 130.167 12.7346 130.186 7.37313L130.212 0H138.71C144.076 0 147.208 0.656613 147.208 1.78199C147.208 4.45494 105.091 77.4334 103.107 78.1987C101.568 78.7916 66.8637 20.6323 66.8637 17.4564C66.8637 16.3233 79.5351 9.31343 81.5839 9.31343C81.9856 9.31343 82.3271 13.3291 82.341 18.2388C82.3626 25.3232 83.3127 28.7645 86.9498 34.9254L91.5327 42.6866L91.5587 24.4089C91.585 6.2291 91.6066 6.12354 95.5482 4.61787C97.7283 3.78587 99.8142 3.10448 100.183 3.10448C100.553 3.10448 100.856 16.0269 100.856 31.8209C100.856 47.9207 101.471 60.5373 102.254 60.5373C103.023 60.5373 105.457 57.4437 107.662 53.664C111.475 47.126 111.671 45.6995 111.671 24.4307Z' />
                        <path d='M119.471 71.5861L139.111 37.3453C149.912 18.5136 159.107 3.11376 159.546 3.12617C162.19 3.19602 167.295 5.19842 167.295 6.16547C167.295 6.79568 159.099 21.5575 149.082 38.9689C130.935 70.5151 130.851 70.6284 125.171 71.1065L119.471 71.5861Z' />
                        <path d='M142.573 71.2105C142.573 70.4359 150.387 56.1926 159.937 39.5573C169.487 22.9235 178.045 9.31343 178.956 9.31343C179.866 9.31343 181.818 10.2013 183.297 11.2878C185.755 13.0931 184.507 15.839 168.662 43.4968C159.135 60.1259 151.189 73.9394 151.002 74.1955C150.245 75.2308 142.573 72.5159 142.573 71.2105Z' />
                        <path d='M169.065 62.0896C174.26 53.1254 182.277 39.3104 186.883 31.3894L195.257 16.9893L199.921 19.7476C202.485 21.2656 205.614 23.6483 206.875 25.0438C208.941 27.3302 208.439 28.0288 201.744 32.1671C196.583 35.3569 193.009 39.1785 190.009 44.7169L185.695 52.6799L202.065 43.2438C217.871 34.1322 218.539 33.9009 221.449 36.5474C223.106 38.0547 224.463 39.7187 224.463 40.248C224.463 40.7758 213.575 47.4783 200.267 55.1417C183.387 64.8618 175.329 70.4157 173.614 73.514C172.264 75.9541 170.114 79.262 168.84 80.8623C166.632 83.6346 166.36 83.644 163.072 81.0797L159.623 78.3881L169.065 62.0896Z' />
                        <path d='M67.199 57.9979C51.5364 30.6629 50.3774 28.094 52.6719 25.7889C54.0424 24.4105 55.886 23.296 56.7651 23.3115C57.6458 23.3286 66.221 37.0706 75.8222 53.8518L93.2784 84.3626L90.1313 87.5245C88.1598 89.5052 86.4677 90.1276 85.6024 89.1932C84.8422 88.3736 76.5607 74.3352 67.199 57.9979Z' />
                        <path d='M51.8424 69.6226C36.3714 43.7328 35.5476 41.8391 38.3828 38.6911C39.8646 37.0458 41.5657 35.7015 42.1652 35.7015C42.7647 35.7015 49.5786 46.7022 57.3072 60.1493C69.9275 82.1057 72.0846 85.0037 78.4658 88.5894L85.5715 92.5833L82.5756 96.3009L79.5782 100.019L50.4316 83.2124C34.3997 73.9703 20.6732 65.8366 19.9285 65.1381C19.1683 64.4257 20.0242 61.5105 21.8783 58.4976C27.7126 49.0135 28.7215 48.9358 33.743 57.5756C37.065 63.2894 40.5122 66.6439 46.6153 70.1038L54.9526 74.8287L51.8424 69.6226Z' />
                        <path d='M168.926 84.8423C169.303 84.5024 183.518 76.1497 200.514 66.2806L231.416 48.3383L234.086 51.7206C235.554 53.5817 236.747 55.4537 236.736 55.8806C236.726 56.3075 222.793 64.6274 205.774 74.3677L174.828 92.0788L171.533 88.7694C169.722 86.9486 168.547 85.1822 168.926 84.8423Z' />
                        <path d='M181.817 99.7593C182.22 99.3542 195.63 91.4253 211.617 82.1398C227.606 72.8559 241.196 65.2437 241.819 65.2266C242.441 65.208 244.713 68.6866 246.867 72.9552L250.782 80.7164H242.08C235.514 80.7164 231.462 81.7626 225.561 84.9851L217.745 89.2537L235.648 89.6899L253.551 90.1261L255.15 94.7347L256.749 99.3433H228.82H200.889L192.829 103.977L184.767 108.612L182.925 104.553C181.913 102.321 181.413 100.163 181.817 99.7593Z' />
                        <path d='M40.2418 99.5792C10.7475 82.4564 9.94722 81.8604 11.5912 78.2359C12.5213 76.1854 13.898 74.5075 14.652 74.5075C15.4044 74.5075 29.4694 82.3074 45.9076 91.8413L75.7928 109.175L74.2428 113.644C73.3899 116.101 72.219 117.905 71.6396 117.652C71.0587 117.4 56.9303 109.267 40.2418 99.5792Z' />
                        <path d='M19.0956 109.507C3.77603 100.717 3.74668 100.689 5.31804 96.1627C6.56184 92.5786 7.42867 91.9205 9.45274 93.0303C10.8603 93.8018 22.3851 100.428 35.0625 107.753C55.4856 119.557 58.9804 121.075 65.7433 121.075C72.0674 121.075 73.2139 121.495 72.4367 123.53C71.9206 124.881 71.4989 126.976 71.4989 128.187C71.4989 130.023 65.5798 130.388 35.7487 130.388H0L1.03358 121.542C1.60372 116.677 2.32352 112.44 2.63563 112.128C2.94774 111.814 6.97899 113.698 11.5957 116.315C17.9939 119.945 21.9075 121.075 28.0663 121.075C32.5084 121.075 35.7627 120.454 35.296 119.695C34.8294 118.937 27.5395 114.352 19.0956 109.507Z' />
                        <path d='M187.381 117.321C187.381 116.111 186.959 114.015 186.443 112.665C185.604 110.468 189.338 110.209 221.799 110.209H258.095L259.027 113.701C259.538 115.622 259.968 117.717 259.979 118.358C259.991 118.999 243.661 119.522 223.69 119.522C193.376 119.522 187.381 119.159 187.381 117.321Z' />
                        <path d='M196.73 138.149C189.088 138.149 188.926 138.051 188.926 133.493V128.836H224.463H260V135.694C260 147.357 259.285 147.874 250.417 142.621C243.832 138.72 241.28 138.076 233.931 138.466L225.235 138.925L240.686 148.093C249.184 153.136 256.344 157.419 256.599 157.611C257.573 158.35 254.965 166.09 253.741 166.09C253.033 166.09 241.672 159.803 228.494 152.119C206.934 139.548 203.754 138.149 196.73 138.149Z' />
                        <path d='M1.96984 149.015V144.358V139.701H37.3262H72.6842L73.6159 143.194C74.1273 145.114 74.5568 147.21 74.5676 147.851C74.58 148.492 58.2498 149.015 38.2795 149.015H1.96984Z' />
                        <path d='M186.211 149.821C185.993 149.65 186.246 147.335 186.776 144.678L187.739 139.844L195.013 144.042C199.015 146.35 213.181 154.525 226.493 162.209C239.806 169.893 250.705 176.918 250.714 177.823C250.722 178.726 249.83 180.701 248.732 182.211C246.89 184.741 244.379 183.591 216.671 167.543C200.137 157.965 186.429 149.99 186.211 149.821Z' />
                        <path d='M33.9286 158.304C61.4266 158.279 63.3362 158.083 69.1813 154.704L75.3617 151.132L77.4322 154.901C78.5709 156.975 78.9186 159.235 78.2048 159.926C76.0138 162.043 20.378 194.03 18.8855 194.03C17.3929 194.03 11.2404 182.837 11.2404 180.122C11.2404 179.195 15.0243 178.495 20.1247 178.478C27.4839 178.453 30.3346 177.587 36.7344 173.433L44.4598 168.418L25.1462 167.642L5.83257 166.866L5.34444 162.597L4.85444 158.328L33.9286 158.304Z' />
                        <path d='M172.436 170.9C174.487 168.682 177.37 164.958 178.843 162.625L181.519 158.384L187.926 162.111C191.451 164.16 204.763 171.884 217.51 179.276C230.257 186.668 241.182 193.196 241.788 193.781C242.394 194.367 240.719 198.199 238.066 202.297L233.242 209.746L230.16 204.605C228.465 201.777 226.213 198.066 225.158 196.358C223.315 193.379 206.194 182.83 207.802 185.665C208.232 186.424 212.572 193.901 217.445 202.28C225.974 216.944 226.204 217.627 223.599 220.519C222.111 222.17 220.387 223.522 219.769 223.522C219.149 223.522 212.325 212.486 204.602 198.999C192.569 177.98 189.657 173.962 184.235 170.901C180.754 168.936 177.52 167.718 177.046 168.193C176.573 168.669 184.202 183.009 194.001 200.059C210.711 229.132 211.653 231.212 209.136 233.5C207.659 234.843 205.81 235.931 205.027 235.92C204.245 235.911 195.752 222.184 186.156 205.419L168.708 174.934L172.436 170.9Z' />
                        <path d='M24.8433 203.062C25.4351 202.48 39.1293 194.303 55.2755 184.892C71.4217 175.479 85.0462 167.747 85.5515 167.71C87.2109 167.587 92.1042 173.846 91.1215 174.835C90.5931 175.364 76.406 183.745 59.5954 193.456L29.0289 211.112L26.3978 207.617C24.9516 205.693 24.2515 203.643 24.8433 203.062Z' />
                        <path d='M61.4977 203.584C83.6018 190.868 86.6595 188.606 89.9706 182.517C93.5877 175.866 93.773 175.754 97.3452 178.105C99.5393 179.551 100.659 181.44 100.134 182.813C98.4916 187.116 66.5717 242.149 65.7188 242.149C64.1722 242.149 51.4189 233.631 51.4158 232.595C51.4142 232.036 55.0638 229.475 59.5245 226.903C65.6338 223.383 68.6963 220.26 71.9286 214.26C75.3726 207.863 75.6768 206.584 73.4642 207.773C71.9501 208.588 64.5754 212.814 57.0771 217.165C49.5787 221.515 42.9115 225.075 42.2595 225.075C40.7716 225.075 35.242 219.027 36.0995 218.338C36.4487 218.059 47.8777 211.42 61.4977 203.584Z' />
                        <path d='M151.861 184.806L156.102 182.57C158.434 181.34 160.45 180.446 160.583 180.584C161.95 182.016 195.106 240.754 195.106 241.746C195.106 242.894 182.456 249.91 180.386 249.91C179.984 249.91 179.655 245.997 179.655 241.213C179.655 234.604 178.636 230.694 175.406 224.916C173.07 220.736 170.635 217.316 169.998 217.315C169.362 217.313 168.84 225.621 168.84 235.774C168.84 251.175 168.435 254.392 166.395 255.177C159.606 257.794 159.569 257.639 159.569 226.596C159.569 197.797 159.475 196.922 155.716 190.939L151.861 184.806Z' />
                        <path d='M78.2048 241.438C80.1408 237.988 88.1953 223.895 96.1031 210.122C109.978 185.958 110.624 185.12 114.553 186.239C116.878 186.9 118.412 188.319 118.131 189.549C117.859 190.733 109.956 205.055 100.565 221.377L83.4934 251.055L79.0886 249.384L74.6834 247.714L78.2048 241.438Z' />
                        <path d='M141.028 188.08L145.277 186.52C147.613 185.663 149.701 184.906 149.912 184.839C150.124 184.772 150.299 201.481 150.299 221.97V259.224H145.663H141.028V223.651V188.08Z' />
                        <path d='M107.921 228.161C120.744 205.611 122.475 201.678 122.481 195.092C122.487 187.852 122.621 187.63 126.736 188.106L130.985 188.597V224.299V260L122.487 259.451C117.813 259.149 113.77 258.696 113.501 258.443C113.233 258.192 115.145 254.192 117.75 249.553C121.342 243.16 122.487 239.183 122.487 233.098C122.487 228.685 121.965 225.086 121.328 225.096C120.692 225.109 116.345 232.085 111.671 240.597C105.302 252.197 102.399 256.074 100.083 256.073C92.6559 256.07 93.2461 253.968 107.921 228.161Z' />
                      </mask>
                      <path
                        d='M111.671 24.4307C111.671 12.1323 112.135 1.60345 112.702 1.03533C113.267 0.465659 115.353 0 117.337 0C120.865 0 120.942 0.321313 120.968 15.1343L120.994 30.2687L125.577 22.5075C128.91 16.8635 130.167 12.7346 130.186 7.37313L130.212 0H138.71C144.076 0 147.208 0.656613 147.208 1.78199C147.208 4.45494 105.091 77.4334 103.107 78.1987C101.568 78.7916 66.8637 20.6323 66.8637 17.4564C66.8637 16.3233 79.5351 9.31343 81.5839 9.31343C81.9856 9.31343 82.3271 13.3291 82.341 18.2388C82.3626 25.3232 83.3127 28.7645 86.9498 34.9254L91.5327 42.6866L91.5587 24.4089C91.585 6.2291 91.6066 6.12354 95.5482 4.61787C97.7283 3.78587 99.8142 3.10448 100.183 3.10448C100.553 3.10448 100.856 16.0269 100.856 31.8209C100.856 47.9207 101.471 60.5373 102.254 60.5373C103.023 60.5373 105.457 57.4437 107.662 53.664C111.475 47.126 111.671 45.6995 111.671 24.4307Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M119.471 71.5861L139.111 37.3453C149.912 18.5136 159.107 3.11376 159.546 3.12617C162.19 3.19602 167.295 5.19842 167.295 6.16547C167.295 6.79568 159.099 21.5575 149.082 38.9689C130.935 70.5151 130.851 70.6284 125.171 71.1065L119.471 71.5861Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M142.573 71.2105C142.573 70.4359 150.387 56.1926 159.937 39.5573C169.487 22.9235 178.045 9.31343 178.956 9.31343C179.866 9.31343 181.818 10.2013 183.297 11.2878C185.755 13.0931 184.507 15.839 168.662 43.4968C159.135 60.1259 151.189 73.9394 151.002 74.1955C150.245 75.2308 142.573 72.5159 142.573 71.2105Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M169.065 62.0896C174.26 53.1254 182.277 39.3104 186.883 31.3894L195.257 16.9893L199.921 19.7476C202.485 21.2656 205.614 23.6483 206.875 25.0438C208.941 27.3302 208.439 28.0288 201.744 32.1671C196.583 35.3569 193.009 39.1785 190.009 44.7169L185.695 52.6799L202.065 43.2438C217.871 34.1322 218.539 33.9009 221.449 36.5474C223.106 38.0547 224.463 39.7187 224.463 40.248C224.463 40.7758 213.575 47.4783 200.267 55.1417C183.387 64.8618 175.329 70.4157 173.614 73.514C172.264 75.9541 170.114 79.262 168.84 80.8623C166.632 83.6346 166.36 83.644 163.072 81.0797L159.623 78.3881L169.065 62.0896Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M67.199 57.9979C51.5364 30.6629 50.3774 28.094 52.6719 25.7889C54.0424 24.4105 55.886 23.296 56.7651 23.3115C57.6458 23.3286 66.221 37.0706 75.8222 53.8518L93.2784 84.3626L90.1313 87.5245C88.1598 89.5052 86.4677 90.1276 85.6024 89.1932C84.8422 88.3736 76.5607 74.3352 67.199 57.9979Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M51.8424 69.6226C36.3714 43.7328 35.5476 41.8391 38.3828 38.6911C39.8646 37.0458 41.5657 35.7015 42.1652 35.7015C42.7647 35.7015 49.5786 46.7022 57.3072 60.1493C69.9275 82.1057 72.0846 85.0037 78.4658 88.5894L85.5715 92.5833L82.5756 96.3009L79.5782 100.019L50.4316 83.2124C34.3997 73.9703 20.6732 65.8366 19.9285 65.1381C19.1683 64.4257 20.0242 61.5105 21.8783 58.4976C27.7126 49.0135 28.7215 48.9358 33.743 57.5756C37.065 63.2894 40.5122 66.6439 46.6153 70.1038L54.9526 74.8287L51.8424 69.6226Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M168.926 84.8423C169.303 84.5024 183.518 76.1497 200.514 66.2806L231.416 48.3383L234.086 51.7206C235.554 53.5817 236.747 55.4537 236.736 55.8806C236.726 56.3075 222.793 64.6274 205.774 74.3677L174.828 92.0788L171.533 88.7694C169.722 86.9486 168.547 85.1822 168.926 84.8423Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M181.817 99.7593C182.22 99.3542 195.63 91.4253 211.617 82.1398C227.606 72.8559 241.196 65.2437 241.819 65.2266C242.441 65.208 244.713 68.6866 246.867 72.9552L250.782 80.7164H242.08C235.514 80.7164 231.462 81.7626 225.561 84.9851L217.745 89.2537L235.648 89.6899L253.551 90.1261L255.15 94.7347L256.749 99.3433H228.82H200.889L192.829 103.977L184.767 108.612L182.925 104.553C181.913 102.321 181.413 100.163 181.817 99.7593Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M40.2418 99.5792C10.7475 82.4564 9.94722 81.8604 11.5912 78.2359C12.5213 76.1854 13.898 74.5075 14.652 74.5075C15.4044 74.5075 29.4694 82.3074 45.9076 91.8413L75.7928 109.175L74.2428 113.644C73.3899 116.101 72.219 117.905 71.6396 117.652C71.0587 117.4 56.9303 109.267 40.2418 99.5792Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M19.0956 109.507C3.77603 100.717 3.74668 100.689 5.31804 96.1627C6.56184 92.5786 7.42867 91.9205 9.45274 93.0303C10.8603 93.8018 22.3851 100.428 35.0625 107.753C55.4856 119.557 58.9804 121.075 65.7433 121.075C72.0674 121.075 73.2139 121.495 72.4367 123.53C71.9206 124.881 71.4989 126.976 71.4989 128.187C71.4989 130.023 65.5798 130.388 35.7487 130.388H0L1.03358 121.542C1.60372 116.677 2.32352 112.44 2.63563 112.128C2.94774 111.814 6.97899 113.698 11.5957 116.315C17.9939 119.945 21.9075 121.075 28.0663 121.075C32.5084 121.075 35.7627 120.454 35.296 119.695C34.8294 118.937 27.5395 114.352 19.0956 109.507Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M187.381 117.321C187.381 116.111 186.959 114.015 186.443 112.665C185.604 110.468 189.338 110.209 221.799 110.209H258.095L259.027 113.701C259.538 115.622 259.968 117.717 259.979 118.358C259.991 118.999 243.661 119.522 223.69 119.522C193.376 119.522 187.381 119.159 187.381 117.321Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M196.73 138.149C189.088 138.149 188.926 138.051 188.926 133.493V128.836H224.463H260V135.694C260 147.357 259.285 147.874 250.417 142.621C243.832 138.72 241.28 138.076 233.931 138.466L225.235 138.925L240.686 148.093C249.184 153.136 256.344 157.419 256.599 157.611C257.573 158.35 254.965 166.09 253.741 166.09C253.033 166.09 241.672 159.803 228.494 152.119C206.934 139.548 203.754 138.149 196.73 138.149Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M1.96984 149.015V144.358V139.701H37.3262H72.6842L73.6159 143.194C74.1273 145.114 74.5568 147.21 74.5676 147.851C74.58 148.492 58.2498 149.015 38.2795 149.015H1.96984Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M186.211 149.821C185.993 149.65 186.246 147.335 186.776 144.678L187.739 139.844L195.013 144.042C199.015 146.35 213.181 154.525 226.493 162.209C239.806 169.893 250.705 176.918 250.714 177.823C250.722 178.726 249.83 180.701 248.732 182.211C246.89 184.741 244.379 183.591 216.671 167.543C200.137 157.965 186.429 149.99 186.211 149.821Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M33.9286 158.304C61.4266 158.279 63.3362 158.083 69.1813 154.704L75.3617 151.132L77.4322 154.901C78.5709 156.975 78.9186 159.235 78.2048 159.926C76.0138 162.043 20.378 194.03 18.8855 194.03C17.3929 194.03 11.2404 182.837 11.2404 180.122C11.2404 179.195 15.0243 178.495 20.1247 178.478C27.4839 178.453 30.3346 177.587 36.7344 173.433L44.4598 168.418L25.1462 167.642L5.83257 166.866L5.34444 162.597L4.85444 158.328L33.9286 158.304Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M172.436 170.9C174.487 168.682 177.37 164.958 178.843 162.625L181.519 158.384L187.926 162.111C191.451 164.16 204.763 171.884 217.51 179.276C230.257 186.668 241.182 193.196 241.788 193.781C242.394 194.367 240.719 198.199 238.066 202.297L233.242 209.746L230.16 204.605C228.465 201.777 226.213 198.066 225.158 196.358C223.315 193.379 206.194 182.83 207.802 185.665C208.232 186.424 212.572 193.901 217.445 202.28C225.974 216.944 226.204 217.627 223.599 220.519C222.111 222.17 220.387 223.522 219.769 223.522C219.149 223.522 212.325 212.486 204.602 198.999C192.569 177.98 189.657 173.962 184.235 170.901C180.754 168.936 177.52 167.718 177.046 168.193C176.573 168.669 184.202 183.009 194.001 200.059C210.711 229.132 211.653 231.212 209.136 233.5C207.659 234.843 205.81 235.931 205.027 235.92C204.245 235.911 195.752 222.184 186.156 205.419L168.708 174.934L172.436 170.9Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M24.8433 203.062C25.4351 202.48 39.1293 194.303 55.2755 184.892C71.4217 175.479 85.0462 167.747 85.5515 167.71C87.2109 167.587 92.1042 173.846 91.1215 174.835C90.5931 175.364 76.406 183.745 59.5954 193.456L29.0289 211.112L26.3978 207.617C24.9516 205.693 24.2515 203.643 24.8433 203.062Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M61.4977 203.584C83.6018 190.868 86.6595 188.606 89.9706 182.517C93.5877 175.866 93.773 175.754 97.3452 178.105C99.5393 179.551 100.659 181.44 100.134 182.813C98.4916 187.116 66.5717 242.149 65.7188 242.149C64.1722 242.149 51.4189 233.631 51.4158 232.595C51.4142 232.036 55.0638 229.475 59.5245 226.903C65.6338 223.383 68.6963 220.26 71.9286 214.26C75.3726 207.863 75.6768 206.584 73.4642 207.773C71.9501 208.588 64.5754 212.814 57.0771 217.165C49.5787 221.515 42.9115 225.075 42.2595 225.075C40.7716 225.075 35.242 219.027 36.0995 218.338C36.4487 218.059 47.8777 211.42 61.4977 203.584Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M151.861 184.806L156.102 182.57C158.434 181.34 160.45 180.446 160.583 180.584C161.95 182.016 195.106 240.754 195.106 241.746C195.106 242.894 182.456 249.91 180.386 249.91C179.984 249.91 179.655 245.997 179.655 241.213C179.655 234.604 178.636 230.694 175.406 224.916C173.07 220.736 170.635 217.316 169.998 217.315C169.362 217.313 168.84 225.621 168.84 235.774C168.84 251.175 168.435 254.392 166.395 255.177C159.606 257.794 159.569 257.639 159.569 226.596C159.569 197.797 159.475 196.922 155.716 190.939L151.861 184.806Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M78.2048 241.438C80.1408 237.988 88.1953 223.895 96.1031 210.122C109.978 185.958 110.624 185.12 114.553 186.239C116.878 186.9 118.412 188.319 118.131 189.549C117.859 190.733 109.956 205.055 100.565 221.377L83.4934 251.055L79.0886 249.384L74.6834 247.714L78.2048 241.438Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M141.028 188.08L145.277 186.52C147.613 185.663 149.701 184.906 149.912 184.839C150.124 184.772 150.299 201.481 150.299 221.97V259.224H145.663H141.028V223.651V188.08Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M107.921 228.161C120.744 205.611 122.475 201.678 122.481 195.092C122.487 187.852 122.621 187.63 126.736 188.106L130.985 188.597V224.299V260L122.487 259.451C117.813 259.149 113.77 258.696 113.501 258.443C113.233 258.192 115.145 254.192 117.75 249.553C121.342 243.16 122.487 239.183 122.487 233.098C122.487 228.685 121.965 225.086 121.328 225.096C120.692 225.109 116.345 232.085 111.671 240.597C105.302 252.197 102.399 256.074 100.083 256.073C92.6559 256.07 93.2461 253.968 107.921 228.161Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='260'
                      height='99'
                      viewBox='0 0 260 99'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className={styles.backgroundSVG}
                    >
                      <mask id='path-1-inside-1_133_157' fill='white'>
                        <path d='M111.671 24.4307C111.671 12.1323 112.135 1.60345 112.702 1.03533C113.267 0.465659 115.353 0 117.337 0C120.865 0 120.942 0.321313 120.968 15.1343L120.994 30.2687L125.577 22.5075C128.91 16.8635 130.167 12.7346 130.186 7.37313L130.212 0H138.71C144.076 0 147.208 0.656613 147.208 1.78199C147.208 4.45494 105.091 77.4334 103.107 78.1987C101.568 78.7916 66.8637 20.6323 66.8637 17.4564C66.8637 16.3233 79.5351 9.31343 81.5839 9.31343C81.9856 9.31343 82.3271 13.3291 82.341 18.2388C82.3626 25.3232 83.3127 28.7645 86.9498 34.9254L91.5327 42.6866L91.5587 24.4089C91.585 6.2291 91.6066 6.12354 95.5482 4.61787C97.7283 3.78587 99.8142 3.10448 100.183 3.10448C100.553 3.10448 100.856 16.0269 100.856 31.8209C100.856 47.9207 101.471 60.5373 102.254 60.5373C103.023 60.5373 105.457 57.4437 107.662 53.664C111.475 47.126 111.671 45.6995 111.671 24.4307Z' />
                        <path d='M119.471 71.5861L139.111 37.3453C149.912 18.5136 159.107 3.11376 159.546 3.12617C162.19 3.19602 167.295 5.19842 167.295 6.16547C167.295 6.79568 159.099 21.5575 149.082 38.9689C130.935 70.5151 130.851 70.6284 125.171 71.1065L119.471 71.5861Z' />
                        <path d='M142.573 71.2105C142.573 70.4359 150.387 56.1926 159.937 39.5573C169.487 22.9235 178.045 9.31343 178.956 9.31343C179.866 9.31343 181.818 10.2013 183.297 11.2878C185.755 13.0931 184.507 15.839 168.662 43.4968C159.135 60.1259 151.189 73.9394 151.002 74.1955C150.245 75.2308 142.573 72.5159 142.573 71.2105Z' />
                        <path d='M169.065 62.0896C174.26 53.1254 182.277 39.3104 186.883 31.3894L195.257 16.9893L199.921 19.7476C202.485 21.2656 205.614 23.6483 206.875 25.0438C208.941 27.3302 208.439 28.0288 201.744 32.1671C196.583 35.3569 193.009 39.1785 190.009 44.7169L185.695 52.6799L202.065 43.2438C217.871 34.1322 218.539 33.9009 221.449 36.5474C223.106 38.0547 224.463 39.7187 224.463 40.248C224.463 40.7758 213.575 47.4783 200.267 55.1417C183.387 64.8618 175.329 70.4157 173.614 73.514C172.264 75.9541 170.114 79.262 168.84 80.8623C166.632 83.6346 166.36 83.644 163.072 81.0797L159.623 78.3881L169.065 62.0896Z' />
                        <path d='M67.199 57.9979C51.5364 30.6629 50.3774 28.094 52.6719 25.7889C54.0424 24.4105 55.886 23.296 56.7651 23.3115C57.6458 23.3286 66.221 37.0706 75.8222 53.8518L93.2784 84.3626L90.1313 87.5245C88.1598 89.5052 86.4677 90.1276 85.6024 89.1932C84.8422 88.3736 76.5607 74.3352 67.199 57.9979Z' />
                        <path d='M51.8424 69.6226C36.3714 43.7328 35.5476 41.8391 38.3828 38.6911C39.8646 37.0458 41.5657 35.7015 42.1652 35.7015C42.7647 35.7015 49.5786 46.7022 57.3072 60.1493C69.9275 82.1057 72.0846 85.0037 78.4658 88.5894L85.5715 92.5833L82.5756 96.3009L79.5782 100.019L50.4316 83.2124C34.3997 73.9703 20.6732 65.8366 19.9285 65.1381C19.1683 64.4257 20.0242 61.5105 21.8783 58.4976C27.7126 49.0135 28.7215 48.9358 33.743 57.5756C37.065 63.2894 40.5122 66.6439 46.6153 70.1038L54.9526 74.8287L51.8424 69.6226Z' />
                        <path d='M168.926 84.8423C169.303 84.5024 183.518 76.1497 200.514 66.2806L231.416 48.3383L234.086 51.7206C235.554 53.5817 236.747 55.4537 236.736 55.8806C236.726 56.3075 222.793 64.6274 205.774 74.3677L174.828 92.0788L171.533 88.7694C169.722 86.9486 168.547 85.1822 168.926 84.8423Z' />
                        <path d='M181.817 99.7593C182.22 99.3542 195.63 91.4253 211.617 82.1398C227.606 72.8559 241.196 65.2437 241.819 65.2266C242.441 65.208 244.713 68.6866 246.867 72.9552L250.782 80.7164H242.08C235.514 80.7164 231.462 81.7626 225.561 84.9851L217.745 89.2537L235.648 89.6899L253.551 90.1261L255.15 94.7347L256.749 99.3433H228.82H200.889L192.829 103.977L184.767 108.612L182.925 104.553C181.913 102.321 181.413 100.163 181.817 99.7593Z' />
                        <path d='M40.2418 99.5792C10.7475 82.4564 9.94722 81.8604 11.5912 78.2359C12.5213 76.1854 13.898 74.5075 14.652 74.5075C15.4044 74.5075 29.4694 82.3074 45.9076 91.8413L75.7928 109.175L74.2428 113.644C73.3899 116.101 72.219 117.905 71.6396 117.652C71.0587 117.4 56.9303 109.267 40.2418 99.5792Z' />
                        <path d='M19.0956 109.507C3.77603 100.717 3.74668 100.689 5.31804 96.1627C6.56184 92.5786 7.42867 91.9205 9.45274 93.0303C10.8603 93.8018 22.3851 100.428 35.0625 107.753C55.4856 119.557 58.9804 121.075 65.7433 121.075C72.0674 121.075 73.2139 121.495 72.4367 123.53C71.9206 124.881 71.4989 126.976 71.4989 128.187C71.4989 130.023 65.5798 130.388 35.7487 130.388H0L1.03358 121.542C1.60372 116.677 2.32352 112.44 2.63563 112.128C2.94774 111.814 6.97899 113.698 11.5957 116.315C17.9939 119.945 21.9075 121.075 28.0663 121.075C32.5084 121.075 35.7627 120.454 35.296 119.695C34.8294 118.937 27.5395 114.352 19.0956 109.507Z' />
                        <path d='M187.381 117.321C187.381 116.111 186.959 114.015 186.443 112.665C185.604 110.468 189.338 110.209 221.799 110.209H258.095L259.027 113.701C259.538 115.622 259.968 117.717 259.979 118.358C259.991 118.999 243.661 119.522 223.69 119.522C193.376 119.522 187.381 119.159 187.381 117.321Z' />
                        <path d='M196.73 138.149C189.088 138.149 188.926 138.051 188.926 133.493V128.836H224.463H260V135.694C260 147.357 259.285 147.874 250.417 142.621C243.832 138.72 241.28 138.076 233.931 138.466L225.235 138.925L240.686 148.093C249.184 153.136 256.344 157.419 256.599 157.611C257.573 158.35 254.965 166.09 253.741 166.09C253.033 166.09 241.672 159.803 228.494 152.119C206.934 139.548 203.754 138.149 196.73 138.149Z' />
                        <path d='M1.96984 149.015V144.358V139.701H37.3262H72.6842L73.6159 143.194C74.1273 145.114 74.5568 147.21 74.5676 147.851C74.58 148.492 58.2498 149.015 38.2795 149.015H1.96984Z' />
                        <path d='M186.211 149.821C185.993 149.65 186.246 147.335 186.776 144.678L187.739 139.844L195.013 144.042C199.015 146.35 213.181 154.525 226.493 162.209C239.806 169.893 250.705 176.918 250.714 177.823C250.722 178.726 249.83 180.701 248.732 182.211C246.89 184.741 244.379 183.591 216.671 167.543C200.137 157.965 186.429 149.99 186.211 149.821Z' />
                        <path d='M33.9286 158.304C61.4266 158.279 63.3362 158.083 69.1813 154.704L75.3617 151.132L77.4322 154.901C78.5709 156.975 78.9186 159.235 78.2048 159.926C76.0138 162.043 20.378 194.03 18.8855 194.03C17.3929 194.03 11.2404 182.837 11.2404 180.122C11.2404 179.195 15.0243 178.495 20.1247 178.478C27.4839 178.453 30.3346 177.587 36.7344 173.433L44.4598 168.418L25.1462 167.642L5.83257 166.866L5.34444 162.597L4.85444 158.328L33.9286 158.304Z' />
                        <path d='M172.436 170.9C174.487 168.682 177.37 164.958 178.843 162.625L181.519 158.384L187.926 162.111C191.451 164.16 204.763 171.884 217.51 179.276C230.257 186.668 241.182 193.196 241.788 193.781C242.394 194.367 240.719 198.199 238.066 202.297L233.242 209.746L230.16 204.605C228.465 201.777 226.213 198.066 225.158 196.358C223.315 193.379 206.194 182.83 207.802 185.665C208.232 186.424 212.572 193.901 217.445 202.28C225.974 216.944 226.204 217.627 223.599 220.519C222.111 222.17 220.387 223.522 219.769 223.522C219.149 223.522 212.325 212.486 204.602 198.999C192.569 177.98 189.657 173.962 184.235 170.901C180.754 168.936 177.52 167.718 177.046 168.193C176.573 168.669 184.202 183.009 194.001 200.059C210.711 229.132 211.653 231.212 209.136 233.5C207.659 234.843 205.81 235.931 205.027 235.92C204.245 235.911 195.752 222.184 186.156 205.419L168.708 174.934L172.436 170.9Z' />
                        <path d='M24.8433 203.062C25.4351 202.48 39.1293 194.303 55.2755 184.892C71.4217 175.479 85.0462 167.747 85.5515 167.71C87.2109 167.587 92.1042 173.846 91.1215 174.835C90.5931 175.364 76.406 183.745 59.5954 193.456L29.0289 211.112L26.3978 207.617C24.9516 205.693 24.2515 203.643 24.8433 203.062Z' />
                        <path d='M61.4977 203.584C83.6018 190.868 86.6595 188.606 89.9706 182.517C93.5877 175.866 93.773 175.754 97.3452 178.105C99.5393 179.551 100.659 181.44 100.134 182.813C98.4916 187.116 66.5717 242.149 65.7188 242.149C64.1722 242.149 51.4189 233.631 51.4158 232.595C51.4142 232.036 55.0638 229.475 59.5245 226.903C65.6338 223.383 68.6963 220.26 71.9286 214.26C75.3726 207.863 75.6768 206.584 73.4642 207.773C71.9501 208.588 64.5754 212.814 57.0771 217.165C49.5787 221.515 42.9115 225.075 42.2595 225.075C40.7716 225.075 35.242 219.027 36.0995 218.338C36.4487 218.059 47.8777 211.42 61.4977 203.584Z' />
                        <path d='M151.861 184.806L156.102 182.57C158.434 181.34 160.45 180.446 160.583 180.584C161.95 182.016 195.106 240.754 195.106 241.746C195.106 242.894 182.456 249.91 180.386 249.91C179.984 249.91 179.655 245.997 179.655 241.213C179.655 234.604 178.636 230.694 175.406 224.916C173.07 220.736 170.635 217.316 169.998 217.315C169.362 217.313 168.84 225.621 168.84 235.774C168.84 251.175 168.435 254.392 166.395 255.177C159.606 257.794 159.569 257.639 159.569 226.596C159.569 197.797 159.475 196.922 155.716 190.939L151.861 184.806Z' />
                        <path d='M78.2048 241.438C80.1408 237.988 88.1953 223.895 96.1031 210.122C109.978 185.958 110.624 185.12 114.553 186.239C116.878 186.9 118.412 188.319 118.131 189.549C117.859 190.733 109.956 205.055 100.565 221.377L83.4934 251.055L79.0886 249.384L74.6834 247.714L78.2048 241.438Z' />
                        <path d='M141.028 188.08L145.277 186.52C147.613 185.663 149.701 184.906 149.912 184.839C150.124 184.772 150.299 201.481 150.299 221.97V259.224H145.663H141.028V223.651V188.08Z' />
                        <path d='M107.921 228.161C120.744 205.611 122.475 201.678 122.481 195.092C122.487 187.852 122.621 187.63 126.736 188.106L130.985 188.597V224.299V260L122.487 259.451C117.813 259.149 113.77 258.696 113.501 258.443C113.233 258.192 115.145 254.192 117.75 249.553C121.342 243.16 122.487 239.183 122.487 233.098C122.487 228.685 121.965 225.086 121.328 225.096C120.692 225.109 116.345 232.085 111.671 240.597C105.302 252.197 102.399 256.074 100.083 256.073C92.6559 256.07 93.2461 253.968 107.921 228.161Z' />
                      </mask>
                      <path
                        d='M111.671 24.4307C111.671 12.1323 112.135 1.60345 112.702 1.03533C113.267 0.465659 115.353 0 117.337 0C120.865 0 120.942 0.321313 120.968 15.1343L120.994 30.2687L125.577 22.5075C128.91 16.8635 130.167 12.7346 130.186 7.37313L130.212 0H138.71C144.076 0 147.208 0.656613 147.208 1.78199C147.208 4.45494 105.091 77.4334 103.107 78.1987C101.568 78.7916 66.8637 20.6323 66.8637 17.4564C66.8637 16.3233 79.5351 9.31343 81.5839 9.31343C81.9856 9.31343 82.3271 13.3291 82.341 18.2388C82.3626 25.3232 83.3127 28.7645 86.9498 34.9254L91.5327 42.6866L91.5587 24.4089C91.585 6.2291 91.6066 6.12354 95.5482 4.61787C97.7283 3.78587 99.8142 3.10448 100.183 3.10448C100.553 3.10448 100.856 16.0269 100.856 31.8209C100.856 47.9207 101.471 60.5373 102.254 60.5373C103.023 60.5373 105.457 57.4437 107.662 53.664C111.475 47.126 111.671 45.6995 111.671 24.4307Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M119.471 71.5861L139.111 37.3453C149.912 18.5136 159.107 3.11376 159.546 3.12617C162.19 3.19602 167.295 5.19842 167.295 6.16547C167.295 6.79568 159.099 21.5575 149.082 38.9689C130.935 70.5151 130.851 70.6284 125.171 71.1065L119.471 71.5861Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M142.573 71.2105C142.573 70.4359 150.387 56.1926 159.937 39.5573C169.487 22.9235 178.045 9.31343 178.956 9.31343C179.866 9.31343 181.818 10.2013 183.297 11.2878C185.755 13.0931 184.507 15.839 168.662 43.4968C159.135 60.1259 151.189 73.9394 151.002 74.1955C150.245 75.2308 142.573 72.5159 142.573 71.2105Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M169.065 62.0896C174.26 53.1254 182.277 39.3104 186.883 31.3894L195.257 16.9893L199.921 19.7476C202.485 21.2656 205.614 23.6483 206.875 25.0438C208.941 27.3302 208.439 28.0288 201.744 32.1671C196.583 35.3569 193.009 39.1785 190.009 44.7169L185.695 52.6799L202.065 43.2438C217.871 34.1322 218.539 33.9009 221.449 36.5474C223.106 38.0547 224.463 39.7187 224.463 40.248C224.463 40.7758 213.575 47.4783 200.267 55.1417C183.387 64.8618 175.329 70.4157 173.614 73.514C172.264 75.9541 170.114 79.262 168.84 80.8623C166.632 83.6346 166.36 83.644 163.072 81.0797L159.623 78.3881L169.065 62.0896Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M67.199 57.9979C51.5364 30.6629 50.3774 28.094 52.6719 25.7889C54.0424 24.4105 55.886 23.296 56.7651 23.3115C57.6458 23.3286 66.221 37.0706 75.8222 53.8518L93.2784 84.3626L90.1313 87.5245C88.1598 89.5052 86.4677 90.1276 85.6024 89.1932C84.8422 88.3736 76.5607 74.3352 67.199 57.9979Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M51.8424 69.6226C36.3714 43.7328 35.5476 41.8391 38.3828 38.6911C39.8646 37.0458 41.5657 35.7015 42.1652 35.7015C42.7647 35.7015 49.5786 46.7022 57.3072 60.1493C69.9275 82.1057 72.0846 85.0037 78.4658 88.5894L85.5715 92.5833L82.5756 96.3009L79.5782 100.019L50.4316 83.2124C34.3997 73.9703 20.6732 65.8366 19.9285 65.1381C19.1683 64.4257 20.0242 61.5105 21.8783 58.4976C27.7126 49.0135 28.7215 48.9358 33.743 57.5756C37.065 63.2894 40.5122 66.6439 46.6153 70.1038L54.9526 74.8287L51.8424 69.6226Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M168.926 84.8423C169.303 84.5024 183.518 76.1497 200.514 66.2806L231.416 48.3383L234.086 51.7206C235.554 53.5817 236.747 55.4537 236.736 55.8806C236.726 56.3075 222.793 64.6274 205.774 74.3677L174.828 92.0788L171.533 88.7694C169.722 86.9486 168.547 85.1822 168.926 84.8423Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M181.817 99.7593C182.22 99.3542 195.63 91.4253 211.617 82.1398C227.606 72.8559 241.196 65.2437 241.819 65.2266C242.441 65.208 244.713 68.6866 246.867 72.9552L250.782 80.7164H242.08C235.514 80.7164 231.462 81.7626 225.561 84.9851L217.745 89.2537L235.648 89.6899L253.551 90.1261L255.15 94.7347L256.749 99.3433H228.82H200.889L192.829 103.977L184.767 108.612L182.925 104.553C181.913 102.321 181.413 100.163 181.817 99.7593Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M40.2418 99.5792C10.7475 82.4564 9.94722 81.8604 11.5912 78.2359C12.5213 76.1854 13.898 74.5075 14.652 74.5075C15.4044 74.5075 29.4694 82.3074 45.9076 91.8413L75.7928 109.175L74.2428 113.644C73.3899 116.101 72.219 117.905 71.6396 117.652C71.0587 117.4 56.9303 109.267 40.2418 99.5792Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M19.0956 109.507C3.77603 100.717 3.74668 100.689 5.31804 96.1627C6.56184 92.5786 7.42867 91.9205 9.45274 93.0303C10.8603 93.8018 22.3851 100.428 35.0625 107.753C55.4856 119.557 58.9804 121.075 65.7433 121.075C72.0674 121.075 73.2139 121.495 72.4367 123.53C71.9206 124.881 71.4989 126.976 71.4989 128.187C71.4989 130.023 65.5798 130.388 35.7487 130.388H0L1.03358 121.542C1.60372 116.677 2.32352 112.44 2.63563 112.128C2.94774 111.814 6.97899 113.698 11.5957 116.315C17.9939 119.945 21.9075 121.075 28.0663 121.075C32.5084 121.075 35.7627 120.454 35.296 119.695C34.8294 118.937 27.5395 114.352 19.0956 109.507Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M187.381 117.321C187.381 116.111 186.959 114.015 186.443 112.665C185.604 110.468 189.338 110.209 221.799 110.209H258.095L259.027 113.701C259.538 115.622 259.968 117.717 259.979 118.358C259.991 118.999 243.661 119.522 223.69 119.522C193.376 119.522 187.381 119.159 187.381 117.321Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M196.73 138.149C189.088 138.149 188.926 138.051 188.926 133.493V128.836H224.463H260V135.694C260 147.357 259.285 147.874 250.417 142.621C243.832 138.72 241.28 138.076 233.931 138.466L225.235 138.925L240.686 148.093C249.184 153.136 256.344 157.419 256.599 157.611C257.573 158.35 254.965 166.09 253.741 166.09C253.033 166.09 241.672 159.803 228.494 152.119C206.934 139.548 203.754 138.149 196.73 138.149Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M1.96984 149.015V144.358V139.701H37.3262H72.6842L73.6159 143.194C74.1273 145.114 74.5568 147.21 74.5676 147.851C74.58 148.492 58.2498 149.015 38.2795 149.015H1.96984Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M186.211 149.821C185.993 149.65 186.246 147.335 186.776 144.678L187.739 139.844L195.013 144.042C199.015 146.35 213.181 154.525 226.493 162.209C239.806 169.893 250.705 176.918 250.714 177.823C250.722 178.726 249.83 180.701 248.732 182.211C246.89 184.741 244.379 183.591 216.671 167.543C200.137 157.965 186.429 149.99 186.211 149.821Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M33.9286 158.304C61.4266 158.279 63.3362 158.083 69.1813 154.704L75.3617 151.132L77.4322 154.901C78.5709 156.975 78.9186 159.235 78.2048 159.926C76.0138 162.043 20.378 194.03 18.8855 194.03C17.3929 194.03 11.2404 182.837 11.2404 180.122C11.2404 179.195 15.0243 178.495 20.1247 178.478C27.4839 178.453 30.3346 177.587 36.7344 173.433L44.4598 168.418L25.1462 167.642L5.83257 166.866L5.34444 162.597L4.85444 158.328L33.9286 158.304Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M172.436 170.9C174.487 168.682 177.37 164.958 178.843 162.625L181.519 158.384L187.926 162.111C191.451 164.16 204.763 171.884 217.51 179.276C230.257 186.668 241.182 193.196 241.788 193.781C242.394 194.367 240.719 198.199 238.066 202.297L233.242 209.746L230.16 204.605C228.465 201.777 226.213 198.066 225.158 196.358C223.315 193.379 206.194 182.83 207.802 185.665C208.232 186.424 212.572 193.901 217.445 202.28C225.974 216.944 226.204 217.627 223.599 220.519C222.111 222.17 220.387 223.522 219.769 223.522C219.149 223.522 212.325 212.486 204.602 198.999C192.569 177.98 189.657 173.962 184.235 170.901C180.754 168.936 177.52 167.718 177.046 168.193C176.573 168.669 184.202 183.009 194.001 200.059C210.711 229.132 211.653 231.212 209.136 233.5C207.659 234.843 205.81 235.931 205.027 235.92C204.245 235.911 195.752 222.184 186.156 205.419L168.708 174.934L172.436 170.9Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M24.8433 203.062C25.4351 202.48 39.1293 194.303 55.2755 184.892C71.4217 175.479 85.0462 167.747 85.5515 167.71C87.2109 167.587 92.1042 173.846 91.1215 174.835C90.5931 175.364 76.406 183.745 59.5954 193.456L29.0289 211.112L26.3978 207.617C24.9516 205.693 24.2515 203.643 24.8433 203.062Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M61.4977 203.584C83.6018 190.868 86.6595 188.606 89.9706 182.517C93.5877 175.866 93.773 175.754 97.3452 178.105C99.5393 179.551 100.659 181.44 100.134 182.813C98.4916 187.116 66.5717 242.149 65.7188 242.149C64.1722 242.149 51.4189 233.631 51.4158 232.595C51.4142 232.036 55.0638 229.475 59.5245 226.903C65.6338 223.383 68.6963 220.26 71.9286 214.26C75.3726 207.863 75.6768 206.584 73.4642 207.773C71.9501 208.588 64.5754 212.814 57.0771 217.165C49.5787 221.515 42.9115 225.075 42.2595 225.075C40.7716 225.075 35.242 219.027 36.0995 218.338C36.4487 218.059 47.8777 211.42 61.4977 203.584Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M151.861 184.806L156.102 182.57C158.434 181.34 160.45 180.446 160.583 180.584C161.95 182.016 195.106 240.754 195.106 241.746C195.106 242.894 182.456 249.91 180.386 249.91C179.984 249.91 179.655 245.997 179.655 241.213C179.655 234.604 178.636 230.694 175.406 224.916C173.07 220.736 170.635 217.316 169.998 217.315C169.362 217.313 168.84 225.621 168.84 235.774C168.84 251.175 168.435 254.392 166.395 255.177C159.606 257.794 159.569 257.639 159.569 226.596C159.569 197.797 159.475 196.922 155.716 190.939L151.861 184.806Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M78.2048 241.438C80.1408 237.988 88.1953 223.895 96.1031 210.122C109.978 185.958 110.624 185.12 114.553 186.239C116.878 186.9 118.412 188.319 118.131 189.549C117.859 190.733 109.956 205.055 100.565 221.377L83.4934 251.055L79.0886 249.384L74.6834 247.714L78.2048 241.438Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M141.028 188.08L145.277 186.52C147.613 185.663 149.701 184.906 149.912 184.839C150.124 184.772 150.299 201.481 150.299 221.97V259.224H145.663H141.028V223.651V188.08Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                      <path
                        d='M107.921 228.161C120.744 205.611 122.475 201.678 122.481 195.092C122.487 187.852 122.621 187.63 126.736 188.106L130.985 188.597V224.299V260L122.487 259.451C117.813 259.149 113.77 258.696 113.501 258.443C113.233 258.192 115.145 254.192 117.75 249.553C121.342 243.16 122.487 239.183 122.487 233.098C122.487 228.685 121.965 225.086 121.328 225.096C120.692 225.109 116.345 232.085 111.671 240.597C105.302 252.197 102.399 256.074 100.083 256.073C92.6559 256.07 93.2461 253.968 107.921 228.161Z'
                        stroke='#F14317'
                        strokeWidth='2.8'
                        mask='url(#path-1-inside-1_133_157)'
                      />
                    </svg>
                  )}

                  <div className={styles.wpm}>
                    <p>{calculateWPM}</p>

                    <svg
                      width='130'
                      height='54'
                      viewBox='0 0 130 54'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M30.7179 32.7327C39.2779 27.1306 47.7931 22.6048 57.6375 19.5807C62.1779 18.1859 68.9363 16.569 73.7557 15.831C76.0426 15.4808 78.8061 14.3839 80.6955 15.719C81.8839 16.5589 79.2906 18.379 78.121 19.2449C74.1304 22.1994 68.9101 24.9104 64.4094 26.7443C56.5481 29.9475 48.4426 31.7334 40.0642 32.7327C37.8745 32.9938 43.8292 35.0487 45.8287 35.9787C56.5946 40.9861 66.6076 47.8948 77.4494 52.6006C81.667 54.4312 70.3773 46.7035 66.5921 44.0938C55.0628 36.1447 37.4648 24.563 25.8489 16.9503C17.6168 11.5553 9.3816 6.15791 1 1'
                        stroke='#272727'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                      <path
                        d='M87.941 33.947L91.392 34.066L93.194 33.998C93.2167 34.1227 93.228 34.3153 93.228 34.576C93.228 34.8253 93.1827 35.0067 93.092 35.12C93.0127 35.222 92.8767 35.273 92.684 35.273C92.4913 35.273 92.0777 35.2617 91.443 35.239C90.9897 39.0357 90.542 41.7953 90.1 43.518C89.896 44.3567 89.6183 44.9913 89.267 45.422C89.0857 45.6373 88.842 45.8243 88.536 45.983C88.23 46.1303 87.8447 46.204 87.38 46.204C86.9153 46.204 86.4337 46.051 85.935 45.745C85.4477 45.4277 85.051 45.0367 84.745 44.572L85.221 44.045C85.357 44.1697 85.5667 44.3057 85.85 44.453C86.1333 44.6003 86.377 44.674 86.581 44.674C86.921 44.674 87.2157 44.334 87.465 43.654C87.7257 42.9627 87.9863 41.7557 88.247 40.033C88.519 38.3103 88.655 36.9107 88.655 35.834V35.137C87.7597 35.137 87.0967 35.188 86.666 35.29C86.5187 34.9953 86.4167 34.61 86.36 34.134C86.6433 34.0093 87.1703 33.947 87.941 33.947ZM92.4977 43.059C92.4977 41.6423 92.9227 40.526 93.7727 39.71C94.634 38.8827 95.6087 38.469 96.6967 38.469C97.3653 38.469 97.915 38.6333 98.3457 38.962C98.7763 39.2907 98.9917 39.7327 98.9917 40.288C98.9917 40.832 98.85 41.291 98.5667 41.665C98.2947 42.039 97.9603 42.328 97.5637 42.532C96.759 42.9287 96.0223 43.178 95.3537 43.28L94.9457 43.331C95.025 44.3963 95.4613 44.929 96.2547 44.929C96.5267 44.929 96.8157 44.861 97.1217 44.725C97.4277 44.589 97.6657 44.453 97.8357 44.317L98.0907 44.113L98.4987 44.657C98.408 44.7817 98.2267 44.946 97.9547 45.15C97.6827 45.354 97.4277 45.524 97.1897 45.66C96.5323 46.0227 95.8127 46.204 95.0307 46.204C94.2487 46.204 93.631 45.9263 93.1777 45.371C92.7243 44.8157 92.4977 44.045 92.4977 43.059ZM94.9287 42.498C95.5067 42.396 95.9657 42.1523 96.3057 41.767C96.6457 41.3817 96.8157 40.883 96.8157 40.271C96.8157 39.659 96.6343 39.353 96.2717 39.353C95.841 39.353 95.5067 39.7213 95.2687 40.458C95.042 41.1833 94.9287 41.8633 94.9287 42.498ZM101.158 33.93L106.836 34.117L108.434 34.083C108.468 34.321 108.485 34.5703 108.485 34.831C108.485 35.0917 108.439 35.2787 108.349 35.392C108.258 35.5053 108.094 35.562 107.856 35.562C107.833 35.562 107.034 35.4883 105.459 35.341C105.413 35.851 105.243 36.7237 104.949 37.959C104.654 39.1943 104.371 40.5147 104.099 41.92C103.827 43.3253 103.685 44.589 103.674 45.711C103.232 45.9377 102.325 46.051 100.954 46.051H100.835C100.835 45.4617 101.158 43.705 101.804 40.781C102.45 37.857 102.773 36.0777 102.773 35.443C102.773 35.3977 102.761 35.3183 102.739 35.205H102.059C101.129 35.205 100.415 35.3467 99.9167 35.63C99.656 35.29 99.4974 34.7913 99.4407 34.134C99.826 33.998 100.398 33.93 101.158 33.93ZM109.819 47.836C109.445 48.0627 109.258 48.2837 109.258 48.499C109.258 48.7143 109.377 48.822 109.615 48.822C109.864 48.822 110.142 48.703 110.448 48.465C110.754 48.2383 111.009 47.8643 111.213 47.343C110.669 47.445 110.204 47.6093 109.819 47.836ZM109.003 46.068C108.051 46.068 107.575 45.5467 107.575 44.504C107.575 44.2547 107.688 43.535 107.915 42.345C108.142 41.155 108.255 40.1633 108.255 39.37C108.255 39.2 108.232 39.0413 108.187 38.894C108.799 38.656 109.638 38.537 110.703 38.537C110.76 38.6957 110.788 38.9677 110.788 39.353C110.788 39.7383 110.663 40.5373 110.414 41.75C110.165 42.9627 110.04 43.7447 110.04 44.096C110.04 44.4473 110.187 44.623 110.482 44.623C110.833 44.623 111.258 44.4473 111.757 44.096C111.814 43.4273 112.04 41.665 112.437 38.809C112.834 38.6503 113.548 38.571 114.579 38.571H114.902C114.687 39.421 114.477 40.645 114.273 42.243C114.069 43.841 113.905 44.9517 113.78 45.575C113.542 46.8217 113.1 47.836 112.454 48.618C111.819 49.4113 110.986 49.808 109.955 49.808C109.547 49.808 109.173 49.7003 108.833 49.485C108.504 49.2697 108.34 48.992 108.34 48.652C108.34 48.1987 108.618 47.785 109.173 47.411C109.728 47.037 110.476 46.748 111.417 46.544C111.519 46.0453 111.598 45.5637 111.655 45.099C110.737 45.745 109.853 46.068 109.003 46.068ZM114.784 49.808C114.727 49.672 114.699 49.3717 114.699 48.907C114.699 48.4423 114.92 47.1957 115.362 45.167C115.804 43.127 116.025 41.5573 116.025 40.458C116.025 40.2427 115.974 40.016 115.872 39.778C115.77 39.5287 115.662 39.336 115.549 39.2L115.396 39.013L115.413 38.792C115.945 38.622 116.886 38.537 118.235 38.537C118.359 38.775 118.439 39.1093 118.473 39.54C119.345 38.826 120.071 38.469 120.649 38.469C121.238 38.469 121.708 38.7127 122.06 39.2C122.422 39.6873 122.604 40.4013 122.604 41.342C122.604 42.9853 122.303 44.2093 121.703 45.014C121.102 45.8073 120.343 46.204 119.425 46.204C118.949 46.204 118.552 46.136 118.235 46L118.065 45.932L118.184 45.269C118.286 45.2917 118.405 45.303 118.541 45.303C118.835 45.303 119.09 45.167 119.306 44.895C119.532 44.623 119.702 44.2773 119.816 43.858C120.042 43.0193 120.156 42.243 120.156 41.529C120.156 40.509 119.946 39.999 119.527 39.999C119.198 39.999 118.847 40.1293 118.473 40.39C118.427 41.1833 118.195 42.5717 117.776 44.555C117.356 46.5383 117.147 48.1363 117.147 49.349C116.535 49.5983 115.747 49.7513 114.784 49.808ZM123.31 43.059C123.31 41.6423 123.735 40.526 124.585 39.71C125.446 38.8827 126.421 38.469 127.509 38.469C128.178 38.469 128.727 38.6333 129.158 38.962C129.589 39.2907 129.804 39.7327 129.804 40.288C129.804 40.832 129.662 41.291 129.379 41.665C129.107 42.039 128.773 42.328 128.376 42.532C127.571 42.9287 126.835 43.178 126.166 43.28L125.758 43.331C125.837 44.3963 126.274 44.929 127.067 44.929C127.339 44.929 127.628 44.861 127.934 44.725C128.24 44.589 128.478 44.453 128.648 44.317L128.903 44.113L129.311 44.657C129.22 44.7817 129.039 44.946 128.767 45.15C128.495 45.354 128.24 45.524 128.002 45.66C127.345 46.0227 126.625 46.204 125.843 46.204C125.061 46.204 124.443 45.9263 123.99 45.371C123.537 44.8157 123.31 44.045 123.31 43.059ZM125.741 42.498C126.319 42.396 126.778 42.1523 127.118 41.767C127.458 41.3817 127.628 40.883 127.628 40.271C127.628 39.659 127.447 39.353 127.084 39.353C126.653 39.353 126.319 39.7213 126.081 40.458C125.854 41.1833 125.741 41.8633 125.741 42.498Z'
                        fill='#272727'
                      />
                    </svg>
                  </div>

                  {isNoErrorMode ? null : (
                    <p className={styles.acc}>{calculateACC}%</p>
                  )}

                  <div className={styles.characters}>
                    <div className={styles.charactersText}>
                      <p>{correctChars}</p>
                      {!isNoErrorMode ? <p>/{errorCount}</p> : null}
                    </div>

                    <p className={styles.template}>
                      <span>*</span> correct
                      {!isNoErrorMode ? '/incorrect' : null}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.shortcut}>
                <p>
                  <span className={styles.tab}>tab</span>{' '}
                  <span className={styles.line}>—</span> restart test
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
