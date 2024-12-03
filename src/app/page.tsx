import { Metadata } from 'next'
import ScrollTrack from '@/components/ScrollTrack/ScrollTrack'
import Header from '@/components/ui/Header/Header'
import Welcome from '@/components/ui/Welcome/Welcome'
import GetStarted from '@/components/ui/GetStarted/GetStarted'
import HowTo from '@/components/ui/HowTo/HowTo'
import Footer from '@/components/ui/Footer/Footer'

export const metadata: Metadata = {
  title: 'JeType',
  description:
    'Test your coding speed like never before. Choose your preferred programming language and see how fast you can type code under time pressure. Perfect for developers, learners and competitive coders who want to improve their accuracy and efficiency.',
  keywords:
    'JeType, typing, test, code, learn, faster, печать, код, скорость, тест печати, typing test, jet, keyboard',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <>
      <ScrollTrack />
      <Header />
      <Welcome />
      <GetStarted />
      <HowTo />
      <Footer />
    </>
  )
}
