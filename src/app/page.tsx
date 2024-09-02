import Header from '@/components/ui/Header/Header'
import Welcome from '@/components/ui/Welcome/Welcome'
import GetStarted from '@/components/ui/GetStarted/GetStarted'
import HowTo from '@/components/ui/HowTo/HowTo'

export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
      <GetStarted />
      <HowTo />
    </>
  )
}
