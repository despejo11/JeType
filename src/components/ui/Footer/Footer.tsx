import styles from './style.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.relative}>
        <div className={styles.sticky}>
          <div className={styles.content}>
            <div className={styles.head}>
              <p className={styles.rights}>
                <span>©</span> {new Date().getFullYear()} JeType. All Rights
                Reserved
              </p>

              <img
                className={styles.background}
                src='/images/bg/footerIconBg.png'
                alt='Pattern'
              />

              <div>
                <p>Created & Curated by</p>
                <img src='/images/other/chkstepan.png' alt='chkstepan logo' />
                <a href='https://chkstepan.com/' target='_blank'>
                  chkstepan
                </a>
              </div>
            </div>

            <img
              className={styles.typography}
              src='/images/other/footerTypography.png'
              alt='Typography'
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
