import './global.scss'
import '@/../index.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='google' content='notranslate' />
      </head>
      <body>
        <div className='screenWidthWarning'>
          <img
            className='background'
            src='/images/bg/screenWidthWarningBg.png'
            alt='Pattern'
          />

          <img className='logo' src='/images/other/logo.png' alt='Logo' />
          <p>
            Only for devices <br />
            wider than <span>320 </span>px<span>!</span>
          </p>
        </div>

        <div className='screenContent'>{children}</div>
      </body>
    </html>
  )
}
