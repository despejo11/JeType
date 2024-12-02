import { Dispatch, SetStateAction } from 'react'

export type THeaderTrainerProps = {
  showInfo: boolean
  setShowInfo: Dispatch<SetStateAction<boolean>>
  testStarted: boolean
  playing: boolean
  setPlaying: (playing: boolean) => void
}
