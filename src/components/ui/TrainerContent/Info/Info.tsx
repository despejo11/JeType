import styles from './style.module.scss'
import AnimatedText from './AnimatedText/AnimatedText'
import { textVariants, IMGVariants } from './variants'
import { motion } from 'framer-motion'

export default function Info() {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <p className={styles.title}>
          <AnimatedText text='semicolon free' />
        </p>

        <motion.p
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className={styles.description}
        >
          In this mode, you can write code without needing to add semicolons (;)
          at the end of statements. This is applicable in languages like{' '}
          <span>JavaScript</span>, <span>TypeScript</span>, <span>PHP</span>,{' '}
          <span>C#</span>, and <span>Java</span>, where semicolons are usually
          optional.
        </motion.p>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>
          <AnimatedText text='single quote' />
        </p>

        <motion.p
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className={styles.description}
        >
          This mode encourages the use of single quotes (') for strings instead
          of double quotes ("). It is supported in <span>all available</span>{' '}
          languages, making it useful for maintaining consistency in your coding
          style.
        </motion.p>
      </div>

      <motion.img
        variants={IMGVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        src='/images/bg/infoBg.webp'
        alt='Pattern'
      />

      <div className={styles.info}>
        <p className={styles.title}>
          <AnimatedText text='no error' />
        </p>

        <motion.p
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className={styles.description}
        >
          In this mode, the code editor will not block you from continuing to
          type even if there are syntax errors. Errors will still be
          highlighted, but you can choose to ignore them and continue coding.
        </motion.p>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>
          <AnimatedText text='time limit' />
        </p>

        <motion.p
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className={styles.description}
        >
          Choose your coding challenge duration — <span>15</span> seconds,{' '}
          <span>30</span> seconds, <span>60</span> seconds, or{' '}
          <span>no time limit</span> (
          <svg viewBox='0 0 29 14' xmlns='http://www.w3.org/2000/svg'>
            <path d='M6.15 13.65C4.11667 13.65 2.58333 13.05 1.55 11.85C0.55 10.65 0.0500001 9.06667 0.0500001 7.1C0.0500001 5.1 0.55 3.5 1.55 2.3C2.58333 1.06667 4.11667 0.449999 6.15 0.449999C7.61667 0.449999 8.95 0.866665 10.15 1.7C11.35 2.5 12.7 3.71667 14.2 5.35C15.6667 3.78333 16.9667 2.6 18.1 1.8C19.2667 0.966666 20.5667 0.549999 22 0.549999C23.9667 0.583332 25.4667 1.18333 26.5 2.35C27.5333 3.51667 28.05 5.08333 28.05 7.05C28.0167 9.01667 27.4833 10.6 26.45 11.8C25.45 12.9667 23.9667 13.55 22 13.55C20.5667 13.5833 19.2667 13.1833 18.1 12.35C16.9667 11.5167 15.6667 10.3333 14.2 8.8C12.7 10.4 11.35 11.6167 10.15 12.45C8.95 13.25 7.61667 13.65 6.15 13.65ZM6.05 11.45C7.15 11.45 8.16667 11.1 9.1 10.4C10.0667 9.66667 11.2333 8.55 12.6 7.05C11.2333 5.58333 10.0667 4.5 9.1 3.8C8.16667 3.06667 7.15 2.7 6.05 2.7C4.71667 2.66667 3.71667 3.03333 3.05 3.8C2.41667 4.56667 2.1 5.66667 2.1 7.1C2.1 8.5 2.41667 9.58333 3.05 10.35C3.71667 11.0833 4.71667 11.45 6.05 11.45ZM22.15 11.3C23.4167 11.3333 24.3833 10.95 25.05 10.15C25.7167 9.31667 26.05 8.28333 26.05 7.05C26.05 5.78333 25.7167 4.76667 25.05 4C24.3833 3.2 23.4167 2.81667 22.15 2.85C21.0833 2.85 20.0833 3.18333 19.15 3.85C18.25 4.51667 17.1167 5.58333 15.75 7.05C17.1167 8.51667 18.25 9.6 19.15 10.3C20.0833 10.9667 21.0833 11.3 22.15 11.3Z' />
          </svg>
          ). The timer will start as soon as you begin typing, and your goal is
          to write as much accurate code as possible within the selected time.
        </motion.p>
      </div>
    </div>
  )
}
