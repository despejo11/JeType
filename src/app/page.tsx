import ScrollTrack from '@/components/ScrollTrack/ScrollTrack'
import Header from '@/components/ui/Header/Header'
import Welcome from '@/components/ui/Welcome/Welcome'
import GetStarted from '@/components/ui/GetStarted/GetStarted'
import HowTo from '@/components/ui/HowTo/HowTo'
import Footer from '@/components/ui/Footer/Footer'

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
