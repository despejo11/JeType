import { Metadata } from 'next'
import TrainerContent from '@/components/ui/TrainerContent/TrainerContent'

export const metadata: Metadata = {
  title: 'JeType — Trainer',
  description:
    'Sharpen your coding skills! Choose a language and see how fast and accurate you can type real code.',
  keywords:
    'JeType, typing, test, code, learn, faster, trainer, печать, код, скорость, тест печати, typing test, jet, keyboard',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Trainer() {
  return (
    <>
      <TrainerContent />
    </>
  )
}
