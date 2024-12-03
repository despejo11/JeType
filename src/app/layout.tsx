import './global.scss'
import '@/../index.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='google' content='notranslate' />

        <title>JeType</title>
        <meta
          name='description'
          content='Test your coding speed like never before. Choose your preferred programming language and see how fast you can type code under time pressure. Perfect for developers, learners and competitive coders who want to improve their accuracy and efficiency.'
        />

        <meta property='og:title' content='JeType' />
        <meta
          property='og:description'
          content='Test your coding speed like never before. Choose your preferred programming language and see how fast you can type code under time pressure. Perfect for developers, learners and competitive coders who want to improve their accuracy and efficiency.'
        />
        <meta
          property='og:image'
          content='https://jetype.com/images/other/metaLogo.png'
        />
        <meta property='og:url' content='https://jetype.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='JeType' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='JeType' />
        <meta
          name='twitter:description'
          content='Test your coding speed like never before. Choose your preferred programming language and see how fast you can type code under time pressure. Perfect for developers, learners and competitive coders who want to improve their accuracy and efficiency.'
        />
        <meta
          name='twitter:image'
          content='https://jetype.com/images/other/metaLogo.png'
        />
        <meta name='twitter:url' content='https://jetype.com/' />
      </head>
      <body>
        <div className='screenWidthWarning'>
          <img
            className='background'
            src='/images/bg/screenWidthWarningBg.webp'
            alt='Pattern'
          />

          <img className='logo' src='/images/other/logo.webp' alt='Logo' />
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
