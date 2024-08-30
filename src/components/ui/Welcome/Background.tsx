import styles from './style.module.scss'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Model/Scene'), {
  ssr: false,
})

export default function Background() {
  return (
    <div className={styles.scene}>
      <div className={styles.model}>
        <Scene />
      </div>

      <img src='/images/bg/welcomeBg.png' alt='Code Faster' />
    </div>
  )
}
