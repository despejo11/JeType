'use client'

import styles from './style.module.scss'
import Modes from './Modes/Modes'
import LanguageSelection from './LanguageSelection/LanguageSelection'
import { useState } from 'react'

export default function TrainerContent() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript')

  return (
    <div className={styles.content}>
      <div className={styles.desktop}>
        <div className={styles.icon}>
          <p>i</p>
        </div>

        <Modes activeLanguage={activeLanguage} />
        <LanguageSelection setActiveLanguage={setActiveLanguage} />
      </div>
    </div>
  )
}
